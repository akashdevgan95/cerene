"use client";

import {
  MessageCircle,
  History,
  BarChart3,
  User,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

//client
import { client } from "@/utils/supabase/client";

type AppSidebarProps = {};

const menuItems = [
  {
    title: "Chat",
    icon: MessageCircle,
    href: "/chat",
  },
  {
    title: "History",
    icon: History,
    href: "/history",
  },
  {
    title: "Insights",
    icon: BarChart3,
    href: "/insights",
  },
  {
    title: "Profile",
    icon: User,
    href: "/profile",
  },
];

export function AppSidebar({}: AppSidebarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await client.auth.signOut();
    router.push("/");
  };

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r-0 bg-sidebar transition-all duration-300 ease-in-out"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-sidebar-foreground">
              Mindful
            </h2>
            <p className="text-sm text-sidebar-foreground/70">
              AI Therapy Companion
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="w-full justify-start py-3 px-3 rounded-lg hover:bg-sidebar-accent data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-base ml-3">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-8 h-8 p-0 hover:bg-sidebar-accent"
            disabled={!mounted}
          >
            {mounted && (
              <>
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-8 h-8 p-0 hover:bg-sidebar-accent text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>

        <Separator className="bg-sidebar-border" />

        <p className="text-xs text-sidebar-foreground/60 leading-relaxed">
          Not a replacement for professional therapy
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
