import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  // UI State
  theme: "light" | "dark";
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;

  // User Preferences
  userPreferences: {
    notifications: boolean;
    autoSave: boolean;
    soundEnabled: boolean;
    language: string;
  };

  // Chat State
  currentSessionId: string | null;
  isTyping: boolean;

  // Actions
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  updateUserPreferences: (
    preferences: Partial<AppState["userPreferences"]>
  ) => void;
  setCurrentSession: (sessionId: string | null) => void;
  setIsTyping: (isTyping: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      theme: "light",
      sidebarOpen: false,
      mobileMenuOpen: false,
      userPreferences: {
        notifications: true,
        autoSave: true,
        soundEnabled: true,
        language: "en",
      },
      currentSessionId: null,
      isTyping: false,

      // Actions
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleMobileMenu: () =>
        set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
      updateUserPreferences: (preferences) =>
        set((state) => ({
          userPreferences: { ...state.userPreferences, ...preferences },
        })),
      setCurrentSession: (sessionId) => set({ currentSessionId: sessionId }),
      setIsTyping: (isTyping) => set({ isTyping }),
    }),
    {
      name: "mindful-ai-storage",
      partialize: (state) => ({
        theme: state.theme,
        userPreferences: state.userPreferences,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);
