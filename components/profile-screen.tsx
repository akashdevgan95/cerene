"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, CheckCircle, CreditCard } from "lucide-react";

//components
import Profile from "@/components/pages/profile/profile";
import Preferences from "@/components/pages/profile/preferences";
import Notifications from "@/components/pages/profile/notifications";
import Privacy from "@/components/pages/profile/privacy";

export function ProfileScreen() {
  return (
    <div className="h-[calc(100vh-2rem)] bg-background overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Profile Information */}
        <Profile />

        {/* Therapy Preferences */}
        <Preferences />

        {/* Subscription */}
        <Card className="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-foreground">
              <Crown className="w-5 h-5 text-primary" />
              <span>Subscription</span>
              <Badge className="bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-700">
                Premium
              </Badge>
            </CardTitle>
            <CardDescription>
              Manage your subscription and billing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Premium Plan</p>
                <p className="text-sm text-muted-foreground">
                  $29.99/month • Renews on Jan 25, 2024
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-green-600 dark:text-green-400">
                  Active
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1 border-border">
                <CreditCard className="w-4 h-4 mr-2" />
                Billing
              </Button>
              <Button variant="outline" className="flex-1 border-border">
                Change Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Notifications />

        {/* Privacy & Security */}
        <Privacy />
      </div>
    </div>
  );
}
