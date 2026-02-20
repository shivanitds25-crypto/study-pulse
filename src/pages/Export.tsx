import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { FileText, Download, Calendar, BarChart2, BookOpen, CheckSquare } from "lucide-react";

const reports = [
  { id: 1, name: "Weekly Study Report", desc: "Feb 10–16, 2026", icon: BarChart2, pages: 4, size: "1.2 MB", date: "Feb 17", color: "#6366f1" },
  { id: 2, name: "Monthly Progress Summary", desc: "January 2026", icon: Calendar, pages: 8, size: "2.4 MB", date: "Feb 1", color: "#10b981" },
  { id: 3, name: "Mock Test Results", desc: "All tests, Feb 2026", icon: FileText, pages: 6, size: "1.8 MB", date: "Feb 19", color: "#f97316" },
  { id: 4, name: "Flashcard Progress", desc: "All decks export", icon: BookOpen, pages: 12, size: "3.1 MB", date: "Feb 18", color: "#ec4899" },
  { id: 5, name: "To-Do Completion Report", desc: "Last 30 days", icon: CheckSquare, pages: 3, size: "0.9 MB", date: "Feb 20", color: "#f59e0b" },
];

const generateOptions = [
  { label: "Date Range", type: "select", options: ["Last 7 days", "Last 30 days", "This month", "Custom"] },
  { label: "Include Subjects", type: "multi" },
  { label: "Report Type", type: "select", options: ["Full Report", "Quick Summary", "Analytics Only"] },
];

export default function Export() {
  return (
    <AppLayout title="PDF Export" subtitle="Download your study reports and analytics">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Generate Report */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          <h3 className="font-display font-semibold text-base text-foreground mb-5">Generate New Report</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Report Name</label>
              <input placeholder="My Study Report" className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Date Range</label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-input bg-background text-foreground text-sm outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This month</option>
                <option>All time</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5 block">Include</label>
              <div className="space-y-2">
                {["Study hours & sessions", "Mock test scores", "Flashcard progress", "To-do completion", "Streak & points", "Weak area analysis"].map(opt => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-foreground">
                    <div className="w-4 h-4 rounded gradient-hero flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    {opt}
                  </label>
                ))}
              </div>
            </div>
            <motion.button whileTap={{ scale: 0.97 }} className="w-full py-3 rounded-xl gradient-hero text-white font-semibold shadow-card flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" /> Generate PDF
            </motion.button>
          </div>
        </div>

        {/* Past Reports */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-display font-semibold text-base text-foreground">Previous Reports</h3>
          {reports.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-4 shadow-card flex items-center gap-4 hover:shadow-glow transition-all"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: r.color }}>
                <r.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{r.desc} · {r.pages} pages · {r.size}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-muted-foreground mb-2">{r.date}</p>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all" style={{ background: `${r.color}20`, color: r.color }}>
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
