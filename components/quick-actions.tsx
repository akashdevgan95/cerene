"use client"

import { Button } from "@/components/ui/button"
import { Heart, Zap, AlertTriangle, MessageCircle, Brain, Smile } from "lucide-react"

interface QuickActionsProps {
  onActionClick: (message: string) => void
  disabled?: boolean
}

const quickActions = [
  {
    label: "I'm feeling anxious",
    icon: Heart,
    message: "I'm feeling anxious right now and could use some support.",
    color: "text-red-600",
  },
  {
    label: "Need coping strategies",
    icon: Brain,
    message: "I'm looking for some coping strategies to help me manage my current situation.",
    color: "text-blue-600",
  },
  {
    label: "Feeling overwhelmed",
    icon: Zap,
    message: "I'm feeling overwhelmed and don't know how to handle everything right now.",
    color: "text-orange-600",
  },
  {
    label: "Having a good day",
    icon: Smile,
    message: "I'm actually having a pretty good day today and wanted to share that.",
    color: "text-green-600",
  },
  {
    label: "Need to talk",
    icon: MessageCircle,
    message: "I just need someone to talk to right now.",
    color: "text-purple-600",
  },
  {
    label: "Crisis support",
    icon: AlertTriangle,
    message: "I'm in crisis and need immediate support and resources.",
    color: "text-red-700",
  },
]

export function QuickActions({ onActionClick, disabled = false }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {quickActions.map((action) => (
        <Button
          key={action.label}
          variant="outline"
          size="sm"
          className="rounded-full hover:bg-muted"
          onClick={() => onActionClick(action.message)}
          disabled={disabled}
        >
          <action.icon className={`w-4 h-4 mr-2 ${action.color}`} />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
