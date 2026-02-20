import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Users, Target, Zap } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Sarah Chen", avatar: "SC", points: 3240, streak: 18, change: "up", badge: "🥇" },
  { rank: 2, name: "Alex Kumar", avatar: "AK", points: 2450, streak: 12, change: "up", badge: "🥈", isMe: true },
  { rank: 3, name: "Raj Patel", avatar: "RP", points: 2280, streak: 9, change: "down", badge: "🥉" },
  { rank: 4, name: "Mei Wang", avatar: "MW", points: 2100, streak: 7, change: "up", badge: "" },
  { rank: 5, name: "Tom Harris", avatar: "TH", points: 1850, streak: 5, change: "down", badge: "" },
  { rank: 6, name: "Priya Singh", avatar: "PS", points: 1720, streak: 14, change: "up", badge: "" },
  { rank: 7, name: "Jake Miller", avatar: "JM", points: 1580, streak: 3, change: "down", badge: "" },
];

const challenges = [
  { id: 1, name: "Study 5 hours today", reward: 100, icon: "⏱️", expires: "12h", active: true },
  { id: 2, name: "Complete 3 mock tests", reward: 300, icon: "📝", expires: "2 days", active: false },
  { id: 3, name: "Beat Sarah in Math", reward: 500, icon: "⚔️", expires: "Weekly", active: false },
  { id: 4, name: "30-day streak", reward: 1000, icon: "🔥", expires: "18 days left", active: false },
];

const friends = [
  { name: "Sarah Chen", avatar: "SC", status: "Studying Physics", time: "Online", color: "#6366f1" },
  { name: "Raj Patel", avatar: "RP", status: "Mock Test - Chemistry", time: "1h ago", color: "#10b981" },
  { name: "Mei Wang", avatar: "MW", status: "Flashcards session", time: "3h ago", color: "#f59e0b" },
];

const colors = ["#6366f1","#f97316","#10b981","#f59e0b","#ec4899","#8b5cf6","#06b6d4"];

export default function Competition() {
  return (
    <AppLayout title="Competition" subtitle="Compete with friends, climb the leaderboard">
      <div className="space-y-6">
        {/* My Rank Card */}
        <div className="gradient-hero rounded-2xl p-6 flex items-center justify-between shadow-card relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full translate-x-8 -translate-y-8" />
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Your Current Rank</p>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-5xl text-white">#2</span>
              <div>
                <p className="text-white font-semibold">Alex Kumar</p>
                <p className="text-white/70 text-sm">2,450 pts · 12🔥 streak</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-2xl text-white">790 pts</div>
            <p className="text-white/70 text-sm">to beat Sarah 🎯</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-base text-foreground flex items-center gap-2">
                <Trophy className="w-5 h-5 text-gold" /> Weekly Leaderboard
              </h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">Resets in 5d 12h</span>
            </div>
            <div className="space-y-2">
              {leaderboard.map((user, i) => (
                <motion.div
                  key={user.rank}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${user.isMe ? "gradient-hero shadow-card" : "hover:bg-muted"}`}
                >
                  {/* Rank */}
                  <div className={`w-8 text-center font-display font-bold text-sm ${user.isMe ? "text-white" : user.rank <= 3 ? "text-gold" : "text-muted-foreground"}`}>
                    {user.badge || `#${user.rank}`}
                  </div>
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: colors[(user.rank - 1) % colors.length] }}>
                    {user.avatar}
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${user.isMe ? "text-white" : "text-foreground"}`}>{user.name} {user.isMe && "(You)"}</p>
                    <p className={`text-xs ${user.isMe ? "text-white/70" : "text-muted-foreground"}`}>🔥 {user.streak} day streak</p>
                  </div>
                  {/* Points + Trend */}
                  <div className="text-right">
                    <p className={`font-bold text-sm ${user.isMe ? "text-white" : "text-foreground"}`}>{user.points.toLocaleString()}</p>
                    <div className="flex items-center justify-end">
                      {user.change === "up" ? <TrendingUp className={`w-3 h-3 ${user.isMe ? "text-white/70" : "text-accent"}`} /> :
                       user.change === "down" ? <TrendingDown className={`w-3 h-3 ${user.isMe ? "text-white/70" : "text-destructive"}`} /> :
                       <Minus className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Side Column */}
          <div className="space-y-4">
            {/* Active Challenges */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-warning" /> Challenges
              </h3>
              <div className="space-y-3">
                {challenges.map(c => (
                  <div key={c.id} className={`p-3 rounded-xl border transition-all ${c.active ? "border-primary/40 bg-primary/5" : "border-border bg-muted/30"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{c.icon}</span>
                        <p className="text-sm font-medium text-foreground leading-tight">{c.name}</p>
                      </div>
                      <span className="text-xs font-bold text-gold bg-gold/10 px-1.5 py-0.5 rounded-full flex-shrink-0">+{c.reward}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-7">⏳ {c.expires}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends Activity */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" /> Friends
              </h3>
              <div className="space-y-3">
                {friends.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: f.color }}>
                        {f.avatar}
                      </div>
                      {f.time === "Online" && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-accent border-2 border-card" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{f.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{f.status}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{f.time}</span>
                  </div>
                ))}
                <button className="w-full py-2 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-xs font-medium">
                  + Invite Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
