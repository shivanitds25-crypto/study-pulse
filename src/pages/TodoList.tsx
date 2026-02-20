import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Plus, Check, Trash2, Clock, Flag, Filter } from "lucide-react";

type Priority = "high" | "medium" | "low";
type Todo = {
  id: number;
  text: string;
  subject: string;
  priority: Priority;
  due: string;
  done: boolean;
  points: number;
};

const initialTodos: Todo[] = [
  { id: 1, text: "Complete Calculus Integration exercises (Ch. 7)", subject: "Math", priority: "high", due: "Today", done: false, points: 50 },
  { id: 2, text: "Read Organic Chemistry notes — Reactions", subject: "Chemistry", priority: "high", due: "Today", done: false, points: 50 },
  { id: 3, text: "Watch Physics lecture on EM Waves", subject: "Physics", priority: "medium", due: "Tomorrow", done: false, points: 30 },
  { id: 4, text: "Review Biology Chapter 12 flashcards", subject: "Biology", priority: "medium", due: "Tomorrow", done: true, points: 30 },
  { id: 5, text: "Practice 20 English grammar questions", subject: "English", priority: "low", due: "Fri", done: false, points: 20 },
  { id: 6, text: "Take Physics mock test", subject: "Physics", priority: "high", due: "Thu", done: false, points: 80 },
];

const priorityConfig = {
  high: { label: "High", color: "text-destructive", bg: "bg-destructive/10", dot: "bg-destructive" },
  medium: { label: "Medium", color: "text-warning", bg: "bg-warning/10", dot: "bg-warning" },
  low: { label: "Low", color: "text-accent", bg: "bg-accent/10", dot: "bg-accent" },
};

const subjectColors: Record<string, string> = {
  Math: "#6366f1", Chemistry: "#10b981", Physics: "#f97316", Biology: "#f59e0b", English: "#ec4899",
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<"all" | "today" | "done" | Priority>("all");
  const [newText, setNewText] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const toggle = (id: number) => setTodos(t => t.map(item => item.id === id ? { ...item, done: !item.done } : item));
  const remove = (id: number) => setTodos(t => t.filter(item => item.id !== id));

  const filtered = todos.filter(t => {
    if (filter === "all") return !t.done;
    if (filter === "done") return t.done;
    if (filter === "today") return t.due === "Today" && !t.done;
    return t.priority === filter && !t.done;
  });

  const completedCount = todos.filter(t => t.done).length;
  const totalPoints = todos.filter(t => t.done).reduce((a, b) => a + b.points, 0);

  return (
    <AppLayout title="To-Do List" subtitle="Stay on top of your study tasks">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Progress Header */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
            <div className="font-display font-bold text-2xl text-foreground">{completedCount}/{todos.length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Completed</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
            <div className="font-display font-bold text-2xl text-streak">{todos.filter(t => t.due === "Today" && !t.done).length}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Due Today</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center shadow-card">
            <div className="font-display font-bold text-2xl text-gold">+{totalPoints}</div>
            <div className="text-xs text-muted-foreground mt-0.5">Points Earned</div>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-foreground">Today's Progress</span>
            <span className="text-muted-foreground">{Math.round((completedCount / todos.length) * 100)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${(completedCount / todos.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full gradient-study"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {(["all", "today", "high", "medium", "low", "done"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                filter === f ? "gradient-hero text-white shadow-card" : "bg-muted text-muted-foreground hover:bg-muted-foreground/20"
              }`}
            >
              {f === "all" ? "All Pending" : f === "done" ? "✓ Completed" : f === "today" ? "📅 Today" : f}
            </button>
          ))}
        </div>

        {/* Add Task */}
        <AnimatePresence>
          {showAdd && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-primary/40 rounded-2xl p-4 shadow-card overflow-hidden">
              <input
                autoFocus
                value={newText}
                onChange={e => setNewText(e.target.value)}
                placeholder="What do you need to study?"
                className="w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground mb-3"
                onKeyDown={e => {
                  if (e.key === "Enter" && newText) {
                    setTodos(t => [...t, { id: Date.now(), text: newText, subject: "Math", priority: "medium", due: "Today", done: false, points: 30 }]);
                    setNewText(""); setShowAdd(false);
                  }
                  if (e.key === "Escape") setShowAdd(false);
                }}
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Press Enter to add</span>
                <div className="flex gap-2">
                  <button onClick={() => setShowAdd(false)} className="px-3 py-1 rounded-lg text-xs bg-muted text-muted-foreground hover:bg-muted-foreground/20 transition-colors">Cancel</button>
                  <button onClick={() => { if (newText) { setTodos(t => [...t, { id: Date.now(), text: newText, subject: "Math", priority: "medium", due: "Today", done: false, points: 30 }]); setNewText(""); setShowAdd(false); } }} className="px-3 py-1 rounded-lg text-xs gradient-hero text-white font-medium">Add</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Todo Items */}
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map(todo => {
              const pc = priorityConfig[todo.priority];
              const subjectColor = subjectColors[todo.subject] || "#6366f1";
              return (
                <motion.div
                  key={todo.id}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16, height: 0 }}
                  className={`group flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer hover:shadow-card ${todo.done ? "opacity-60 bg-muted/50 border-border" : "bg-card border-border shadow-sm-custom"}`}
                  onClick={() => toggle(todo.id)}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${todo.done ? "bg-accent border-accent" : "border-muted-foreground"}`}>
                    {todo.done && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium text-foreground ${todo.done ? "line-through text-muted-foreground" : ""}`}>{todo.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{ background: `${subjectColor}20`, color: subjectColor }}>{todo.subject}</span>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${pc.bg} ${pc.color}`}>{pc.label}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-0.5"><Clock className="w-3 h-3" />{todo.due}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full">+{todo.points}</span>
                    <button onClick={e => { e.stopPropagation(); remove(todo.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Add Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add new task
        </motion.button>
      </div>
    </AppLayout>
  );
}
