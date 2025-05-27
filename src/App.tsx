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
import Resources from "./pages/Resources"; // Import the Resources component
import ErrorBoundary from "./components/common/ErrorBoundary";
import { useState } from "react";
import SignInPage from "./routes/sign-in";
import SignUpPage from "./routes/sign-up";
import WebDevelopmentCourse from "./pages/courses/WebDevelopmentCourse";
import DesignCourse from "./pages/courses/DesignCourse";
import DataScienceCourse from "./pages/courses/DataScienceCourse";

/**
 * App Component - Root component that sets up the application structure
 * 
 * Sets up:
 * - QueryClient for data fetching with proper error handling
 * - Global UI providers (tooltip, toast notifications)
 * - Routing with error boundaries for fault isolation
 */
const App = () => {
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
                  <OnboardingLayout />
                </ErrorBoundary>
              }>
                <Route index element={<OnboardingGoals />} />
                <Route path="time" element={<OnboardingTime />} />
                <Route path="experience" element={<OnboardingExperience />} />
              </Route>
              
              {/* Course routes */}
              <Route path="/courses/web-development" element={
                <ErrorBoundary>
                  <WebDevelopmentCourse />
                </ErrorBoundary>
              } />
              <Route path="/courses/design" element={
                <ErrorBoundary>
                  <DesignCourse />
                </ErrorBoundary>
              } />
              <Route path="/courses/data-science" element={
                <ErrorBoundary>
                  <DataScienceCourse />
                </ErrorBoundary>
              } />
              
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
