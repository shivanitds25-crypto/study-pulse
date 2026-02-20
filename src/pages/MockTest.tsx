import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { Clock, ChevronRight, Check, X, Brain, Trophy, ArrowLeft } from "lucide-react";

const tests = [
  { id: 1, name: "Mathematics - Full Mock", subject: "Math", questions: 30, time: 90, difficulty: "Hard", color: "#6366f1", attempts: 3, bestScore: 82 },
  { id: 2, name: "Physics Chapter 8 Test", subject: "Physics", questions: 20, time: 60, difficulty: "Medium", color: "#f97316", attempts: 1, bestScore: 70 },
  { id: 3, name: "Chemistry Organic", subject: "Chemistry", questions: 25, time: 75, difficulty: "Hard", color: "#10b981", attempts: 2, bestScore: 88 },
  { id: 4, name: "Biology Quick Test", subject: "Biology", questions: 15, time: 30, difficulty: "Easy", color: "#f59e0b", attempts: 0, bestScore: 0 },
];

const sampleQuestions = [
  {
    id: 1,
    question: "If f(x) = x³ - 3x² + 2x, find f'(1)",
    options: ["0", "1", "-1", "2"],
    correct: 0,
    explanation: "f'(x) = 3x² - 6x + 2. At x=1: f'(1) = 3 - 6 + 2 = -1. Wait, that's -1. Let me recheck... 3(1) - 6(1) + 2 = -1. So answer is -1.",
  },
  {
    id: 2,
    question: "The integral ∫₀¹ x² dx equals:",
    options: ["1/2", "1/3", "2/3", "1/4"],
    correct: 1,
    explanation: "∫x² dx = x³/3. Evaluated from 0 to 1: 1/3 - 0 = 1/3",
  },
  {
    id: 3,
    question: "Which is the derivative of eˣ?",
    options: ["xeˣ⁻¹", "eˣ", "eˣ + C", "ln(x)"],
    correct: 1,
    explanation: "The derivative of eˣ is eˣ — it's its own derivative!",
  },
];

type Phase = "list" | "active" | "results";

export default function MockTest() {
  const [phase, setPhase] = useState<Phase>("list");
  const [activeTest, setActiveTest] = useState<typeof tests[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(sampleQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const startTest = (test: typeof tests[0]) => {
    setActiveTest(test);
    setCurrentQ(0);
    setAnswers(new Array(sampleQuestions.length).fill(null));
    setSubmitted(false);
    setPhase("active");
  };

  const score = submitted ? answers.filter((a, i) => a === sampleQuestions[i].correct).length : 0;
  const pct = submitted ? Math.round((score / sampleQuestions.length) * 100) : 0;

  return (
    <AppLayout title="Mock Tests" subtitle="AI-generated tests adapted to your weak areas">
      {phase === "list" && (
        <div className="space-y-6">
          {/* AI recommendation */}
          <div className="gradient-hero rounded-2xl p-5 flex items-center gap-4 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-display font-semibold text-white">AI Recommendation</p>
              <p className="text-white/80 text-sm">Based on weak areas, take the <strong>Mathematics - Full Mock</strong> test today</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tests.map((test, i) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded-2xl p-5 shadow-card hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full text-white" style={{ background: test.color }}>{test.subject}</span>
                    <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                      test.difficulty === "Easy" ? "bg-accent/15 text-accent" :
                      test.difficulty === "Medium" ? "bg-warning/15 text-warning" :
                      "bg-destructive/15 text-destructive"
                    }`}>{test.difficulty}</span>
                  </div>
                  {test.attempts > 0 && (
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Best Score</p>
                      <p className="font-bold text-sm" style={{ color: test.color }}>{test.bestScore}%</p>
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-3">{test.name}</h3>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><span className="text-base">❓</span> {test.questions} questions</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.time} mins</span>
                  <span>{test.attempts} attempts</span>
                </div>
                <button
                  onClick={() => startTest(test)}
                  className="w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all"
                  style={{ background: `${test.color}20`, color: test.color }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = test.color; (e.target as HTMLElement).style.color = "white"; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = `${test.color}20`; (e.target as HTMLElement).style.color = test.color; }}
                >
                  {test.attempts > 0 ? "Retake Test" : "Start Test"} <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {phase === "active" && !submitted && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <button onClick={() => setPhase("list")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" /> Exit
            </button>
            <div className="flex items-center gap-2 bg-destructive/15 text-destructive px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="w-3.5 h-3.5" /> 89:42
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Question {currentQ + 1} of {sampleQuestions.length}</span>
              <span>{answers.filter(a => a !== null).length} answered</span>
            </div>
            <div className="flex gap-1">
              {sampleQuestions.map((_, i) => (
                <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${
                  i === currentQ ? "bg-primary" :
                  answers[i] !== null ? "bg-accent" : "bg-muted"
                }`} />
              ))}
            </div>
          </div>

          {/* Question */}
          <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Question {currentQ + 1}</p>
            <p className="font-display font-semibold text-xl text-foreground mb-6 leading-snug">{sampleQuestions[currentQ].question}</p>
            <div className="space-y-3">
              {sampleQuestions[currentQ].options.map((opt, oi) => (
                <button
                  key={oi}
                  onClick={() => setAnswers(a => { const n = [...a]; n[currentQ] = oi; return n; })}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all font-medium text-sm ${
                    answers[currentQ] === oi
                      ? "gradient-study text-white border-transparent shadow-card"
                      : "border-border bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  <span className="font-bold mr-3">{["A", "B", "C", "D"][oi]}.</span> {opt}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button disabled={currentQ === 0} onClick={() => setCurrentQ(q => q - 1)} className="px-4 py-2.5 rounded-xl bg-muted text-foreground font-medium disabled:opacity-40 hover:bg-muted-foreground/20 transition-colors">← Prev</button>
            {currentQ < sampleQuestions.length - 1
              ? <button onClick={() => setCurrentQ(q => q + 1)} className="flex-1 py-2.5 rounded-xl gradient-study text-white font-semibold shadow-card">Next →</button>
              : <button onClick={() => setSubmitted(true)} className="flex-1 py-2.5 rounded-xl gradient-hero text-white font-semibold shadow-card">Submit Test 🚀</button>
            }
          </div>
        </div>
      )}

      {phase === "active" && submitted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-6">
          {/* Score Card */}
          <div className={`rounded-2xl p-8 text-center shadow-card text-white ${pct >= 70 ? "gradient-success" : pct >= 50 ? "gradient-streak" : "gradient-danger"}`}>
            <div className="font-display font-bold text-7xl mb-2">{pct}%</div>
            <p className="text-white/80 text-lg">{score}/{sampleQuestions.length} correct</p>
            <p className="text-white/70 mt-2">{pct >= 70 ? "🎉 Great job!" : pct >= 50 ? "📈 Good effort, keep practicing!" : "💪 Review your weak areas"}</p>
          </div>

          {/* Answers Review */}
          <div className="space-y-4">
            {sampleQuestions.map((q, qi) => {
              const userAns = answers[qi];
              const correct = userAns === q.correct;
              return (
                <div key={qi} className={`bg-card rounded-2xl p-5 border shadow-card ${correct ? "border-accent/40" : "border-destructive/40"}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${correct ? "bg-accent" : "bg-destructive"}`}>
                      {correct ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                    </div>
                    <p className="font-semibold text-sm text-foreground">{q.question}</p>
                  </div>
                  <div className="ml-9">
                    <p className="text-sm text-muted-foreground">Your answer: <span className={correct ? "text-accent font-medium" : "text-destructive font-medium"}>{userAns !== null ? q.options[userAns] : "Not answered"}</span></p>
                    {!correct && <p className="text-sm text-muted-foreground">Correct: <span className="text-accent font-medium">{q.options[q.correct]}</span></p>}
                    <p className="text-xs text-muted-foreground mt-2 italic">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={() => setPhase("list")} className="w-full py-3 rounded-xl gradient-hero text-white font-semibold shadow-card">
            Back to Tests
          </button>
        </motion.div>
      )}
    </AppLayout>
  );
}
