
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, CheckCircle2, Zap, Play } from 'lucide-react';
import ProgressCircle from '@/components/ui/ProgressCircle';

type Course = {
  id: number;
  courseId?: string;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  lastAccessed: string;
  learning_goal?: string;
  time_commitment?: string;
  experience_level?: string;
};

interface CoursesListProps {
  courses: Course[];
  detailed?: boolean;
  userProfile?: any; // Accept userProfile for deep linking
}

const CoursesList = ({ courses, detailed = false, userProfile }: CoursesListProps) => {
  const navigate = useNavigate();
  console.log("here is the course" , courses)
  const handleContinueCourse = (course: Course) => {
    if (course.courseId && course.learning_goal && course.time_commitment && course.experience_level) {
      const path = `/courses/${course.learning_goal}/${course.time_commitment}/${course.experience_level}`;
      console.log('Navigating to:', path);
      navigate(path);
    }
  };

  if (detailed) {
    return (
      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="h-1 bg-gradient-to-r from-primary/70 to-accent/70"></div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {course.completedModules} of {course.totalModules} modules completed<br/>
                    <span>Path: {course.time_commitment} / {course.experience_level}</span>
                  </CardDescription>
                </div>
                <div className="relative">
                  <ProgressCircle 
                    value={course.progress} 
                    size={60} 
                    animate={false}
                    strokeWidth={4}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                    {course.progress}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={course.progress} className="mb-4 h-2" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {course.lastAccessed}
                </span>
                <Button 
                  variant="default"
                  size="sm"
                  onClick={() => handleContinueCourse(course)}
                  className="flex items-center gap-1"
                >
                  <Play className="h-3.5 w-3.5" />
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-1 bg-gradient-to-r from-primary to-accent"></div>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          In Progress Courses
        </CardTitle>
        <CardDescription>Continue where you left off</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No courses in progress yet</p>
              <Button onClick={() => navigate('/onboarding')}>
                Start Your First Course
              </Button>
            </div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="p-3 rounded-xl hover:bg-secondary/50 transition-colors duration-200">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{course.title}</h3>
                  <span className="text-sm font-semibold text-primary">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 mt-2 bg-secondary" />
                <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {course.completedModules} of {course.totalModules} modules
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleContinueCourse(course)}
                    className="h-auto p-1 text-primary hover:text-primary/80"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesList;
