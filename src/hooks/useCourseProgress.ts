import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@clerk/clerk-react';

/**
 * Custom hook to track course progress and expose course actions.
 */
export const useCourseProgress = () => {
  const { user } = useUser();
  const [courseProgress, setCourseProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProgressRows, setUserProgressRows] = useState<any[]>([]);

  // --- Existing fetch for overall course progress ---
  const fetch = async () => {
    if (!user) return;
    setLoading(true);

    // Get all course enrollments
    const { data, error } = await supabase
      .from('user_course_enrollments')
      .select('*')
      .eq('clerk_user_id', user.id)
      .order('last_accessed_at', { ascending: false });

    setCourseProgress(data || []);

    // Fetch user_progress records for video completion
    const { data: progressRows, error: progressError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('clerk_user_id', user.id);

    setUserProgressRows(progressRows || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // --- Helper methods ---

  // Mark a video as completed for the user
  const markVideoComplete = async (videoId: string, courseId: string, moduleId: string) => {
    if (!user) return;
    // Mark as completed or uncompleted based on existing status
    const { data: existing, error: existingError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('clerk_user_id', user.id)
      .eq('video_id', videoId)
      .maybeSingle();

    if (existing) {
      // Toggle complete: if already complete, set to false; if not, set to true
      const isCurrentlyComplete = !!existing.completed;
      await supabase
        .from('user_progress')
        .update({
          completed: !isCurrentlyComplete,
          completed_at: !isCurrentlyComplete ? new Date().toISOString() : null,
        })
        .eq('id', existing.id);
    } else {
      // Insert new row for marking as complete
      await supabase
        .from('user_progress')
        .insert({
          clerk_user_id: user.id,
          video_id: videoId,
          course_id: courseId,
          module_id: moduleId,
          completed: true,
          completed_at: new Date().toISOString(),
        });
    }
    await fetch();
  };

  // Enroll user in the course if not already
  const enrollInCourse = async (courseId: string) => {
    if (!user || !courseId) return;
    // Check if already enrolled
    const { data, error } = await supabase
      .from('user_course_enrollments')
      .select('*')
      .eq('clerk_user_id', user.id)
      .eq('course_id', courseId)
      .maybeSingle();

    if (!data) {
      await supabase
        .from('user_course_enrollments')
        .insert({
          clerk_user_id: user.id,
          course_id: courseId, // FIX: Assign courseId argument to course_id column
          started_at: new Date().toISOString(),
          progress_percentage: 0,
        });
    }
    await fetch();
  };

  // Get completed video IDs for the user
  const getCompletedVideos = () => {
    return userProgressRows
      .filter((row: any) => row.completed)
      .map((row: any) => row.video_id);
  };

  // Check whether the current video is completed
  const isVideoCompleted = (videoId: string) => {
    return userProgressRows.some((row: any) => row.video_id === videoId && row.completed);
  };

  // Always expose a manual refetch
  return {
    courseProgress,
    loading,
    refetch: fetch,
    markVideoComplete,
    enrollInCourse,
    getCompletedVideos,
    isVideoCompleted,
  };
};
