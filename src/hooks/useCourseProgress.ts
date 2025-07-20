
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSupabaseClient } from '@/integrations/supabase/client';

export interface CourseProgress {
  course_id: string;
  progress_percentage: number;
  started_at: string | null;
  completed_at: string | null;
  last_accessed_at: string | null;
  is_favorite: boolean;
  time_commitment?: string;
  experience_level?: string;
}

export interface VideoProgress {
  video_id: string;
  course_id: string; // Added course_id
  completed: boolean;
  completed_at: string | null;
  time_spent_minutes: number;
}

export const useCourseProgress = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [videoProgress, setVideoProgress] = useState<VideoProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      try {
        setLoading(true);

        console.log('[useCourseProgress] Fetching progress for user:', user.id);
        // Fetch course enrollments/progress
        const { data: courses, error: coursesError } = await supabase
          .from('user_course_enrollments')
          .select('course_id, progress_percentage, started_at, completed_at, last_accessed_at, is_favorite, time_commitment, experience_level')
          .eq('clerk_user_id', user.id);

        if (coursesError) {
          console.error('[useCourseProgress] Error fetching course progress:', coursesError);
        } else if (courses) {
          console.log('[useCourseProgress] Course progress fetched:', courses);
          setCourseProgress(courses);
        }

        // Fetch video progress
        const { data: videos, error: videosError } = await supabase
          .from('user_progress')
          .select('video_id, course_id, completed, completed_at, time_spent_minutes') // Added course_id
          .eq('clerk_user_id', user.id);

        if (videosError) {
          console.error('[useCourseProgress] Error fetching video progress:', videosError);
        } else if (videos) {
          console.log('[useCourseProgress] Video progress fetched:', videos);
          setVideoProgress(videos);
        }

      } catch (error) {
        console.error('[useCourseProgress] Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user, supabase]);

  const enrollInCourse = async (courseId: string, timeCommitment: string, experienceLevel: string) => {
    if (!user) return;

    try {
      console.log('[useCourseProgress] Enrolling user in course:', courseId, timeCommitment, experienceLevel);
      const { error } = await supabase
        .from('user_course_enrollments')
        .insert({
          clerk_user_id: user.id,
          course_id: courseId,
          started_at: new Date().toISOString(),
          last_accessed_at: new Date().toISOString()
        });

      if (error) {
        console.error('[useCourseProgress] Error enrolling in course:', error);
        return;
      }

      // Refresh course progress
      const { data: courses } = await supabase
        .from('user_course_enrollments')
        .select('course_id, progress_percentage, started_at, completed_at, last_accessed_at, is_favorite, time_commitment, experience_level')
        .eq('clerk_user_id', user.id);

      if (courses) {
        console.log('[useCourseProgress] Updated course progress after enrollment:', courses);
        setCourseProgress(courses);
      }
    } catch (error) {
      console.error('[useCourseProgress] Error enrolling in course:', error);
    }
  };

  const markVideoComplete = async (videoId: string, courseId: string, moduleId: string) => {
    if (!user) return;
    console.log('[markVideoComplete] Called with:', { videoId, courseId, moduleId, userId: user.id });

    try {
      // Check if already completed
      const wasCompleted = videoProgress.some(v => v.video_id === videoId && v.completed);
      console.log('[markVideoComplete] Was previously completed?', wasCompleted);

      // Fetch existing progress row for this user/video
      const { data: existingRow, error: fetchError } = await supabase
        .from('user_progress')
        .select('id')
        .eq('clerk_user_id', user.id)
        .eq('video_id', videoId)
        .limit(1)
        .maybeSingle();
      if (fetchError) {
        console.error('[markVideoComplete] Error fetching existing row:', fetchError);
        return;
      }

      // Insert or update video progress
      const upsertObj = {
        ...(existingRow?.id ? { id: existingRow.id } : {}),
        clerk_user_id: user.id,
        video_id: videoId,
        course_id: courseId,
        module_id: moduleId,
        completed: true,
        completed_at: new Date().toISOString(),
        time_spent_minutes: 0
      };
      console.log('[markVideoComplete] Upserting into user_progress:', upsertObj);
      const { error } = await supabase
        .from('user_progress')
        .upsert(upsertObj);

      if (error) {
        console.error('[useCourseProgress] Error marking video complete:', error);
        return;
      }

      // Update video progress state
      setVideoProgress(prev => {
        const existingIndex = prev.findIndex(v => v.video_id === videoId);
        const newProgress = {
          video_id: videoId,
          course_id: courseId,
          completed: true,
          completed_at: new Date().toISOString(),
          time_spent_minutes: 0
        };
        console.log('[markVideoComplete] Updating local videoProgress state:', newProgress);
        if (existingIndex >= 0) {
          const newArray = [...prev];
          newArray[existingIndex] = newProgress;
          return newArray;
        } else {
          return [...prev, newProgress];
        }
      });

      // Calculate and update course progress
      await updateCourseProgressByVideos(courseId);
      console.log('[markVideoComplete] Finished for:', videoId);
    } catch (error) {
      console.error('[useCourseProgress] Error marking video complete:', error);
    }
  };

  const markVideoIncomplete = async (videoId: string, courseId: string, moduleId: string) => {
    if (!user) return;
    console.log('[markVideoIncomplete] Called with:', { videoId, courseId, moduleId, userId: user.id });
    try {
      // Fetch existing progress row for this user/video
      const { data: existingRow, error: fetchError } = await supabase
        .from('user_progress')
        .select('id')
        .eq('clerk_user_id', user.id)
        .eq('video_id', videoId)
        .limit(1)
        .maybeSingle();
      if (fetchError) {
        console.error('[markVideoIncomplete] Error fetching existing row:', fetchError);
        return;
      }

      // Check if previously completed (from local state)
      const wasCompleted = videoProgress.some(v => v.video_id === videoId && v.completed);
      console.log('[markVideoIncomplete] Was previously completed?', wasCompleted);

      // Insert or update video progress as incomplete
      const upsertObj = {
        ...(existingRow?.id ? { id: existingRow.id } : {}),
        clerk_user_id: user.id,
        video_id: videoId,
        course_id: courseId,
        module_id: moduleId,
        completed: false,
        completed_at: null,
        time_spent_minutes: 0
      };
      console.log('[markVideoIncomplete] Upserting into user_progress:', upsertObj);
      const { error } = await supabase
        .from('user_progress')
        .upsert(upsertObj);

      if (error) {
        console.error('[useCourseProgress] Error marking video incomplete:', error);
        return;
      }

      // Update local state
      setVideoProgress(prev => {
        const idx = prev.findIndex(v => v.video_id === videoId);
        const updated = idx >= 0 ? { ...prev[idx], completed: false, completed_at: null } : undefined;
        if (idx >= 0) {
          const arr = [...prev];
          arr[idx] = updated!;
          console.log('[markVideoIncomplete] Updating local videoProgress state:', updated);
          return arr;
        }
        return prev;
      });

      // Update course progress
      await updateCourseProgressByVideos(courseId);
      console.log('[markVideoIncomplete] Finished for:', videoId);
    } catch (error) {
      console.error('[useCourseProgress] Error marking video incomplete:', error);
    }
  };

  const updateCourseProgressByVideos = async (courseId: string) => {
    if (!user) return;

    try {
      // Get all videos for this course
      const { data: completedVideos } = await supabase
        .from('user_progress')
        .select('video_id')
        .eq('clerk_user_id', user.id)
        .eq('course_id', courseId)
        .eq('completed', true);

      // Calculate progress based on completed videos
      const totalVideosInCourse = await getTotalVideosForCourse(courseId);
      const completedCount = completedVideos?.length || 0;
      const progressPercentage = totalVideosInCourse > 0 ? Math.round((completedCount / totalVideosInCourse) * 100) : 0;

      console.log(`[useCourseProgress] Course ${courseId} progress: ${completedCount}/${totalVideosInCourse} = ${progressPercentage}%`);
      await updateCourseProgress(courseId, progressPercentage);
    } catch (error) {
      console.error('[useCourseProgress] Error updating course progress:', error);
    }
  };

  const getTotalVideosForCourse = (courseId: string) => {
    // This should match your course structure - adjust based on actual courses
    const courseTotalVideos: { [key: string]: number } = {
      '1': 8, // coding course has 8 videos
      '2': 2, // design course has 2 videos  
      '3': 2  // data course has 2 videos
    };
    return courseTotalVideos[courseId] || 0;
  };

  const updateCourseProgress = async (courseId: string, progressPercentage: number) => {
    if (!user) return;

    try {
      const updateData: any = {
        progress_percentage: progressPercentage,
        last_accessed_at: new Date().toISOString()
      };

      // Mark as completed if 100%
      if (progressPercentage >= 100) {
        updateData.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('user_course_enrollments')
        .update(updateData)
        .eq('clerk_user_id', user.id)
        .eq('course_id', courseId);

      if (error) {
        console.error('[useCourseProgress] Error updating course progress:', error);
        return;
      }

      // Update local state
      setCourseProgress(prev => 
        prev.map(course => 
          course.course_id === courseId 
            ? { 
                ...course, 
                progress_percentage: progressPercentage, 
                last_accessed_at: new Date().toISOString(),
                completed_at: progressPercentage >= 100 ? new Date().toISOString() : course.completed_at
              }
            : course
        )
      );
      console.log(`[useCourseProgress] Course ${courseId} progress updated to ${progressPercentage}%`);
    } catch (error) {
      console.error('[useCourseProgress] Error updating course progress:', error);
    }
  };

  const isVideoCompleted = (videoId: string, courseId?: string) => {
    return videoProgress.some(v => v.video_id === videoId && v.completed && (!courseId || v.course_id === courseId));
  };

  const getCompletedVideos = (courseId?: string) => {
    return videoProgress.filter(v => v.completed && (!courseId || v.course_id === courseId)).map(v => v.video_id);
  };

  return {
    courseProgress,
    videoProgress,
    loading,
    enrollInCourse,
    markVideoComplete,
    markVideoIncomplete,
    updateCourseProgress,
    isVideoCompleted,
    getCompletedVideos
  };
};
