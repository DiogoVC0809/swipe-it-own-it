import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Summary from "./components/Summary";
import FeedbackForm from "./components/FeedbackForm";
import ThankYou from "./components/ThankYou";
import LanguageSelection from "./components/LanguageSelection"; // atualizado
import { useState } from "react";

import './i18n';

interface Decision {
  objectName: string;
  choice: 'Buy' | 'Rent';
  timestamp: string;
}

const queryClient = new QueryClient();

const App = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  const handleReset = () => {
    setDecisions([]);
  };

  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback enviado:', feedback);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/summary" element={<Summary decisions={decisions} onReset={handleReset} />} />
            <Route path="/feedback-form" element={<FeedbackForm onSubmit={handleFeedbackSubmit} decisions={decisions} />} />
            <Route path="/thank-you" element={<ThankYou onReset={handleReset} />} />
            <Route path="/select-language" element={<LanguageSelection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
