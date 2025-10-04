import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { BookOpen, Code, GitBranch, Network } from "lucide-react";

const theoryTopics = [
  {
    title: "Foundations of Probability",
    icon: BookOpen,
    subtopics: [
      "Random variables and probability distributions",
      "Joint, marginal, and conditional probabilities",
      "Bayes' theorem and conditional independence",
      "Expectation and variance",
    ],
  },
  {
    title: "Graph Theory Basics",
    icon: Network,
    subtopics: [
      "Directed and undirected graphs",
      "Paths, cycles, and connectivity",
      "Directed acyclic graphs (DAGs)",
      "Graph separation and d-separation",
    ],
  },
  {
    title: "Bayesian Networks",
    icon: GitBranch,
    subtopics: [
      "Representation using DAGs",
      "Conditional probability tables (CPTs)",
      "Local and global semantics",
      "I-maps and perfect maps",
    ],
  },
  {
    title: "Inference Algorithms",
    icon: Code,
    subtopics: [
      "Variable elimination",
      "Belief propagation",
      "Junction tree algorithm",
      "Approximate inference methods",
    ],
  },
];

const Theory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">Theory Section</h1>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This section covers the theoretical foundations of probabilistic graphical models,
            providing the mathematical and algorithmic background necessary to understand and
            implement PGM techniques.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The material is organized into modules, each building upon previous concepts to develop
            a comprehensive understanding of how graphical models represent and reason about
            uncertainty in complex systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {theoryTopics.map((topic, index) => (
            <div key={index} className="content-section">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-accent/10">
                  <topic.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">{topic.title}</h3>
              </div>
              <ul className="space-y-2">
                {topic.subtopics.map((subtopic, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>{subtopic}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Markov Networks</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Markov networks (also called Markov random fields) are undirected graphical models that
            represent the joint probability distribution over a set of random variables. Unlike
            Bayesian networks, they use undirected edges to capture symmetric dependencies.
          </p>
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Key Concepts:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Cliques and maximal cliques</li>
              <li>• Potential functions and factor graphs</li>
              <li>• Hammersley-Clifford theorem</li>
              <li>• Markov blanket and local independence</li>
            </ul>
          </div>
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Temporal Models</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Temporal probabilistic models extend graphical models to represent and reason about
            systems that evolve over time. These models are crucial for sequence analysis and
            time-series prediction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold mb-2">Hidden Markov Models</h4>
              <p className="text-muted-foreground text-sm">
                State-space models with hidden states and observable outputs, using the Markov
                assumption for temporal dependencies.
              </p>
            </div>
            <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold mb-2">Dynamic Bayesian Networks</h4>
              <p className="text-muted-foreground text-sm">
                Generalization of HMMs that allow more complex dependencies between variables
                across time slices.
              </p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4">Learning in Graphical Models</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Learning involves estimating the parameters and/or structure of a graphical model from data.
            This section covers both parameter learning (when structure is known) and structure learning
            (discovering the graph from data).
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-1">Maximum Likelihood Estimation</h4>
              <p className="text-muted-foreground text-sm">
                Finding parameters that maximize the likelihood of observed data
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-1">Expectation-Maximization Algorithm</h4>
              <p className="text-muted-foreground text-sm">
                Iterative method for learning parameters in the presence of hidden variables
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-1">Structure Learning</h4>
              <p className="text-muted-foreground text-sm">
                Discovering the graph structure using score-based or constraint-based approaches
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Theory;
