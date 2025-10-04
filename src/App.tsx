import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Objectives from "./pages/Objectives";
import Theory from "./pages/Theory";
import Experiments from "./pages/Experiments";
import Experiment1 from "./pages/experiments/Experiment1";
import BayesServer from "./pages/BayesServer";
import Papers from "./pages/Papers";
import Feedback from "./pages/Feedback";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/objectives" element={<Objectives />} />
          <Route path="/theory" element={<Theory />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/experiments/experiment1" element={<Experiment1 />} />
          <Route path="/bayes-server" element={<BayesServer />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/projects" element={<Projects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
