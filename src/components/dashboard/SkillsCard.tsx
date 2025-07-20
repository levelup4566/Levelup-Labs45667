
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SkillBadge from '@/components/ui/SkillBadge';
import { Zap, User } from 'lucide-react';
import { useUserData } from '@/hooks/useUserData';

type Skill = {
  name: string;
  level: number;
};

interface SkillsCardProps {
  skills: Skill[];
}

interface SkillsCardProps {
  skills: { name: string; level: number }[];
  userStats?: { current_level?: number };
}

const SkillsCard = ({ skills, userStats }: SkillsCardProps) => {
  
  // Clean sweep: no user or recommended skills
  const displaySkills: { name: string; level: number }[] = [];
  const recommendedSkills: { name: string; level: number }[] = [];

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-500" />
          Your Skills
        </CardTitle>
        <CardDescription>
          Skills you've developed through completed courses - Level {(userStats && typeof userStats.current_level === 'number') ? userStats.current_level : 1}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12">
          <span className="text-muted-foreground text-center">
            No skills to display. Your skills section is currently empty.
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
