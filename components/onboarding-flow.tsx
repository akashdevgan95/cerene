"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Heart, Lock, ArrowRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { usePreferences, useUpdatePreferences } from "@/api/preferences";
import { useUpdateProfile } from "@/api/profile";
import useAuth from "@/hooks/use-auth";

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const { user, setOnboardingComplete } = useAuth();

  const [preferences, setPreferences] = useState({
    gender: "neutral",
    tone: "empathetic",
  });

  const { data: fetchedPreferences } = usePreferences();

  const {
    mutate: updatePreferences,
    isError: preferencesError,
    isSuccess: preferencesSuccess,
  } = useUpdatePreferences();
  const {
    mutate: updateProfile,
    isError: profileError,
    isSuccess: profileSuccess,
  } = useUpdateProfile();

  useEffect(() => {
    if (fetchedPreferences) {
      setPreferences({
        gender: fetchedPreferences?.preferred_gender ?? "neutral",
        tone: fetchedPreferences?.preferred_tone ?? "empathetic",
      });
    }
  }, [fetchedPreferences]);

  useEffect(() => {
    if (preferencesError) toast.error("Error updating preferences");
    if (profileError) toast.error("Error updating profile");
  }, [preferencesError, profileError]);

  useEffect(() => {
    if (preferencesSuccess) {
      updateProfile({ onboarding_complete: true });
    }
  }, [preferencesSuccess, updateProfile, user?.id]);

  useEffect(() => {
    if (profileSuccess) {
      setOnboardingComplete(true);
      onComplete();
    }
  }, [profileSuccess, onComplete, setOnboardingComplete]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      updatePreferences({
        user_id: user?.id,
        preferred_gender: preferences.gender,
        preferred_tone: preferences.tone,
      });
    }
  };

  const handlePreferenceChange = useCallback(
    (key: keyof typeof preferences, value: string) => {
      setPreferences((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const canProceed = useMemo(() => {
    switch (step) {
      case 2:
        return preferences.gender !== "";
      case 3:
        return preferences.tone !== "";
      default:
        return true;
    }
  }, [step, preferences]);

  const renderStepOneHighlights = () => (
    <div className="space-y-4">
      {[
        {
          icon: <Shield className="w-5 h-5 text-blue-600" />,
          title: "End-to-End Encrypted",
          desc: "Your conversations are completely private",
          bg: "bg-blue-50 dark:bg-blue-900/20",
        },
        {
          icon: <Heart className="w-5 h-5 text-green-600" />,
          title: "Natural Conversations",
          desc: "Just speak naturally - click to start and stop",
          bg: "bg-green-50 dark:bg-green-900/20",
        },
        {
          icon: <Lock className="w-5 h-5 text-purple-600" />,
          title: "HIPAA Compliant",
          desc: "Medical-grade privacy protection",
          bg: "bg-purple-50 dark:bg-purple-900/20",
        },
      ].map(({ icon, title, desc, bg }, i) => (
        <div
          key={i}
          className={`flex items-center space-x-3 p-3 rounded-lg ${bg}`}
        >
          {icon}
          <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGenderSelection = () => (
    <RadioGroup
      value={preferences.gender}
      onValueChange={(value) => handlePreferenceChange("gender", value)}
    >
      {["female", "male", "neutral"].map((option) => (
        <div
          key={option}
          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent"
        >
          <RadioGroupItem value={option} id={option} />
          <Label htmlFor={option} className="flex-1 cursor-pointer capitalize">
            {option === "neutral"
              ? "Gender-Neutral"
              : `${option.charAt(0).toUpperCase()}${option.slice(
                  1
                )} Voice & Persona`}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderToneSelection = () => (
    <RadioGroup
      value={preferences.tone}
      onValueChange={(value) => handlePreferenceChange("tone", value)}
    >
      {[
        {
          id: "empathetic",
          title: "Empathetic",
          desc: "Warm, understanding, and supportive",
        },
        {
          id: "motivational",
          title: "Motivational",
          desc: "Encouraging and goal-oriented",
        },
        {
          id: "neutral-tone",
          title: "Neutral",
          desc: "Balanced and professional",
          value: "neutral",
        },
      ].map(({ id, title, desc, value = id }) => (
        <div
          key={id}
          className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent"
        >
          <RadioGroupItem value={value} id={id} />
          <Label htmlFor={id} className="flex-1 cursor-pointer">
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Progress value={(step / totalSteps) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {step === 1 && (
              <>
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome to MindfulAI
                </CardTitle>
                <CardDescription className="text-base">
                  Your personal AI therapy companion, designed to support your
                  mental wellness journey through natural voice conversations.
                </CardDescription>
              </>
            )}
            {step === 2 && (
              <>
                <CardTitle className="text-xl">Choose Your Therapist</CardTitle>
                <CardDescription>
                  Select the gender preference for your AI therapist
                </CardDescription>
              </>
            )}
            {step === 3 && (
              <>
                <CardTitle className="text-xl">Therapy Style</CardTitle>
                <CardDescription>
                  How would you like your AI therapist to communicate?
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && renderStepOneHighlights()}
            {step === 2 && renderGenderSelection()}
            {step === 3 && renderToneSelection()}

            <Button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={!canProceed}
            >
              {step === totalSteps ? "Enter MindfulAI" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
