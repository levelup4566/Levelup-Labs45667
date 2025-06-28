
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
        onValueChange={(value) => updateOnboardingData('experience_level', value)}
        className="grid grid-cols-1 gap-4"
      >
        {experienceLevels.map((level) => {
          const Icon = level.icon;
          const isSelected = onboardingData.experience_level === level.id;
          return (
            <div key={level.id} className="relative">
              <RadioGroupItem
                value={level.id}
                id={level.id}
                className="sr-only"
              />
              <Label htmlFor={level.id} className="cursor-pointer">
                <Card className={`p-6 border-2 transition-all hover:border-primary hover:shadow-md flex items-center gap-4 ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary'
                }`}>
                  <div className={`p-2 rounded-full ${
                    isSelected ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isSelected ? 'text-primary' : 'text-primary'
                    }`} />
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
