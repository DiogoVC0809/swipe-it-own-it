import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Summary from "./components/Summary";  // Import the Summary component
import FeedbackForm from "./components/FeedbackForm";  // Import the FeedbackForm component
import { useState } from "react";  // Import useState if not already imported

// Define the Decision type if not imported
interface Decision {
  objectName: string;
  choice: 'Buy' | 'Rent';
  timestamp: string;
}

const queryClient = new QueryClient();

const App = () => {
  const [decisions, setDecisions] = useState<Decision[]>([]);  // Sample state for decisions

  const handleReset = () => {
    setDecisions([]);  // Reset the decisions
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/summary"
              element={<Summary decisions={decisions} onReset={handleReset} />}
            />
            <Route path="/feedback-form" element={<FeedbackForm onSubmit={() => {}} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
