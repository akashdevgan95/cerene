"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { client } from "@/utils/supabase/client";

interface IProps {
  children: React.ReactNode;
}

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  onboardingComplete: boolean | null;
  setOnboardingComplete: (onboardingComplete: boolean) => void;
  profile: any;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: IProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(
    null
  );

  // Fetch onboarding status from `profiles` table
  async function fetchOnboardingStatus(userId: string) {
    const { data, error } = await client
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!error && data) {
      setProfile(data);
      setOnboardingComplete(data.onboarding_complete ?? false);
      setLoading(false);
    } else {
      setOnboardingComplete(false); // fallback default
    }
  }

  useEffect(() => {
    client.auth.getSession().then(({ data }) => {
      const currentUser = data?.session?.user ?? null;
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);

      if (currentUser) {
        fetchOnboardingStatus(currentUser.id);
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = client.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        setIsAuthenticated(!!currentUser);

        if (currentUser) fetchOnboardingStatus(currentUser.id);
        else setOnboardingComplete(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        onboardingComplete,
        setOnboardingComplete,
        profile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
