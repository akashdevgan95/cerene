import { useQuery, useMutation } from "@tanstack/react-query";
import { Notifications } from "./types";

//supabase client
import { client } from "@/utils/supabase/client";
import useAuth from "@/hooks/use-auth";

const fetchNotifications = async (user_id: string) => {
  const { data, error } = await client
    .from("notification_settings")
    .select("*")
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data[0] ?? null;
};

const updateNotifications = async (
  notifications: Notifications,
  user_id: string
) => {
  const { data, error } = await client
    .from("notification_settings")
    .update(notifications)
    .eq("user_id", user_id);
  if (error) {
    throw error;
  }
  return data;
};

const useNotifications = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(user?.id ?? ""),
  });
};

const useUpdateNotifications = () => {
  const { user } = useAuth();
  return useMutation({
    mutationFn: (notifications: Notifications) =>
      updateNotifications(notifications, user?.id ?? ""),
  });
};

export { useNotifications, useUpdateNotifications };
