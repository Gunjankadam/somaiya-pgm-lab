import React from 'react';
import { ArrowLeft, GitBranch, Network, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProbabilisticModels = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <Link 
            to="/theory/module1" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module 1
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Introduction to Probabilistic Graph Models
          </h1>
        </div>

        <div className="space-y-8">
          {/* Bayesian Network Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Bayesian Network</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Directed graphical models (a.k.a. Bayesian networks) are a family of probability distributions that admit a 
              compact parametrization that can be naturally described using a directed graph.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Graphical Representation</h3>
                <p className="text-muted-foreground mb-3">
                  Distributions of this form can be naturally expressed as directed acyclic graphs, in which vertices 
                  correspond to variables xᵢ and edges indicate dependency relationships.
                </p>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Example: Student Grade Model</h3>
                <p className="text-muted-foreground mb-3">
                  Consider a model of a student's grade g on an exam. This grade depends on the exam's difficulty d and 
                  the student's intelligence i; it also affects the quality l of the reference letter from the professor 
                  who taught the course. The student's intelligence affects the SAT scores as well.
                </p>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img9.png" alt="Bayesian Network example" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img10.png" alt="Student grade model" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <h4 className="font-semibold text-foreground mb-2">Variables:</h4>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• d: Exam difficulty (binary)</li>
                    <li>• i: Student intelligence (binary)</li>
                    <li>• g: Grade (3 possible values)</li>
                    <li>• l: Reference letter quality (binary)</li>
                    <li>• s: SAT score (binary)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Formal Definition</h3>
                <p className="text-muted-foreground mb-3">
                  A Bayesian network is a directed graph G=(V,E) together with:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>A random variable xᵢ for each node i ∈ V.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>One conditional probability distribution (CPD) p(xᵢ|x_Aᵢ) per node, specifying the probability of xᵢ conditioned on its parents' values.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Key Properties</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• A probability represented by a Bayesian network will be valid (non-negative and sums to 1)</li>
                  <li>• The graph clearly indicates how random variables depend on each other</li>
                  <li>• Can be interpreted as a story for how the data was generated</li>
                  <li>• Enables efficient inference and learning algorithms</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Markov Model Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Markov Model</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Markov models are a class of probabilistic models that use the Markov property, which states that the 
              future state depends only on the current state, not on the sequence of events that preceded it.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Markov Property</h3>
                <p className="text-muted-foreground mb-3">
                  A process has the Markov property if the conditional probability distribution of future states depends 
                  only upon the present state, not on the sequence of events that preceded it.
                </p>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img11.png" alt="Markov Model" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(Xₜ₊₁ | Xₜ, Xₜ₋₁, ..., X₁) = P(Xₜ₊₁ | Xₜ)
                  </code>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Types of Markov Models</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-accent/5 p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Discrete Markov Chain</h4>
                    <p className="text-muted-foreground text-sm">
                      States are discrete and finite. Transitions between states are governed by transition probabilities.
                    </p>
                  </div>
                  <div className="bg-accent/5 p-3 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Continuous Markov Process</h4>
                    <p className="text-muted-foreground text-sm">
                      States are continuous. Transitions are governed by transition rate matrices.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Applications</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Weather prediction models</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Stock market analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Speech recognition systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Biological sequence analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Hidden Markov Model Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Hidden Markov Model</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Hidden Markov Models (HMMs) are statistical models where the system being modeled is assumed to be a Markov 
              process with unobserved (hidden) states. The observed data is generated by the hidden states through emission probabilities.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">HMM Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">States (Hidden)</h4>
                    <p className="text-muted-foreground text-sm">
                      The underlying states that are not directly observable but influence the observed outputs.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Observations</h4>
                    <p className="text-muted-foreground text-sm">
                      The visible outputs that are generated by the hidden states according to emission probabilities.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Transitions</h4>
                    <p className="text-muted-foreground text-sm">
                      Probabilities of moving from one hidden state to another, following the Markov property.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">HMM Parameters</h3>
                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li><strong>π:</strong> Initial state probabilities</li>
                    <li><strong>A:</strong> State transition probabilities</li>
                    <li><strong>B:</strong> Emission probabilities (observation probabilities)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Problems in HMMs</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Evaluation Problem</h4>
                    <p className="text-muted-foreground text-sm">
                      Given a model and a sequence of observations, compute the probability of the observation sequence.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Decoding Problem</h4>
                    <p className="text-muted-foreground text-sm">
                      Given a model and a sequence of observations, find the most likely sequence of hidden states.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Learning Problem</h4>
                    <p className="text-muted-foreground text-sm">
                      Given a sequence of observations, estimate the model parameters that best explain the data.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Applications</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Speech recognition and natural language processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Bioinformatics (gene finding, protein structure prediction)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Financial modeling and risk assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Computer vision and pattern recognition</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Comparison Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Model Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold text-foreground">Model Type</th>
                    <th className="text-left p-3 font-semibold text-foreground">Graph Structure</th>
                    <th className="text-left p-3 font-semibold text-foreground">Key Features</th>
                    <th className="text-left p-3 font-semibold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-foreground">Bayesian Network</td>
                    <td className="p-3 text-muted-foreground">Directed Acyclic Graph</td>
                    <td className="p-3 text-muted-foreground">Causal relationships, efficient inference</td>
                    <td className="p-3 text-muted-foreground">Causal modeling, decision making</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-foreground">Markov Model</td>
                    <td className="p-3 text-muted-foreground">Chain or Network</td>
                    <td className="p-3 text-muted-foreground">Temporal dependencies, Markov property</td>
                    <td className="p-3 text-muted-foreground">Time series, sequential data</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-foreground">Hidden Markov Model</td>
                    <td className="p-3 text-muted-foreground">Hidden states + observations</td>
                    <td className="p-3 text-muted-foreground">Hidden states, emission probabilities</td>
                    <td className="p-3 text-muted-foreground">Sequence labeling, pattern recognition</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProbabilisticModels;
