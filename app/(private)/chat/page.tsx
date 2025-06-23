"use client"

import { useState } from "react"
import { SessionStartScreen } from "@/components/session-start-screen"
import { VoiceChatScreen } from "@/components/voice-chat-screen"

export default function ChatPage() {
  const [sessionStarted, setSessionStarted] = useState(false)
  const [sessionContext, setSessionContext] = useState<{
    issues: string[]
    customIssue?: string
  } | null>(null)

  const handleStartSession = (selectedIssues: string[], customIssue?: string) => {
    setSessionContext({
      issues: selectedIssues,
      customIssue,
    })
    setSessionStarted(true)
  }

  const handleEndSession = () => {
    setSessionStarted(false)
    setSessionContext(null)
  }

  if (!sessionStarted) {
    return <SessionStartScreen onStartSession={handleStartSession} />
  }

  return <VoiceChatScreen sessionContext={sessionContext} onEndSession={handleEndSession} />
}
