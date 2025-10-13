import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";
import { BookOpen, Code, GitBranch, Network, Brain, Target } from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Introduction to Probabilistic Graphical Modeling",
    icon: BookOpen,
    path: "/theory/module1",
    description: "Foundational concepts including probability theory, graph theory, and introduction to PGMs including Bayesian networks, Markov models, and Hidden Markov models.",
    topics: [
      "Introduction to Probability Theory",
      "Introduction to Graphs", 
      "Introduction to Probabilistic Graph Models"
    ]
  },
  {
    id: 2,
    title: "Bayesian Network Model and Inference",
    icon: GitBranch,
    path: "/theory/module2",
    description: "Comprehensive coverage of Bayesian networks including directed graph models, modeling techniques, local probabilistic models, and exact inference methods.",
    topics: [
      "Directed Graph Models",
      "Modeling",
      "Local Probabilistic Models",
      "Exact Inference Variable Elimination"
    ]
  },
  {
    id: 3,
    title: "Markov Network Model and Inference",
    icon: Network,
    path: "/theory/module3",
    description: "Undirected graphical models including Markov networks, parameterization, Gibbs distribution, and inference techniques for undirected models.",
    topics: [
      "Undirected Graph Models",
      "Exact Inference Variable Elimination"
    ]
  },
  {
    id: 4,
    title: "Hidden Markov Model and Inference",
    icon: Brain,
    path: "/theory/module4",
    description: "Template-based graph models focusing on Hidden Markov Models, temporal models, and their applications in sequence analysis.",
    topics: [
      "Template Based Graph Model"
    ]
  },
  {
    id: 5,
    title: "Learning and Taking Actions and Decisions",
    icon: Target,
    path: "/theory/module5",
    description: "Learning in graphical models, parameter estimation, causality, utilities and decisions, and structured decision problems.",
    topics: [
      "Learning Graphical Models",
      "Learning as Optimization",
      "Parameter Estimation",
      "Causality",
      "Utilities and Decisions",
      "Structured Decision Problems"
    ]
  },
  {
    id: 6,
    title: "Applications",
    icon: Code,
    path: "/theory/module6",
    description: "Real-world applications of probabilistic graphical models including Bayesian networks, Markov models, and HMMs in various domains.",
    topics: [
      "Application of Bayesian Networks",
      "Application of Markov Models",
      "Application of HMM"
    ]
  }
];

const Theory = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Theory Section</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Comprehensive theoretical foundations of probabilistic graphical models, organized into six modules 
            that build upon each other to develop a complete understanding of PGM concepts and applications.
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modules.map((module) => (
            <Link key={module.id} to={module.path} className="block">
              <div className="content-section hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <module.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Module {module.id}</h3>
                    <p className="text-sm text-muted-foreground">{module.title}</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {module.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2 text-sm">Topics Covered:</h4>
                  <ul className="space-y-1">
                    {module.topics.slice(0, 3).map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                    {module.topics.length > 3 && (
                      <li className="text-xs text-accent">
                        +{module.topics.length - 3} more topics
                      </li>
                    )}
                  </ul>
                </div>

                <div className="text-accent text-sm font-medium">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold mb-2">Foundation (Modules 1-2)</h4>
              <p className="text-muted-foreground text-sm">
                Start with probability theory, graph theory, and Bayesian networks to build the fundamental understanding.
              </p>
            </div>
            <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold mb-2">Advanced Models (Modules 3-4)</h4>
              <p className="text-muted-foreground text-sm">
                Explore Markov networks and Hidden Markov Models for more complex modeling scenarios.
              </p>
            </div>
            <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold mb-2">Applications (Modules 5-6)</h4>
              <p className="text-muted-foreground text-sm">
                Learn about learning algorithms, decision making, and real-world applications of PGMs.
              </p>
            </div>
          </div>
        </div>

        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4">Key Learning Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Theoretical Understanding</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Master probability theory and graph theory foundations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Understand different types of graphical models and their properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Learn inference algorithms and their computational complexity</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Practical Skills</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Design and implement graphical models for real problems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Apply learning algorithms to estimate model parameters</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Make informed decisions using utility theory and decision trees</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Theory;
