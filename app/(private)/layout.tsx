"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

//components
import FullScreenLoader from "@/components/ui/loaders/full-screen-loader";
import { OnboardingFlow } from "@/components/onboarding-flow";

// hooks
import useAuth from "@/hooks/use-auth";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loading, isAuthenticated, onboardingComplete } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, loading]);

  if (loading || !isAuthenticated) {
    return <FullScreenLoader />;
  }

  if (!onboardingComplete) {
    return <OnboardingFlow onComplete={() => {}} />;
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader userName="Sarah Johnson" />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
