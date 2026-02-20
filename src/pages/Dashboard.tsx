import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  AreaChart, Area, BarChart, Bar, RadialBarChart, RadialBar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from "recharts";
import { TrendingUp, Clock, Target, Flame, Star, Brain, ArrowUp, ArrowDown, Award } from "lucide-react";

const studyData = [
  { day: "Mon", hours: 3.5, target: 4 },
  { day: "Tue", hours: 5, target: 4 },
  { day: "Wed", hours: 2, target: 4 },
  { day: "Thu", hours: 6, target: 4 },
  { day: "Fri", hours: 4.5, target: 4 },
  { day: "Sat", hours: 7, target: 4 },
  { day: "Sun", hours: 3, target: 4 },
];

const subjectData = [
  { subject: "Math", score: 78, color: "#6366f1" },
  { subject: "Physics", score: 65, color: "#f97316" },
  { subject: "Chemistry", score: 82, color: "#10b981" },
  { subject: "Biology", score: 71, color: "#f59e0b" },
  { subject: "English", score: 88, color: "#ec4899" },
];

const weakAreas = [
  { topic: "Calculus Integration", score: 42, trend: "down" },
  { topic: "Organic Chemistry", score: 51, trend: "up" },
  { topic: "Electromagnetic Waves", score: 38, trend: "down" },
  { topic: "Probability Theory", score: 55, trend: "up" },
];

const recentActivity = [
  { action: "Completed Math flashcards", time: "2h ago", icon: "🃏", pts: "+50" },
  { action: "Mock Test: Physics — 78%", time: "5h ago", icon: "📝", pts: "+120" },
  { action: "Studied 2hrs Chemistry", time: "Yesterday", icon: "⏱️", pts: "+80" },
  { action: "Beat Sarah in Weekly Quiz!", time: "Yesterday", icon: "🏆", pts: "+200" },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function StatCard({ icon: Icon, label, value, sub, gradient, iconClass }: any) {
  return (
    <motion.div variants={item} className={`${gradient} p-5 rounded-2xl text-white shadow-card`}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <Icon className={`w-5 h-5 ${iconClass || "text-white"}`} />
        </div>
        <span className="text-white/70 text-xs font-medium">{sub}</span>
      </div>
      <div className="font-display font-bold text-3xl text-white mb-1">{value}</div>
      <div className="text-white/80 text-sm">{label}</div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <AppLayout title="Dashboard" subtitle="Welcome back, Alex! 👋 Keep the streak alive!">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">

        {/* AI Score Prediction Banner */}
        <motion.div variants={item} className="gradient-hero rounded-2xl p-5 flex items-center justify-between shadow-card overflow-hidden relative">
          <div className="absolute right-0 top-0 w-64 h-full opacity-10">
            <div className="w-full h-full bg-white rounded-full translate-x-1/2 -translate-y-1/4" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5 text-white" />
              <span className="text-white/80 text-sm font-medium">AI Score Prediction</span>
            </div>
            <p className="font-display font-bold text-white text-2xl">Based on your pattern, you'll score</p>
            <p className="text-white/80 mt-1">Keep your current study pace for the next 14 days</p>
          </div>
          <div className="flex-shrink-0 text-center">
            <div className="font-display font-bold text-6xl text-white">87%</div>
            <div className="text-white/70 text-sm mt-1">Predicted Score</div>
            <div className="flex items-center gap-1 justify-center text-emerald-300 text-sm mt-1">
              <ArrowUp className="w-3 h-3" /> +5% from last week
            </div>
          </div>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Flame} label="Current Streak" value="12 Days" sub="🔥 On fire!" gradient="gradient-streak" />
          <StatCard icon={Star} label="Reward Points" value="2,450" sub="⭐ Top 8%" gradient="gradient-points" />
          <StatCard icon={Clock} label="Hours This Week" value="31h" sub="↑ +4h vs last" gradient="gradient-study" />
          <StatCard icon={Target} label="Goal Completion" value="78%" sub="📊 4 subjects" gradient="gradient-success" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Study Hours Chart */}
          <motion.div variants={item} className="lg:col-span-2 bg-card rounded-2xl p-5 shadow-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-base text-foreground">Weekly Study Hours</h3>
                <p className="text-muted-foreground text-xs">vs. daily target of 4h</p>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><div className="w-3 h-1 rounded-full bg-primary" />Actual</div>
                <div className="flex items-center gap-1"><div className="w-3 h-1 rounded-full bg-muted-foreground" />Target</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={studyData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(249,80%,58%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(249,80%,58%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" fill="none" strokeWidth={1.5} />
                <Area type="monotone" dataKey="hours" stroke="hsl(249,80%,58%)" fill="url(#colorHours)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(249,80%,58%)" }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Subject Performance */}
          <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border">
            <h3 className="font-display font-semibold text-base text-foreground mb-4">Subject Scores</h3>
            <div className="space-y-3">
              {subjectData.map((s) => (
                <div key={s.subject}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{s.subject}</span>
                    <span className="font-bold" style={{ color: s.color }}>{s.score}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.score}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: Weak Areas + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weak Area Detection */}
          <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-danger flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-foreground">AI Weak Area Detection</h3>
                <p className="text-muted-foreground text-xs">Focus on these topics first</p>
              </div>
            </div>
            <div className="space-y-3">
              {weakAreas.map((w) => (
                <div key={w.topic} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${w.score < 50 ? "bg-destructive" : "bg-warning"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{w.topic}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${w.score < 50 ? "gradient-danger" : "gradient-streak"}`} style={{ width: `${w.score}%` }} />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{w.score}%</span>
                    </div>
                  </div>
                  {w.trend === "up"
                    ? <ArrowUp className="w-4 h-4 text-accent flex-shrink-0" />
                    : <ArrowDown className="w-4 h-4 text-destructive flex-shrink-0" />}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={item} className="bg-card rounded-2xl p-5 shadow-card border border-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-study flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-display font-semibold text-base text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-lg flex-shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                  <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full flex-shrink-0">{a.pts}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
