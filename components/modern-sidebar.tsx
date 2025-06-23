"use client"

import { useState, useEffect } from "react"
import { Home, FolderOpen, BarChart3, User, Settings, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

interface SidebarProps {
  activeItem?: string
  onItemClick?: (itemId: string) => void
}

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "sessions", label: "Sessions", icon: FolderOpen },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
]

export function ModernSidebar({ activeItem = "home", onItemClick }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleItemClick = (itemId: string) => {
    onItemClick?.(itemId)
  }

  return (
    <div
      className={`
        fixed left-0 top-0 h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md
        border-r border-gray-200/50 dark:border-slate-700/50
        transition-all duration-300 ease-in-out z-50
        ${isExpanded ? "w-64" : "w-16"}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200/30 dark:border-slate-700/30">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <div
            className={`
              transition-all duration-300 ease-in-out
              ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
            `}
          >
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">TherapyAI</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">AI Companion</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-2 flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center space-x-3 px-3 py-3 rounded-xl
                    transition-all duration-200 ease-in-out
                    hover:bg-gray-100 dark:hover:bg-slate-800/50
                    ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-600 dark:text-gray-300"
                    }
                    ${isExpanded ? "justify-start" : "justify-center"}
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className={`
                      font-medium text-sm transition-all duration-300 ease-in-out
                      ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200/30 dark:border-slate-700/30">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          disabled={!mounted}
          className={`
            w-full flex items-center space-x-3 px-3 py-3 rounded-xl
            transition-all duration-200 ease-in-out
            hover:bg-gray-100 dark:hover:bg-slate-800/50
            text-gray-600 dark:text-gray-300
            ${isExpanded ? "justify-start" : "justify-center"}
          `}
        >
          {mounted && (
            <>
              <Sun className="w-5 h-5 flex-shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-5 h-5 flex-shrink-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </>
          )}
          <span
            className={`
              font-medium text-sm transition-all duration-300 ease-in-out
              ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
            `}
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </span>
        </button>

        {/* Disclaimer */}
        <div
          className={`
            mt-4 transition-all duration-300 ease-in-out
            ${isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
        >
          <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
            Not a replacement for professional therapy
          </p>
        </div>
      </div>
    </div>
  )
}
