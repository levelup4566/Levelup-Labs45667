
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Star, Sparkles, Search, Layers, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative hero-gradient pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background blob effects */}
      <div className="blob h-64 w-64 top-20 left-10"></div>
      <div className="blob h-80 w-80 bottom-10 right-10" style={{ animationDelay: '2s' }}></div>
      <div className="blob h-72 w-72 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in backdrop-blur-sm border border-primary/20">
            <Sparkles className="h-4 w-4 mr-2" />
            <span>Personalized Learning Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 font-display">
            <span className="relative inline-block animate-slide-in">Learn anything.</span> <br className="hidden sm:block" />
            <span className="relative inline-block text-primary animate-slide-in" style={{ animationDelay: "0.1s" }}>Track your progress.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Access high-quality best educational resources from whole internet, build personalized learning paths, and track your skills development all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="w-full sm:w-auto group transition-all">
              <Link to="/resources" className="flex items-center">
                Explore Resources <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto backdrop-blur-sm bg-white/10">
              <Link to="/dashboard">
                My Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl animate-scale-in relative" style={{ animationDelay: "0.4s" }}>
            <div className="absolute inset-0 glass-card rounded-xl p-8 flex items-center justify-center backdrop-blur-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                <div className="glass-card rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300 hover:bg-white/40">
                  <div className="feature-icon mb-4 animate-float">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Access high quality Resources from internet</h3>
                  <p className="text-muted-foreground text-sm">Curated educational content for all skill levels</p>
                </div>
                
                <div className="glass-card rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300 hover:bg-white/40" style={{ animationDelay: "0.2s" }}>
                  <div className="feature-icon mb-4 animate-float" style={{ animationDelay: "0.2s" }}>
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Personalized Learning</h3>
                  <p className="text-muted-foreground text-sm">Custom learning paths tailored to your goals</p>
                </div>
                
                <div className="glass-card rounded-lg p-6 shadow-sm transform transition-transform hover:scale-105 duration-300 hover:bg-white/40" style={{ animationDelay: "0.4s" }}>
                  <div className="feature-icon mb-4 animate-float" style={{ animationDelay: "0.4s" }}>
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Skill Points</h3>
                  <p className="text-muted-foreground text-sm">Track progress and earn rewards as you learn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* New section: What makes us different */}
        <div className="max-w-5xl mx-auto mt-24 relative">
          <div className="glass-card rounded-xl p-8 backdrop-blur-sm border border-white/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>What Makes Us Different</span>
              </div>
              <h2 className="text-3xl font-bold mb-4 font-display">How We're Different From Paid Course Platforms</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We solve the main problem of structured learning with free resources through our carefully designed platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Curated Research</h3>
                  <p className="text-muted-foreground">
                    We research the best resources from YouTube, educational websites, and other platforms to bring you only high-quality content that's worth your time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Structured Learning</h3>
                  <p className="text-muted-foreground">
                    Content is categorized according to modules, course content, and curriculum designed by industry experts to ensure effective learning paths.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground">
                    Every resource undergoes a thorough vetting process to ensure it meets our standards for accuracy, clarity, and educational value.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Community-Driven</h3>
                  <p className="text-muted-foreground">
                    Our community helps identify and rate resources, ensuring our platform continually improves and stays current with the best learning materials.
                  </p>
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
