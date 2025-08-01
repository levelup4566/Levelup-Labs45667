import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  AlertCircle, 
  Clock, 
  BookOpen, 
  Check, 
  Youtube, 
  ArrowLeft,
  Users,
  Award,
  Star,
  Play,
  Code2,
  Palette,
  Brain,
  PlayCircle,
  ExternalLink
} from 'lucide-react';

// Import course data and types
import { htmlCssMastery } from '@/data/courses/htmlCssMastery';
import { timeCommitmentConfig } from '@/data/timeCommitment';
import { playlistsByTimeCommitment } from '@/data/courses/playlists';

// Import types
import type { 
  CourseData, 
  TimeCommitmentLevel, 
  ProgressFunctions, 
  ProgressRecord 
} from '@/types/course';

// Import hooks
import { useOnboardingData } from '@/hooks/useOnboardingData';

// Import progress components from their actual locations
import { 
  MinimalProgressCheck, 
  MinimalProgressDelete, 
  MinimalProgressInsert 
} from '@/components/database/progress/MinimalProgress';
import {
  ModerateProgressCheck,
  ModerateProgressDelete,
  ModerateProgressInsert
} from '@/components/database/progress/ModerateProgress';
import {
  SignificantProgressCheck,
  SignificantProgressDelete,
  SignificantProgressInsert
} from '@/components/database/progress/SignificantProgress';
import {
  IntensiveProgressCheck,
  IntensiveProgressDelete,
  IntensiveProgressInsert
} from '@/components/database/progress/IntensiveProgress';

// Map time commitment levels to their progress functions
const progressFunctions: Record<TimeCommitmentLevel, Omit<ProgressFunctions, 'getCompleted'>> = {
  minimal: {
    check: async (params: any) => {
      // MinimalProgressCheck expects (clerkUserId)
      const result = await MinimalProgressCheck(params.userId);
      return result || [];
    },
    delete: async (params: any) => {
      // MinimalProgressDelete expects (moduleId, clerkUserId, currentCourse, currentModule)
      await MinimalProgressDelete(
        params.moduleId,
        params.userId,
        params.currentCourse,
        params.currentModule
      );
    },
    insert: async (params: any) => {
      // MinimalProgressInsert expects (clerkUserId, learningGoal, currentCourse, currentModule, totalModulesInCourse, isCompleted, moduleId)
      await MinimalProgressInsert(
        params.userId,
        params.learningGoal,
        params.currentCourse,
        params.currentModule,
        params.totalModulesInCourse,
        params.isCompleted,
        params.moduleId
      );
    }
  },
  moderate: {
    check: async (params: any) => {
      // ModerateProgressCheck expects (clerkUserId)
      const result = await ModerateProgressCheck(params.userId);
      return result || [];
    },
    delete: async (params: any) => {
      // ModerateProgressDelete expects (moduleId, clerkUserId, currentCourse, currentModule)
      await ModerateProgressDelete(
        params.moduleId,
        params.userId,
        params.currentCourse,
        params.currentModule
      );
    },
    insert: async (params: any) => {
      // ModerateProgressInsert expects (clerkUserId, learningGoal, currentCourse, currentModule, totalModulesInCourse, isCompleted, moduleId)
      await ModerateProgressInsert(
        params.userId,
        params.learningGoal,
        params.currentCourse,
        params.currentModule,
        params.totalModulesInCourse,
        params.isCompleted,
        params.moduleId
      );
    }
  },
  significant: {
    check: async (params: any) => {
      // SignificantProgressCheck expects (clerkUserId)
      const result = await SignificantProgressCheck(params.userId);
      return result || [];
    },
    delete: async (params: any) => {
      // SignificantProgressDelete expects (moduleId, clerkUserId, currentCourse, currentModule)
      await SignificantProgressDelete(
        params.moduleId,
        params.userId,
        params.currentCourse,
        params.currentModule
      );
    },
    insert: async (params: any) => {
      // SignificantProgressInsert expects (clerkUserId, learningGoal, currentCourse, currentModule, totalModulesInCourse, isCompleted, moduleId)
      await SignificantProgressInsert(
        params.userId,
        params.learningGoal,
        params.currentCourse,
        params.currentModule,
        params.totalModulesInCourse,
        params.isCompleted,
        params.moduleId
      );
    }
  },
  intensive: {
    check: async (params: any) => {
      // IntensiveProgressCheck expects (clerkUserId)
      const result = await IntensiveProgressCheck(params.userId);
      return result || [];
    },
    delete: async (params: any) => {
      // IntensiveProgressDelete expects (moduleId, clerkUserId, currentCourse, currentModule)
      await IntensiveProgressDelete(
        params.moduleId,
        params.userId,
        params.currentCourse,
        params.currentModule
      );
    },
    insert: async (params: any) => {
      // IntensiveProgressInsert expects (clerkUserId, learningGoal, currentCourse, currentModule, totalModulesInCourse, isCompleted, moduleId)
      await IntensiveProgressInsert(
        params.userId,
        params.learningGoal,
        params.currentCourse,
        params.currentModule,
        params.totalModulesInCourse,
        params.isCompleted,
        params.moduleId
      );
    }
  },
};

// Course data mapping
const courseDataMap: Record<string, CourseData> = {
  'html-css-mastery': htmlCssMastery,
  // Add other courses here when they're created
};

export const CourseDetailNew: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useUser();
  const { data: onboardingData } = useOnboardingData();
  
  // Get time commitment from URL or default to 'moderate'
  const timeCommitment = (new URLSearchParams(location.search).get('timeCommitment') || 'moderate') as TimeCommitmentLevel;
  
  const [course, setCourse] = useState<CourseData | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get the current time commitment configuration
  const commitmentConfig = timeCommitmentConfig[timeCommitment];
  
  // Get the progress functions for the current time commitment
  const progressFunctionsForCommitment = progressFunctions[timeCommitment];

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        if (!courseId) {
          throw new Error('No course ID provided');
        }

        // Get course data from our mapping
        const courseData = courseDataMap[courseId];
        if (!courseData) {
          throw new Error('Course not found');
        }

        // Update module URLs based on time commitment
        const updatedModules = courseData.modules.map(module => {
          const playlistUrl = playlistsByTimeCommitment[timeCommitment]?.[courseId]?.[module.title];
          return {
            ...module,
            playlistUrl: playlistUrl || module.playlistUrl
          };
        });

        setCourse({
          ...courseData,
          modules: updatedModules
        });

        // TODO: Fetch user's completed modules from the database
        // This is a placeholder - replace with actual implementation
        // const completed = await fetchCompletedModules(user.id, courseId);
        // setCompletedModules(new Set(completed));
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, timeCommitment, user?.id]);

  const toggleModuleCompletion = async (moduleId: number) => {
    if (!user || !courseId || !course) return;

    try {
      const isCurrentlyCompleted = completedModules.has(moduleId);
      const newCompletedModules = new Set(completedModules);
      const currentModule = course.modules.find(m => m.id === moduleId);
      
      // Prepare common parameters
      const currentModuleTitle = currentModule?.title || `Module ${moduleId}`;
      const courseTitle = course.title || courseId;
      const learningGoal = onboardingData?.learning_goal || '';
      
      if (isCurrentlyCompleted) {
        // Delete the progress record for this module
        await progressFunctionsForCommitment.delete({
          moduleId,
          userId: user.id,
          currentCourse: courseTitle,
          currentModule: currentModuleTitle
        });
        newCompletedModules.delete(moduleId);
      } else {
        try {
          // First check if we have an existing progress record
          const existingProgress = await progressFunctionsForCommitment.check({ userId: user.id });
          
          if (existingProgress && existingProgress.length > 0) {
            // Update existing record
            await progressFunctionsForCommitment.insert({
              userId: user.id,
              learningGoal,
              currentCourse: courseTitle,
              currentModule: currentModuleTitle,
              totalModulesInCourse: course.totalModules,
              isCompleted: true,
              moduleId
            });
          } else {
            // Create new record
            await progressFunctionsForCommitment.insert({
              userId: user.id,
              learningGoal,
              currentCourse: courseTitle,
              currentModule: currentModuleTitle,
              totalModulesInCourse: course.totalModules,
              isCompleted: true,
              moduleId
            });
          }
          newCompletedModules.add(moduleId);
        } catch (error) {
          console.error('Error updating progress:', error);
          throw error; // Re-throw the error to be caught by the outer catch
        }
      }
      
      // Update the UI state
      setCompletedModules(newCompletedModules);
      
    } catch (error) {
      console.error('Error in toggleModuleCompletion:', error);
      // Show error to user (using console.error since toast is a stub)
      console.error('Failed to update module progress. Please try again.');
      // Revert the UI state on error
      setCompletedModules(new Set(completedModules));
    }
  };

  if (loading) {
    return <div>Loading course data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  // Calculate progress percentage
  const progress = course.modules.length > 0 
    ? Math.round((completedModules.size / course.modules.length) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Course Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground mt-2">{course.description}</p>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {course.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <BookOpen className="mr-1 h-4 w-4" />
              {course.modules.length} modules
            </div>
            <Badge variant="secondary">{course.level}</Badge>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Badge variant="outline" className={`bg-${commitmentConfig.bgColor} border-${commitmentConfig.badge.color}-200`}>
            {commitmentConfig.name}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Course Progress</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Course Modules */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Course Modules</h2>
        {course.modules.map((module) => {
          const isCompleted = completedModules.has(module.id);
          
          return (
            <Card key={module.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{module.duration}</span>
                    <Button
                      variant={isCompleted ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleModuleCompletion(module.id)}
                      className="h-8 w-8 p-0 rounded-full"
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {module.topics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                {module.playlistUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => window.open(module.playlistUrl, '_blank')}
                  >
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch on YouTube
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetailNew;
