import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, CheckCircle2, Zap } from 'lucide-react';
import ProgressCircle from '@/components/ui/ProgressCircle';

type Course = {
  id: number;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  lastAccessed: string;
};

interface CoursesListProps {
  courses: Course[];
  detailed?: boolean;
}

const CoursesList = ({ courses, detailed = false }: CoursesListProps) => {
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
                    {course.completedModules} of {course.totalModules} modules completed
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
                <button className="flex items-center gap-1 text-primary hover:text-primary/80 hover:underline font-medium transition-colors">
                  Continue Learning
                  <Zap className="h-3.5 w-3.5" />
                </button>
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
          {courses.map((course) => (
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
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {course.lastAccessed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesList;
