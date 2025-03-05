
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero-gradient pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            <Star className="h-4 w-4 mr-2" />
            <span>Free education for everyone</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-in">
            Learn anything. <br className="hidden sm:block" />
            <span className="text-primary">Track your progress.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Access high-quality educational resources, build personalized learning paths, and track your skills development all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/resources">
                Explore Resources <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/dashboard">
                My Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 backdrop-blur-card border border-white/20 rounded-xl p-8 flex items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300">
                  <div className="feature-icon mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">10,000+ Resources</h3>
                  <p className="text-muted-foreground text-sm">Curated educational content for all skill levels</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300">
                  <div className="feature-icon mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Personalized Learning</h3>
                  <p className="text-muted-foreground text-sm">Custom learning paths tailored to your goals</p>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300">
                  <div className="feature-icon mb-4">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Skill Points</h3>
                  <p className="text-muted-foreground text-sm">Track progress and earn rewards as you learn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
