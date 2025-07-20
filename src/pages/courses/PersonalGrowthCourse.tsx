import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCourseProgress } from '@/hooks/useCourseProgress';

interface PersonalGrowthCourseProps {
  timeCommitment: string;
  experienceLevel: string;
}

const getPersonalGrowthModules = (timeCommitment: string, experienceLevel: string) => {
  const baseModules = [
    {
      id: 'pg1',
      title: 'Module 1: Foundations of Personal Growth',
      subModules: [
        {
          id: 'pg1-1',
          title: 'Self-Awareness & Mindset',
          videos: [
            { id: 'vid1', title: 'Understanding Yourself' },
            { id: 'vid2', title: 'Growth vs Fixed Mindset' },
          ],
        },
        {
          id: 'pg1-2',
          title: 'Goal Setting',
          videos: [
            { id: 'vid3', title: 'Setting SMART Goals' },
          ],
        },
      ],
    },
    {
      id: 'pg2',
      title: 'Module 2: Building Positive Habits',
      subModules: [
        {
          id: 'pg2-1',
          title: 'Productivity & Focus',
          videos: [
            { id: 'vid4', title: 'Time Management Strategies' },
          ],
        },
        {
          id: 'pg2-2',
          title: 'Wellness & Balance',
          videos: [
            { id: 'vid5', title: 'Maintaining Work-Life Balance' },
          ],
        },
      ],
    },
  ];
  if (experienceLevel !== 'beginner') {
    baseModules.push({
      id: 'pg3',
      title: 'Module 3: Advanced Self-Development',
      subModules: [
        {
          id: 'pg3-1',
          title: 'Emotional Intelligence',
          videos: [
            { id: 'vid6', title: 'Understanding Emotions' },
            { id: 'vid7', title: 'Empathy & Relationships' },
          ],
        },
      ],
    });
  }
  if (timeCommitment === 'significant' || timeCommitment === 'intensive') {
    baseModules.push({
      id: 'pg4',
      title: 'Module 4: Leadership & Growth',
      subModules: [
        {
          id: 'pg4-1',
          title: 'Leadership Skills',
          videos: [
            { id: 'vid8', title: 'Becoming a Leader' },
          ],
        },
        {
          id: 'pg4-2',
          title: 'Continuous Learning',
          videos: [
            { id: 'vid9', title: 'Lifelong Learning Strategies' },
          ],
        },
      ],
    });
  }
  return baseModules;
};

const PersonalGrowthCourse = ({ timeCommitment, experienceLevel }: PersonalGrowthCourseProps) => {
  const { markVideoComplete } = useCourseProgress();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const modules = getPersonalGrowthModules(timeCommitment, experienceLevel);

  // Calculate total videos
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
  };

  const handleToggleComplete = (videoId: string) => {
    setCompletedVideos(prev => {
      if (prev.includes(videoId)) {
        return prev.filter(id => id !== videoId);
      } else {
        markVideoComplete(videoId, 'personal', modules[currentModuleIndex]?.id || '');
        toast({
          title: 'Lesson completed!',
          description: 'Great job! You finished a lesson.',
        });
        return [...prev, videoId];
      }
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Personal Growth Path: Self-Development Course</h1>
      <Progress value={overallProgress} className="mb-4" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Modules</h2>
        <ul className="list-disc ml-6">
          {modules.map((module, idx) => (
            <li key={module.id} className={idx === currentModuleIndex ? 'font-bold' : ''}>
              <button onClick={() => setCurrentModuleIndex(idx)}>{module.title}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{modules[currentModuleIndex].title}</h3>
        {modules[currentModuleIndex].subModules.map((sub) => (
          <div key={sub.id} className="mb-4">
            <h4 className="font-medium">{sub.title}</h4>
            <ul className="list-disc ml-6">
              {sub.videos.map((video) => (
                <li key={video.id}>
                  <button
                    className={selectedVideoId === video.id ? 'underline' : ''}
                    onClick={() => handleVideoSelect(video.id)}
                  >
                    {video.title}
                  </button>
                  <button
                    className="ml-2 text-xs text-green-600"
                    onClick={() => handleToggleComplete(video.id)}
                  >
                    {completedVideos.includes(video.id) ? '✓ Completed' : 'Mark Complete'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {selectedVideoId && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h4 className="font-semibold mb-2">Video Player (Mockup)</h4>
          <p>Now playing: {modules
            .flatMap((m) => m.subModules)
            .flatMap((s) => s.videos)
            .find((v) => v.id === selectedVideoId)?.title || ''}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalGrowthCourse;
