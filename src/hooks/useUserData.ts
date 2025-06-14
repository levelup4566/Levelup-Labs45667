import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';

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
  const { user } = require('@clerk/clerk-react').useUser(); // dynamic import to always stay fresh after signup
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let didCancel = false;
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Always reinitialize user if data missing or on fresh login
        await supabase.rpc('initialize_new_user', { user_id: user.id });

        // Fetch user stats
        const { data: stats, error: statsError } = await supabase
          .from('user_stats')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();

        if (statsError) {
          console.error('Error fetching user stats:', statsError);
        } else if (stats) {
          setUserStats(stats);
        }

        // Fetch user profile
        const { data: profile, error: profileError } = await supabase
          .from('user_profiles')
          .select('learning_goal, experience_level, time_commitment')
          .eq('clerk_user_id', user.id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
        } else if (profile) {
          setUserProfile(profile);
        }

        // Fetch user skills
        const { data: skills, error: skillsError } = await supabase
          .from('user_skills')
          .select('skill_name, skill_level, skill_points')
          .eq('clerk_user_id', user.id);

        if (skillsError) {
          console.error('Error fetching user skills:', skillsError);
        } else if (skills) {
          setUserSkills(skills);
        }

        // Fetch user badges
        const { data: badges, error: badgesError } = await supabase
          .from('user_badges')
          .select('badge_name, badge_description, badge_icon, badge_color, earned_at')
          .eq('clerk_user_id', user.id)
          .order('earned_at', { ascending: false });

        if (badgesError) {
          console.error('Error fetching user badges:', badgesError);
        } else if (badges) {
          setUserBadges(badges);
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        if (!didCancel) setLoading(false);
      }
    };

    fetchUserData();
    return () => { didCancel = true; }
  }, [user]);

  const awardPoints = async (points: number, description?: string) => {
    if (!user) return;

    try {
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

      if (stats) setUserStats(stats);
    } catch (error) {
      console.error('Error awarding points:', error);
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(profileData)
        .eq('clerk_user_id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        return;
      }

      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const completeOnboarding = async (learningGoal: string, experienceLevel: string, timeCommitment: string) => {
    if (!user) return;

    try {
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

      if (stats) setUserStats(stats);
    } catch (error) {
      console.error('Error completing onboarding:', error);
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
