
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import { useUserData } from '@/hooks/useUserData';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Star, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const { userStats, userSkills, userBadges, loading: userLoading } = useUserData();
  const { courseProgress, loading: progressLoading } = useCourseProgress();

  if (!user || userLoading || progressLoading) {
    return (
      <div className="container px-4 py-8 max-w-6xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Convert database data to component format
  const courses = courseProgress.map(progress => ({
    id: parseInt(progress.course_id) || 1,
    title: getCourseTitle(progress.course_id),
    progress: progress.progress_percentage,
    totalModules: 12, // This could be fetched from courses table
    completedModules: Math.floor((progress.progress_percentage / 100) * 12),
    lastAccessed: formatLastAccessed(progress.last_accessed_at)
  }));

  const skills = userSkills.map(skill => ({
    name: skill.skill_name,
    level: skill.skill_level
  }));

  const achievements = userBadges.slice(0, 3).map(badge => ({
    name: badge.badge_name,
    date: new Date(badge.earned_at).toLocaleDateString(),
    icon: getIconComponent(badge.badge_icon)
  }));

  return (
    <div className="container px-4 py-8 max-w-6xl">
      <DashboardHeader />
      <DashboardTabs 
        courses={courses} 
        skills={skills} 
        achievements={achievements} 
      />
    </div>
  );
};

// Helper functions
const getCourseTitle = (courseId: string) => {
  const titleMap: { [key: string]: string } = {
    '1': 'Web Development Fundamentals',
    '2': 'UI/UX Design Essentials',
    '3': 'Data Science and Analysis'
  };
  return titleMap[courseId] || 'Unknown Course';
};

const formatLastAccessed = (dateString: string | null) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return date.toLocaleDateString();
};

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'star': <Star className="h-5 w-5 text-yellow-500" />,
    'award': <Award className="h-5 w-5 text-primary" />,
    'calendar': <Calendar className="h-5 w-5 text-green-500" />,
    'check-circle': <Award className="h-5 w-5 text-green-500" />
  };
  return iconMap[iconName] || <Star className="h-5 w-5 text-primary" />;
};

export default Dashboard;
