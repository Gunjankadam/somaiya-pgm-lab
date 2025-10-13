import React from 'react';
import { ArrowLeft, Network, GitBranch, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GraphTheory = () => {
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
            Introduction to Graphs
          </h1>
        </div>

        <div className="space-y-8">
          {/* Nodes and Edges Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Nodes and Edges</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              A graph is a structure that comprises a set of vertices and a set of edges. Directed graphical models can be 
              represented by a graph with its vertices serving as random variables and directed edges serving as dependency 
              relationships between them.
            </p>

            <div className="my-4">
              <img src="/theory-images/module1/img6.png" alt="Graph structure" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Graph Components</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>A set V=V(G) whose elements are called vertices, points or nodes of G.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>A set E = E(G) of an unordered pair of distinct vertices called edges of G.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Directed Acyclic Graph (DAG)</h3>
                <p className="text-muted-foreground text-sm">
                  The direction of the edges determines the influence of one random variable on another. If the graph does not 
                  contain cycles (a number of vertices connected in a closed chain), it is usually referred to as a 
                  <strong> Directed Acyclic Graph (DAG)</strong>.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Inference on these graphs may be performed exactly using algorithms such as Belief Propagation (BP) or 
                  variable elimination.
                </p>
              </div>
            </div>
          </div>

          {/* Subgraphs Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Subgraphs</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              A subgraph G' of a graph G is a graph whose vertex set and edge set are subsets of the graph G. 
              In simple words, a graph is said to be a subgraph if it is a part of another graph.
            </p>

            <div className="my-4">
              <img src="/theory-images/module1/img7.png" alt="Graph components" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="my-4">
              <img src="/theory-images/module1/img8.png" alt="Subgraph example" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Properties of Subgraphs</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Every graph is a subgraph of itself</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>A single vertex is a subgraph of any graph containing that vertex</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>An edge and its two vertices form a subgraph</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold mt-1">•</span>
                  <span>Subgraphs preserve the structure of the original graph</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Paths and Trails Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Route className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Paths and Trails</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Path</h3>
                <p className="text-muted-foreground mb-3">
                  A path in a graph is a sequence of vertices where each consecutive pair of vertices is connected by an edge. 
                  In directed graphs, the edges must follow the direction of the arrows.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Path Properties:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Simple path: no vertex is repeated</li>
                    <li>• Elementary path: no edge is repeated</li>
                    <li>• Length of path: number of edges in the path</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Trail</h3>
                <p className="text-muted-foreground mb-3">
                  A trail is a walk in which no edge is repeated. Unlike a path, vertices can be repeated in a trail.
                </p>
              </div>
            </div>
          </div>

          {/* Cycles and Loops Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cycles and Loops</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Cycle</h3>
                <p className="text-muted-foreground mb-3">
                  A cycle is a path that starts and ends at the same vertex, with no repeated vertices except for the 
                  start and end vertex. In directed graphs, cycles can create dependencies that make inference more complex.
                </p>
                <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                  <h4 className="font-semibold text-foreground mb-2">Importance in PGMs:</h4>
                  <p className="text-muted-foreground text-sm">
                    Cycles in directed graphs can lead to circular dependencies, which is why Bayesian networks 
                    are typically represented as Directed Acyclic Graphs (DAGs) to avoid such complications.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Loop</h3>
                <p className="text-muted-foreground mb-3">
                  A loop is an edge that connects a vertex to itself. In the context of probabilistic graphical models, 
                  loops are generally not allowed as they don't represent meaningful probabilistic relationships.
                </p>
              </div>
            </div>
          </div>

          {/* Graph Types in PGMs */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Graph Types in Probabilistic Graphical Models</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Directed Graphs</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Used in Bayesian networks where edges represent causal or dependency relationships between variables.
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Edges have direction (arrows)</li>
                  <li>• Represent causal relationships</li>
                  <li>• Must be acyclic (DAG)</li>
                  <li>• Enable efficient inference algorithms</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Undirected Graphs</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Used in Markov networks where edges represent symmetric dependencies between variables.
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Edges have no direction</li>
                  <li>• Represent symmetric relationships</li>
                  <li>• Can contain cycles</li>
                  <li>• Used for modeling correlations</li>
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

export default GraphTheory;
