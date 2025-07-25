/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import RouterHeader from "@/components/layout/RouterHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, Trophy, Target } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

// Define the onboarding steps in order
const ONBOARDING_STEPS = [
  {
    path: "/onboarding",
    label: "Learning Goals",
    dataKey: "learning_goal",
    icon: Target,
    description: "What excites you to learn?",
  },
  {
    path: "/onboarding/time",
    label: "Time Commitment",
    dataKey: "time_commitment",
    icon: Sparkles,
    description: "How much time can you invest?",
  },
  {
    path: "/onboarding/experience",
    label: "Experience Level",
    dataKey: "experience_level",
    icon: Trophy,
    description: "Where are you starting from?",
  },
];

// Create a context to store and share onboarding data
type OnboardingContextType = {
  onboardingData: Record<string, any>;
  updateOnboardingData: (key: string, value: any) => void;
  currentStepIndex: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  canContinue: boolean;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};

type OnboardingLayoutProps = {};


const OnboardingLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useUser();
  // Removed enrollInCourse for UI-only mode

  console.log("user", user);

  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});

  // Determine current step index
  const currentStepIndex = ONBOARDING_STEPS.findIndex(
    (step) => step.path === location.pathname,
  );
  const isLastStep = currentStepIndex === ONBOARDING_STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Check if current step has required data
  const currentStep = ONBOARDING_STEPS[currentStepIndex];
  const canContinue = currentStep
    ? !!onboardingData[currentStep.dataKey]
    : false;

  const updateOnboardingData = (key: string, value: any) => {
    setOnboardingData((prev) => ({ ...prev, [key]: value }));
  };

  const generateCourseRoute = (
    learningGoal: string,
    timeCommitment: string,
    experienceLevel: string,
  ) => {
    return `/learning-path/${learningGoal}/${timeCommitment}/${experienceLevel}`;
  };

  const goToNextStep = () => {
    if (!canContinue) return;

    // After selecting Web Dev, route directly to WebDevCourse
    if (isLastStep) {
      // If this is the last step, finish onboarding and navigate to specific course path
      const { learning_goal, time_commitment, experience_level } =
        onboardingData;
      const coursePath = generateCourseRoute(
        learning_goal,
        time_commitment,
        experience_level,
      );

      console.log("Onboarding complete with data:", onboardingData);
      console.log("Navigating to course path:", coursePath);

      navigate(coursePath);
      return;
    }
    // No next step, but keep fallback for extensibility
    if (ONBOARDING_STEPS[currentStepIndex + 1]) {
      navigate(ONBOARDING_STEPS[currentStepIndex + 1].path);
    }
  };

  const goToPreviousStep = () => {
    if (isFirstStep) {
      return; // We're at the first step
    }
    navigate(ONBOARDING_STEPS[currentStepIndex - 1].path);
  };

  const progress = ((currentStepIndex + 1) / ONBOARDING_STEPS.length) * 100;

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        updateOnboardingData,
        currentStepIndex,
        goToNextStep,
        goToPreviousStep,
        isLastStep,
        isFirstStep,
        canContinue,
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <RouterHeader />

        <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-2 sm:p-4">
          {/* Progress Steps */}
          <div className="w-full max-w-4xl mb-4">
            <div className="flex items-center justify-between mb-4">
              {ONBOARDING_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;

                return (
                  <React.Fragment key={step.path}>
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`
                        w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-all duration-500 transform border-2
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-110 shadow-xl shadow-blue-500/30 border-transparent"
                            : isCompleted
                              ? "bg-green-500 text-white border-green-500 shadow-lg"
                              : "bg-white text-slate-400 border-slate-200 shadow-md hover:border-slate-300"
                        }
                      `}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-sm font-semibold text-center px-2 transition-colors duration-300 ${
                          isActive
                            ? "text-slate-900"
                            : isCompleted
                              ? "text-slate-700"
                              : "text-slate-500"
                        }`}
                      >
                        {step.label}
                      </span>
                      {isActive && (
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-slate-600 text-center whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-sm border">
                          {step.description}
                        </div>
                      )}
                    </div>
                    {index < ONBOARDING_STEPS.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-6 transition-all duration-500 rounded-full ${
                          index < currentStepIndex
                            ? "bg-green-500"
                            : "bg-slate-200"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Main Content Card */}
          <div className="w-full max-w-4xl">
            <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-3xl shadow-2xl overflow-hidden">
              {/* Progress Bar */}
              <div className="h-1.5 bg-slate-100">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-700 ease-out rounded-r-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="p-8 sm:p-12">
                {/* Header */}
                <div className="text-center mb-10">
                  <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-200 text-slate-700 text-sm font-semibold mb-6">
                    <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                    Step {currentStepIndex + 1} of {ONBOARDING_STEPS.length}
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 font-display">
                    {ONBOARDING_STEPS[currentStepIndex]?.label ||
                      "Getting Started"}
                  </h1>

                  <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Let's personalize your learning journey to help you achieve
                    your goals
                  </p>
                </div>

                {/* Content Area */}
                <div className="min-h-[400px] flex items-center justify-center">
                  <div className="w-full animate-fade-in">
                    <Outlet />
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
                  <Button
                    variant="outline"
                    onClick={goToPreviousStep}
                    disabled={isFirstStep}
                    className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 px-6 py-3"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  <div className="flex items-center gap-2">
                    {ONBOARDING_STEPS.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          index <= currentStepIndex
                            ? "bg-slate-800"
                            : "bg-slate-300"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    onClick={goToNextStep}
                    disabled={!canContinue}
                    className={`
                      bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
                      text-white border-0 shadow-lg transition-all duration-200 transform px-6 py-3
                      ${
                        canContinue
                          ? "hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                          : "opacity-40 cursor-not-allowed"
                      }
                    `}
                  >
                    {isLastStep ? "Complete Setup" : "Continue"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decoration */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Your personalized learning experience awaits ✨
            </p>
          </div>
        </main>
      </div>
    </OnboardingContext.Provider>
  );
};

export default OnboardingLayout;
