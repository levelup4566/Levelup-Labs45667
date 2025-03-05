
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressCircle from '@/components/ui/ProgressCircle';
import SkillBadge from '@/components/ui/SkillBadge';
import { BookOpen, Star, Award, Clock, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

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
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Your Learning Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your progress and skills development</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="bg-primary/10 text-primary rounded-full p-1.5">
              <Star className="h-4 w-4" />
            </div>
            <span className="font-medium">1,240 points</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <div className="bg-accent/10 text-accent rounded-full p-1.5">
              <Award className="h-4 w-4" />
            </div>
            <span className="font-medium">Level 4</span>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overall Progress</CardTitle>
                <CardDescription>Your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <ProgressCircle value={42} size={160} animate={true} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Learning Streak</CardTitle>
                <CardDescription>Stay consistent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">7 days</div>
                    <div className="text-muted-foreground text-sm">Current streak</div>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div 
                      key={day} 
                      className={`aspect-square rounded-md flex items-center justify-center text-xs font-medium ${
                        day <= 5 ? 'bg-green-100 text-green-600' : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
                <CardDescription>Your latest milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-secondary p-2 rounded-full">
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-muted-foreground text-xs">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">In Progress Courses</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{course.title}</h3>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{course.completedModules} of {course.totalModules} modules</span>
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="grid gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="card-hover">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {course.completedModules} of {course.totalModules} modules completed
                      </CardDescription>
                    </div>
                    <ProgressCircle 
                      value={course.progress} 
                      size={60} 
                      animate={false}
                      strokeWidth={4}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-4 h-2" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Last accessed: {course.lastAccessed}</span>
                    <button className="text-primary hover:underline font-medium">Continue Learning</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>
                Skills you've developed through completed courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <SkillBadge
                    key={index}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Recommended skills to develop</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <SkillBadge name="Node.js" level={0} />
                  <SkillBadge name="TypeScript" level={0} />
                  <SkillBadge name="Git" level={0} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
