
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import { Star, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      lastAccessed: "2 days ago",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      progress: 30,
      totalModules: 20,
      completedModules: 6,
      lastAccessed: "1 week ago",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 90,
      totalModules: 10,
      completedModules: 9,
      lastAccessed: "Yesterday",
    }
  ];
  
  const skills = [
    { name: "HTML", level: 4 },
    { name: "CSS", level: 3 },
    { name: "JavaScript", level: 2 },
    { name: "React", level: 1 },
    { name: "Design", level: 3 },
    { name: "Data Analysis", level: 2 },
  ];
  
  const achievements = [
    { name: "Early Adopter", date: "Apr 12, 2023", icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { name: "Completed First Course", date: "Apr 20, 2023", icon: <Award className="h-5 w-5 text-primary" /> },
    { name: "5-Day Streak", date: "May 2, 2023", icon: <Calendar className="h-5 w-5 text-green-500" /> },
  ];
  
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

export default Dashboard;
