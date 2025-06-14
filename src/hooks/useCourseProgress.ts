import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@clerk/clerk-react';

export const useCourseProgress = () => {
  const { user } = useUser();
  const [courseProgress, setCourseProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    if (!user) return;
    setLoading(true);

    // Get all course enrollments (so dashboard shows any new course started)
    const { data, error } = await supabase
      .from('user_course_enrollments')
      .select('*')
      .eq('clerk_user_id', user.id)
      .order('last_accessed_at', { ascending: false });

    setCourseProgress(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, [user]);

  // Expose a manual refetch so dashboard/components can trigger update after changes
  return { courseProgress, loading, refetch: fetch };
};
