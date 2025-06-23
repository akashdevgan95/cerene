import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

//client
import { client } from "@/utils/supabase/client";

export default function ForgotPassword({
  switchMode,
}: {
  switchMode: (
    mode: "signin" | "signup" | "confirmation-email-sent" | "forgot-password"
  ) => void;
}) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async () => {
    setIsLoading(true);
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/profile?view=reset-password`,
    });

    if (error) {
      toast.error("Failed to send reset instructions");
      setIsLoading(false);
      return;
    }

    toast.success("Reset instructions sent to your email");
    setIsLoading(false);
    switchMode("signin");
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="forgot-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="forgot-email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <Button
        type="button"
        onClick={handleForgotPassword}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <Mail className="w-4 h-4 mr-2" />
        )}
        {isLoading ? "Sending..." : "Send Reset Instructions"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => {
              switchMode("signin");
            }}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </>
  );
}
