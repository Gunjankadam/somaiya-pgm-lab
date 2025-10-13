import React from 'react';
import { ArrowLeft, Calculator, TrendingUp, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ParameterEstimation = () => {
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
            Parameter Estimation
          </h1>
        </div>

        <div className="space-y-8">
          {/* Maximum Likelihood Estimation Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Maximum Likelihood Estimation (MLE)</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Maximum Likelihood Estimation is a method for estimating the parameters of a statistical model. 
              It finds the parameter values that maximize the likelihood of observing the given data.
            </p>

            <div className="my-4">
              <img src="/theory-images/module5/image1.png" alt="Maximum Likelihood Estimation" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Likelihood Function</h3>
                <p className="text-muted-foreground mb-3">
                  The likelihood function measures how well a set of parameters explains the observed data. 
                  For independent observations, the likelihood is the product of individual probabilities.
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    L(θ) = ∏ P(x_i | θ)
                  </code>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">MLE Properties</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Consistency: MLE converges to true parameters as sample size increases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Asymptotic normality: MLE follows normal distribution for large samples</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span>Efficiency: MLE achieves the Cramér-Rao lower bound</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bayesian Parameter Estimation Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Bayesian Parameter Estimation</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bayesian parameter estimation incorporates prior knowledge about parameters and updates beliefs 
              based on observed data using Bayes' theorem.
            </p>

            <div className="my-4">
              <img src="/theory-images/module5/image2.png" alt="Bayesian Parameter Estimation" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Bayes' Theorem for Parameters</h3>
                <p className="text-muted-foreground mb-3">
                  The posterior distribution combines prior knowledge with observed data:
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(θ | D) ∝ P(D | θ) × P(θ)
                  </code>
                </div>
                <p className="text-muted-foreground mt-3">
                  Where P(θ) is the prior, P(D | θ) is the likelihood, and P(θ | D) is the posterior.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Conjugate Priors</h4>
                  <p className="text-muted-foreground text-sm">
                    Prior and posterior distributions belong to the same family, 
                    making computation tractable.
                  </p>
                </div>
                <div className="bg-accent/5 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Non-conjugate Priors</h4>
                  <p className="text-muted-foreground text-sm">
                    Require numerical methods like MCMC for posterior computation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning with Complete Data Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Learning with Complete Data</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Complete Data Scenario</h3>
                <p className="text-muted-foreground mb-3">
                  When all variables in the graphical model are observed, parameter learning becomes 
                  straightforward using standard statistical methods.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module5/image3.png" alt="Complete Data Learning" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Learning Steps</h3>
                <ol className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">1.</span>
                    <span>Collect complete observations for all variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">2.</span>
                    <span>Estimate conditional probability distributions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">3.</span>
                    <span>Use maximum likelihood or Bayesian estimation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold mt-1">4.</span>
                    <span>Validate learned parameters on test data</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Learning with Incomplete Data Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Learning with Incomplete Data</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Missing Data Challenges</h3>
                <p className="text-muted-foreground mb-3">
                  When some variables are unobserved or missing, parameter learning becomes more complex 
                  and requires specialized algorithms like the EM algorithm.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module5/image4.png" alt="Incomplete Data Learning" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Expectation-Maximization (EM)</h4>
                  <p className="text-muted-foreground text-sm">
                    Iterative algorithm that alternates between estimating missing values 
                    and updating parameters.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Variational Methods</h4>
                  <p className="text-muted-foreground text-sm">
                    Approximate the intractable posterior using simpler distributions.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">EM Algorithm Steps</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• E-step: Compute expected values of missing variables</li>
                  <li>• M-step: Update parameters using expected values</li>
                  <li>• Repeat until convergence</li>
                  <li>• Guaranteed to increase likelihood at each iteration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Structure Learning Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Structure Learning</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Learning Graph Structure</h3>
                <p className="text-muted-foreground mb-3">
                  Structure learning involves finding the optimal graph structure that best explains 
                  the observed data, which is typically NP-hard.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module5/image5.png" alt="Structure Learning" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Score-Based Methods</h4>
                  <p className="text-muted-foreground text-sm">
                    Use scoring functions (BIC, AIC, MDL) to evaluate different structures 
                    and search for the optimal one.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Constraint-Based Methods</h4>
                  <p className="text-muted-foreground text-sm">
                    Use statistical tests to determine conditional independence 
                    relationships and construct the graph.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Search Strategies</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Greedy search: Add/remove edges to improve score</li>
                  <li>• Genetic algorithms: Evolutionary approach to structure search</li>
                  <li>• MCMC methods: Sample from posterior over structures</li>
                  <li>• Hybrid methods: Combine score-based and constraint-based approaches</li>
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

export default ParameterEstimation;
