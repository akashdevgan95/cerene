"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Brain, Users, Briefcase, Home, Smile, Shield, Heart, Plus, Sparkles } from "lucide-react"

interface SessionStartScreenProps {
  onStartSession: (selectedIssues: string[], customIssue?: string) => void
}

const therapyIssues = [
  {
    id: "anxiety",
    label: "Anxiety & Stress",
    icon: Zap,
    description: "Managing worry and overwhelming feelings",
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "depression",
    label: "Depression & Mood",
    icon: Brain,
    description: "Dealing with low mood and sadness",
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "relationships",
    label: "Relationships",
    icon: Users,
    description: "Family, friends, and romantic relationships",
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    id: "career",
    label: "Career & Work",
    icon: Briefcase,
    description: "Job stress and career decisions",
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    id: "family",
    label: "Family Issues",
    icon: Home,
    description: "Family dynamics and conflicts",
    color: "text-green-600 dark:text-green-400",
  },
  {
    id: "self-esteem",
    label: "Self-Esteem",
    icon: Smile,
    description: "Building confidence and self-worth",
    color: "text-yellow-600 dark:text-yellow-400",
  },
  {
    id: "trauma",
    label: "Trauma & PTSD",
    icon: Shield,
    description: "Processing difficult experiences",
    color: "text-red-600 dark:text-red-400",
  },
  {
    id: "addiction",
    label: "Addiction & Habits",
    icon: Heart,
    description: "Substance use and behavioral patterns",
    color: "text-indigo-600 dark:text-indigo-400",
  },
]

export function SessionStartScreen({ onStartSession }: SessionStartScreenProps) {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([])
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [customIssue, setCustomIssue] = useState("")

  const handleIssueToggle = (issueId: string) => {
    setSelectedIssues((prev) => {
      const isSelected = prev.includes(issueId)
      if (isSelected) {
        return prev.filter((id) => id !== issueId)
      } else if (prev.length < 3) {
        return [...prev, issueId]
      }
      return prev
    })
  }

  const handleStartSession = () => {
    onStartSession(selectedIssues, customIssue.trim() || undefined)
  }

  const canStartSession = selectedIssues.length > 0 || customIssue.trim()

  return (
    <div className="h-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-blue-950/30 dark:to-indigo-950/50">
      <div className="w-full max-w-4xl">
        <Card className="border-0 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg">
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Begin Your Session
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  What's on your mind today? Choose the areas you'd like to explore, or describe something specific
                  you're experiencing.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 px-8 pb-8">
                {/* Issue Selection Grid */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-950/30 px-4 py-2 rounded-full">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Selected: {selectedIssues.length}/3
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {therapyIssues.map((issue) => {
                      const isSelected = selectedIssues.includes(issue.id)
                      const isDisabled = !isSelected && selectedIssues.length >= 3

                      return (
                        <div
                          key={issue.id}
                          className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                            isSelected
                              ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-300 dark:border-blue-600 shadow-lg shadow-blue-100 dark:shadow-blue-900/20"
                              : isDisabled
                                ? "opacity-40 cursor-not-allowed bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
                                : "bg-white dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-700 hover:shadow-md"
                          }`}
                          onClick={() => !isDisabled && handleIssueToggle(issue.id)}
                        >
                          <div className="flex flex-col items-center text-center space-y-3">
                            <div
                              className={`p-3 rounded-xl ${isSelected ? "bg-white dark:bg-slate-800 shadow-sm" : "bg-gray-50 dark:bg-slate-700/50"}`}
                            >
                              <issue.icon
                                className={`w-6 h-6 ${isSelected ? issue.color : "text-gray-500 dark:text-gray-400"}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <h3
                                className={`font-semibold text-sm ${isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-gray-100"}`}
                              >
                                {issue.label}
                              </h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                {issue.description}
                              </p>
                            </div>
                          </div>

                          {/* Selection indicator */}
                          <div
                            className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                              isSelected ? "bg-blue-500 border-blue-500" : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {isSelected && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Custom Issue Section */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-slate-800/50 dark:to-blue-950/20 rounded-2xl p-6 border border-gray-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Something else on your mind?</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Describe what you'd like to discuss today
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCustomInput(!showCustomInput)}
                      className="rounded-full border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      {showCustomInput ? "Hide" : "Add Custom"}
                    </Button>
                  </div>

                  {showCustomInput && (
                    <div className="space-y-3">
                      <textarea
                        value={customIssue}
                        onChange={(e) => setCustomIssue(e.target.value)}
                        placeholder="Tell me what's been on your mind lately..."
                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200"
                        rows={3}
                        maxLength={200}
                      />
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Share as much or as little as you're comfortable with
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500">{customIssue.length}/200</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Session Summary */}
                {(selectedIssues.length > 0 || customIssue.trim()) && (
                  <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Today's Session Focus</h4>
                        <div className="space-y-2">
                          {selectedIssues.map((issueId) => {
                            const issue = therapyIssues.find((i) => i.id === issueId)
                            return (
                              <div key={issueId} className="flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                                <span className="text-sm text-blue-800 dark:text-blue-200">{issue?.label}</span>
                              </div>
                            )
                          })}
                          {customIssue.trim() && (
                            <div className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                                {customIssue.trim()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={handleStartSession}
                    disabled={!canStartSession}
                    className="flex-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Begin Therapy Session
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => onStartSession([], undefined)}
                    className="sm:w-auto px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 font-medium transition-all duration-200"
                  >
                    Start General Session
                  </Button>
                </div>

                {/* Help Text */}
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Don't worry - you can always change direction during our conversation
                  </p>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
