
import React from 'react';
import { Star, Award } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <div className="relative mb-8 p-6 rounded-xl overflow-hidden bg-gradient-to-r from-primary/80 to-accent/60 shadow-lg">
      <div className="absolute inset-0 bg-grid-white/[0.1] opacity-30"></div>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Learning Dashboard</h1>
          <p className="text-white/90 mt-1">Track your progress and accelerate your learning journey</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 text-white">
            <Star className="h-4 w-4" />
            <span className="font-medium">1,240 points</span>
          </div>
          
          <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full py-2 px-3 text-white">
            <Award className="h-4 w-4" />
            <span className="font-medium">Level 4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
