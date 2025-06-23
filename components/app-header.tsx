"use client";

import { Bell, Search, User, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSidebar, SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

//hooks
import useAuth from "@/hooks/use-auth";

//client
import { client } from "@/utils/supabase/client";

interface AppHeaderProps {
  userName?: string;
  userAvatar?: string;
}

const pageInfo = {
  chat: {
    title: "AI Therapy Session",
    subtitle: "Your safe space for mental wellness conversations",
  },
  history: {
    title: "Session History",
    subtitle: "Review your therapy sessions and progress",
  },
  insights: {
    title: "Health Insights",
    subtitle: "Discover patterns in your mental wellness journey",
  },
  profile: {
    title: "Profile & Settings",
    subtitle: "Manage your account and preferences",
  },
};

export function AppHeader({ userAvatar }: AppHeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useAuth();
  const firstName = user?.user_metadata.first_name;

  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop() || "chat";
  const currentPageInfo =
    pageInfo[currentPage as keyof typeof pageInfo] || pageInfo.chat;

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-700/50 sticky top-0 z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Sidebar Toggle + Page Title */}
          <div className="flex items-center space-x-4">
            {/* Sidebar Toggle Button */}
            <SidebarTrigger />

            {/* Page Title Section */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentPageInfo.title}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {currentPageInfo.subtitle}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors duration-200">
              <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors duration-200">
              <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {userAvatar ? (
                    <img
                      src={userAvatar || "/placeholder.svg"}
                      alt={firstName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {firstName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Premium Member
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-slate-700/50 py-2 z-50">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                  >
                    View Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                  >
                    Account Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                  >
                    Billing
                  </a>
                  <hr className="my-2 border-gray-200 dark:border-slate-700" />
                  <a
                    className="block cursor-pointer px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                    onClick={(e) => {
                      e.preventDefault();
                      client.auth.signOut();
                    }}
                  >
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
