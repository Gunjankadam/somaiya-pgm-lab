import { useNavigate } from "react-router-dom";
import {
  Dices,
  Network,
  GitBranch,
  Workflow,
  Eye,
  TrendingUp,
  TreeDeciduous,
  FileText,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import ExperimentCard from "@/components/ExperimentCard";
import { toast } from "sonner";

const experiments = [
  {
    title: "Probability Theory",
    description: "Explore the fundamental concepts of probability, including random variables, distributions, and Bayes' theorem.",
    icon: Dices,
  },
  {
    title: "Graph Theory",
    description: "Learn about directed and undirected graphs, nodes, edges, and their applications in modeling dependencies.",
    icon: Network,
  },
  {
    title: "Bayesian Network",
    description: "Understand how Bayesian networks represent probabilistic relationships among variables using directed acyclic graphs.",
    icon: GitBranch,
  },
  {
    title: "Markov Chain Model",
    description: "Study stochastic processes with the Markov property and their applications in sequence modeling.",
    icon: Workflow,
  },
  {
    title: "Hidden Markov Model",
    description: "Discover how HMMs model systems with hidden states and observable outputs, widely used in speech and pattern recognition.",
    icon: Eye,
  },
  {
    title: "Maximum Likelihood Estimation",
    description: "Learn parameter estimation techniques to find the most likely parameters that explain observed data.",
    icon: TrendingUp,
  },
  {
    title: "Decision Tree",
    description: "Build decision trees for classification and regression, understanding entropy, information gain, and pruning techniques.",
    icon: TreeDeciduous,
  },
  {
    title: "Case Study",
    description: "Apply PGM concepts to real-world problems, analyzing datasets and implementing complete solutions.",
    icon: FileText,
  },
];

const Experiments = () => {
  const navigate = useNavigate();

  const handleExperimentClick = (title: string, index: number) => {
    toast.success(`Starting ${title} experiment`, {
      description: "Loading experiment interface...",
    });
    // Navigate to the specific experiment page
    navigate(`/experiments/experiment${index + 1}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">List of Experiments</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive collection of interactive experiments designed to help you
            master probabilistic graphical models through hands-on learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <ExperimentCard
              key={index}
              title={experiment.title}
              description={experiment.description}
              icon={experiment.icon}
              onClick={() => handleExperimentClick(experiment.title, index)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Experiments;
