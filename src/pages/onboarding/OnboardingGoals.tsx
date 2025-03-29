
import React from 'react';
import { useOnboarding } from './OnboardingLayout';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CodeIcon, PencilIcon, BrainIcon, DicesIcon, MicIcon, UserIcon } from 'lucide-react';

const learningGoals = [
  { 
    id: 'coding', 
    title: 'Programming & Web Development', 
    description: 'Learn to code with JavaScript, Python, or build websites',
    icon: CodeIcon
  },
  { 
    id: 'design', 
    title: 'Design & Creativity', 
    description: 'Explore UI/UX design, graphic design, or digital art',
    icon: PencilIcon
  },
  { 
    id: 'data', 
    title: 'Data Science & AI', 
    description: 'Master data analysis, machine learning, or artificial intelligence',
    icon: BrainIcon
  },
  { 
    id: 'gaming', 
    title: 'Game Development', 
    description: 'Create games for web, mobile, or desktop platforms',
    icon: DicesIcon
  },
  { 
    id: 'media', 
    title: 'Digital Media', 
    description: 'Produce videos, podcasts, or digital content',
    icon: MicIcon
  },
  { 
    id: 'personal', 
    title: 'Personal Growth', 
    description: 'Develop soft skills, productivity, or wellness habits',
    icon: UserIcon
  },
];

const OnboardingGoals = () => {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  return (
    <div className="space-y-6">
      <p className="text-lg">
        What are you most interested in learning? Choose the area that excites you.
      </p>
      
      <RadioGroup
        value={onboardingData.learningGoal || ''}
        onValueChange={(value) => updateOnboardingData('learningGoal', value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {learningGoals.map((goal) => {
          const Icon = goal.icon;
          return (
            <div key={goal.id} className="relative">
              <RadioGroupItem
                value={goal.id}
                id={goal.id}
                className="absolute top-4 left-4 peer sr-only"
              />
              <Label
                htmlFor={goal.id}
                className="peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary"
              >
                <Card className="cursor-pointer p-6 h-full border hover:border-primary hover:shadow-md transition-all">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                    </div>
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

export default OnboardingGoals;
