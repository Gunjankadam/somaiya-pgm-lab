import React from 'react';
import { ArrowLeft, Target, Brain, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DecisionMaking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <Link 
            to="/theory/module5" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module 5
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Decision Making
          </h1>
        </div>

        <div className="space-y-8">
          {/* Decision Theory Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Decision Theory</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Decision theory provides a framework for making optimal decisions under uncertainty. 
              It combines probability theory with utility theory to guide rational decision-making.
            </p>

            <div className="my-4">
              <img src="/theory-images/module5/image6.png" alt="Decision Theory" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Decision Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Actions</h4>
                    <p className="text-muted-foreground text-sm">
                      The set of possible decisions or choices available to the decision maker.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">States</h4>
                    <p className="text-muted-foreground text-sm">
                      The uncertain states of the world that affect the outcome of decisions.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Utilities</h4>
                    <p className="text-muted-foreground text-sm">
                      The values or preferences assigned to different outcomes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Expected Utility</h3>
                <p className="text-muted-foreground mb-2">
                  The expected utility of an action is the weighted average of utilities across all possible states:
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    EU(a) = ∑ P(s) × U(a, s)
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Influence Diagrams Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Influence Diagrams</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Influence diagrams extend Bayesian networks to include decision nodes and utility nodes, 
              providing a graphical representation of decision problems under uncertainty.
            </p>

            <div className="my-4">
              <img src="/theory-images/module5/image7.png" alt="Influence Diagrams" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Node Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Chance Nodes</h4>
                    <p className="text-muted-foreground text-sm">
                      Represent uncertain variables with probability distributions (circles).
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Decision Nodes</h4>
                    <p className="text-muted-foreground text-sm">
                      Represent choices available to the decision maker (rectangles).
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Utility Nodes</h4>
                    <p className="text-muted-foreground text-sm">
                      Represent the value or utility of outcomes (diamonds).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Decision Making Process</h3>
                <ol className="space-y-1 text-muted-foreground text-sm">
                  <li>• Identify all possible actions and their consequences</li>
                  <li>• Assess probabilities of different states of the world</li>
                  <li>• Assign utilities to different outcomes</li>
                  <li>• Calculate expected utility for each action</li>
                  <li>• Choose the action with maximum expected utility</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Value of Information Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Value of Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Information Gathering</h3>
                <p className="text-muted-foreground mb-3">
                  The value of information measures how much additional information is worth 
                  in terms of improving decision quality.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module5/image8.png" alt="Value of Information" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Expected Value of Information (EVI)</h4>
                  <p className="text-muted-foreground text-sm">
                    The expected improvement in decision quality from gathering additional information.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Expected Value of Perfect Information (EVPI)</h4>
                  <p className="text-muted-foreground text-sm">
                    The maximum value of information when all uncertainty is resolved.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Information Gathering Decision</h3>
                <p className="text-muted-foreground text-sm">
                  A rational decision maker should gather information if and only if the cost 
                  of gathering it is less than its expected value.
                </p>
              </div>
            </div>
          </div>

          {/* Sequential Decision Making Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Sequential Decision Making</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Multi-Stage Decisions</h3>
                <p className="text-muted-foreground mb-3">
                  Sequential decision making involves a series of decisions where each decision 
                  may influence future states and available options.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module5/image9.png" alt="Sequential Decision Making" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Dynamic Programming</h3>
                  <p className="text-muted-foreground mb-3">
                    Dynamic programming provides an optimal solution for sequential decision problems 
                    by working backwards from the final stage.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-3">Bellman Equation</h3>
                  <p className="text-muted-foreground mb-3">
                    The optimal value function satisfies the Bellman equation:
                  </p>
                  <div className="text-center">
                    <code className="bg-background px-3 py-1 rounded text-foreground">
                      V*(s) = max_a ∑ P(s'|s,a) × [R(s,a,s') + γV*(s')]
                    </code>
                  </div>
                  <p className="text-muted-foreground mt-3">
                    Where γ is the discount factor and R(s,a,s') is the reward.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Markov Decision Processes</h4>
                    <p className="text-muted-foreground text-sm">
                      Framework for modeling sequential decision making with Markov property.
                    </p>
                  </div>
                  <div className="bg-accent/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Policy Iteration</h4>
                    <p className="text-muted-foreground text-sm">
                      Algorithm for finding optimal policies in sequential decision problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Risk Analysis</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Risk Assessment</h3>
                <p className="text-muted-foreground mb-3">
                  Risk analysis evaluates the potential negative outcomes of decisions and 
                  helps decision makers understand and manage uncertainty.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module5/image10.png" alt="Risk Analysis" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Risk Measures</h4>
                  <p className="text-muted-foreground text-sm">
                    Value at Risk (VaR), Conditional Value at Risk (CVaR), and other metrics 
                    to quantify potential losses.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Risk Management</h4>
                  <p className="text-muted-foreground text-sm">
                    Strategies for mitigating risks including diversification, hedging, 
                    and insurance.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Risk Preferences</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Risk-averse: Prefer certain outcomes over uncertain ones</li>
                  <li>• Risk-neutral: Indifferent between certain and uncertain outcomes</li>
                  <li>• Risk-seeking: Prefer uncertain outcomes over certain ones</li>
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

export default DecisionMaking;
