"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loading } from "@/components/ui/loaders/loading";
import { Skeleton } from "@/components/ui/loaders/skeleton";

export default function LoadingExamplesPage() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [apiLoading, setApiLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOverlayDemo = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 3000);
  };

  const handleApiDemo = () => {
    setApiLoading(true);
    setTimeout(() => setApiLoading(false), 2000);
  };

  const handleButtonDemo = () => {
    setButtonLoading(true);
    setTimeout(() => setButtonLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-purple-50 to-primary/10 dark:from-background dark:via-purple-950/20 dark:to-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Loading Components
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive showcase of all loading states and animations
          </p>
        </div>

        {/* Loading Variants */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Loading Variants</CardTitle>
            <CardDescription>
              Different animation styles for various use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              <div className="text-center space-y-4">
                <Loading variant="spinner" size="lg" />
                <p className="text-sm font-medium">Spinner</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="dots" size="lg" />
                <p className="text-sm font-medium">Dots</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="pulse" size="lg" />
                <p className="text-sm font-medium">Pulse</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="bars" size="lg" />
                <p className="text-sm font-medium">Bars</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="ring" size="lg" />
                <p className="text-sm font-medium">Ring</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Size Variations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Size Variations</CardTitle>
            <CardDescription>
              Different sizes for different contexts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <Loading variant="spinner" size="sm" />
                <p className="text-sm font-medium">Small</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="spinner" size="md" />
                <p className="text-sm font-medium">Medium</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="spinner" size="lg" />
                <p className="text-sm font-medium">Large</p>
              </div>
              <div className="text-center space-y-4">
                <Loading variant="spinner" size="xl" />
                <p className="text-sm font-medium">Extra Large</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading with Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Loading with Text</CardTitle>
            <CardDescription>
              Loading indicators with descriptive messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Loading variant="spinner" size="md" text="Loading..." />
              </div>
              <div className="text-center">
                <Loading variant="dots" size="md" text="Saving changes..." />
              </div>
              <div className="text-center">
                <Loading variant="pulse" size="md" text="Processing..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skeleton Placeholders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">
              Skeleton Placeholders
            </CardTitle>
            <CardDescription>
              Content placeholders while data loads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Profile Card Skeleton */}
              <div className="space-y-4">
                <h4 className="font-medium">Profile Card</h4>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              </div>

              {/* List Items Skeleton */}
              <div className="space-y-4">
                <h4 className="font-medium">List Items</h4>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[80%]" />
                  <Skeleton className="h-4 w-[95%]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Demos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Interactive Demos</CardTitle>
            <CardDescription>
              Click buttons to see loading states in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-4">
                <Button onClick={handleOverlayDemo} className="w-full">
                  Show Overlay Loading
                </Button>
                <p className="text-sm text-muted-foreground">
                  Full-screen overlay with backdrop
                </p>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={handleApiDemo}
                  variant="outline"
                  className="w-full"
                >
                  Simulate API Call
                </Button>
                {apiLoading && (
                  <div className="p-4 border rounded-lg">
                    <Loading variant="dots" text="Fetching data..." />
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  Shows loading state for 2 seconds
                </p>
              </div>

              <div className="text-center space-y-4">
                <Button
                  onClick={handleButtonDemo}
                  disabled={buttonLoading}
                  className="w-full"
                >
                  {buttonLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loading variant="spinner" size="sm" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Button Loading State"
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Button with integrated loading
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-world Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Real-world Examples</CardTitle>
            <CardDescription>
              Practical implementations you can use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Loading */}
              <div className="space-y-4">
                <h4 className="font-medium">Form Submission</h4>
                <div className="space-y-3 p-4 border rounded-lg">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <div className="flex justify-end">
                    <div className="flex items-center space-x-2">
                      <Loading variant="spinner" size="sm" />
                      <span className="text-sm">Submitting...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Loading */}
              <div className="space-y-4">
                <h4 className="font-medium">Data Fetching</h4>
                <div className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-center py-8">
                    <Loading
                      variant="ring"
                      size="lg"
                      text="Loading therapy sessions..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overlay Demo */}
      {showOverlay && (
        <Loading
          overlay
          variant="ring"
          size="lg"
          text="Loading your mindful experience..."
        />
      )}
    </div>
  );
}
