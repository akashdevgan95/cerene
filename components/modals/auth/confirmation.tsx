"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Mail, ArrowRight, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// components
import { client } from "@/utils/supabase/client";

interface ConfirmationModalProps {
  email: string;
  firstName: string;
  switchMode: (mode: "signin" | "signup" | "confirmation-email-sent") => void;
}

export function Confirmation({
  email,
  firstName,
  switchMode,
}: ConfirmationModalProps) {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    setIsResending(true);

    // Simulate resending email
    const { data, error } = await client.auth.resend({
      email: email,
      type: "signup",
    });

    if (error) {
      toast.error("Failed to resend email. Please try again later.");
      setIsResending(false);
      return;
    }

    if (data) {
      setIsResending(false);
      toast.success("Email resent successfully");
    }
  };

  const handleSignIn = () => {
    switchMode("signin");
  };

  const handleCheckEmail = () => {
    // Open default email client
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="space-y-6">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-200 dark:bg-green-900/20 rounded-full flex items-center justify-center">
          <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
        </div>
      </div>

      {/* Main Message */}
      <div className="text-center space-y-3">
        <h3 className="text-lg font-semibold">
          Welcome to MindfulAI, {firstName}!
        </h3>
        <p className="text-muted-foreground">
          We've sent a confirmation email to:
        </p>
        <p className="font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
          {email}
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
        <h4 className="font-medium flex items-center">
          <Mail className="w-4 h-4 mr-2 text-blue-600" />
          Next Steps:
        </h4>
        <ol className="text-sm text-muted-foreground space-y-2 ml-6">
          <li className="flex items-start">
            <span className="font-medium text-blue-600 mr-2">1.</span>
            Check your email inbox (and spam folder)
          </li>
          <li className="flex items-start">
            <span className="font-medium text-blue-600 mr-2">2.</span>
            Click the confirmation link in the email
          </li>
          <li className="flex items-start">
            <span className="font-medium text-blue-600 mr-2">3.</span>
            After clicking the confirmation link, you will be redirected to the
            MindfulAI homepage
          </li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleCheckEmail}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Mail className="w-4 h-4 mr-2" />
          Open Email App
        </Button>

        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={isResending || countdown > 0}
            className="flex-1"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : countdown > 0 ? (
              `Resend in ${countdown}s`
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Email
              </>
            )}
          </Button>

          <Button variant="outline" onClick={handleSignIn} className="flex-1">
            <ArrowRight className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          Didn't receive the email? Check your spam folder or{" "}
          <button
            onClick={handleResendEmail}
            disabled={countdown > 0}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 underline"
          >
            resend confirmation
          </button>
        </p>
      </div>
    </div>
  );
}

export default Confirmation;
