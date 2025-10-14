"use client"

import * as React from "react"
import {
  Home,
  Hammer,
  FolderKanban,
  Settings2,
  LayoutDashboard,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuth } from "@/lib/auth/auth-context"

// Generate navigation data based on user context
function useNavigationData() {
  const { user } = useAuth()

  return React.useMemo(() => ({
    user: user ? {
      name: user.user_metadata?.full_name || user.email?.split('@')[0] || "User",
      email: user.email || "",
      avatar: user.user_metadata?.avatar_url || "",
    } : {
      name: "Guest",
      email: "guest@example.com",
      avatar: "",
    },
    teams: [
      {
        name: "Rehab Estimator",
        logo: Home,
        plan: "Pro",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
      },
      {
        title: "Estimator",
        url: "/rehab-estimator",
        icon: Hammer,
        isActive: false,
        items: [
          {
            title: "New Project",
            url: "/rehab-estimator",
          },
          {
            title: "Property Details",
            url: "/rehab-estimator?step=1",
          },
          {
            title: "Assessment",
            url: "/rehab-estimator?step=2",
          },
          {
            title: "Strategy & Goals",
            url: "/rehab-estimator?step=3",
          },
          {
            title: "Scope Builder",
            url: "/rehab-estimator?step=4",
          },
          {
            title: "Priority Analysis",
            url: "/rehab-estimator?step=5",
          },
          {
            title: "Action Plan",
            url: "/rehab-estimator?step=6",
          },
          {
            title: "Final Review",
            url: "/rehab-estimator?step=7",
          },
        ],
      },
      {
        title: "Analytics",
        url: "#",
        icon: TrendingUp,
        items: [
          {
            title: "ROI Analysis",
            url: "#",
          },
          {
            title: "Cost Trends",
            url: "#",
          },
          {
            title: "Market Data",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Profile",
            url: "#",
          },
          {
            title: "Preferences",
            url: "#",
          },
          {
            title: "Integrations",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Recent Projects",
        url: "#",
        icon: FolderKanban,
      },
    ],
  }), [user])
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useNavigationData()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
