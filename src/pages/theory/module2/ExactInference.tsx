import React from 'react';
import { ArrowLeft, Calculator, Network, Brain } from 'lucide-react';
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
            to="/theory/module2" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module 2
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Exact Inference Variable Elimination
          </h1>
        </div>

        <div className="space-y-8">
          {/* Variable Elimination Algorithm Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Variable Elimination Algorithm</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Variable elimination is a fundamental exact inference algorithm for Bayesian networks. 
              It systematically eliminates variables by summing them out, reducing the joint probability 
              distribution to the desired marginal probabilities.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img14.png" alt="Variable Elimination" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Algorithm Steps</h3>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">1.</span>
                      <span>Select a variable to eliminate (following an elimination order)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">2.</span>
                      <span>Collect all factors that contain the variable to be eliminated</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">3.</span>
                      <span>Multiply the collected factors together</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">4.</span>
                      <span>Sum out the variable from the resulting factor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">5.</span>
                      <span>Add the new factor to the set of remaining factors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent font-bold mt-1">6.</span>
                      <span>Repeat until all non-query variables are eliminated</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Mathematical Formulation</h3>
                <p className="text-muted-foreground text-sm">
                  For a query P(Q|E), where Q is the query variable and E is evidence:
                </p>
                <div className="text-center mt-2">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(Q|E) = P(Q,E) / P(E) = (∑ P(Q,E,H)) / (∑ P(E,H))
                  </code>
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  where H represents the hidden variables to be eliminated.
                </p>
              </div>
            </div>
          </div>

          {/* Elimination Order Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Elimination Order</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              The order in which variables are eliminated significantly affects the computational complexity 
              of the variable elimination algorithm. Finding the optimal elimination order is NP-hard, 
              but several heuristics provide good approximations.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img15.png" alt="Elimination Order" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Elimination Order Heuristics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Min-Fill</h4>
                    <p className="text-muted-foreground text-sm">
                      Eliminate variables that create the fewest new edges when removed from the graph.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Min-Degree</h4>
                    <p className="text-muted-foreground text-sm">
                      Eliminate variables with the fewest neighbors in the current graph.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Min-Weight</h4>
                    <p className="text-muted-foreground text-sm">
                      Consider both graph structure and variable domain sizes in the ordering.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Reverse Elimination</h4>
                    <p className="text-muted-foreground text-sm">
                      Start from the query variables and work backwards through the network.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Complexity Analysis</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Treewidth:</strong> The maximum clique size in the elimination process</li>
                  <li>• <strong>Exponential complexity:</strong> O(k^w) where k is domain size, w is treewidth</li>
                  <li>• <strong>Optimal order:</strong> Minimizes the treewidth of the elimination process</li>
                  <li>• <strong>Heuristic performance:</strong> Min-fill typically performs well in practice</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Message Passing Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Message Passing</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Message passing provides an alternative view of variable elimination, where information 
              flows through the network in the form of messages between variables. This perspective 
              is particularly useful for understanding and implementing inference algorithms.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img16.png" alt="Message Passing" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Message Passing Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Upward Pass</h4>
                    <p className="text-muted-foreground text-sm">
                      Messages flow from leaves to root, collecting information from all subtrees.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Downward Pass</h4>
                    <p className="text-muted-foreground text-sm">
                      Messages flow from root to leaves, distributing information to all nodes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Message Computation</h3>
                <p className="text-muted-foreground text-sm">
                  For a variable X with parents U and children Y, the message from X to Y is:
                </p>
                <div className="text-center mt-2">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    m_X→Y(y) = ∑_x P(x|u) × ∏_Z∈children(X) m_Z→X(x)
                  </code>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Advantages of Message Passing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Intuitive interpretation of information flow in the network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Efficient computation of multiple queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Natural extension to approximate inference algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Parallel implementation possibilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Junction Tree Algorithm Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Junction Tree Algorithm</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              The junction tree algorithm provides a systematic approach to exact inference by first 
              converting the Bayesian network into a junction tree, then performing message passing 
              on this tree structure.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Junction Tree Construction</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Moralization</h4>
                    <p className="text-muted-foreground text-sm">
                      Add edges between all parents of each variable to create an undirected graph.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Triangulation</h4>
                    <p className="text-muted-foreground text-sm">
                      Add edges to eliminate cycles of length greater than 3.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Tree Construction</h4>
                    <p className="text-muted-foreground text-sm">
                      Build a tree where nodes are cliques and edges connect adjacent cliques.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Junction Tree Properties</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Running intersection:</strong> Variables in intersection of adjacent cliques</li>
                  <li>• <strong>Clique tree:</strong> Each clique contains a maximal set of variables</li>
                  <li>• <strong>Separator sets:</strong> Variables shared between adjacent cliques</li>
                  <li>• <strong>Consistency:</strong> Marginal distributions agree on separator sets</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Inference on Junction Trees</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">1.</span>
                    <span>Initialize clique potentials with original CPDs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">2.</span>
                    <span>Perform upward pass to collect information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">3.</span>
                    <span>Perform downward pass to distribute information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">4.</span>
                    <span>Normalize clique potentials to obtain marginals</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Complexity and Limitations Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Complexity and Limitations</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Computational Complexity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Time Complexity</h4>
                    <p className="text-muted-foreground text-sm">
                      O(n × k^w) where n is number of variables, k is domain size, w is treewidth.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Space Complexity</h4>
                    <p className="text-muted-foreground text-sm">
                      O(k^w) for storing intermediate factors during elimination.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">When Exact Inference is Feasible</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Low treewidth:</strong> Networks with tree-like structure</li>
                  <li>• <strong>Small domains:</strong> Variables with few possible values</li>
                  <li>• <strong>Sparse networks:</strong> Few connections between variables</li>
                  <li>• <strong>Structured domains:</strong> Hierarchical or modular organization</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Limitations and Alternatives</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Exact inference becomes intractable for high treewidth networks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Approximate inference methods (MCMC, variational) for large networks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Structure learning to find simpler network representations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Domain-specific approximations and simplifications</span>
                  </li>
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
