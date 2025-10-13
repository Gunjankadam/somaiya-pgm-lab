import React from 'react';
import { ArrowLeft, Network, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const UndirectedGraphModels = () => {
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
            Undirected Graph Models
          </h1>
        </div>

        <div className="space-y-8">
          {/* Markov Networks Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Markov Networks</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Undirected Graphical Models are used to represent the joint probability distribution of a set of random variables. 
              They are represented by an undirected graph where nodes represent random variables and edges represent dependencies 
              between the random variables.
            </p>

            <div className="my-4">
              <img src="/theory-images/module3/img1.png" alt="Markov Network" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Properties</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Use undirected edges to capture symmetric dependencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Can contain cycles unlike Bayesian networks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Represent correlations between variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Use potential functions to define probabilities</span>
                  </li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Parameterization</h3>
                <p className="text-muted-foreground mb-3">
                  Markov networks use potential functions to define the joint probability distribution. 
                  The probability is proportional to the product of potential functions over cliques.
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(x) ∝ ∏ φ_c(x_c)
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Gibbs Distribution Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Gibbs Distribution</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Gibbs distribution is a fundamental concept in Markov networks that defines how potential functions 
              combine to create a valid probability distribution.
            </p>

            <div className="my-4">
              <img src="/theory-images/module3/img2.png" alt="Gibbs Distribution" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Mathematical Formulation</h3>
                <p className="text-muted-foreground mb-3">
                  The Gibbs distribution is defined as:
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(x) = (1/Z) * exp(-E(x))
                  </code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Where Z is the partition function (normalization constant) and E(x) is the energy function.
                </p>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Key Concepts</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Energy function: E(x) = -∑ log φ_c(x_c)</li>
                  <li>• Partition function: Z = ∑ exp(-E(x))</li>
                  <li>• Boltzmann distribution: exp(-E(x)/T)</li>
                  <li>• Temperature parameter T controls sharpness</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Independence Properties Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Independence Properties</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Markov Blanket</h3>
                <p className="text-muted-foreground mb-3">
                  In undirected graphs, the Markov blanket of a node consists of all its neighbors. 
                  A node is conditionally independent of all other nodes given its Markov blanket.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module3/img3.png" alt="Markov Blanket" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Local Independence</h4>
                  <p className="text-muted-foreground text-sm">
                    A variable is independent of all others given its immediate neighbors in the graph.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Global Independence</h4>
                  <p className="text-muted-foreground text-sm">
                    Two sets of variables are independent if they are separated by a third set.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cliques and Maximal Cliques Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cliques and Maximal Cliques</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Clique Definition</h3>
                <p className="text-muted-foreground mb-3">
                  A clique is a subset of nodes where every pair of nodes is connected by an edge. 
                  A maximal clique is a clique that cannot be extended by adding another node.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module3/img4.png" alt="Cliques" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Hammersley-Clifford Theorem</h3>
                <p className="text-muted-foreground mb-3">
                  This theorem states that a positive probability distribution can be represented as a Markov network 
                  if and only if it factorizes according to the cliques of the graph.
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(x) = (1/Z) * ∏ φ_c(x_c)
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Factor Graphs Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Factor Graphs</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Bipartite Representation</h3>
                <p className="text-muted-foreground mb-3">
                  Factor graphs provide a bipartite representation of the factorization, with variable nodes 
                  and factor nodes connected by edges.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module3/img5.png" alt="Factor Graphs" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Variable Nodes</h4>
                  <p className="text-muted-foreground text-sm">
                    Represent the random variables in the model.
                  </p>
                </div>
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Factor Nodes</h4>
                  <p className="text-muted-foreground text-sm">
                    Represent the potential functions or factors.
                  </p>
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

export default UndirectedGraphModels;
