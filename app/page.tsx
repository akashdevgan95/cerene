"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OnboardingFlow } from "@/components/onboarding-flow";

// pages
import Homepage from "@/components/pages/homepage";

export default function Home() {
  // const [isOnboarded, setIsOnboarded] = useState(false);
  // const router = useRouter();
  // const searchParams = useSearchParams();

  // Check if user came from landing page
  // const fromLanding = searchParams.get("from") === "landing";

  // const handleOnboardingComplete = () => {
  //   setIsOnboarded(true);
  //   router.push("/chat");
  // };

  // If already onboarded, redirect to chat
  // useEffect(() => {
  //   if (isOnboarded) {
  //     router.push("/chat");
  //   }
  // }, [isOnboarded, router]);

  // // If user didn't come from landing and no specific flow, redirect to landing
  // useEffect(() => {
  //   if (!fromLanding && !isOnboarded) {
  //     router.push("/landing");
  //   }
  // }, [fromLanding, isOnboarded, router]);

  // // Only show onboarding if user came from landing or is in onboarding flow
  // if (fromLanding || isOnboarded) {
  //   return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  // }

  // Show loading or redirect
  return <Homepage />;
}
