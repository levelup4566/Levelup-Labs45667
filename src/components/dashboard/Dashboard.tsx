
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressCircle from '@/components/ui/ProgressCircle';
import SkillBadge from '@/components/ui/SkillBadge';
import { 
  BookOpen, 
  Star, 
  Award, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Zap, 
  User, 
  BarChart3, 
  CheckCircle2
} from 'lucide-react';
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
      {/* Dashboard Header with Gradient Background */}
      <div className="relative mb-8 p-6 rounded-xl overflow-hidden bg-gradient-to-r from-primary/80 to-accent/60 shadow-lg">
        <div className="absolute inset-0 bg-grid-white/[0.1] opacity-30"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Learning Dashboard</h1>
            <p className="text-white/90 mt-1">Track your progress and accelerate your learning journey</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 text-white">
              <Star className="h-4 w-4" />
              <span className="font-medium">1,240 points</span>
            </div>
            
            <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 text-white">
              <Award className="h-4 w-4" />
              <span className="font-medium">Level 4</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-secondary p-1 text-secondary-foreground mx-auto">
          <TabsTrigger value="overview" className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="courses" className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Courses
          </TabsTrigger>
          <TabsTrigger value="skills" className="inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            <Zap className="h-4 w-4 mr-2" />
            Skills
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Progress Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Overall Progress
                </CardTitle>
                <CardDescription>Your learning journey</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <ProgressCircle value={42} size={160} animate={true} />
              </CardContent>
            </Card>
            
            {/* Streak Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-500" />
                  Learning Streak
                </CardTitle>
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
            
            {/* Achievements Card */}
            <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>Your latest milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-secondary/50">
                      <div className="bg-secondary p-2 rounded-full">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-muted-foreground text-xs">{achievement.date}</div>
                      </div>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* In Progress Courses Section with Animated Cards */}
          <div className="grid grid-cols-1 gap-6">
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
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
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
        </TabsContent>
        
        <TabsContent value="skills">
          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                Your Skills
              </CardTitle>
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
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Recommended skills to develop
                </h3>
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
