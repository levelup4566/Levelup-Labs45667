
import React, { Suspense } from 'react';
import ResourceLibrary from '@/components/resources/ResourceLibrary';
import RouterHeader from '@/components/layout/RouterHeader';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Resources Page Component - Library of educational resources
 * 
 * Features:
 * - Error boundary for fault isolation
 * - Suspense for loading states
 * - Responsive layout
 */
const Resources = () => {
  /**
   * Loading fallback for Suspense
   */
  const ResourcesLoadingFallback = () => (
    <div className="container px-4 py-8 max-w-6xl">
      <Skeleton className="h-12 w-[250px] mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-[250px] rounded-xl" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background bg-hero-pattern">
      <RouterHeader />
      <main className="flex-1 pt-24">
        <ErrorBoundary>
          <Suspense fallback={<ResourcesLoadingFallback />}>
            <ResourceLibrary />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
