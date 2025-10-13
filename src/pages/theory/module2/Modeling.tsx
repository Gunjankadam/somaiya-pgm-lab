import React from 'react';
import { ArrowLeft, Settings, Network, Target, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Modeling = () => {
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
            Modeling
          </h1>
        </div>

        <div className="space-y-8">
          {/* Picking Variables Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Picking Variables</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              The first step in building a Bayesian network is selecting the relevant variables that capture 
              the essential aspects of the domain being modeled. This involves identifying the key factors 
              that influence the system's behavior.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img6.png" alt="Variable Selection" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Variable Selection Criteria</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Relevance</h4>
                    <p className="text-muted-foreground text-sm">
                      Variables should be directly relevant to the problem domain and decision-making process.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Observability</h4>
                    <p className="text-muted-foreground text-sm">
                      Consider whether variables can be observed, measured, or inferred from available data.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Granularity</h4>
                    <p className="text-muted-foreground text-sm">
                      Choose appropriate level of detail - not too coarse, not too fine-grained.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Independence</h4>
                    <p className="text-muted-foreground text-sm">
                      Variables should capture distinct aspects of the domain without excessive overlap.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Common Variable Types</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Observable variables:</strong> Directly measurable quantities</li>
                  <li>• <strong>Latent variables:</strong> Hidden or unobservable factors</li>
                  <li>• <strong>Decision variables:</strong> Choices under the decision maker's control</li>
                  <li>• <strong>Utility variables:</strong> Outcomes that determine value or preference</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Picking Structure Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Network className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Picking Structure</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              The structure of a Bayesian network defines the conditional independence relationships 
              between variables. The graph structure should reflect the causal relationships and 
              dependencies in the domain.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img7.png" alt="Network Structure" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Structure Design Principles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Causal Relationships</h4>
                    <p className="text-muted-foreground text-sm">
                      Edges should represent causal influences where one variable directly affects another.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Temporal Ordering</h4>
                    <p className="text-muted-foreground text-sm">
                      Consider the temporal sequence of events and their causal relationships.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Sparsity</h4>
                    <p className="text-muted-foreground text-sm">
                      Prefer simpler structures that capture essential relationships without overfitting.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Expert Knowledge</h4>
                    <p className="text-muted-foreground text-sm">
                      Incorporate domain expertise to guide structure selection and validation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Structure Learning Approaches</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Expert-driven:</strong> Manual construction based on domain knowledge</li>
                  <li>• <strong>Data-driven:</strong> Automated learning from observational data</li>
                  <li>• <strong>Hybrid:</strong> Combination of expert knowledge and data analysis</li>
                  <li>• <strong>Constraint-based:</strong> Using statistical tests to determine independence</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Picking Probabilities Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Picking Probabilities</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Once the structure is determined, the next step is to specify the conditional probability 
              distributions (CPDs) for each variable. These probabilities quantify the relationships 
              defined by the network structure.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img8.png" alt="Probability Assignment" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Probability Sources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Historical Data</h4>
                    <p className="text-muted-foreground text-sm">
                      Use empirical data to estimate probabilities through statistical analysis.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Expert Judgment</h4>
                    <p className="text-muted-foreground text-sm">
                      Leverage domain expertise when data is limited or unavailable.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Literature Review</h4>
                    <p className="text-muted-foreground text-sm">
                      Use published studies and research findings to inform probability estimates.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Sensitivity Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Test robustness of conclusions across different probability values.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Probability Assessment Techniques</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Frequency analysis:</strong> Count-based estimation from data</li>
                  <li>• <strong>Bayesian updating:</strong> Combining prior beliefs with new evidence</li>
                  <li>• <strong>Calibration:</strong> Training experts to provide well-calibrated probabilities</li>
                  <li>• <strong>Cross-validation:</strong> Testing probability estimates on held-out data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* D-separation Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">D-separation</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              D-separation (directional separation) is a fundamental concept for understanding conditional 
              independence relationships in Bayesian networks. It provides a graphical criterion for 
              determining when variables are conditionally independent.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img9.png" alt="D-separation" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">D-separation Rules</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Chain Pattern</h4>
                    <p className="text-muted-foreground text-sm">
                      X → Y → Z: X and Z are d-separated given Y (blocked by Y).
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Fork Pattern</h4>
                    <p className="text-muted-foreground text-sm">
                      X ← Y → Z: X and Z are d-separated given Y (blocked by Y).
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Collider Pattern</h4>
                    <p className="text-muted-foreground text-sm">
                      X → Y ← Z: X and Z are d-separated unless Y or its descendants are observed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">D-separation Algorithm</h3>
                <ol className="space-y-1 text-muted-foreground text-sm">
                  <li>1. Mark all observed variables and their descendants</li>
                  <li>2. For each path between X and Y, check if it's blocked</li>
                  <li>3. A path is blocked if it contains a non-collider that is observed</li>
                  <li>4. A path is blocked if it contains a collider that is not observed</li>
                  <li>5. X and Y are d-separated if all paths between them are blocked</li>
                </ol>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Applications of D-separation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Validating network structure against domain knowledge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Determining which variables are relevant for inference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Optimizing inference algorithms by identifying irrelevant variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Understanding the flow of information in the network</span>
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

export default Modeling;
