
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

export interface CourseProgress {
  course_id: string;
  progress_percentage: number;
  started_at: string | null;
  completed_at: string | null;
  last_accessed_at: string | null;
  is_favorite: boolean;
}

export interface VideoProgress {
  video_id: string;
  completed: boolean;
  completed_at: string | null;
  time_spent_minutes: number;
}

export const useCourseProgress = () => {
  const { user } = useUser();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [videoProgress, setVideoProgress] = useState<VideoProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        setLoading(true);

        // Fetch course enrollments/progress from the new table
        const { data: courses, error: coursesError } = await supabase
          .from('user_course_enrollments')
          .select('course_id, progress_percentage, started_at, completed_at, last_accessed_at, is_favorite')
          .eq('clerk_user_id', user.id);

        if (coursesError) {
          console.error('Error fetching course progress:', coursesError);
        } else if (courses) {
          setCourseProgress(courses);
        }

        // Fetch video progress
        const { data: videos, error: videosError } = await supabase
          .from('user_progress')
          .select('video_id, completed, completed_at, time_spent_minutes')
          .eq('clerk_user_id', user.id);

        if (videosError) {
          console.error('Error fetching video progress:', videosError);
        } else if (videos) {
          setVideoProgress(videos);
        }

      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_course_enrollments')
        .insert({
          clerk_user_id: user.id,
          course_id: courseId,
          started_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error enrolling in course:', error);
        return;
      }

      // Refresh course progress
      const { data: courses } = await supabase
        .from('user_course_enrollments')
        .select('course_id, progress_percentage, started_at, completed_at, last_accessed_at, is_favorite')
        .eq('clerk_user_id', user.id);

      if (courses) setCourseProgress(courses);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const markVideoComplete = async (videoId: string, courseId: string, moduleId: string) => {
    if (!user) return;

    try {
      // Insert or update video progress
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          clerk_user_id: user.id,
          video_id: videoId,
          course_id: courseId,
          module_id: moduleId,
          completed: true,
          completed_at: new Date().toISOString(),
          time_spent_minutes: 0 // This could be tracked more accurately
        });

      if (error) {
        console.error('Error marking video complete:', error);
        return;
      }

      // Update video progress state
      setVideoProgress(prev => {
        const existingIndex = prev.findIndex(v => v.video_id === videoId);
        const newProgress = {
          video_id: videoId,
          completed: true,
          completed_at: new Date().toISOString(),
          time_spent_minutes: 0
        };

        if (existingIndex >= 0) {
          const newArray = [...prev];
          newArray[existingIndex] = newProgress;
          return newArray;
        } else {
          return [...prev, newProgress];
        }
      });

      // Award points for video completion using the database function
      await supabase.rpc('award_points', {
        user_id: user.id,
        points: 5,
        activity_desc: 'Completed video lesson'
      });

    } catch (error) {
      console.error('Error marking video complete:', error);
    }
  };

  const updateCourseProgress = async (courseId: string, progressPercentage: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_course_enrollments')
        .update({
          progress_percentage: progressPercentage,
          last_accessed_at: new Date().toISOString()
        })
        .eq('clerk_user_id', user.id)
        .eq('course_id', courseId);

      if (error) {
        console.error('Error updating course progress:', error);
        return;
      }

      // Update local state
      setCourseProgress(prev => 
        prev.map(course => 
          course.course_id === courseId 
            ? { ...course, progress_percentage: progressPercentage, last_accessed_at: new Date().toISOString() }
            : course
        )
      );
    } catch (error) {
      console.error('Error updating course progress:', error);
    }
  };

  const isVideoCompleted = (videoId: string) => {
    return videoProgress.some(v => v.video_id === videoId && v.completed);
  };

  const getCompletedVideos = () => {
    return videoProgress.filter(v => v.completed).map(v => v.video_id);
  };

  return {
    courseProgress,
    videoProgress,
    loading,
    enrollInCourse,
    markVideoComplete,
    updateCourseProgress,
    isVideoCompleted,
    getCompletedVideos
  };
};
