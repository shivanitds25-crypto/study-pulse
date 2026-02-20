import { useState } from "react";
import { Bell, Sun, Moon, Search } from "lucide-react";
import { motion } from "framer-motion";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const [dark, setDark] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center justify-between px-6 flex-shrink-0 z-10">
      <div>
        <h1 className="font-display font-bold text-xl text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
          <Search className="w-4 h-4" />
          <span>Search anything...</span>
          <kbd className="ml-2 px-1.5 py-0.5 bg-background rounded text-xs border border-border">⌘K</kbd>
        </div>

        {/* Streak Badge */}
        <div className="flex items-center gap-1.5 bg-streak/15 text-streak px-3 py-1.5 rounded-full text-sm font-semibold">
          🔥 <span>12 days</span>
        </div>

        {/* Points */}
        <div className="flex items-center gap-1.5 bg-gold/15 text-gold px-3 py-1.5 rounded-full text-sm font-semibold">
          ⭐ <span>2,450 pts</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-secondary text-secondary-foreground text-[10px] flex items-center justify-center font-bold">3</span>
          </button>
          {notifOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-11 w-72 bg-card border border-border rounded-xl shadow-lg-custom z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-border font-semibold text-sm">Notifications</div>
              {[
                { icon: "🎯", text: "Mock test reminder: Math in 30 mins", time: "Just now" },
                { icon: "🏆", text: "You beat Sarah in weekly competition!", time: "2h ago" },
                { icon: "⚡", text: "Streak at risk! Study before midnight", time: "5h ago" },
              ].map((n, i) => (
                <div key={i} className="px-3 py-2.5 hover:bg-muted transition-colors cursor-pointer flex gap-3 text-sm">
                  <span className="text-lg">{n.icon}</span>
                  <div className="min-w-0">
                    <p className="text-foreground leading-snug">{n.text}</p>
                    <p className="text-muted-foreground text-xs mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
