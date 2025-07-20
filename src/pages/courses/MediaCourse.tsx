import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { Progress } from '@/components/ui/progress';

interface MediaCourseProps {
  timeCommitment: string;
  experienceLevel: string;
}

const getMediaModules = (timeCommitment: string, experienceLevel: string) => {
  const baseModules = [
    {
      id: 'mm1',
      title: 'Module 1: Digital Media Fundamentals',
      subModules: [
        {
          id: 'mm1-1',
          title: 'Introduction to Digital Media',
          videos: [
            { id: 'vid1', title: 'What is Digital Media?' },
            { id: 'vid2', title: 'Types of Digital Content' },
          ],
        },
        {
          id: 'mm1-2',
          title: 'Media Tools Overview',
          videos: [
            { id: 'vid3', title: 'Video Editing Basics' },
            { id: 'vid4', title: 'Audio Production Essentials' },
          ],
        },
      ],
    },
    {
      id: 'mm2',
      title: 'Module 2: Content Creation & Publishing',
      subModules: [
        {
          id: 'mm2-1',
          title: 'Creating Engaging Content',
          videos: [
            { id: 'vid5', title: 'Storytelling for Media' },
          ],
        },
        {
          id: 'mm2-2',
          title: 'Publishing & Promotion',
          videos: [
            { id: 'vid6', title: 'Sharing Your Work Online' },
          ],
        },
      ],
    },
  ];
  if (experienceLevel !== 'beginner') {
    baseModules.push({
      id: 'mm3',
      title: 'Module 3: Advanced Media Production',
      subModules: [
        {
          id: 'mm3-1',
          title: 'Motion Graphics & Animation',
          videos: [
            { id: 'vid7', title: 'Intro to Motion Graphics' },
            { id: 'vid8', title: 'Animating for Social Media' },
          ],
        },
      ],
    });
  }
  if (timeCommitment === 'significant' || timeCommitment === 'intensive') {
    baseModules.push({
      id: 'mm4',
      title: 'Module 4: Media Business & Monetization',
      subModules: [
        {
          id: 'mm4-1',
          title: 'Freelancing & Agencies',
          videos: [
            { id: 'vid9', title: 'Building a Media Portfolio' },
          ],
        },
        {
          id: 'mm4-2',
          title: 'Monetizing Content',
          videos: [
            { id: 'vid10', title: 'Earning from Your Media Skills' },
          ],
        },
      ],
    });
  }
  return baseModules;
};

const MediaCourse = ({ timeCommitment, experienceLevel }: MediaCourseProps) => {
  const { markVideoComplete } = useCourseProgress();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState<number>(0);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);

  const modules = getMediaModules(timeCommitment, experienceLevel);

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
        markVideoComplete(videoId, 'media', modules[currentModuleIndex]?.id || '');
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
      <h1 className="text-3xl font-bold mb-4">Media Path: Digital Media Course</h1>
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

export default MediaCourse;
