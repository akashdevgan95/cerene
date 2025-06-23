// Common types for API responses
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  created_at: string;
  session_id: string;
}

export interface ChatSession {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface Preferences {
  id?: string;
  user_id?: string;
  preferred_gender: string;
  preferred_style?: string;
  preferred_tone: string;
  created_at?: string;
  updated_at?: string;
}
export interface Profile {
  id?: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  subscribe_newsletter?: boolean;
  agree_to_terms?: boolean;
  agree_to_privacy?: boolean;
  onboarding_complete?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Notifications {
  id?: string;
  user_id?: string;
  progress_updates?: boolean;
  daily_checkins?: boolean;
  session_reminders?: boolean;
  updated_at?: string;
}
