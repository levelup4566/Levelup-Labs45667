
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, BookOpen, Zap } from 'lucide-react';
import OverviewCards from './OverviewCards';
import CoursesList from './CoursesList';
import SkillsCard from './SkillsCard';

interface DashboardTabsProps {
  courses: any[];
  skills: any[];
  achievements: any[];
}

const DashboardTabs = ({ courses, skills, achievements }: DashboardTabsProps) => {
  return (
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
        <OverviewCards achievements={achievements} />
        <div className="grid grid-cols-1 gap-6">
          <CoursesList courses={courses} />
        </div>
      </TabsContent>
      
      <TabsContent value="courses">
        <CoursesList courses={courses} detailed={true} />
      </TabsContent>
      
      <TabsContent value="skills">
        <SkillsCard skills={skills} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
