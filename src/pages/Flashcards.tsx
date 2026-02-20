import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChevronLeft, ChevronRight, RotateCcw, Check, X, Plus, Shuffle } from "lucide-react";

const decks = [
  {
    id: 1, name: "Calculus", subject: "Math", color: "#6366f1", count: 24, mastered: 18,
    cards: [
      { front: "What is the derivative of sin(x)?", back: "cos(x)" },
      { front: "What is ∫x² dx?", back: "x³/3 + C" },
      { front: "Chain Rule formula?", back: "d/dx[f(g(x))] = f'(g(x)) · g'(x)" },
      { front: "What is the limit of sin(x)/x as x→0?", back: "1" },
    ],
  },
  {
    id: 2, name: "Organic Chemistry", subject: "Chemistry", color: "#10b981", count: 32, mastered: 20,
    cards: [
      { front: "What is an electrophile?", back: "An electron-pair acceptor (Lewis acid)" },
      { front: "SN1 vs SN2: which is bimolecular?", back: "SN2 is bimolecular — rate depends on both substrate and nucleophile" },
    ],
  },
  {
    id: 3, name: "Electromagnetic Waves", subject: "Physics", color: "#f97316", count: 18, mastered: 8,
    cards: [
      { front: "Speed of light in vacuum?", back: "c = 3 × 10⁸ m/s" },
      { front: "What is Snell's Law?", back: "n₁sin(θ₁) = n₂sin(θ₂)" },
    ],
  },
];

export default function Flashcards() {
  const [selectedDeck, setSelectedDeck] = useState<null | typeof decks[0]>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [results, setResults] = useState<("know" | "review")[]>([]);

  const handleKnow = () => {
    setResults(r => [...r, "know"]);
    nextCard();
  };

  const handleReview = () => {
    setResults(r => [...r, "review"]);
    nextCard();
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => setCardIndex(i => i + 1), 200);
  };

  const resetDeck = () => {
    setCardIndex(0);
    setFlipped(false);
    setResults([]);
  };

  const currentCard = selectedDeck?.cards[cardIndex];
  const isDone = selectedDeck && cardIndex >= selectedDeck.cards.length;
  const knowCount = results.filter(r => r === "know").length;

  return (
    <AppLayout title="Flashcards" subtitle="Spaced repetition powered by AI">
      {!selectedDeck ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-lg text-foreground">Your Decks</h2>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-hero text-white text-sm font-medium shadow-card">
              <Plus className="w-4 h-4" /> Create Deck
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {decks.map((deck, i) => (
              <motion.div
                key={deck.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { setSelectedDeck(deck); setCardIndex(0); setFlipped(false); setResults([]); }}
                className="bg-card border border-border rounded-2xl p-5 shadow-card cursor-pointer hover:shadow-glow hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: deck.color }}>
                    {deck.name[0]}
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full text-white" style={{ background: deck.color }}>{deck.subject}</span>
                </div>
                <h3 className="font-display font-bold text-base text-foreground mb-1">{deck.name}</h3>
                <p className="text-muted-foreground text-xs mb-4">{deck.count} cards · {deck.mastered} mastered</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(deck.mastered / deck.count) * 100}%`, background: deck.color }} />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{Math.round((deck.mastered / deck.count) * 100)}% mastered</span>
                  <span>{deck.count - deck.mastered} to review</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : isDone ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[500px] text-center">
          <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
          <h2 className="font-display font-bold text-3xl text-foreground mb-2">Session Complete!</h2>
          <p className="text-muted-foreground mb-6">{knowCount}/{selectedDeck.cards.length} cards known</p>
          <div className="flex items-center gap-4 mb-8">
            <div className="text-center"><div className="font-bold text-2xl text-accent">{knowCount}</div><div className="text-xs text-muted-foreground">Know it</div></div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center"><div className="font-bold text-2xl text-secondary">{selectedDeck.cards.length - knowCount}</div><div className="text-xs text-muted-foreground">Review</div></div>
          </div>
          <div className="flex gap-3">
            <button onClick={resetDeck} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-muted text-foreground font-medium hover:bg-muted-foreground/20 transition-colors">
              <RotateCcw className="w-4 h-4" /> Restart
            </button>
            <button onClick={() => setSelectedDeck(null)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-hero text-white font-medium shadow-card">
              Back to Decks
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedDeck(null)} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h2 className="font-display font-bold text-lg text-foreground">{selectedDeck.name}</h2>
              <p className="text-sm text-muted-foreground">{cardIndex + 1} of {selectedDeck.cards.length}</p>
            </div>
            <button onClick={resetDeck} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center">
              <Shuffle className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Progress */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((cardIndex) / selectedDeck.cards.length) * 100}%` }}
              className="h-full rounded-full gradient-study"
            />
          </div>

          {/* Card */}
          <div className="perspective-1000" onClick={() => setFlipped(!flipped)} style={{ perspective: "1000px" }}>
            <motion.div
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative w-full cursor-pointer"
            >
              {/* Front */}
              <div className="w-full min-h-56 bg-card border border-border rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg-custom" style={{ backfaceVisibility: "hidden" }}>
                <div className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">Question</div>
                <p className="font-display font-semibold text-2xl text-foreground text-center leading-snug">{currentCard?.front}</p>
                <p className="text-muted-foreground text-sm mt-6">Click to reveal answer</p>
              </div>
              {/* Back */}
              <div className="absolute inset-0 w-full min-h-56 gradient-hero rounded-3xl p-8 flex flex-col items-center justify-center shadow-lg-custom" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <div className="text-xs font-semibold text-white/70 mb-4 uppercase tracking-wider">Answer</div>
                <p className="font-display font-bold text-2xl text-white text-center leading-snug">{currentCard?.back}</p>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          {flipped && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleReview} className="flex-1 py-3.5 rounded-2xl bg-muted hover:bg-destructive/20 text-foreground font-semibold flex items-center justify-center gap-2 border border-border transition-colors">
                <X className="w-5 h-5 text-destructive" /> Still Learning
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleKnow} className="flex-1 py-3.5 rounded-2xl gradient-success text-white font-semibold flex items-center justify-center gap-2 shadow-card transition-all">
                <Check className="w-5 h-5" /> Got It!
              </motion.button>
            </motion.div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
