
import React from 'react';
import { ChevronDown, ChevronRight, Play, Check } from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type ModuleVideo = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed?: boolean;
};

export type CourseSubModule = {
  id: string;
  title: string;
  videos: ModuleVideo[];
};

export type CourseModuleProps = {
  id: string;
  title: string;
  subtitle?: string;
  tags?: string[];
  subModules: CourseSubModule[];
  expanded?: boolean;
  onSelect?: (videoId: string) => void;
  completedVideos?: string[];
  onToggleComplete?: (videoId: string) => void;
};

const CourseModule = ({ 
  id, 
  title, 
  subtitle, 
  tags = [], 
  subModules, 
  expanded = false,
  onSelect,
  completedVideos = [],
  onToggleComplete
}: CourseModuleProps) => {
  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={expanded ? id : undefined}
      className="border-b"
    >
      <AccordionItem value={id} className="border-0">
        <AccordionTrigger className="py-4 px-2 hover:no-underline">
          <div className="flex items-center gap-2 text-left">
            <div>
              <h3 className="font-medium text-base">{title}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="py-2 space-y-1">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {subModules.map((subModule) => (
              <div key={subModule.id} className="mb-6 last:mb-0">
                <h4 className="font-medium text-sm mb-2">{subModule.title}</h4>
                <div className="space-y-2">
                  {subModule.videos.map((video) => {
                    const isCompleted = completedVideos.includes(video.id);
                    return (
                      <div key={video.id} className="flex items-center">
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-left p-2 h-auto gap-2 ${isCompleted ? 'text-muted-foreground' : ''}`}
                          onClick={() => onSelect && onSelect(video.id)}
                        >
                          {isCompleted ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Play className="w-4 h-4 text-blue-500" />
                          )}
                          <div className="flex-1">
                            <p className={`text-sm ${isCompleted ? 'line-through' : ''}`}>
                              {video.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{video.duration}</p>
                          </div>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onToggleComplete && onToggleComplete(video.id)}
                        >
                          <Check className={`h-4 w-4 ${isCompleted ? 'text-green-600' : 'text-gray-300'}`} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CourseModule;
