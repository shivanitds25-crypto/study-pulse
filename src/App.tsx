import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tracker from "./pages/Tracker";
import CalendarPage from "./pages/CalendarPage";
import Flashcards from "./pages/Flashcards";
import MockTest from "./pages/MockTest";
import TodoList from "./pages/TodoList";
import WeakAreas from "./pages/WeakAreas";
import Competition from "./pages/Competition";
import Reminders from "./pages/Reminders";
import Export from "./pages/Export";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/mock-test" element={<MockTest />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/weak-areas" element={<WeakAreas />} />
          <Route path="/competition" element={<Competition />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/export" element={<Export />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
