
import React from 'react';
import ResourceLibrary from '@/components/resources/ResourceLibrary';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';

const Resources = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background bg-hero-pattern">
      <RouterHeader />
      <main className="flex-1 pt-24">
        <ResourceLibrary />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
