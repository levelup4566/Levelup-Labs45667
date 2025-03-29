
import React from 'react';
import { useOnboarding } from './OnboardingLayout';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Baby, User, Sparkles, Award } from 'lucide-react';

const experienceLevels = [
  { 
    id: 'beginner', 
    title: 'Complete Beginner', 
    description: "I'm just starting out and have little to no experience",
    icon: Baby
  },
  { 
    id: 'novice', 
    title: 'Novice', 
    description: "I've tried a few things but still need lots of guidance",
    icon: User
  },
  { 
    id: 'intermediate', 
    title: 'Intermediate', 
    description: 'I have some experience and can build things with guidance',
    icon: Sparkles
  },
  { 
    id: 'advanced', 
    title: 'Advanced', 
    description: 'I have substantial experience and looking to level up further',
    icon: Award
  },
];

const OnboardingExperience = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  return (
    <div className="space-y-6">
      <p className="text-lg">
        What's your current experience level in your chosen field?
      </p>
      
      <RadioGroup
        value={onboardingData.experienceLevel || ''}
        onValueChange={(value) => updateOnboardingData('experienceLevel', value)}
        className="grid grid-cols-1 gap-4"
      >
        {experienceLevels.map((level) => {
          const Icon = level.icon;
          return (
            <div key={level.id} className="relative">
              <RadioGroupItem
                value={level.id}
                id={level.id}
                className="absolute top-4 left-4 peer sr-only"
              />
              <Label
                htmlFor={level.id}
                className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
              >
                <Card className="cursor-pointer p-6 border hover:border-primary hover:shadow-md transition-all flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{level.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                  </div>
                </Card>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default OnboardingExperience;
