
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

const SkillsCard = ({ skills }: SkillsCardProps) => {
  const { userStats } = useUserData();
  
  // Show user's actual skills from database, or default skills if none
  const displaySkills = skills.length > 0 ? skills : [
    { name: "HTML", level: 1 },
    { name: "CSS", level: 1 },
    { name: "JavaScript", level: 1 },
    { name: "React", level: 1 },
  ];

  const recommendedSkills = [
    { name: "Node.js", level: 0 },
    { name: "TypeScript", level: 0 },
    { name: "Git", level: 0 },
    { name: "Python", level: 0 }
  ];

  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-purple-500" />
          Your Skills
        </CardTitle>
        <CardDescription>
          Skills you've developed through completed courses - Level {userStats?.current_level || 1}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displaySkills.map((skill, index) => (
            <SkillBadge
              key={index}
              name={skill.name}
              level={skill.level}
            />
          ))}
        </div>
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Recommended skills to develop
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recommendedSkills.map((skill, index) => (
              <SkillBadge 
                key={index} 
                name={skill.name} 
                level={skill.level} 
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
