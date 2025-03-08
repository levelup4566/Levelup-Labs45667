
import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <RouterHeader />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
