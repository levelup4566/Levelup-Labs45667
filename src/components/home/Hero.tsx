
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Star, Sparkles, Search, Layers, CheckCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
        
        {/* Comparison table section */}
        <div className="max-w-5xl mx-auto mt-24 relative">
          <Card className="glass-card backdrop-blur-sm border border-white/20 shadow-xl animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <CardHeader className="text-center">
              <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Feature Comparison</span>
              </div>
              <CardTitle className="text-3xl font-bold mb-4 font-display">Levelup Labs vs. Paid Course Platforms</CardTitle>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See how our platform compares to traditional paid course alternatives
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left p-4 font-semibold text-lg">Feature</th>
                      <th className="p-4 font-semibold text-lg text-primary">Levelup Labs</th>
                      <th className="p-4 font-semibold text-lg">Paid Course Platforms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/10">
                      <td className="p-4 font-medium">Cost</td>
                      <td className="p-4 text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle className="h-5 w-5 text-accent mx-auto" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Completely free!</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-muted text-xs">$15-200/month</span>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 font-medium">Learning Resources</td>
                      <td className="p-4 text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle className="h-5 w-5 text-accent mx-auto" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Best free resources from across the web</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className="p-4 text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Platform-specific content only</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 font-medium">Content Diversity</td>
                      <td className="p-4 text-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <CheckCircle className="h-5 w-5 text-accent mx-auto" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Multiple teaching styles and approaches</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </td>
                      <td className="p-4 text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-4 font-medium">Progress Tracking</td>
                      <td className="p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-accent mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Custom Learning Paths</td>
                      <td className="p-4 text-center">
                        <CheckCircle className="h-5 w-5 text-accent mx-auto" />
                      </td>
                      <td className="p-4 text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
