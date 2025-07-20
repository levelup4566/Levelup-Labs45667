import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RouterHeader from '@/components/layout/RouterHeader';

import CourseModule from '@/components/course/CourseModule';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, Users, Calendar, BarChart3, ArrowRight, PlayCircle, Check } from 'lucide-react';

interface GamingCourseProps {
  courseId: string;
  timeCommitment: string;
  experienceLevel: string;
}

const getGamingModules = (timeCommitment: string, experienceLevel: string) => {
  const baseModules = [
    {
      id: 'gm1',
      title: 'Module 1: Game Development Basics',
      subtitle: '(2 subtopics)',
      tags: ['Engines', 'Design'],
      subModules: [
        {
          id: 'gm1-1',
          title: 'Introduction to Game Engines',
          videos: [
            { id: 'vid1', title: 'What is a Game Engine?', duration: '10:00', videoUrl: '#' },
            { id: 'vid2', title: 'Unity vs Unreal vs Godot', duration: '12:00', videoUrl: '#' },
          ],
        },
        {
          id: 'gm1-2',
          title: 'Game Design Principles',
          videos: [
            { id: 'vid3', title: 'Core Game Loops', duration: '8:30', videoUrl: '#' },
            { id: 'vid4', title: 'Balancing Fun and Challenge', duration: '9:45', videoUrl: '#' },
          ],
        },
      ],
    },
    {
      id: 'gm2',
      title: 'Module 2: Building Your First Game',
      subtitle: '(2 subtopics)',
      tags: ['Prototyping', 'Publishing'],
      subModules: [
        {
          id: 'gm2-1',
          title: 'Prototyping',
          videos: [
            { id: 'vid5', title: 'Rapid Prototyping Techniques', duration: '11:00', videoUrl: '#' },
          ],
        },
        {
          id: 'gm2-2',
          title: 'Publishing Basics',
          videos: [
            { id: 'vid6', title: 'Exporting and Sharing Your Game', duration: '13:20', videoUrl: '#' },
          ],
        },
      ],
    },
  ];
  if (experienceLevel !== 'beginner') {
    baseModules.push({
      id: 'gm3',
      title: 'Module 3: Advanced Game Programming',
      subtitle: '(1 subtopic)',
      tags: ['Physics', 'Animation'],
      subModules: [
        {
          id: 'gm3-1',
          title: 'Physics & Animation',
          videos: [
            { id: 'vid7', title: 'Physics Engines', duration: '14:00', videoUrl: '#' },
            { id: 'vid8', title: 'Animating Characters', duration: '15:30', videoUrl: '#' },
          ],
        },
      ],
    });
  }
  if (timeCommitment === 'significant' || timeCommitment === 'intensive') {
    baseModules.push({
      id: 'gm4',
      title: 'Module 4: Multiplayer & Publishing',
      subtitle: '(2 subtopics)',
      tags: ['Multiplayer', 'Stores'],
      subModules: [
        {
          id: 'gm4-1',
          title: 'Multiplayer Game Basics',
          videos: [
            { id: 'vid9', title: 'Networking for Games', duration: '16:00', videoUrl: '#' },
          ],
        },
        {
          id: 'gm4-2',
          title: 'Publishing to Stores',
          videos: [
            { id: 'vid10', title: 'Releasing on Steam & Mobile', duration: '17:10', videoUrl: '#' },
          ],
        },
      ],
    });
  }
  return baseModules;
};

const GamingCourse = ({ courseId, timeCommitment, experienceLevel }: GamingCourseProps) => {
  const { markVideoComplete } = useCourseProgress();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>('');
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [completedProjects, setCompletedProjects] = useState<string[]>([]);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);

  const modules = getGamingModules(timeCommitment, experienceLevel);

  const totalVideos = modules.reduce((total, module) => {
    return total + module.subModules.reduce((subTotal, subModule) => {
      return subTotal + subModule.videos.length;
    }, 0);
  }, 0);

  const calculateOverallProgress = () => {
    if (!modules || modules.length === 0) return 0;
    let total = 0;
    modules.forEach(module => {
      module.subModules.forEach(subModule => {
        total += subModule.videos.length;
      });
    });
    return total > 0 ? Math.round((completedVideos.length / total) * 100) : 0;
  };

  const [overallProgress, setOverallProgress] = useState<number>(0);

  useEffect(() => {
    setOverallProgress(calculateOverallProgress());
  }, [completedVideos]);

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
    for (const module of modules) {
      for (const subModule of module.subModules) {
        const video = subModule.videos.find(v => v.id === videoId);
        if (video) {
          setCurrentVideoTitle(video.title);
          break;
        }
      }
    }
  };

  const handleToggleComplete = (videoId: string) => {
    setCompletedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        markVideoComplete(videoId, courseId, modules[currentModuleIndex]?.id || '');
        return [...prev, videoId];
      }
    });
    toast({
      title: completedVideos.includes(videoId) ? "Lesson marked as incomplete" : "Lesson completed!",
      description: completedVideos.includes(videoId) 
        ? "You can revisit this lesson anytime." 
        : "Great job! Keep up the good work.",
      variant: completedVideos.includes(videoId) ? "default" : "default",
    });
  };

  const getEstimatedTime = () => {
    switch (timeCommitment) {
      case 'minimal': return '6-8 weeks';
      case 'moderate': return '4-6 weeks';
      case 'significant': return '3-4 weeks';
      case 'intensive': return '2-3 weeks';
      default: return '4-6 weeks';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RouterHeader />
      <main className="flex-1 pt-24 pb-16 bg-gradient-to-b from-background to-background/80">
        <div className="bg-gradient-to-r from-primary/90 to-accent/80 text-white mb-8">
          <div className="container px-4 py-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    className="p-1.5 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </div>
                <h1 className="text-3xl font-bold">Game Development Path</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    {experienceLevel} level
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    {timeCommitment} pace
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    <Users className="mr-1 h-3 w-3" />
                    1,234 enrolled
                  </span>
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-xs font-semibold text-white">
                    <Calendar className="mr-1 h-3 w-3" />
                    {getEstimatedTime()}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{overallProgress}%</div>
                  <div className="text-xs text-white/80">Completed</div>
                </div>
                <div className="flex-1 max-w-[120px]">
                  <Progress value={overallProgress} className="h-2 bg-white/20" />
                  <div className="flex justify-between mt-1 text-xs text-white/80">
                    <span>Progress</span>
                    <span>{modules.length > 0 ? `${modules[0].id}/${modules.length}` : "0/0"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              
              <div className="bg-card rounded-lg border shadow-sm p-4 mb-4 sticky top-24">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Course Modules
                </h2>
                
                <div className="space-y-2">
                  {modules.map((module, index) => (
                    <CourseModule 
                      key={module.id}
                      {...module}
                      expanded={index === currentModuleIndex}
                      onSelect={handleVideoSelect}
                      completedVideos={completedVideos}
                      onToggleComplete={handleToggleComplete}
                    />
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <Button 
                    className="w-full gap-2"
                    onClick={() => {
                      if (!completedProjects.includes('certification')) {
                        setCompletedProjects(prev => [...prev, 'certification']);
                        // awardPoints(5 , "Completed certification exam")
                        toast({
                          title: "Project completed!",
                          description: "You earned a reward for completing the certification exam!",
                        });
                      }
                    }}
                  >
                    Certification Exam
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                {selectedVideoId ? (
                  <div>
                    <div className="aspect-video bg-black flex items-center justify-center relative group">
                      <div className="text-center p-8 z-10 relative">
                        <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4 cursor-pointer transition-transform group-hover:scale-110" />
                        <div className="backdrop-blur-sm bg-black/30 p-2 rounded-lg inline-block">
                          <p className="text-white">{currentVideoTitle}</p>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-medium">{currentVideoTitle}</h2>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant={completedVideos.includes(selectedVideoId) ? "default" : "outline"} 
                            size="sm" 
                            onClick={() => handleToggleComplete(selectedVideoId)}
                            className="gap-2"
                          >
                            <Check className="h-4 w-4" />
                            {completedVideos.includes(selectedVideoId) ? "Completed" : "Mark Complete"}
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground mt-2 mb-4">
                        This lesson is tailored for {experienceLevel} level learners with a {timeCommitment} time commitment.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>Select a lesson from the modules to get started!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default GamingCourse;
