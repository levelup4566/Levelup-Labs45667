
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import OnboardingLayout from "./pages/onboarding/OnboardingLayout";
import OnboardingGoals from "./pages/onboarding/OnboardingGoals";
import OnboardingTime from "./pages/onboarding/OnboardingTime";
import OnboardingExperience from "./pages/onboarding/OnboardingExperience";
import CourseDashboard from "./pages/course/CourseDashboard";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { useState, useEffect } from "react";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";

// Import specific course components
import WebDevCourse from "./pages/courses/WebDevCourse";
import DesignCourse from "./pages/courses/DesignCourse";
import DataScienceCourse from "./pages/courses/DataScienceCourse";

import { useEnsureUserProfile } from "@/hooks/useEnsureUserProfile";
import { useSupabaseAuthSync } from "@/hooks/useSupabaseAuthSync";
import { useAuth } from "@clerk/clerk-react";
import { useSupabaseClient } from "@/integrations/supabase/client";

/**
 * App Component - Root component that sets up the application structure
 *
 * Sets up:
 * - QueryClient for data fetching with proper error handling
 * - Global UI providers (tooltip, toast notifications)
 * - Routing with error boundaries for fault isolation
 */
const App = () => {
  const supabase = useSupabaseClient();
  useEnsureUserProfile(supabase);
  // Create and configure the QueryClient with robust error handling
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Limit retries to prevent excessive network traffic on failure
        refetchOnWindowFocus: false, // Disable auto-refetch for better performance
        staleTime: 5 * 60 * 1000, // 5 minutes of cache validity
        gcTime: 10 * 60 * 1000, // Garbage collection after 10 minutes 
        meta: {
          // Handle errors at the query level
          onError: (error: unknown) => {
            // Log errors for monitoring
            console.error('Query error:', error);
          }
        }
      },
      mutations: {
        meta: {
          // Handle errors at the mutation level
          onError: (error: unknown) => {
            // Log mutation errors for monitoring
            console.error('Mutation error:', error);
          }
        }
      }
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={
                <ErrorBoundary>
                  <Index />
                </ErrorBoundary>
              } />
              <Route path="/signin/*" element={
                <ErrorBoundary>
                  <SignInPage />
                </ErrorBoundary>
              } />
              <Route path="/signup/*" element={
                <ErrorBoundary>
                  <SignUpPage />
                </ErrorBoundary>
              } />
              
              {/* Onboarding flow */}
              <Route path="/onboarding" element={
                <ErrorBoundary>
                  <OnboardingLayout supabase={supabase} />
                </ErrorBoundary>
              }>
                <Route index element={<OnboardingGoals />} />
                <Route path="time" element={<OnboardingTime />} />
                <Route path="experience" element={<OnboardingExperience />} />
              </Route>
              
              {/* Main application routes */}
              <Route path="/course-dashboard" element={
                <ErrorBoundary>
                  <CourseDashboard />
                </ErrorBoundary>
              } />
              <Route path="/dashboard" element={
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              } />
              <Route path="/resources" element={
                <ErrorBoundary>
                  <Resources />
                </ErrorBoundary>
              } />

              {/* Specific course routes based on combinations */}
              {/* Web Development Courses */}
              <Route path="/courses/coding/minimal/beginner" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="minimal" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/minimal/novice" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="minimal" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/minimal/intermediate" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="minimal" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/minimal/advanced" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="minimal" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/moderate/beginner" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="moderate" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/moderate/novice" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="moderate" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/moderate/intermediate" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="moderate" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/moderate/advanced" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="moderate" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/significant/beginner" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="significant" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/significant/novice" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="significant" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/significant/intermediate" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="significant" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/significant/advanced" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="significant" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/intensive/beginner" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="intensive" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/intensive/novice" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="intensive" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/intensive/intermediate" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="intensive" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/coding/intensive/advanced" element={
                <ErrorBoundary>
                  <WebDevCourse timeCommitment="intensive" experienceLevel="advanced" />
                </ErrorBoundary>
              } />

              {/* Design Courses */}
              <Route path="/courses/design/minimal/beginner" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="minimal" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/minimal/novice" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="minimal" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/minimal/intermediate" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="minimal" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/minimal/advanced" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="minimal" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/moderate/beginner" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="moderate" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/moderate/novice" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="moderate" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/moderate/intermediate" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="moderate" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/moderate/advanced" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="moderate" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/significant/beginner" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="significant" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/significant/novice" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="significant" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/significant/intermediate" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="significant" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/significant/advanced" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="significant" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/intensive/beginner" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="intensive" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/intensive/novice" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="intensive" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/intensive/intermediate" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="intensive" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/design/intensive/advanced" element={
                <ErrorBoundary>
                  <DesignCourse timeCommitment="intensive" experienceLevel="advanced" />
                </ErrorBoundary>
              } />

              {/* Data Science Courses */}
              <Route path="/courses/data/minimal/beginner" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="minimal" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/minimal/novice" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="minimal" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/minimal/intermediate" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="minimal" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/minimal/advanced" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="minimal" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/moderate/beginner" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="moderate" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/moderate/novice" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="moderate" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/moderate/intermediate" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="moderate" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/moderate/advanced" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="moderate" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/significant/beginner" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="significant" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/significant/novice" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="significant" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/significant/intermediate" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="significant" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/significant/advanced" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="significant" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/intensive/beginner" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="intensive" experienceLevel="beginner" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/intensive/novice" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="intensive" experienceLevel="novice" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/intensive/intermediate" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="intensive" experienceLevel="intermediate" />
                </ErrorBoundary>
              } />
              <Route path="/courses/data/intensive/advanced" element={
                <ErrorBoundary>
                  <DataScienceCourse timeCommitment="intensive" experienceLevel="advanced" />
                </ErrorBoundary>
              } />
              
              {/* 404 catch-all route */}
              <Route path="*" element={
                <ErrorBoundary>
                  <NotFound />
                </ErrorBoundary>
              } />
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
