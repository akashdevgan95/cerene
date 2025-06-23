"use client"

import { useState } from "react"
import { ModernSidebar } from "./modern-sidebar"
import { AppHeader } from "./app-header"

export function DemoApp() {
  const [activeItem, setActiveItem] = useState("home")

  const getPageContent = () => {
    switch (activeItem) {
      case "home":
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Sessions</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">📅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mood Score</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">8.2</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-xl">😊</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Streak</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">12 days</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                    <span className="text-purple-600 dark:text-purple-400 text-xl">🔥</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Completed therapy session - Anxiety Management
                  </p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mood check-in recorded</p>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Completed mindfulness exercise</p>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        )
      case "sessions":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Upcoming Sessions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your next session is scheduled for tomorrow at 3:00 PM.
              </p>
            </div>
          </div>
        )
      case "insights":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your mood has improved by 15% this week. Great progress!
              </p>
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
              <p className="text-gray-600 dark:text-gray-300">Manage your personal information and preferences.</p>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-200/50 dark:border-slate-700/50">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">App Preferences</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Customize your therapy experience and notification settings.
              </p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
      <ModernSidebar activeItem={activeItem} onItemClick={setActiveItem} />

      {/* Main Content Area */}
      <div className="ml-16 transition-all duration-300">
        <AppHeader currentPage={activeItem} userName="Sarah Johnson" />

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto">{getPageContent()}</div>
        </main>
      </div>
    </div>
  )
}
