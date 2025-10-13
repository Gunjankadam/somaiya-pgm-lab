import React from 'react';
import { ArrowLeft, BookOpen, Calculator, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProbabilityTheory = () => {
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
            Introduction to Probability Theory
          </h1>
        </div>

        <div className="space-y-8">
          {/* Probability Theory Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Probability Theory</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Probability theory is a branch of mathematics that allows us to reason about events that are inherently random. 
              Another way to think about probability is in terms of repeatable statistical experiments. A statistical experiment 
              is an action or occurrence that can have multiple different outcomes, all of which can be specified in but where 
              the particular outcome that will occur cannot be specified in advance because it depends on random chance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Generation/Prediction</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Reasoning from causes to effects: Given a known set of causes and knowledge about how they interact, 
                  what are likely/unlikely outcomes
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Example:</strong> If you roll a fair 6-sided die, what is the probability of getting 1.
                </p>
              </div>
              
              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Inference</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Reasoning from effects to causes: Given knowledge about possible causes and how they interact, 
                  as well as some observed outcomes, which causes are likely/unlikely
                </p>
                <p className="text-muted-foreground text-sm">
                  <strong>Example:</strong> Observe patient's symptoms ⇒ determine disease
                </p>
              </div>
            </div>
          </div>

          {/* Basic Concepts Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Basic Concepts in Probability</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Sample Spaces</h3>
                <p className="text-muted-foreground mb-3">
                  The <strong>SAMPLE SPACE</strong> of a statistical experiment is the set of all possible outcomes.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Examples:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Random coin toss: S = {'{H, T}'}</li>
                    <li>• Roll a die: S = {'{1, 2, 3, 4, 5, 6}'}</li>
                    <li>• Choose a random number between 0 and 1: S = [0, 1]</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Events</h3>
                <p className="text-muted-foreground mb-3">
                  An <strong>EVENT</strong> is a subset of the sample space. An event is a collection of possible outcomes 
                  of a random experiment. There are two special events: the whole sample space S is called the certain 
                  or the sure event. The empty set ∅ is the null event.
                </p>
                <p className="text-muted-foreground mb-3">
                  By definition, an impossible event has probability zero, and a certain event has probability one.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Probability of an Event</h3>
                <p className="text-muted-foreground mb-3">
                  Every event E is assigned a probability P(E). "P(E) is the probability that event E is true"
                </p>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img1.png" alt="Probability of an event" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-muted-foreground mb-2">
                    The probability of an event E, which we write as P(E), is simply the number of outcomes in E 
                    divided by number of outcomes in S:
                  </p>
                  <div className="text-center">
                    <code className="bg-background px-3 py-1 rounded text-foreground">
                      P(E) = |E| / |S|
                    </code>
                  </div>
                </div>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img2.png" alt="Probability formula" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <div className="mt-4 p-4 bg-accent/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Example:</h4>
                  <p className="text-muted-foreground text-sm">
                    If you flip a fair coin once, what is the probability of getting a tail?
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Here S = {'{H,T}'} thus |S|=2, which is the total possible outcomes.<br/>
                    E ⇒ Event of getting tails, thus |E| = 1<br/>
                    Thus, P(E) = ½
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Conditional Probability</h3>
                <p className="text-muted-foreground mb-3">
                  P(B|A) = conditional probability that B is true given that A is true
                </p>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img3.png" alt="Conditional probability" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(B|A) = P(A ∩ B) / P(A)
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Random Variables Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Random Variables and Joint Distribution</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Random Variable</h3>
                <p className="text-muted-foreground mb-3">
                  A random variable is a 'random number', meaning a number which is determined by the outcome of a random experiment. 
                  Usually denoted X, Y, . . . . The range of X is the set of possible values for X.
                </p>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img4.png" alt="Random Variable" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
                
                <p className="text-muted-foreground">
                  Mathematically, X is a real-valued map on the sample space S: X: S → ℝ
                </p>
                <p className="text-muted-foreground mt-2">
                  If the range of X is finite then we say that X is a simple random variable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Joint Distribution</h3>
                <p className="text-muted-foreground mb-3">
                  Given a collection of discrete random variables X = (X₁, X₂, . . . , Xₙ), let Rᵢ be the range of Xᵢ. 
                  Then the range of X is the Cartesian product R₁ × · · · × Rₙ. Their joint pmf is the collection of 
                  probabilities P(X₁ = x₁, . . . , Xₙ = xₙ) for every point (x₁, . . . , xₙ) in the range of X₁, X₂, . . . , Xₙ.
                </p>
                <p className="text-muted-foreground mb-3">
                  Suppose that we have two random variables X and Y. If we want to know about the values that X and Y assume 
                  simultaneously during outcomes of a random experiment, we require a more complicated structure known as the 
                  joint cumulative distribution function of X and Y, defined by F_XY(x, y) = P(X ≤ x, Y ≤ y)
                </p>
                <p className="text-muted-foreground">
                  Here, we call F_X(x) and F_Y(y) the marginal cumulative distribution functions of F_XY(x, y).
                </p>
                
                <div className="my-4">
                  <img src="/theory-images/module1/img5.png" alt="Joint Distribution" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Independence Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Independence and Conditional Independence</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Independence</h3>
                <p className="text-muted-foreground mb-3">
                  Two events A and B are <strong>INDEPENDENT EVENTS</strong> if:
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• P(A|B) = P(A)</li>
                    <li>• P(B|A) = P(B)</li>
                    <li>• P(A ∩ B) = P(A) P(B)</li>
                  </ul>
                </div>
                <p className="text-muted-foreground mt-3">
                  All three conditions are equivalent - if any one is true, then all are true.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Conditional Independence</h3>
                <p className="text-muted-foreground mb-3">
                  Two events A and B are conditionally independent given event C if:
                </p>
                <div className="text-center">
                  <code className="bg-background px-3 py-1 rounded text-foreground">
                    P(A ∩ B | C) = P(A | C) P(B | C)
                  </code>
                </div>
                <p className="text-muted-foreground mt-3">
                  This means that given C, events A and B are independent of each other.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProbabilityTheory;
