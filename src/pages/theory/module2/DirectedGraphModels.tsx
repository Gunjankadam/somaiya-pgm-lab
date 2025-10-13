import React from 'react';
import { ArrowLeft, GitBranch, Network, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DirectedGraphModels = () => {
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
            Directed Graph Models
          </h1>
        </div>

        <div className="space-y-8">
          {/* Bayesian Networks Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Bayesian Networks</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              A Bayesian Network falls under the category of Probabilistic Graphical Modeling (PGM) technique that is used to 
              compute uncertainties by using the concept of probability. Popularly known as Belief Networks, Bayesian Networks 
              are used to model uncertainties by using Directed Acyclic Graphs (DAG).
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img1.png" alt="Directed Acyclic Graph" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Properties</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Represent causal relationships between variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Use directed edges to show dependencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Must be acyclic (no directed cycles)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Enable efficient inference algorithms</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Bayesian Network Semantics</h3>
                <p className="text-muted-foreground mb-3">
                  A Bayesian network defines a joint probability distribution over a set of variables through:
                </p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Local conditional probability distributions (CPDs)</li>
                  <li>• Chain rule for directed graphs</li>
                  <li>• Factorization according to the graph structure</li>
                </ul>
              </div>

              <div className="my-4">
                <img src="/theory-images/module2/img2.png" alt="Bayesian Network Semantics" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
              </div>
            </div>
          </div>

          {/* Independence Properties Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Independence Properties</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Basic Independencies</h3>
                <p className="text-muted-foreground mb-3">
                  Bayesian networks encode independence relationships through their graph structure. The key concept is 
                  d-separation, which determines when variables are conditionally independent.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module2/img3.png" alt="Basic Independencies" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <h4 className="font-semibold text-foreground mb-2">Chain Pattern</h4>
                  <p className="text-muted-foreground text-sm">
                    X → Y → Z: X and Z are independent given Y
                  </p>
                </div>
                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <h4 className="font-semibold text-foreground mb-2">Fork Pattern</h4>
                  <p className="text-muted-foreground text-sm">
                    X ← Y → Z: X and Z are independent given Y
                  </p>
                </div>
                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <h4 className="font-semibold text-foreground mb-2">Collider Pattern</h4>
                  <p className="text-muted-foreground text-sm">
                    X → Y ← Z: X and Z are independent, but dependent given Y
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Naive Bayes Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Naive Bayes Model</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Naive Bayes model is a simple but powerful Bayesian network where all features are assumed to be 
              conditionally independent given the class variable. Despite this "naive" assumption, it often performs 
              surprisingly well in practice.
            </p>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Key Assumptions</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>• All features are conditionally independent given the class</li>
                <li>• Each feature contributes independently to the class probability</li>
                <li>• Simple structure makes it computationally efficient</li>
                <li>• Works well with high-dimensional data</li>
              </ul>
            </div>

            <div className="my-4">
              <img src="/theory-images/module2/img4.png" alt="Naive Bayes Model" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>
          </div>

          {/* Reasoning Patterns Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Reasoning Patterns</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Types of Reasoning</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Causal Reasoning</h4>
                    <p className="text-muted-foreground text-sm">
                      Reasoning from causes to effects. Given the values of parent variables, 
                      we can infer the probability distribution of child variables.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Evidential Reasoning</h4>
                    <p className="text-muted-foreground text-sm">
                      Reasoning from effects to causes. Given observed evidence, 
                      we can update our beliefs about the causes.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Intercausal Reasoning</h4>
                    <p className="text-muted-foreground text-sm">
                      Reasoning between causes of the same effect. 
                      Explaining away one cause when another is observed.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Mixed Reasoning</h4>
                    <p className="text-muted-foreground text-sm">
                      Combining multiple types of reasoning in complex scenarios 
                      with multiple variables and evidence.
                    </p>
                  </div>
                </div>

                <div className="my-4">
                  <img src="/theory-images/module2/img5.png" alt="Reasoning Patterns" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DirectedGraphModels;
