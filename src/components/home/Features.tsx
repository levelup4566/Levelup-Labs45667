
import React from 'react';
import { Book, Star, BarChart, Layout, BookOpen, Clock, Monitor, Users } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureProps) => (
  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border/50">
    <div className="feature-icon mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Extensive Library",
      description: "Access thousands of free educational resources from various sources, all in one place."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Personalized Learning",
      description: "Receive tailored recommendations based on your learning style, goals, and progress."
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Progress Tracking",
      description: "Visualize your learning journey with intuitive progress charts and analytics."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Skill Points",
      description: "Earn points and badges as you complete courses and master new skills."
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Custom Paths",
      description: "Create your own learning paths or follow curated paths from education experts."
    },
    {
      icon: <Monitor className="h-6 w-6" />,
      title: "Interactive Learning",
      description: "Engage with interactive content, quizzes, and exercises to reinforce learning."
    },
    {
      icon: <Book className="h-6 w-6" />,
      title: "Topic Mastery",
      description: "Develop deep understanding through comprehensive topic coverage and practice."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Self-paced Learning",
      description: "Learn at your own pace with no deadlines or pressure, focusing on what matters to you."
    }
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to learn effectively</h2>
          <p className="text-lg text-muted-foreground">
            Our platform combines powerful features to create the perfect learning environment
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
