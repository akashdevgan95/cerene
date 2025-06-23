import { useQuery, useMutation } from "@tanstack/react-query";
import { Profile } from "./types";

//supabase client
import { client } from "@/utils/supabase/client";
import useAuth from "@/hooks/use-auth";

const fetchProfile = async () => {
  // include preference id
  const { data, error } = await client.from("profile").select("*").single();
  if (error) {
    throw error;
  }
  return data;
};

const updateProfile = async (profile: Profile, user_id: string) => {
  const { data, error } = await client
    .from("profiles")
    .update(profile)
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};

const useUpdateProfile = () => {
  const { user } = useAuth();
  return useMutation({
    mutationFn: (profile: Profile) => updateProfile(profile, user?.id ?? ""),
  });
};

export { useProfile, useUpdateProfile };
