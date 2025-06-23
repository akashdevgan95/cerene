"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  RotateCcw,
  MessageCircle,
  Pause,
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { useChat } from "ai/react";

interface SessionContext {
  issues: string[];
  customIssue?: string;
}

interface VoiceChatScreenProps {
  sessionContext?: SessionContext | null;
  onEndSession?: () => void;
}

// Declare SpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export function VoiceChatScreen({
  sessionContext,
  onEndSession,
}: VoiceChatScreenProps) {
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isTherapistSpeaking, setIsTherapistSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState("");
  const [lastTherapistMessage, setLastTherapistMessage] = useState("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Create initial message based on session context
  const getInitialMessage = () => {
    if (
      !sessionContext ||
      (sessionContext.issues.length === 0 && !sessionContext.customIssue)
    ) {
      return "Hello! I'm Dr. Sage, your AI therapy companion. I'm here to listen and support you. How are you feeling today?";
    }

    let message = "Hello! I'm Dr. Sage. I see you'd like to focus on ";

    if (sessionContext.issues.length > 0) {
      const issueLabels = sessionContext.issues.map((issue) => {
        const issueMap: Record<string, string> = {
          anxiety: "anxiety and stress",
          depression: "depression and mood",
          relationships: "relationships",
          career: "career and work",
          family: "family issues",
          "self-esteem": "self-esteem",
          trauma: "trauma and PTSD",
          addiction: "addiction and habits",
        };
        return issueMap[issue] || issue;
      });

      if (issueLabels.length === 1) {
        message += issueLabels[0];
      } else if (issueLabels.length === 2) {
        message += `${issueLabels[0]} and ${issueLabels[1]}`;
      } else {
        message += `${issueLabels.slice(0, -1).join(", ")}, and ${
          issueLabels[issueLabels.length - 1]
        }`;
      }
    }

    if (sessionContext.customIssue) {
      if (sessionContext.issues.length > 0) {
        message += `, as well as ${sessionContext.customIssue.toLowerCase()}`;
      } else {
        message += sessionContext.customIssue.toLowerCase();
      }
    }

    message +=
      " today. I'm here to listen and support you through this. How would you like to begin?";

    return message;
  };

  const initialMessage = getInitialMessage();

  const { messages, append, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: initialMessage,
      },
    ],
    onFinish: (message) => {
      setLastTherapistMessage(message.content);
      speakMessage(message.content);
    },
  });

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onstart = () => {
        setIsUserSpeaking(true);
      };

      recognitionRef.current.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCurrentTranscript(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsUserSpeaking(false);
        if (isRecording && currentTranscript.trim()) {
          handleVoiceInput(currentTranscript.trim());
          setCurrentTranscript("");
        }
        setIsRecording(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        setIsUserSpeaking(false);
      };
    }

    // Initialize speech synthesis
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }

    // Set initial message and speak it
    setLastTherapistMessage(initialMessage);
    setTimeout(() => {
      speakMessage(initialMessage);
    }, 1000);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [initialMessage]);

  const handleVoiceInput = async (transcript: string) => {
    setLastUserMessage(transcript);
    setCurrentTranscript("");

    try {
      await append({
        role: "user",
        content: transcript,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const speakMessage = (text: string) => {
    if (!synthRef.current || isMuted) return;

    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    // Try to use a female voice for the therapist
    const voices = synthRef.current.getVoices();
    const femaleVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("woman") ||
        voice.name.toLowerCase().includes("samantha") ||
        voice.name.toLowerCase().includes("karen")
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onstart = () => setIsTherapistSpeaking(true);
    utterance.onend = () => setIsTherapistSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      // Stop recording
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Start recording
      setCurrentTranscript("");
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && synthRef.current) {
      synthRef.current.cancel();
      setIsTherapistSpeaking(false);
    }
  };

  const handleNewSession = () => {
    // Reset all states for new session
    setCurrentTranscript("");
    setLastUserMessage("");
    setLastTherapistMessage("");
    setIsRecording(false);
    setIsUserSpeaking(false);
    setIsTherapistSpeaking(false);

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    // Restart with initial message
    setTimeout(() => {
      setLastTherapistMessage(initialMessage);
      speakMessage(initialMessage);
    }, 500);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsTherapistSpeaking(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleEndSession = () => {
    // Stop all audio and recognition
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    // Call the parent's end session handler
    if (onEndSession) {
      onEndSession();
    }
  };

  const containerClasses = isFullscreen
    ? "fixed inset-0 z-[9999] bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-indigo-950/20"
    : "h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-indigo-950/20";

  return (
    <div className={containerClasses}>
      {/* Header Controls */}
      <div className="absolute top-6 right-6 z-10 flex space-x-3">
        {isFullscreen ? (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Minimize className="w-4 h-4 mr-2" />
            Minimize
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Maximize className="w-4 h-4 mr-2" />
            Full Screen
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={toggleMute}
          className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 ${
            isMuted
              ? "text-red-600 hover:text-red-700"
              : "text-gray-600 hover:text-gray-700"
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNewSession}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          New Session
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleEndSession}
          className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 text-red-600 hover:text-red-700"
        >
          <X className="w-4 h-4 mr-2" />
          End Session
        </Button>
      </div>

      <div className="h-full flex">
        {/* Therapist Side */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          <div className="text-center space-y-8 max-w-lg">
            {/* Therapist Avatar with Enhanced Animation */}
            <div className="relative flex items-center justify-center">
              {/* Outer animated rings */}
              {isTherapistSpeaking && (
                <>
                  <div className="absolute w-40 h-40 rounded-full border-2 border-blue-300/30 animate-ping"></div>
                  <div className="absolute w-36 h-36 rounded-full border-2 border-blue-400/40 animate-ping animation-delay-75"></div>
                  <div className="absolute w-32 h-32 rounded-full border-2 border-blue-500/50 animate-ping animation-delay-150"></div>
                </>
              )}

              {/* Thinking animation */}
              {isLoading && (
                <div className="absolute w-36 h-36 rounded-full border-2 border-purple-400/40 animate-spin opacity-60"></div>
              )}

              {/* Main Avatar */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl z-10 transform transition-transform duration-300 hover:scale-105">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Therapist Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Dr. Sage
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  AI Therapy Companion
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isTherapistSpeaking
                      ? "bg-blue-500 animate-pulse shadow-lg shadow-blue-200"
                      : isLoading
                      ? "bg-orange-500 animate-pulse shadow-lg shadow-orange-200"
                      : "bg-green-500 shadow-lg shadow-green-200"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isTherapistSpeaking
                      ? "text-blue-600 dark:text-blue-400"
                      : isLoading
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {isTherapistSpeaking
                    ? "Speaking"
                    : isLoading
                    ? "Thinking"
                    : "Listening"}
                </span>
              </div>
            </div>

            {/* Current Message Card */}
            <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {isLoading
                        ? "Let me think about what you've shared..."
                        : lastTherapistMessage}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Therapist Controls */}
            {isTherapistSpeaking && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopSpeaking}
                className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pause Speaking
              </Button>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gradient-to-b from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>

        {/* User Side */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
          <div className="text-center space-y-8 max-w-lg">
            {/* User Avatar with Enhanced Animation */}
            <div className="relative flex items-center justify-center">
              {/* Outer animated rings */}
              {isUserSpeaking && (
                <>
                  <div className="absolute w-40 h-40 rounded-full border-2 border-green-300/30 animate-ping"></div>
                  <div className="absolute w-36 h-36 rounded-full border-2 border-green-400/40 animate-ping animation-delay-75"></div>
                  <div className="absolute w-32 h-32 rounded-full border-2 border-green-500/50 animate-ping animation-delay-150"></div>
                </>
              )}

              {/* Main Avatar */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 via-teal-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl z-10 transform transition-transform duration-300 hover:scale-105">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  You
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Share what's on your mind
                </p>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isRecording
                      ? "bg-red-500 animate-pulse shadow-lg shadow-red-200"
                      : "bg-gray-400 shadow-lg shadow-gray-200"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isRecording
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {isRecording ? "Recording" : "Ready to speak"}
                </span>
              </div>
            </div>

            {/* Current Transcript/Message Card */}
            {/* <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0 shadow-2xl min-h-[140px]">
              <CardContent className="p-6 flex items-center justify-center">
                <div className="text-center">
                  {currentTranscript || lastUserMessage ? (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-left">
                        {currentTranscript || lastUserMessage}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto">
                        <Mic className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card> */}

            {/* Voice Controls */}
            <div className="space-y-6">
              <Button
                size="lg"
                onClick={toggleRecording}
                disabled={isLoading || isTherapistSpeaking}
                className={`w-20 h-20 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl ${
                  isRecording
                    ? "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-200"
                    : "bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-green-200"
                } disabled:transform-none disabled:hover:scale-100 disabled:opacity-50`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isRecording
                    ? "Click to stop recording"
                    : "Click to start speaking"}
                </p>
                {(isLoading || isTherapistSpeaking) && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Please wait for Dr. Sage to finish
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
