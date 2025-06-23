"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Crown,
  Sparkles,
  CreditCard,
  Shield,
  Clock,
  Users,
  X,
  Star,
} from "lucide-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: "basic" | "premium" | "family";
}

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9.99",
    period: "month",
    description: "Perfect for getting started with AI therapy",
    features: [
      "Unlimited text conversations",
      "Basic mood tracking",
      "Daily check-ins",
      "Email support",
      "Session history",
      "Basic insights",
    ],
    popular: false,
    color: "blue",
    savings: null,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$29.99",
    period: "month",
    description: "Full access to all therapy features",
    features: [
      "Everything in Basic",
      "Voice conversations",
      "Advanced insights & analytics",
      "Personalized therapy plans",
      "Crisis support",
      "Priority support",
      "Unlimited sessions",
      "Export session data",
    ],
    popular: true,
    color: "purple",
    savings: "Most Popular",
  },
  {
    id: "family",
    name: "Family",
    price: "$49.99",
    period: "month",
    description: "Support for the whole family",
    features: [
      "Everything in Premium",
      "Up to 4 family members",
      "Family therapy sessions",
      "Parental insights",
      "Teen-specific support",
      "Family dashboard",
      "Shared progress tracking",
    ],
    popular: false,
    color: "green",
    savings: "Best Value",
  },
];

export function SubscriptionModal({
  isOpen,
  onClose,
  selectedPlan = "premium",
}: SubscriptionModalProps) {
  const [currentPlan, setCurrentPlan] = useState(selectedPlan);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planId: string) => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert(
        `Successfully subscribed to ${
          plans.find((p) => p.id === planId)?.name
        } plan!`
      );
      onClose();
    }, 2000);
  };

  const getYearlyPrice = (monthlyPrice: string) => {
    const monthly = Number.parseFloat(monthlyPrice.replace("$", ""));
    const yearly = monthly * 12 * 0.8; // 20% discount
    return `$${yearly.toFixed(2)}`;
  };

  const getYearlyMonthlyPrice = (monthlyPrice: string) => {
    const monthly = Number.parseFloat(monthlyPrice.replace("$", ""));
    const yearlyMonthly = monthly * 0.8; // 20% discount
    return `$${yearlyMonthly.toFixed(2)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CereneAI
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogTitle className="text-3xl font-bold">
            Choose Your Plan
          </DialogTitle>
          <p className="text-muted-foreground text-lg">
            Unlock the full potential of AI therapy with premium features
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <span
              className={`text-sm ${
                billingCycle === "monthly"
                  ? "font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "yearly" : "monthly"
                )
              }
              className={`relative w-12 h-6 rounded-full p-0 ${
                billingCycle === "yearly" ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full transition-transform ${
                  billingCycle === "yearly"
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }`}
              />
            </Button>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm ${
                  billingCycle === "yearly"
                    ? "font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                Yearly
              </span>
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                Save 20%
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                plan.popular
                  ? "border-purple-500 scale-105 shadow-lg"
                  : currentPlan === plan.id
                  ? "border-blue-500"
                  : "border-border hover:border-blue-300"
              }`}
              onClick={() => setCurrentPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}

              {plan.savings && !plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white">
                  {plan.savings}
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {billingCycle === "yearly"
                      ? getYearlyMonthlyPrice(plan.price)
                      : plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /{billingCycle === "yearly" ? "month" : plan.period}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div className="text-sm text-muted-foreground">
                      Billed {getYearlyPrice(plan.price)} yearly
                    </div>
                  )}
                  <p className="text-muted-foreground text-sm">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isProcessing}
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                      : plan.id === "family"
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      : ""
                  }`}
                  variant={
                    plan.popular || plan.id === "family" ? "default" : "outline"
                  }
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <CreditCard className="w-4 h-4 mr-2" />
                  )}
                  {isProcessing ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Trial Info */}
        <div className="text-center mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <Sparkles className="w-4 h-4 inline mr-1" />
            Start with a 7-day free trial • No credit card required • Cancel
            anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
