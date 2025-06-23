"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Download, Eye, MessageCircle } from "lucide-react";

interface Session {
  id: string;
  date: Date;
  duration: number;
  topics: string[];
  mood: "positive" | "neutral" | "negative";
  summary: string;
}

const sessions: Session[] = [
  {
    id: "1",
    date: new Date("2024-01-15"),
    duration: 45,
    topics: ["Anxiety", "Work Stress", "Coping Strategies"],
    mood: "neutral",
    summary:
      "Discussed work-related anxiety and explored breathing techniques for stress management.",
  },
  {
    id: "2",
    date: new Date("2024-01-12"),
    duration: 38,
    topics: ["Self-Care", "Mindfulness", "Daily Routine"],
    mood: "positive",
    summary:
      "Focused on building healthy daily routines and incorporating mindfulness practices.",
  },
  {
    id: "3",
    date: new Date("2024-01-08"),
    duration: 52,
    topics: ["Relationships", "Communication", "Boundaries"],
    mood: "negative",
    summary:
      "Explored relationship challenges and discussed strategies for setting healthy boundaries.",
  },
];

const getMoodColor = (mood: Session["mood"]) => {
  switch (mood) {
    case "positive":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "neutral":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    case "negative":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
  }
};

export function SessionsScreen() {
  return (
    <div className="h-[calc(100vh-2rem)] bg-background overflow-y-auto">
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          {sessions.map((session) => (
            <Card
              key={session.id}
              className="border border-border shadow-sm hover:shadow-md transition-shadow bg-card"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center space-x-2 text-card-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>
                        {session.date.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.duration} minutes</span>
                      </span>
                      <Badge
                        className={getMoodColor(session.mood)}
                        variant="secondary"
                      >
                        {session.mood} mood
                      </Badge>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-2">
                    Topics Discussed
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {session.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="outline"
                        className="rounded-full border-border"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-foreground mb-2">
                    Session Summary
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {session.summary}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-border bg-muted/50">
          <CardContent className="p-6 text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              Ready for your next session?
            </h3>
            <p className="text-muted-foreground mb-4">
              Continue your mental wellness journey with a new therapy session.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Start New Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
