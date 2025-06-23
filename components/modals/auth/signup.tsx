import React, { useState } from "react";
import { client } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, User } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { toast } from "sonner";

export default function SignUp({
  switchMode,
  setEmail,
  setFirstName,
}: {
  switchMode: (mode: "signin" | "signup" | "confirmation-email-sent") => void;
  setEmail: (email: string) => void;
  setFirstName: (firstName: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    subscribeNewsletter: true,
  });

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (!signUpData.agreeToTerms || !signUpData.agreeToPrivacy) {
      toast.error("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);

    const { data, error } = await client.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
      options: {
        data: {
          first_name: signUpData.firstName,
          last_name: signUpData.lastName,
          subscribe_newsletter: signUpData.subscribeNewsletter,
          agree_to_terms: signUpData.agreeToTerms,
          agree_to_privacy: signUpData.agreeToPrivacy,
        },
      },
    });

    if (error) {
      toast.error("Failed to create account. Please try again later.");
      setIsLoading(false);
      return;
    }

    if (data.user) {
      setIsLoading(false);
      setEmail(signUpData.email);
      setFirstName(signUpData.firstName);
      switchMode("confirmation-email-sent");
    }
  };

  const handleSignUpChange = (field: string, value: string | boolean) => {
    setSignUpData((prev) => ({ ...prev, [field]: value }));
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 2) return "bg-red-500";
    if (strength < 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 2) return "Weak";
    if (strength < 4) return "Medium";
    return "Strong";
  };
  return (
    <form onSubmit={handleSignUpSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="John"
              value={signUpData.firstName}
              onChange={(e) => handleSignUpChange("firstName", e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            value={signUpData.lastName}
            onChange={(e) => handleSignUpChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-email"
            type="email"
            placeholder="your.email@example.com"
            value={signUpData.email}
            onChange={(e) => handleSignUpChange("email", e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={signUpData.password}
            onChange={(e) => handleSignUpChange("password", e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {signUpData.password && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getPasswordStrengthColor(
                    passwordStrength(signUpData.password)
                  )}`}
                  style={{
                    width: `${
                      (passwordStrength(signUpData.password) / 5) * 100
                    }%`,
                  }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {getPasswordStrengthText(passwordStrength(signUpData.password))}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={signUpData.confirmPassword}
            onChange={(e) =>
              handleSignUpChange("confirmPassword", e.target.value)
            }
            className="pl-10 pr-10"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {signUpData.confirmPassword &&
          signUpData.password !== signUpData.confirmPassword && (
            <p className="text-sm text-red-600 dark:text-red-400">
              Passwords don't match
            </p>
          )}
        {signUpData.confirmPassword &&
          signUpData.password === signUpData.confirmPassword && (
            <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
              <Check className="w-4 h-4 mr-1" />
              Passwords match
            </p>
          )}
      </div>

      {/* Agreements */}
      <div className="space-y-3">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={signUpData.agreeToTerms}
            onCheckedChange={(checked) =>
              handleSignUpChange("agreeToTerms", checked as boolean)
            }
            className="mt-1"
          />
          <Label htmlFor="agreeToTerms" className="text-sm leading-5">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Terms of Service
            </Link>
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="agreeToPrivacy"
            checked={signUpData.agreeToPrivacy}
            onCheckedChange={(checked) =>
              handleSignUpChange("agreeToPrivacy", checked as boolean)
            }
            className="mt-1"
          />
          <Label htmlFor="agreeToPrivacy" className="text-sm leading-5">
            I agree to the{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="subscribeNewsletter"
            checked={signUpData.subscribeNewsletter}
            onCheckedChange={(checked) =>
              handleSignUpChange("subscribeNewsletter", checked as boolean)
            }
            className="mt-1"
          />
          <Label htmlFor="subscribeNewsletter" className="text-sm leading-5">
            I'd like to receive updates about new features and mental health
            tips
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        disabled={
          isLoading || !signUpData.agreeToTerms || !signUpData.agreeToPrivacy
        }
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          <ArrowRight className="w-4 h-4 mr-2" />
        )}
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => switchMode("signin")}
            className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
}
