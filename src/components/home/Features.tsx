
import React from 'react';
import { Book, Star, BarChart, Layout, BookOpen, Clock, Monitor, Users, Sparkles } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureProps) => (
  <div 
    className="glass-card rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-white/20"
    style={{ animationDelay: `${delay * 0.1}s` }}
  >
    <div className="feature-icon mb-3 sm:mb-4 animate-float" style={{ animationDelay: `${delay * 0.1}s` }}>
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-medium mb-2 font-display">{title}</h3>
    <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Extensive Library",
      description: "Access thousands of free educational resources from various sources, all in one place."
    },
    {
      icon: <Users className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Personalized Learning",
      description: "Receive tailored recommendations based on your learning style, goals, and progress."
    },
    {
      icon: <BarChart className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Progress Tracking",
      description: "Visualize your learning journey with intuitive progress charts and analytics."
    },
    {
      icon: <Star className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Skill Points",
      description: "Earn points and badges as you complete courses and master new skills."
    },
    {
      icon: <Layout className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Custom Paths",
      description: "Create your own learning paths or follow curated paths from education experts."
    },
    {
      icon: <Monitor className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Interactive Learning",
      description: "Engage with interactive content, quizzes, and exercises to reinforce learning."
    },
    {
      icon: <Book className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Topic Mastery",
      description: "Develop deep understanding through comprehensive topic coverage and practice."
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6" />,
      title: "Self-paced Learning",
      description: "Learn at your own pace with no deadlines or pressure, focusing on what matters to you."
    }
  ];
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background bg-hero-pattern relative overflow-hidden">
      {/* Background blobs */}
      <div className="blob h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 -top-32 sm:-top-40 md:-top-48 -left-32 sm:-left-40 md:-left-48 opacity-50"></div>
      <div className="blob h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 -bottom-32 sm:-bottom-40 md:-bottom-48 -right-32 sm:-right-40 md:-right-48 opacity-50" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-4 sm:mb-6 rounded-full bg-accent/10 text-accent text-xs sm:text-sm font-medium">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
            <span>Powerful learning tools</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 font-display">Everything you need to learn effectively</h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4 sm:px-0">
            Our platform combines powerful features to create the perfect learning environment
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
