
import React from 'react';
import { useOnboarding } from './OnboardingLayout';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CodeIcon, PencilIcon, BrainIcon, DicesIcon, MicIcon, UserIcon } from 'lucide-react';

const webDevGoal = [
  { 
    id: 'coding', 
    title: 'Programming & Web Development', 
    description: 'Learn to code with JavaScript, Python, or build websites',
    icon: CodeIcon
  }
];

const comingSoonGoals = [
  { id: 'design', title: 'Design & Creativity', icon: PencilIcon },
  { id: 'data', title: 'Data Science & AI', icon: BrainIcon },
  { id: 'gaming', title: 'Game Development', icon: DicesIcon },
  { id: 'media', title: 'Digital Media', icon: MicIcon },
  { id: 'personal', title: 'Personal Growth', icon: UserIcon },
];

const OnboardingGoals = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  return (
    <div className="space-y-6">
      <p className="text-lg">
        What are you most interested in learning? Choose the area that excites you.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Web Dev Goal - Selectable */}
        {webDevGoal.map((goal) => {
          const Icon = goal.icon;
          const isSelected = onboardingData.learning_goal === goal.id;
          return (
            <div key={goal.id} className="relative">
              <RadioGroup value={onboardingData.learning_goal || ''} onValueChange={(value) => updateOnboardingData('learning_goal', value)}>
                <RadioGroupItem
                  value={goal.id}
                  id={goal.id}
                  className="sr-only"
                />
                <Label htmlFor={goal.id} className="cursor-pointer">
                  <Card className={`p-6 h-full border-2 transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/30'
                      : 'border-border hover:border-primary hover:shadow-md'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${
                        isSelected ? 'bg-primary/20' : 'bg-primary/10'
                      }`}>
                        <Icon className={`w-5 h-5 text-primary`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{goal.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                    </div>
                  </Card>
                </Label>
              </RadioGroup>
            </div>
          );
        })}
        {/* Coming Soon - Non-functional */}
        {comingSoonGoals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div key={goal.id} className="relative opacity-60 cursor-not-allowed">
              <Card className="p-6 h-full border-2 border-dashed bg-muted flex flex-col items-center justify-center">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{goal.title}</h3>
                  </div>
                </div>
                <div className="mt-2">
                  <button className="bg-gray-300 text-gray-600 px-3 py-1 rounded cursor-not-allowed" disabled>Coming Soon</button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingGoals;
