import {
  LayoutDashboard,
  BookOpen,
  Bell,
  Shield,
  FileText,
  Settings,
  Terminal,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Definitions", url: "/definitions", icon: BookOpen },
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Executions", url: "/execution", icon: Shield },
  { title: "Journal", url: "/journal", icon: FileText },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-foreground shrink-0" />
          {!collapsed && (
            <span className="font-mono text-sm font-semibold tracking-wider text-foreground uppercase">
              PTOS
            </span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
                      activeClassName="text-foreground bg-accent"
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="font-mono text-xs tracking-wide">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
