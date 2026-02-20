import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Bell, Plus, Trash2, Clock, BookOpen, Check } from "lucide-react";

const initialReminders = [
  { id: 1, title: "Math study session", subject: "Mathematics", time: "09:00 AM", days: ["Mon", "Wed", "Fri"], active: true, color: "#6366f1" },
  { id: 2, title: "Organic Chemistry revision", subject: "Chemistry", time: "02:00 PM", days: ["Tue", "Thu"], active: true, color: "#10b981" },
  { id: 3, title: "Physics mock test prep", subject: "Physics", time: "07:00 PM", days: ["Sat"], active: false, color: "#f97316" },
  { id: 4, title: "Daily flashcard review", subject: "All Subjects", time: "08:30 PM", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], active: true, color: "#8b5cf6" },
];

export default function Reminders() {
  const [reminders, setReminders] = useState(initialReminders);
  const toggleActive = (id: number) => setReminders(r => r.map(rem => rem.id === id ? { ...rem, active: !rem.active } : rem));

  return (
    <AppLayout title="Reminders" subtitle="Never miss a study session">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Upcoming */}
        <div className="gradient-hero rounded-2xl p-5 shadow-card">
          <p className="text-white/70 text-sm mb-1">Next Reminder</p>
          <p className="font-display font-bold text-white text-xl">Math study session</p>
          <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 09:00 AM · Mon, Wed, Fri</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-white/70 text-xs">
            <Bell className="w-3 h-3" /> Notification enabled · 10 min before
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-base text-foreground">All Reminders</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl gradient-hero text-white text-xs font-medium shadow-card">
            <Plus className="w-3 h-3" /> Add Reminder
          </button>
        </div>

        <div className="space-y-3">
          {reminders.map((rem, i) => (
            <motion.div
              key={rem.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`bg-card border rounded-2xl p-4 shadow-card transition-all ${rem.active ? "border-border" : "border-border opacity-60"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: rem.color }}>
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{rem.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {rem.time}</span>
                    <span>·</span>
                    <div className="flex gap-1">
                      {rem.days.map(d => (
                        <span key={d} className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{d}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Toggle */}
                <button
                  onClick={() => toggleActive(rem.id)}
                  className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${rem.active ? "gradient-study" : "bg-muted"}`}
                >
                  <motion.div
                    animate={{ x: rem.active ? 20 : 2 }}
                    className="w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
          <h4 className="font-semibold text-sm text-foreground mb-4">Notification Settings</h4>
          {[
            { label: "Push Notifications", desc: "Get alerts on your device", on: true },
            { label: "Email Reminders", desc: "Daily summary to your email", on: false },
            { label: "Streak Alert", desc: "Alert when streak is at risk", on: true },
            { label: "Achievement Alerts", desc: "When you earn badges", on: true },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
              <div className={`w-11 h-6 rounded-full relative cursor-pointer ${s.on ? "gradient-study" : "bg-muted"}`}>
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-sm transition-all ${s.on ? "left-5" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
