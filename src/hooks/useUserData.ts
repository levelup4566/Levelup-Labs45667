
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useSupabaseClient } from '@/integrations/supabase/client';

export interface UserStats {
  total_skill_points: number;
  current_level: number;
  experience_points: number;
  points_to_next_level: number;
  courses_completed: number;
  videos_watched: number;
  total_study_time_minutes: number;
  is_new_user: boolean;
  login_streak_days: number;
}

export interface UserProfile {
  learning_goal: string;
  experience_level: string;
  time_commitment: string;
}

export interface UserSkill {
  skill_name: string;
  skill_level: number;
  skill_points: number;
}

export interface UserBadge {
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  badge_color: string;
  earned_at: string;
}

export const useUserData = () => {
  const { user } = useUser();
  const supabase = useSupabaseClient();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);

        console.log('[useUserData] Initializing user for:', user.id);
        // Initialize user if they don't exist
        await supabase.rpc('initialize_new_user', { 
          user_id: user.id 
        });

        // Fetch user stats
        const { data: stats, error: statsError } = await supabase
          .from('user_stats')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();

        if (statsError) {
          console.error('[useUserData] Error fetching user stats:', statsError);
        } else if (stats) {
          console.log('[useUserData] User stats fetched:', stats);
          setUserStats(stats);
        }

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('learning_goal, experience_level, time_commitment')
          .eq('clerk_user_id', user.id)
          .single();

        if (profileError) {
          console.error('[useUserData] Error fetching user profile:', profileError);
        } else if (profile) {
          console.log('[useUserData] User profile fetched:', profile);
          setUserProfile(profile);
        }

        // Fetch user skills
        const { data: skills, error: skillsError } = await supabase
          .from('user_skills')
          .select('skill_name, skill_level, skill_points')
          .eq('clerk_user_id', user.id);

        if (skillsError) {
          console.error('[useUserData] Error fetching user skills:', skillsError);
        } else if (skills) {
          console.log('[useUserData] User skills fetched:', skills);
          setUserSkills(skills);
        }

        // Fetch user badges
        const { data: badges, error: badgesError } = await supabase
          .from('user_badges')
          .select('badge_name, badge_description, badge_icon, badge_color, earned_at')
          .eq('clerk_user_id', user.id)
          .order('earned_at', { ascending: false });

        if (badgesError) {
          console.error('[useUserData] Error fetching user badges:', badgesError);
        } else if (badges) {
          console.log('[useUserData] User badges fetched:', badges);
          setUserBadges(badges);
        }

      } catch (error) {
        console.error('[useUserData] Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, supabase]);

  const awardPoints = async (points: number, description?: string) => {
    if (!user) return;

    try {
      console.log(`[useUserData] Awarding ${points} points for:`, description);
      await supabase.rpc('award_points', {
        user_id: user.id,
        points: points,
        activity_desc: description
      });

      // Refresh user stats
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('clerk_user_id', user.id)
        .single();

      if (stats) {
        console.log('[useUserData] Stats updated after points awarded:', stats);
        setUserStats(stats);
      }
    } catch (error) {
      console.error('[useUserData] Error awarding points:', error);
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;

    try {
      console.log('[useUserData] Updating user profile:', profileData);
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('clerk_user_id', user.id);

      if (error) {
        console.error('[useUserData] Error updating profile:', error);
        return;
      }

      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      console.log('[useUserData] Profile updated successfully');
    } catch (error) {
      console.error('[useUserData] Error updating profile:', error);
    }
  };

  const completeOnboarding = async (learningGoal: string, experienceLevel: string, timeCommitment: string) => {
    if (!user) return;

    try {
      console.log('[useUserData] Completing onboarding for user:', user.id);
      await supabase.rpc('complete_onboarding', {
        user_id: user.id,
        learning_goal: learningGoal,
        experience_level: experienceLevel,
        time_commitment: timeCommitment
      });

      // Refresh user data
      setUserProfile({
        learning_goal: learningGoal,
        experience_level: experienceLevel,
        time_commitment: timeCommitment
      });

      // Refresh stats to reflect new user status
      const { data: stats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('clerk_user_id', user.id)
        .single();

      if (stats) {
        console.log('[useUserData] Stats updated after onboarding:', stats);
        setUserStats(stats);
      }
    } catch (error) {
      console.error('[useUserData] Error completing onboarding:', error);
    }
  };

  return {
    userStats,
    userProfile,
    userSkills,
    userBadges,
    loading,
    awardPoints,
    updateUserProfile,
    completeOnboarding
  };
};
