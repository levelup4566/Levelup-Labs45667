
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
    className="glass-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-white/20"
    style={{ animationDelay: `${delay * 0.1}s` }}
  >
    <div className="feature-icon mb-4 animate-float" style={{ animationDelay: `${delay * 0.1}s` }}>
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2 font-display">{title}</h3>
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
    <section className="py-20 bg-background bg-hero-pattern relative overflow-hidden">
      {/* Background blobs */}
      <div className="blob h-96 w-96 -top-48 -left-48 opacity-50"></div>
      <div className="blob h-96 w-96 -bottom-48 -right-48 opacity-50" style={{ animationDelay: '3s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Powerful learning tools</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Everything you need to learn effectively</h2>
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
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
