import { useState } from "react";
import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Brain, TrendingDown, TrendingUp, Lightbulb, RefreshCw, ArrowRight } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const weakData = [
  { topic: "Calculus Integration", subject: "Math", score: 42, sessions: 3, trend: -5, urgency: "critical" },
  { topic: "Electromagnetic Waves", subject: "Physics", score: 38, sessions: 1, trend: -8, urgency: "critical" },
  { topic: "Organic Chemistry Reactions", subject: "Chemistry", score: 51, sessions: 5, trend: +3, urgency: "high" },
  { topic: "Probability Theory", subject: "Math", score: 55, sessions: 4, trend: +5, urgency: "high" },
  { topic: "Cell Biology", subject: "Biology", score: 58, sessions: 2, trend: -2, urgency: "medium" },
  { topic: "Grammar & Writing", subject: "English", score: 62, sessions: 6, trend: +8, urgency: "medium" },
];

const radarData = [
  { subject: "Math", score: 68 },
  { subject: "Physics", score: 55 },
  { subject: "Chemistry", score: 74 },
  { subject: "Biology", score: 66 },
  { subject: "English", score: 80 },
];

const urgencyConfig = {
  critical: { label: "Critical", color: "text-destructive", bg: "bg-destructive/10", bar: "gradient-danger" },
  high: { label: "High Priority", color: "text-warning", bg: "bg-warning/10", bar: "gradient-streak" },
  medium: { label: "Needs Work", color: "text-primary", bg: "bg-primary/10", bar: "gradient-study" },
};

const aiTips: Record<string, string[]> = {
  "Calculus Integration": [
    "Spend 30 mins daily on integration techniques",
    "Practice u-substitution problems first",
    "Use the 'Calculus Integration' flashcard deck",
    "Watch 3Blue1Brown's Essence of Calculus series",
  ],
  "Electromagnetic Waves": [
    "Review Maxwell's equations from textbook Ch.13",
    "Draw diagrams for wave propagation",
    "Take the Physics quick test to identify gaps",
    "Create summary notes on wave properties",
  ],
};

export default function WeakAreas() {
  const [selected, setSelected] = useState(weakData[0]);
  const [showTips, setShowTips] = useState(false);

  const tips = aiTips[selected.topic] || ["Review your notes", "Practice more problems", "Take a related mock test", "Make flashcards for key concepts"];

  return (
    <AppLayout title="Weak Area Detection" subtitle="AI-powered analysis of topics needing attention">
      <div className="space-y-6">
        {/* AI Banner */}
        <div className="gradient-hero rounded-2xl p-5 flex items-center gap-4 shadow-card">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 animate-float">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-display font-semibold text-white text-lg">AI Analysis Complete</p>
            <p className="text-white/80 text-sm">Found 6 areas needing improvement · Focus on critical topics first for max score gain</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weak Topics List */}
          <div className="lg:col-span-2 space-y-3">
            {weakData.map((w, i) => {
              const uc = urgencyConfig[w.urgency as keyof typeof urgencyConfig];
              const isSelected = selected.topic === w.topic;
              return (
                <motion.div
                  key={w.topic}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { setSelected(w); setShowTips(false); }}
                  className={`bg-card border rounded-2xl p-4 shadow-card cursor-pointer transition-all ${isSelected ? "border-primary/60 ring-2 ring-primary/20" : "border-border hover:shadow-glow"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${uc.bg} ${uc.color}`}>{uc.label}</span>
                        <span className="text-xs text-muted-foreground">{w.subject}</span>
                      </div>
                      <p className="font-semibold text-sm text-foreground">{w.topic}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${uc.bar}`} style={{ width: `${w.score}%` }} />
                        </div>
                        <span className="text-xs font-bold text-foreground w-8 text-right">{w.score}%</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`flex items-center gap-1 text-xs font-medium ${w.trend > 0 ? "text-accent" : "text-destructive"}`}>
                        {w.trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(w.trend)}%
                      </div>
                      <p className="text-xs text-muted-foreground">{w.sessions} sessions</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Radar Chart */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <h3 className="font-display font-semibold text-sm text-foreground mb-3">Subject Overview</h3>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                  <Radar dataKey="score" stroke="hsl(249,80%,58%)" fill="hsl(249,80%,58%)" fillOpacity={0.25} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* AI Tips Panel */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-gold" />
                <h3 className="font-display font-semibold text-sm text-foreground">AI Tips</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-4">For: <span className="font-medium text-foreground">{selected.topic}</span></p>
              <div className="space-y-2">
                {tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
                    <span className="text-primary font-bold text-xs mt-0.5">{i + 1}.</span>
                    <p className="text-xs text-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2.5 rounded-xl gradient-study text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-card">
                Start Focused Study <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
