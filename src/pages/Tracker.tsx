import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Plus, Check, Clock, BookOpen, Play, Pause, RotateCcw, Trash2 } from "lucide-react";

const subjects = [
  { id: 1, name: "Mathematics", color: "#6366f1", hours: 2.5, target: 4, icon: "📐" },
  { id: 2, name: "Physics", color: "#f97316", hours: 1.5, target: 3, icon: "⚡" },
  { id: 3, name: "Chemistry", color: "#10b981", hours: 3, target: 3, icon: "🧪" },
  { id: 4, name: "Biology", color: "#f59e0b", hours: 0.5, target: 2, icon: "🔬" },
  { id: 5, name: "English", color: "#ec4899", hours: 1, target: 2, icon: "📚" },
];

export default function Tracker() {
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);
  const [activeSubject, setActiveSubject] = useState<number | null>(null);
  const [sessions, setSessions] = useState([
    { id: 1, subject: "Mathematics", duration: "1h 30m", topic: "Integration by Parts", time: "09:00 AM" },
    { id: 2, subject: "Chemistry", duration: "45m", topic: "Organic Reactions", time: "11:00 AM" },
    { id: 3, subject: "Physics", duration: "2h", topic: "Wave Optics", time: "02:00 PM" },
  ]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const totalHours = subjects.reduce((a, b) => a + b.hours, 0);
  const totalTarget = subjects.reduce((a, b) => a + b.target, 0);

  return (
    <AppLayout title="Study Tracker" subtitle="Log and monitor your daily study sessions">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card text-center">
            <div className="font-display font-bold text-3xl text-primary">{totalHours}h</div>
            <div className="text-muted-foreground text-sm mt-1">Studied Today</div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card text-center">
            <div className="font-display font-bold text-3xl text-accent">{totalTarget}h</div>
            <div className="text-muted-foreground text-sm mt-1">Daily Target</div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border shadow-card text-center">
            <div className="font-display font-bold text-3xl text-streak">{Math.round((totalHours / totalTarget) * 100)}%</div>
            <div className="text-muted-foreground text-sm mt-1">Completion</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pomodoro Timer */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Focus Timer
            </h3>

            {/* Subject Select */}
            <div className="flex flex-wrap gap-2 mb-6">
              {subjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSubject(s.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                  style={{
                    background: activeSubject === s.id ? s.color : `${s.color}20`,
                    color: activeSubject === s.id ? "white" : s.color,
                  }}
                >
                  {s.icon} {s.name}
                </button>
              ))}
            </div>

            {/* Timer Display */}
            <div className="text-center py-8">
              <motion.div
                animate={running ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-display font-bold text-7xl text-foreground tracking-tight"
              >
                {formatTime(timer)}
              </motion.div>
              <p className="text-muted-foreground mt-2 text-sm">
                {activeSubject ? subjects.find(s => s.id === activeSubject)?.name : "Select a subject to begin"}
              </p>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setTimer(0); setRunning(false); }}
                className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-muted-foreground" />
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setRunning(!running)}
                className={`flex-1 h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${running ? "bg-muted text-foreground" : "gradient-hero text-white shadow-card"}`}
              >
                {running ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start Session</>}
              </motion.button>
            </div>

            {/* Pomodoro shortcuts */}
            <div className="flex gap-2 mt-3">
              {[["25m", 1500], ["45m", 2700], ["60m", 3600]].map(([label, val]) => (
                <button
                  key={label as string}
                  onClick={() => setTimer(val as number)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-muted-foreground bg-muted hover:bg-muted-foreground/20 transition-colors"
                >
                  {label as string}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Progress */}
          <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Today's Progress
            </h3>
            <div className="space-y-4">
              {subjects.map((s) => (
                <div key={s.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>{s.icon}</span>
                      <span className="text-foreground">{s.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{s.hours}h / {s.target}h</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((s.hours / s.target) * 100, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="h-full rounded-full relative"
                      style={{ background: s.color }}
                    >
                      {s.hours >= s.target && (
                        <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] text-white">✓</span>
                      )}
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Goal */}
            <div className="mt-6 p-4 rounded-xl bg-primary/8 border border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-primary">Weekly Goal</span>
                <span className="text-sm font-bold text-primary">31h / 40h</span>
              </div>
              <div className="h-2 bg-primary/20 rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "77.5%" }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full gradient-study"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">9 hours left to hit your weekly target 💪</p>
            </div>
          </div>
        </div>

        {/* Today's Sessions */}
        <div className="bg-card rounded-2xl p-6 border border-border shadow-card">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4">Today's Sessions</h3>
          <div className="space-y-3">
            {sessions.map((s) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl gradient-study flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{s.subject} — {s.topic}</p>
                  <p className="text-xs text-muted-foreground">{s.time} · {s.duration}</p>
                </div>
                <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded-full">{s.duration}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
