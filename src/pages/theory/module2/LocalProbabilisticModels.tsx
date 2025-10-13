import React from 'react';
import { ArrowLeft, Database, Table, Settings, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LocalProbabilisticModels = () => {
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
            Local Probabilistic Models
          </h1>
        </div>

        <div className="space-y-8">
          {/* Tabular CPDs Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Table className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Tabular CPDs</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Tabular Conditional Probability Distributions (CPDs) represent the most straightforward way 
              to specify conditional probabilities in Bayesian networks. They explicitly list the probability 
              of each value of a child variable given each combination of parent values.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img10.png" alt="Tabular CPDs" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Tabular CPD Structure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Complete Specification</h4>
                    <p className="text-muted-foreground text-sm">
                      Every possible combination of parent values has a corresponding probability distribution 
                      for the child variable.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Normalization</h4>
                    <p className="text-muted-foreground text-sm">
                      Each row must sum to 1, ensuring valid probability distributions for each parent configuration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Advantages and Limitations</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Advantages:</strong> Simple, interpretable, no assumptions about functional form</li>
                  <li>• <strong>Limitations:</strong> Exponential growth with number of parents, requires large amounts of data</li>
                  <li>• <strong>Best for:</strong> Small networks with few parents per variable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Deterministic CPDs Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Deterministic CPDs</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Deterministic CPDs represent cases where the child variable is completely determined by its parents. 
              These are useful for modeling logical relationships, mathematical functions, and constraints.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img11.png" alt="Deterministic CPDs" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Types of Deterministic Relationships</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Logical Functions</h4>
                    <p className="text-muted-foreground text-sm">
                      Boolean operations like AND, OR, NOT that determine the child's value based on parent values.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Mathematical Functions</h4>
                    <p className="text-muted-foreground text-sm">
                      Arithmetic operations, comparisons, and other mathematical relationships between variables.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Constraints</h4>
                    <p className="text-muted-foreground text-sm">
                      Hard constraints that limit the possible values of variables based on parent states.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Threshold Functions</h4>
                    <p className="text-muted-foreground text-sm">
                      Functions that output different values based on whether parent values exceed certain thresholds.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Implementation Benefits</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Efficiency:</strong> No need to store probability tables</li>
                  <li>• <strong>Precision:</strong> Exact relationships without approximation</li>
                  <li>• <strong>Interpretability:</strong> Clear logical or mathematical relationships</li>
                  <li>• <strong>Consistency:</strong> Guaranteed consistency with domain constraints</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Context Specific CPDs Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Context Specific CPDs</h2>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Context Specific CPDs allow different probability distributions for different contexts or 
              conditions. This provides a more flexible and efficient way to represent conditional 
              probabilities when the relationship depends on specific parent values.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img12.png" alt="Context Specific CPDs" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Context Specificity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Conditional Independence</h4>
                    <p className="text-muted-foreground text-sm">
                      Some parents may be irrelevant in certain contexts, allowing for simpler distributions.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Different Models</h4>
                    <p className="text-muted-foreground text-sm">
                      Different contexts may require different types of CPDs (tabular, deterministic, etc.).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Applications</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Medical diagnosis:</strong> Different symptoms may be relevant for different diseases</li>
                  <li>• <strong>System reliability:</strong> Different failure modes may have different causes</li>
                  <li>• <strong>User modeling:</strong> Different user types may have different behavioral patterns</li>
                  <li>• <strong>Environmental modeling:</strong> Different conditions may require different models</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Generalized Linear Models Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Generalized Linear Models</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Generalized Linear Models (GLMs) provide a flexible framework for modeling the relationship 
              between continuous or discrete child variables and their parents. They extend linear regression 
              to handle various types of probability distributions.
            </p>

            <div className="my-4">
              <img src="/theory-images/module2/img13.png" alt="Generalized Linear Models" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">GLM Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Linear Predictor</h4>
                    <p className="text-muted-foreground text-sm">
                      η = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Link Function</h4>
                    <p className="text-muted-foreground text-sm">
                      g(μ) = η, where μ is the mean of the response variable
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Distribution</h4>
                    <p className="text-muted-foreground text-sm">
                      Specifies the probability distribution of the response variable
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Common GLM Types</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Linear regression:</strong> Normal distribution, identity link</li>
                  <li>• <strong>Logistic regression:</strong> Binomial distribution, logit link</li>
                  <li>• <strong>Poisson regression:</strong> Poisson distribution, log link</li>
                  <li>• <strong>Multinomial regression:</strong> Multinomial distribution, generalized logit link</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Advantages of GLMs in Bayesian Networks</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Efficient parameterization with fewer parameters than tabular CPDs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Natural handling of continuous variables and mixed data types</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Well-established statistical methods for parameter estimation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Interpretable coefficients that quantify parent-child relationships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CPD Selection Guidelines Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">CPD Selection Guidelines</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Choosing the Right CPD Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Data Characteristics</h4>
                    <p className="text-muted-foreground text-sm">
                      Consider the type and amount of available data, variable types, and relationships.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Computational Efficiency</h4>
                    <p className="text-muted-foreground text-sm">
                      Balance model expressiveness with computational tractability for inference.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Domain Knowledge</h4>
                    <p className="text-muted-foreground text-sm">
                      Leverage expert knowledge about the nature of relationships in the domain.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Model Validation</h4>
                    <p className="text-muted-foreground text-sm">
                      Test different CPD types and select based on predictive performance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Decision Tree for CPD Selection</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• <strong>Few parents, discrete variables:</strong> Tabular CPDs</li>
                  <li>• <strong>Logical/mathematical relationships:</strong> Deterministic CPDs</li>
                  <li>• <strong>Context-dependent relationships:</strong> Context-specific CPDs</li>
                  <li>• <strong>Continuous variables, many parents:</strong> GLMs</li>
                  <li>• <strong>Mixed scenarios:</strong> Hybrid approaches combining multiple types</li>
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

export default LocalProbabilisticModels;
