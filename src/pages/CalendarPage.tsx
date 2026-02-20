import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, ChevronRight, BookOpen, Clock, Target, Flame } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const studyEvents: Record<string, { subject: string; duration: string; color: string }[]> = {
  "2026-02-03": [{ subject: "Math", duration: "2h", color: "#6366f1" }],
  "2026-02-05": [{ subject: "Physics", duration: "1.5h", color: "#f97316" }, { subject: "Chemistry", duration: "1h", color: "#10b981" }],
  "2026-02-08": [{ subject: "English", duration: "2h", color: "#ec4899" }],
  "2026-02-10": [{ subject: "Biology", duration: "1h", color: "#f59e0b" }],
  "2026-02-12": [{ subject: "Math", duration: "3h", color: "#6366f1" }],
  "2026-02-14": [{ subject: "Physics", duration: "2h", color: "#f97316" }],
  "2026-02-17": [{ subject: "Chemistry", duration: "2.5h", color: "#10b981" }, { subject: "Math", duration: "1h", color: "#6366f1" }],
  "2026-02-19": [{ subject: "Biology", duration: "1.5h", color: "#f59e0b" }],
  "2026-02-20": [{ subject: "English", duration: "1h", color: "#ec4899" }, { subject: "Physics", duration: "2h", color: "#f97316" }],
};

const streak: number[] = [3, 5, 7, 6, 4, 8, 6, 5, 7, 9, 8, 6, 5, 7, 6, 8, 9, 7, 8, 10, 9, 7, 8, 6, 5, 7, 8, 9, 8, 7];

export default function CalendarPage() {
  const today = new Date(2026, 1, 20);
  const [current, setCurrent] = useState(new Date(2026, 1, 1));
  const [selected, setSelected] = useState<string>("2026-02-20");

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dayKey = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const selectedEvents = studyEvents[selected] || [];

  return (
    <AppLayout title="Calendar" subtitle="Track your study schedule and consistency">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-card rounded-2xl p-6 border border-border shadow-card">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-foreground">{MONTHS[month]} {year}</h2>
            <div className="flex gap-2">
              <button onClick={() => setCurrent(new Date(year, month - 1, 1))} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrent(new Date(year, month + 1, 1))} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const d = i + 1;
              const key = dayKey(d);
              const events = studyEvents[key] || [];
              const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = key === selected;
              const hasStudy = events.length > 0;

              return (
                <motion.button
                  key={d}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelected(key)}
                  className={`relative aspect-square flex flex-col items-center justify-start rounded-xl p-1 transition-all text-sm font-medium ${
                    isSelected ? "gradient-hero text-white shadow-card" :
                    isToday ? "bg-primary/15 text-primary ring-2 ring-primary" :
                    "hover:bg-muted text-foreground"
                  }`}
                >
                  <span className="leading-none mt-1">{d}</span>
                  {hasStudy && !isSelected && (
                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                      {events.slice(0, 3).map((e, ei) => (
                        <div key={ei} className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
                      ))}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Heatmap */}
          <div className="mt-6 pt-5 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Daily Study Intensity (last 30 days)</h4>
            <div className="flex gap-1 flex-wrap">
              {streak.map((val, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded"
                  style={{ background: val === 0 ? "hsl(var(--muted))" : `hsl(249,80%,${90 - val * 6}%)` }}
                  title={`Day ${i + 1}: ${val}h`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <span>Less</span>
              {[0, 3, 5, 7, 10].map(v => (
                <div key={v} className="w-4 h-4 rounded" style={{ background: v === 0 ? "hsl(var(--muted))" : `hsl(249,80%,${90 - v * 6}%)` }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Day Detail */}
        <div className="space-y-4">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-display font-semibold text-base text-foreground mb-1">
              {selected ? new Date(selected).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) : "Select a date"}
            </h3>
            {selectedEvents.length > 0 ? (
              <div className="space-y-3 mt-4">
                {selectedEvents.map((e, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <div className="w-1 h-10 rounded-full flex-shrink-0" style={{ background: e.color }} />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{e.subject}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{e.duration}</p>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold text-foreground">
                    {selectedEvents.reduce((a, e) => a + parseFloat(e.duration), 0)}h studied
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-4 text-center py-8 text-muted-foreground">
                <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No sessions recorded</p>
              </div>
            )}
          </div>

          {/* Monthly Stats */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-card space-y-4">
            <h3 className="font-display font-semibold text-base text-foreground">February Stats</h3>
            {[
              { icon: Clock, label: "Total Hours", value: "62h", color: "text-primary" },
              { icon: Flame, label: "Best Streak", value: "12 days", color: "text-streak" },
              { icon: Target, label: "Goals Met", value: "14/20", color: "text-accent" },
              { icon: BookOpen, label: "Sessions", value: "31", color: "text-secondary" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className={`font-bold text-sm ${color}`}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
