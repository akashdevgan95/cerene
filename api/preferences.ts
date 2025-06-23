import { useQuery, useMutation } from "@tanstack/react-query";
import { Preferences } from "./types";

//supabase client
import { client } from "@/utils/supabase/client";
import useAuth from "@/hooks/use-auth";

const fetchPreferences = async (user_id: string) => {
  const { data, error } = await client
    .from("preferences")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const updatePreferences = async (preferences: Preferences, user_id: string) => {
  const { data, error } = await client
    .from("preferences")
    .update({
      preferred_gender: preferences.preferred_gender,
      preferred_tone: preferences.preferred_tone,
    })
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};

const usePreferences = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["preferences"],
    queryFn: () => fetchPreferences(user?.id ?? ""),
  });
};

const useUpdatePreferences = () => {
  const { user } = useAuth();
  return useMutation({
    mutationFn: (preferences: Preferences) =>
      updatePreferences(preferences, user?.id ?? ""),
  });
};

export { usePreferences, useUpdatePreferences };
