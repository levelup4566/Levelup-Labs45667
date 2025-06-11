
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

export interface LearningStreak {
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
  streak_start_date: string | null;
}

export const useLearningStreak = () => {
  const { user } = useUser();
  const [streak, setStreak] = useState<LearningStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStreak = async () => {
      try {
        setLoading(true);

        const { data } = await supabase
          .from('learning_streaks')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();

        if (data) {
          setStreak({
            current_streak: data.current_streak,
            longest_streak: data.longest_streak,
            last_activity_date: data.last_activity_date,
            streak_start_date: data.streak_start_date
          });
        }
      } catch (error) {
        console.error('Error fetching learning streak:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStreak();
  }, [user]);

  const updateStreak = async () => {
    if (!user) return;

    try {
      await supabase.rpc('update_learning_streak', {
        user_id: user.id
      });

      // Refresh streak data
      const { data } = await supabase
        .from('learning_streaks')
        .select('*')
        .eq('clerk_user_id', user.id)
        .single();

      if (data) {
        setStreak({
          current_streak: data.current_streak,
          longest_streak: data.longest_streak,
          last_activity_date: data.last_activity_date,
          streak_start_date: data.streak_start_date
        });
      }
    } catch (error) {
      console.error('Error updating learning streak:', error);
    }
  };

  return {
    streak,
    loading,
    updateStreak
  };
};
