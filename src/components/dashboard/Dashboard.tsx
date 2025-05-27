
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import { useNavigate } from 'react-router-dom';
import { Star, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      lastAccessed: "2 days ago",
      route: "/courses/web-development"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      progress: 30,
      totalModules: 20,
      completedModules: 6,
      lastAccessed: "1 week ago",
      route: "/courses/data-science"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      progress: 90,
      totalModules: 10,
      completedModules: 9,
      lastAccessed: "Yesterday",
      route: "/courses/design"
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

  const availableCourses = [
    {
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, JavaScript, and React",
      duration: "20 hours",
      level: "Beginner to Intermediate",
      route: "/courses/web-development"
    },
    {
      title: "UI/UX Design Essentials",
      description: "Master design principles and user experience",
      duration: "15 hours",
      level: "Beginner",
      route: "/courses/design"
    },
    {
      title: "Data Science & Analytics",
      description: "Explore data analysis and machine learning",
      duration: "25 hours",
      level: "Intermediate",
      route: "/courses/data-science"
    }
  ];
  
  return (
    <div className="container px-4 py-8 max-w-6xl">
      <DashboardHeader />
      
      {/* Available Courses Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableCourses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{course.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Level:</span>
                    <span>{course.level}</span>
                  </div>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate(course.route)}
                >
                  View Course
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <DashboardTabs 
        courses={courses} 
        skills={skills} 
        achievements={achievements} 
      />
    </div>
  );
};

export default Dashboard;
