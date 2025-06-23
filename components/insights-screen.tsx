"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Calendar,
  Heart,
  Brain,
  Target,
  Award,
} from "lucide-react";

const moodData = [
  { day: "Mon", mood: 7 },
  { day: "Tue", mood: 6 },
  { day: "Wed", mood: 8 },
  { day: "Thu", mood: 5 },
  { day: "Fri", mood: 7 },
  { day: "Sat", mood: 9 },
  { day: "Sun", mood: 8 },
];

const insights = [
  {
    title: "Mood Improvement",
    description: "Your mood has improved by 23% this week",
    icon: TrendingUp,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
  },
  {
    title: "Session Consistency",
    description: "You've maintained 4 sessions this week",
    icon: Calendar,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    title: "Stress Management",
    description: "Significant progress in coping strategies",
    icon: Heart,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
];

const goals = [
  { title: "Daily Mindfulness", progress: 85, target: "10 min/day" },
  { title: "Sleep Quality", progress: 72, target: "8 hours" },
  { title: "Stress Levels", progress: 68, target: "Reduce by 30%" },
  { title: "Social Connection", progress: 45, target: "3 interactions/week" },
];

export function InsightsScreen() {
  return (
    <div className="h-[calc(100vh-2rem)] bg-background overflow-y-auto">
      <div className="p-6 space-y-6">
        {/* Weekly Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight) => (
            <Card
              key={insight.title}
              className="border border-border shadow-sm bg-card"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                    <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-card-foreground">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mood Tracker */}
        <Card className="border border-border shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Brain className="w-5 h-5 text-primary" />
              <span>Weekly Mood Tracker</span>
            </CardTitle>
            <CardDescription>
              Your emotional well-being over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodData.map((data) => (
                <div key={data.day} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-foreground">
                    {data.day}
                  </div>
                  <div className="flex-1">
                    <Progress value={data.mood * 10} className="h-3" />
                  </div>
                  <div className="w-8 text-sm text-muted-foreground">
                    {data.mood}/10
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Insight:</strong> Your mood tends to improve towards the
                weekend. Consider incorporating weekend activities into your
                weekday routine.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Goals Progress */}
        <Card className="border border-border shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-card-foreground">
              <Target className="w-5 h-5 text-primary" />
              <span>Wellness Goals</span>
            </CardTitle>
            <CardDescription>
              Your progress towards mental health objectives
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {goals.map((goal) => (
                <div key={goal.title} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm text-card-foreground">
                      {goal.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="text-xs border-border"
                      >
                        {goal.target}
                      </Badge>
                      <span className="text-sm font-medium text-foreground">
                        {goal.progress}%
                      </span>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Award className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              <h3 className="text-lg font-semibold text-foreground">
                Recent Achievement
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Congratulations! You've completed 7 consecutive days of
              mindfulness practice.
            </p>
            <Badge className="bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700">
              Mindfulness Streak: 7 days
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
