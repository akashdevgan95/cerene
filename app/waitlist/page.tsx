"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  CheckCircle,
  Mail,
  Users,
  Star,
  Shield,
  Clock,
  MessageCircle,
  Brain,
  BarChart3,
  AlertTriangle,
  Twitter,
  Facebook,
  Linkedin,
  ArrowLeft,
  KeyRound,
} from "lucide-react";
import { Loading } from "@/components/ui/loaders/loading";
import { WaitlistConfirmationEmail } from "@/emailTemplates/waitlist-confirmation-email";
import { WaitlistOTPEmail } from "@/emailTemplates/waitlist-otp-email";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

function SuccessModal({ isOpen, onClose, email }: SuccessModalProps) {
  if (!isOpen) return null;

  const shareText =
    "I just joined the Cerene waitlist for AI-powered therapy! 🧠✨";
  const shareUrl = "https://cerene.com/waitlist";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Welcome to Cerene!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for joining our waitlist. Your email{" "}
              <span className="font-semibold text-primary">{email}</span> has
              been verified successfully!
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold mb-2">What's Next?</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• You're on the waitlist</li>
                <li>• Beta access starts in 4-6 weeks</li>
                <li>• We'll email you when it's ready</li>
                <li>• Share with friends</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">
                Share with friends to get early access:
              </p>
              <div className="flex justify-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        shareText
                      )}&url=${encodeURIComponent(shareUrl)}`,
                      "_blank"
                    )
                  }
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareUrl
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        shareUrl
                      )}`,
                      "_blank"
                    )
                  }
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button onClick={onClose} className="w-full">
              Got it, thanks!
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface OTPVerificationProps {
  email: string;
  onSuccess: () => void;
  onBack: () => void;
}

function OTPVerification({ email, onSuccess, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const result = await res.json();

    setIsLoading(false);

    if (res.ok && result.success) {
      onSuccess();
    } else {
      setError(result.error || "Invalid OTP. Please try again.");
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError("");

    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();
    setIsResending(false);

    if (!res.ok || !result.sent) {
      setError("Failed to resend OTP. Try again later.");
      return;
    }

    setResendCooldown(60);

    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <KeyRound className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code to{" "}
          <span className="font-semibold text-primary">{email}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={handleOtpChange}
            className="h-12 text-center text-2xl font-mono tracking-widest"
            disabled={isLoading}
            maxLength={6}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-12 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          disabled={isLoading || otp.length !== 6}
        >
          {isLoading ? (
            <>
              <Loading size="sm" className="mr-2" />
              Verifying...
            </>
          ) : (
            "Verify & Join Waitlist"
          )}
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleResendOTP}
            disabled={isResending || resendCooldown > 0}
          >
            {isResending ? (
              <>
                <Loading size="sm" className="mr-2" />
                Sending...
              </>
            ) : resendCooldown > 0 ? (
              `Resend in ${resendCooldown}s`
            ) : (
              "Resend OTP"
            )}
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="w-full"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Email
        </Button>
      </form>
    </div>
  );
}

interface WaitlistFormProps {
  onOTPSent: (email: string) => void;
}

function WaitlistForm({ onOTPSent }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    setIsLoading(false);

    if (res.ok && result.sent) {
      onOTPSent(email);
    } else {
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 text-base"
            disabled={isLoading}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-12 px-8 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loading size="sm" className="mr-2" />
              Sending OTP...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Join Waitlist
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        <Users className="inline h-4 w-4 mr-1" />
        Join 10,000+ people already on the waitlist
      </p>
    </form>
  );
}

export default function WaitlistPage() {
  const [step, setStep] = useState<"email" | "otp" | "success">("email");
  const [email, setEmail] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOTPSent = (userEmail: string) => {
    setEmail(userEmail);
    setStep("otp");
  };

  const handleOTPSuccess = () => {
    setStep("success");
    setShowSuccessModal(true);
  };

  const handleBackToEmail = () => {
    setStep("email");
    setEmail("");
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Therapy",
      description:
        "Advanced AI that understands your emotions and provides personalized therapeutic support.",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Get support whenever you need it, day or night. Your mental health doesn't wait.",
    },
    {
      icon: MessageCircle,
      title: "Voice & Text Chat",
      description:
        "Choose how you want to communicate - through voice conversations or text messages.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description:
        "HIPAA-compliant platform with end-to-end encryption. Your conversations stay private.",
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description:
        "Monitor your mental health journey with detailed insights and progress reports.",
    },
    {
      icon: AlertTriangle,
      title: "Crisis Support",
      description:
        "Immediate crisis detection and connection to human professionals when needed.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Beta User",
      content:
        "Cerene has been a game-changer for my anxiety. Having 24/7 support has given me so much peace of mind.",
      rating: 5,
    },
    {
      name: "David L.",
      role: "Early Adopter",
      content:
        "The AI therapist feels so natural and understanding. It's like having a professional therapist in my pocket.",
      rating: 5,
    },
    {
      name: "Maria R.",
      role: "Beta Tester",
      content:
        "I was skeptical at first, but the personalized responses and genuine care from the AI surprised me.",
      rating: 5,
    },
  ];

  const whyJoinReasons = [
    {
      icon: Star,
      title: "Early Access",
      description:
        "Be among the first to experience the future of mental health support.",
    },
    {
      icon: Users,
      title: "Exclusive Benefits",
      description:
        "Founding members get lifetime discounts and premium features.",
    },
    {
      icon: MessageCircle,
      title: "Beta Testing",
      description: "Help shape the product with your feedback and suggestions.",
    },
    {
      icon: Shield,
      title: "Founding Member",
      description:
        "Special recognition and perks as one of our original supporters.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
                <Star className="h-4 w-4 mr-2" />
                Limited Beta Access Available
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
                The Future of Mental Health is Here
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Experience personalized AI therapy that understands you,
                supports you, and helps you grow. Available 24/7, completely
                private, and designed with your wellbeing in mind.
              </p>
            </div>

            <div className="max-w-md mx-auto mb-8">
              {step === "email" && <WaitlistForm onOTPSent={handleOTPSent} />}
              {step === "otp" && (
                <OTPVerification
                  email={email}
                  onSuccess={handleOTPSuccess}
                  onBack={handleBackToEmail}
                />
              )}
              {step === "success" && (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
                  <p className="text-muted-foreground">
                    Welcome to the Cerene waitlist. We'll be in touch soon!
                  </p>
                </div>
              )}
            </div>

            {step === "email" && (
              <p className="text-sm text-muted-foreground">
                No spam, ever. Unsubscribe at any time.
              </p>
            )}
          </div>
        </section>

        {/* Why Join Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Join the Waitlist?
              </h2>
              <p className="text-xl text-muted-foreground">
                Be part of the mental health revolution
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyJoinReasons.map((reason, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <reason.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Makes Cerene Special?
              </h2>
              <p className="text-xl text-muted-foreground">
                Advanced AI technology meets compassionate care
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-4 py-16 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Beta Users Say
              </h2>
              <p className="text-xl text-muted-foreground">
                Real stories from real people
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Mental Health?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of others who are already on the waitlist. Limited
              beta spots available.
            </p>

            <div className="max-w-md mx-auto mb-8">
              {step === "email" && <WaitlistForm onOTPSent={handleOTPSent} />}
              {step === "otp" && (
                <OTPVerification
                  email={email}
                  onSuccess={handleOTPSuccess}
                  onBack={handleBackToEmail}
                />
              )}
              {step === "success" && (
                <div className="text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
                  <p className="text-muted-foreground">
                    Welcome to the Cerene waitlist. We'll be in touch soon!
                  </p>
                </div>
              )}
            </div>

            {step === "email" && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Free to join
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  No commitment required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-purple-500 mr-2" />
                  Cancel anytime
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        email={email}
      />
    </div>
  );
}
