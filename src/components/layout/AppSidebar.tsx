import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Calendar, Zap, Trophy, Brain,
  ClipboardList, Bell, Users, Settings, ChevronLeft, ChevronRight,
  Target, FileText, CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Study Tracker", path: "/tracker" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: Brain, label: "Flashcards", path: "/flashcards" },
  { icon: ClipboardList, label: "Mock Tests", path: "/mock-test" },
  { icon: Target, label: "To-Do List", path: "/todo" },
  { icon: Zap, label: "Weak Areas", path: "/weak-areas" },
  { icon: Trophy, label: "Competition", path: "/competition" },
  { icon: Bell, label: "Reminders", path: "/reminders" },
  { icon: FileText, label: "PDF Export", path: "/export" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative flex flex-col h-screen bg-sidebar border-r border-sidebar-border shadow-sm-custom flex-shrink-0 z-10"
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-sidebar-border overflow-hidden", collapsed && "justify-center")}>
        <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0 shadow-glow animate-pulse-glow">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="overflow-hidden"
            >
              <span className="font-display font-bold text-lg text-gradient whitespace-nowrap">StudyAI</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-hide">
        <div className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "gradient-hero text-white shadow-card"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                )}
                title={collapsed ? item.label : undefined}
              >
                {isActive && !collapsed && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 gradient-hero rounded-lg"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <item.icon className={cn("w-5 h-5 flex-shrink-0 relative z-10", isActive && "text-white")} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-card hover:scale-110 transition-transform z-20"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* User Profile */}
      <div className={cn("p-3 border-t border-sidebar-border", collapsed && "flex justify-center")}>
        <div className={cn("flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">AK</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-w-0"
              >
                <p className="text-sm font-semibold truncate">Alex Kumar</p>
                <p className="text-xs text-muted-foreground truncate">alex@study.ai</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  );
}
