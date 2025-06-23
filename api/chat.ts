import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { apiRequest } from "./client";
import type { ChatMessage, ChatSession, ApiResponse } from "./types";

// API functions
const fetchChatSessions = async (): Promise<ChatSession[]> => {
  return apiRequest<ChatSession[]>("/chat/sessions");
};

const fetchChatMessages = async (
  sessionId: string,
  page = 1
): Promise<{
  messages: ChatMessage[];
  hasMore: boolean;
  nextPage: number;
}> => {
  return apiRequest<{
    messages: ChatMessage[];
    hasMore: boolean;
    nextPage: number;
  }>(`/chat/sessions/${sessionId}/messages?page=${page}`);
};

const sendMessage = async ({
  sessionId,
  content,
}: {
  sessionId: string;
  content: string;
}): Promise<ChatMessage> => {
  return apiRequest<ChatMessage>(`/chat/sessions/${sessionId}/messages`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
};

const createChatSession = async (title?: string): Promise<ChatSession> => {
  return apiRequest<ChatSession>("/chat/sessions", {
    method: "POST",
    body: JSON.stringify({ title: title || "New Chat" }),
  });
};

const deleteChatSession = async (sessionId: string): Promise<void> => {
  return apiRequest<void>(`/chat/sessions/${sessionId}`, {
    method: "DELETE",
  });
};

// Query keys
export const chatKeys = {
  all: ["chat"] as const,
  sessions: () => [...chatKeys.all, "sessions"] as const,
  session: (id: string) => [...chatKeys.sessions(), id] as const,
  messages: (sessionId: string) =>
    [...chatKeys.session(sessionId), "messages"] as const,
};

// Query hooks
export const useChatSessions = () => {
  return useQuery({
    queryKey: chatKeys.sessions(),
    queryFn: fetchChatSessions,
  });
};

export const useChatMessages = (sessionId: string) => {
  return useInfiniteQuery({
    queryKey: chatKeys.messages(sessionId),
    queryFn: ({ pageParam = 1 }) => fetchChatMessages(sessionId, pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
    enabled: !!sessionId,
  });
};

// Mutation hooks
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (data, variables) => {
      // Optimistically update the messages
      queryClient.setQueryData(
        chatKeys.messages(variables.sessionId),
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page: any, index: number) => {
              if (index === 0) {
                return {
                  ...page,
                  messages: [...page.messages, data],
                };
              }
              return page;
            }),
          };
        }
      );
    },
  });
};

export const useCreateChatSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createChatSession,
    onSuccess: () => {
      // Invalidate sessions list
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() });
    },
  });
};

export const useDeleteChatSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteChatSession,
    onSuccess: (_, sessionId) => {
      // Remove session from cache
      queryClient.removeQueries({ queryKey: chatKeys.session(sessionId) });
      // Invalidate sessions list
      queryClient.invalidateQueries({ queryKey: chatKeys.sessions() });
    },
  });
};
