"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

//components
import SignIn from "./signin";
import SignUp from "./signup";
import Confirmation from "./confirmation";
import ForgotPassword from "./forgot-password";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?:
    | "signin"
    | "signup"
    | "confirmation-email-sent"
    | "forgot-password";
}

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = "signin",
}: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");

  const [mode, setMode] = useState<
    "signin" | "signup" | "confirmation-email-sent" | "forgot-password"
  >(defaultMode);

  const switchMode = (
    newMode: "signin" | "signup" | "confirmation-email-sent" | "forgot-password"
  ) => {
    setMode(newMode);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CereneAI
            </span>
          </div>
          <DialogTitle className="text-2xl">
            {mode === "signin" && "Welcome Back"}
            {mode === "signup" && "Create Account"}
            {mode === "forgot-password" && "Reset Password"}
          </DialogTitle>
          <p className="text-muted-foreground">
            {mode === "signin" &&
              "Sign in to continue your mental wellness journey"}
            {mode === "signup" && "Start your mental wellness journey today"}
            {mode === "forgot-password" &&
              "Enter your email address and we'll send you instructions to reset your password"}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {mode === "signin" && (
            <SignIn onClose={onClose} switchMode={switchMode} />
          )}
          {mode === "signup" && (
            <SignUp
              switchMode={switchMode}
              setEmail={setEmail}
              setFirstName={setFirstName}
            />
          )}
          {mode === "forgot-password" && (
            <ForgotPassword switchMode={switchMode} />
          )}
        </div>
        {mode === "confirmation-email-sent" && (
          <Confirmation
            email={email}
            firstName={firstName}
            switchMode={switchMode}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
