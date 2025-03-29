
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';
import CourseModule, { CourseModuleProps } from '@/components/course/CourseModule';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlayCircle } from 'lucide-react';

// Mock data based on learning goals
const getCourseModules = (learningGoal: string) => {
  switch (learningGoal) {
    case 'coding':
      return [
        {
          id: 'module-1',
          title: 'Module 1: Basics of Web Development',
          subtitle: '(3 subtopics)',
          tags: ['Frontend'],
          subModules: [
            {
              id: 'sub-1',
              title: 'Introduction to HTML',
              videos: [
                {
                  id: 'video-1',
                  title: 'HTML Document Structure',
                  duration: '10:25',
                  videoUrl: 'https://example.com/videos/html-structure',
                },
                {
                  id: 'video-2',
                  title: 'Working with Tags and Elements',
                  duration: '15:40',
                  videoUrl: 'https://example.com/videos/html-tags',
                },
              ],
            },
            {
              id: 'sub-2',
              title: 'Introduction to CSS',
              videos: [
                {
                  id: 'video-3',
                  title: 'CSS Selectors and Properties',
                  duration: '12:15',
                  videoUrl: 'https://example.com/videos/css-selectors',
                },
                {
                  id: 'video-4',
                  title: 'Box Model and Layout',
                  duration: '14:30',
                  videoUrl: 'https://example.com/videos/css-boxmodel',
                },
              ],
            },
          ],
        },
        {
          id: 'module-2',
          title: 'Module 2: JavaScript Fundamentals',
          subtitle: '(4 subtopics)',
          tags: ['Frontend', 'Programming'],
          subModules: [
            {
              id: 'sub-3',
              title: 'JavaScript Basics',
              videos: [
                {
                  id: 'video-5',
                  title: 'Variables and Data Types',
                  duration: '11:05',
                  videoUrl: 'https://example.com/videos/js-datatypes',
                },
                {
                  id: 'video-6',
                  title: 'Functions and Scope',
                  duration: '16:20',
                  videoUrl: 'https://example.com/videos/js-functions',
                },
              ],
            },
            {
              id: 'sub-4',
              title: 'DOM Manipulation',
              videos: [
                {
                  id: 'video-7',
                  title: 'Selecting and Modifying Elements',
                  duration: '13:45',
                  videoUrl: 'https://example.com/videos/js-dom',
                },
                {
                  id: 'video-8',
                  title: 'Event Handling',
                  duration: '12:30',
                  videoUrl: 'https://example.com/videos/js-events',
                },
              ],
            },
          ],
        },
      ];
    case 'design':
      return [
        {
          id: 'module-1',
          title: 'Module 1: Principles of UI/UX Design',
          subtitle: '(3 subtopics)',
          tags: ['Design'],
          subModules: [
            {
              id: 'sub-1',
              title: 'Design Fundamentals',
              videos: [
                {
                  id: 'video-1',
                  title: 'Color Theory and Typography',
                  duration: '14:20',
                  videoUrl: 'https://example.com/videos/design-color',
                },
                {
                  id: 'video-2',
                  title: 'Layout and Composition',
                  duration: '16:15',
                  videoUrl: 'https://example.com/videos/design-layout',
                },
              ],
            },
          ],
        },
      ];
    case 'data':
      return [
        {
          id: 'module-1',
          title: 'Module 1: Basics of Data Science',
          subtitle: '(3 subtopics)',
          tags: ['Data Science'],
          subModules: [
            {
              id: 'sub-1',
              title: 'Introduction to Data Analysis',
              videos: [
                {
                  id: 'video-1',
                  title: 'Statistical Foundations',
                  duration: '18:10',
                  videoUrl: 'https://example.com/videos/stats-basics',
                },
                {
                  id: 'video-2',
                  title: 'Working with Pandas',
                  duration: '22:05',
                  videoUrl: 'https://example.com/videos/pandas-intro',
                },
              ],
            },
          ],
        },
      ];
    default:
      return [
        {
          id: 'module-1',
          title: 'Module 1: Getting Started',
          subtitle: '(3 subtopics)',
          tags: ['Basics'],
          subModules: [
            {
              id: 'sub-1',
              title: 'Introduction to Learning',
              videos: [
                {
                  id: 'video-1',
                  title: 'How to Learn Effectively',
                  duration: '10:30',
                  videoUrl: 'https://example.com/videos/effective-learning',
                },
                {
                  id: 'video-2',
                  title: 'Setting Goals and Objectives',
                  duration: '12:45',
                  videoUrl: 'https://example.com/videos/goal-setting',
                },
              ],
            },
          ],
        },
      ];
  }
};

const CourseDashboard = () => {
  const location = useLocation();
  const { learningGoal, experienceLevel } = location.state || {};
  
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>('');
  
  const modules = getCourseModules(learningGoal);
  
  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
    
    // Find the selected video to display its title
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
  
  const getCourseTitleByGoal = (goal: string) => {
    switch (goal) {
      case 'coding':
        return 'Web Development Fundamentals';
      case 'design':
        return 'UI/UX Design Essentials';
      case 'data':
        return 'Data Science and Analysis';
      case 'gaming':
        return 'Game Development Basics';
      case 'media':
        return 'Digital Media Production';
      case 'personal':
        return 'Personal Growth and Development';
      default:
        return 'Your Learning Path';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RouterHeader />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{getCourseTitleByGoal(learningGoal)}</h1>
            <p className="text-muted-foreground mt-2">
              Personalized learning path based on your interests and experience level
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card rounded-lg border shadow-sm p-4">
                <h2 className="text-lg font-medium mb-4">Course Modules</h2>
                <div className="space-y-1">
                  {modules.map((module, index) => (
                    <CourseModule 
                      key={module.id}
                      {...module}
                      expanded={index === 0}
                      onSelect={handleVideoSelect}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                {selectedVideoId ? (
                  <div>
                    <div className="aspect-video bg-black flex items-center justify-center">
                      <div className="text-center p-8">
                        <PlayCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                        <p className="text-white">{currentVideoTitle}</p>
                        <p className="text-gray-400 text-sm mt-2">Video player would be here</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-xl font-medium">{currentVideoTitle}</h2>
                      <p className="text-muted-foreground mt-2">
                        This is where video description and supplementary content would appear.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <PlayCircle className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Select a video to start learning</h3>
                    <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                      Choose a module and video from the course outline to begin your learning journey
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDashboard;
