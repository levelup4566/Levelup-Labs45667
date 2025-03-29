
import React from 'react';
import { ChevronDown, ChevronRight, Play } from 'lucide-react';
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
};

const CourseModule = ({ 
  id, 
  title, 
  subtitle, 
  tags = [], 
  subModules, 
  expanded = false,
  onSelect 
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
                  {subModule.videos.map((video) => (
                    <Button
                      key={video.id}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto gap-2"
                      onClick={() => onSelect && onSelect(video.id)}
                    >
                      <Play className="w-4 h-4 text-blue-500" />
                      <div className="flex-1">
                        <p className="text-sm">{video.title}</p>
                        <p className="text-xs text-muted-foreground">{video.duration}</p>
                      </div>
                    </Button>
                  ))}
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
