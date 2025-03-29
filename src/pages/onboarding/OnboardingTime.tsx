
import React from 'react';
import { useOnboarding } from './OnboardingLayout';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Clock, Coffee, Calendar, ClockIcon } from 'lucide-react';

const timeOptions = [
  { 
    id: 'minimal', 
    title: '1-2 hours per week', 
    description: 'Just dipping my toes in, casual learning',
    icon: Coffee
  },
  { 
    id: 'moderate', 
    title: '3-5 hours per week', 
    description: 'Committed to progress at a steady pace',
    icon: Clock
  },
  { 
    id: 'significant', 
    title: '5-10 hours per week', 
    description: 'Dedicated to making substantial progress',
    icon: Calendar
  },
  { 
    id: 'intensive', 
    title: '10+ hours per week', 
    description: 'Immersive learning is my priority',
    icon: ClockIcon
  },
];

const OnboardingTime = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  return (
    <div className="space-y-6">
      <p className="text-lg">
        How much time can you dedicate to learning each week?
      </p>
      
      <RadioGroup
        value={onboardingData.timeCommitment || ''}
        onValueChange={(value) => updateOnboardingData('timeCommitment', value)}
        className="grid grid-cols-1 gap-4"
      >
        {timeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id} className="relative">
              <RadioGroupItem
                value={option.id}
                id={option.id}
                className="absolute top-4 left-4 peer sr-only"
              />
              <Label
                htmlFor={option.id}
                className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
              >
                <Card className="cursor-pointer p-6 border hover:border-primary hover:shadow-md transition-all flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{option.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
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

export default OnboardingTime;
