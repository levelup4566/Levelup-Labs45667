
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import SkillsCard from './SkillsCard';
import { PlayCircle, Calendar, Trophy } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  lastAccessed: string;
  route?: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Achievement {
  name: string;
  date: string;
  icon: React.ReactNode;
}

interface DashboardTabsProps {
  courses: Course[];
  skills: Skill[];
  achievements: Achievement[];
}

const DashboardTabs = ({ courses, skills, achievements }: DashboardTabsProps) => {
  const navigate = useNavigate();

  return (
    <Tabs defaultValue="courses" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="courses">My Courses</TabsTrigger>
        <TabsTrigger value="skills">Skills</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
      
      <TabsContent value="courses" className="space-y-4">
        <div className="grid gap-4">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{course.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => course.route && navigate(course.route)}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">
                      {course.completedModules} of {course.totalModules} modules completed
                    </span>
                    <span className="flex items-center text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {course.lastAccessed}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="skills" className="space-y-4">
        <SkillsCard skills={skills} />
      </TabsContent>
      
      <TabsContent value="achievements" className="space-y-4">
        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{achievement.name}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.date}</p>
                </div>
                <Trophy className="h-5 w-5 text-yellow-500" />
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
