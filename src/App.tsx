import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Objectives from "./pages/Objectives";
import Theory from "./pages/Theory";
import Module1Overview from "./pages/theory/module1/Module1Overview";
import ProbabilityTheory from "./pages/theory/module1/ProbabilityTheory";
import GraphTheory from "./pages/theory/module1/GraphTheory";
import ProbabilisticModels from "./pages/theory/module1/ProbabilisticModels";
import Module2Overview from "./pages/theory/module2/Module2Overview";
import DirectedGraphModels from "./pages/theory/module2/DirectedGraphModels";
import Modeling from "./pages/theory/module2/Modeling";
import LocalProbabilisticModels from "./pages/theory/module2/LocalProbabilisticModels";
import Module2ExactInference from "./pages/theory/module2/ExactInference";
import Module3Overview from "./pages/theory/module3/Module3Overview";
import UndirectedGraphModels from "./pages/theory/module3/UndirectedGraphModels";
import ExactInference from "./pages/theory/module3/ExactInference";
import Module4Overview from "./pages/theory/module4/Module4Overview";
import TemplateBasedGraphModels from "./pages/theory/module4/TemplateBasedGraphModels";
import Module5Overview from "./pages/theory/module5/Module5Overview";
import ParameterEstimation from "./pages/theory/module5/ParameterEstimation";
import DecisionMaking from "./pages/theory/module5/DecisionMaking";
import Module6Overview from "./pages/theory/module6/Module6Overview";
import Applications from "./pages/theory/module6/Applications";
import Experiments from "./pages/Experiments";
import Experiment1 from "./pages/experiments/Experiment1";
import Experiment2 from "./pages/experiments/Experiment2";
import Experiment4 from "./pages/experiments/Experiment4";
import Experiment3 from "./pages/experiments/Experiment3";
import Experiment5 from "./pages/experiments/Experiment5";
import Experiment6 from "./pages/experiments/Experiment6";
import Experiment7 from "./pages/experiments/Experiment7";
import Experiment8 from "./pages/experiments/Experiment8";
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
          <Route path="/theory/module1" element={<Module1Overview />} />
          <Route path="/theory/module1/probability-theory" element={<ProbabilityTheory />} />
          <Route path="/theory/module1/graph-theory" element={<GraphTheory />} />
          <Route path="/theory/module1/probabilistic-models" element={<ProbabilisticModels />} />
          <Route path="/theory/module2" element={<Module2Overview />} />
          <Route path="/theory/module2/directed-graph-models" element={<DirectedGraphModels />} />
          <Route path="/theory/module2/modeling" element={<Modeling />} />
          <Route path="/theory/module2/local-probabilistic-models" element={<LocalProbabilisticModels />} />
          <Route path="/theory/module2/exact-inference" element={<Module2ExactInference />} />
          <Route path="/theory/module3" element={<Module3Overview />} />
          <Route path="/theory/module3/undirected-graph-models" element={<UndirectedGraphModels />} />
          <Route path="/theory/module3/exact-inference" element={<ExactInference />} />
          <Route path="/theory/module4" element={<Module4Overview />} />
          <Route path="/theory/module4/template-based-graph-models" element={<TemplateBasedGraphModels />} />
          <Route path="/theory/module5" element={<Module5Overview />} />
          <Route path="/theory/module5/parameter-estimation" element={<ParameterEstimation />} />
          <Route path="/theory/module5/decision-making" element={<DecisionMaking />} />
          <Route path="/theory/module6" element={<Module6Overview />} />
          <Route path="/theory/module6/applications" element={<Applications />} />
          <Route path="/experiments" element={<Experiments />} />
            <Route path="/experiments/experiment1" element={<Experiment1 />} />
            <Route path="/experiments/experiment2" element={<Experiment2 />} />
            <Route path="/experiments/experiment3" element={<Experiment3 />} />
            <Route path="/experiments/experiment4" element={<Experiment4 />} />
            <Route path="/experiments/experiment5" element={<Experiment5 />} />
            <Route path="/experiments/experiment6" element={<Experiment6 />} />
            <Route path="/experiments/experiment7" element={<Experiment7 />} />
            <Route path="/experiments/experiment8" element={<Experiment8 />} />
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
