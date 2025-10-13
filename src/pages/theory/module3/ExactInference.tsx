import React from 'react';
import { ArrowLeft, Calculator, Network } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ExactInference = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <Link 
            to="/theory/module3" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module 3
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Exact Inference Variable Elimination
          </h1>
        </div>

        <div className="space-y-8">
          {/* Graph Theoretic Analysis Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Graph Theoretic Analysis for Variable Elimination</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Variable elimination in Markov networks requires careful analysis of the graph structure to determine 
              the computational complexity and optimal elimination order.
            </p>

            <div className="my-4">
              <img src="/theory-images/module3/img6.png" alt="Graph Theoretic Analysis" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Elimination Process</h3>
                <p className="text-muted-foreground mb-3">
                  The variable elimination algorithm works by iteratively removing variables from the graph, 
                  computing intermediate results, and updating the remaining graph structure.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Steps in Variable Elimination</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">1.</span>
                    <span>Select a variable to eliminate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">2.</span>
                    <span>Collect all factors containing that variable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">3.</span>
                    <span>Multiply factors and sum out the variable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">4.</span>
                    <span>Add the resulting factor to the graph</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">5.</span>
                    <span>Repeat until all variables are eliminated</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Complexity Analysis Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Complexity Analysis</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Treewidth and Complexity</h3>
                <p className="text-muted-foreground mb-3">
                  The computational complexity of variable elimination depends on the treewidth of the graph, 
                  which measures how "tree-like" the graph is.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module3/img7.png" alt="Treewidth Analysis" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Low Treewidth</h4>
                  <p className="text-muted-foreground text-sm">
                    Graphs with low treewidth allow efficient exact inference with polynomial complexity.
                  </p>
                </div>
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">High Treewidth</h4>
                  <p className="text-muted-foreground text-sm">
                    Graphs with high treewidth may require exponential time for exact inference.
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Elimination Order</h3>
                <p className="text-muted-foreground mb-3">
                  The order in which variables are eliminated significantly affects the computational complexity. 
                  Finding the optimal elimination order is NP-hard, but heuristics can provide good approximations.
                </p>
              </div>
            </div>
          </div>

          {/* Conditioning Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Conditioning</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Conditioning for Inference</h3>
                <p className="text-muted-foreground mb-3">
                  Conditioning is a technique used to break cycles in the graph by fixing certain variables 
                  to specific values, making the remaining graph acyclic.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module3/img8.png" alt="Conditioning" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Conditioning Algorithm</h3>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <ol className="space-y-2 text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">1.</span>
                        <span>Select a set of variables to condition on</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">2.</span>
                        <span>For each possible assignment of conditioning variables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">3.</span>
                        <span>Perform inference on the resulting acyclic graph</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-accent font-bold mt-1">4.</span>
                        <span>Combine results using the law of total probability</span>
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <h3 className="font-semibold text-foreground mb-2">Trade-offs</h3>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• More conditioning variables → simpler subproblems but more subproblems</li>
                    <li>• Fewer conditioning variables → fewer subproblems but harder subproblems</li>
                    <li>• Optimal conditioning set minimizes total computational cost</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Junction Tree Algorithm Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Junction Tree Algorithm</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Message Passing</h3>
                <p className="text-muted-foreground mb-3">
                  The junction tree algorithm uses message passing between cliques to perform exact inference 
                  in a systematic and efficient manner.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module3/img9.png" alt="Junction Tree" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Collect Phase</h4>
                  <p className="text-muted-foreground text-sm">
                    Messages are passed from leaves to root, collecting information from all subtrees.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Distribute Phase</h4>
                  <p className="text-muted-foreground text-sm">
                    Messages are passed from root to leaves, distributing information to all nodes.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Advantages</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Systematic approach to exact inference</li>
                  <li>• Can compute all marginals in one pass</li>
                  <li>• Handles evidence naturally</li>
                  <li>• Provides theoretical guarantees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExactInference;
