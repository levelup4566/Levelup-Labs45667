
import React from 'react';
import { Star, Trophy, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SkillPointsProps {
  completedVideos: string[];
  completedProjects?: string[];
  totalVideos: number;
  totalProjects?: number;
}

const SkillPoints = ({ 
  completedVideos, 
  completedProjects = [], 
  totalVideos,
  totalProjects = 1 
}: SkillPointsProps) => {
  const videoPoints = completedVideos.length * 1;
  const projectPoints = completedProjects.length * 5;
  const totalPoints = videoPoints + projectPoints;
  const maxPossiblePoints = (totalVideos * 1) + (totalProjects * 5);
  
  const getSkillLevel = (points: number) => {
    if (points >= 50) return { level: 'Expert', color: 'bg-purple-500', icon: <Trophy className="h-4 w-4" /> };
    if (points >= 30) return { level: 'Advanced', color: 'bg-blue-500', icon: <Target className="h-4 w-4" /> };
    if (points >= 15) return { level: 'Intermediate', color: 'bg-green-500', icon: <Star className="h-4 w-4" /> };
    if (points >= 5) return { level: 'Beginner', color: 'bg-yellow-500', icon: <Star className="h-4 w-4" /> };
    return { level: 'Novice', color: 'bg-gray-500', icon: <Star className="h-4 w-4" /> };
  };
  
  const skillLevel = getSkillLevel(totalPoints);
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Skill Points
          </h3>
          <Badge variant="secondary" className={`${skillLevel.color} text-white flex items-center gap-1`}>
            {skillLevel.icon}
            {skillLevel.level}
          </Badge>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{totalPoints}</span>
            <span className="text-sm text-muted-foreground">/ {maxPossiblePoints} points</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Videos:</span>
              <span className="font-medium">{completedVideos.length} × 1pt = {videoPoints}pts</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Projects:</span>
              <span className="font-medium">{completedProjects.length} × 5pts = {projectPoints}pts</span>
            </div>
          </div>
          
          <div className="w-full bg-secondary/30 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((totalPoints / maxPossiblePoints) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillPoints;
