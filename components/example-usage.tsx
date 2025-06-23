"use client";

import { useAppStore } from "@/stores/use-app-store";
import { useUser, useUpdateUser } from "@/hooks/use-api";

export function ExampleComponent({ userId }: { userId: string }) {
  // Zustand store usage
  const { theme, sidebarOpen, toggleSidebar, setTheme } = useAppStore();

  // TanStack Query usage
  const { data: user, isLoading, error } = useUser(userId);
  const updateUserMutation = useUpdateUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Current theme: {theme}</p>
      <button onClick={toggleSidebar}>
        Toggle Sidebar ({sidebarOpen ? "Open" : "Closed"})
      </button>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>

      <button
        onClick={() =>
          updateUserMutation.mutate({
            userId,
            data: { name: "Updated Name" },
          })
        }
        disabled={updateUserMutation.isPending}
      >
        {updateUserMutation.isPending ? "Updating..." : "Update User"}
      </button>
    </div>
  );
}
