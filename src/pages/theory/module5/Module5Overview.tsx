import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Target, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Module5Overview = () => {
  const topics = [
    {
      title: "Parameter Estimation",
      icon: Calculator,
      path: "/theory/module5/parameter-estimation",
      description: "Learn how to estimate parameters in graphical models from data using maximum likelihood estimation, Bayesian methods, and the EM algorithm for incomplete data.",
      subtopics: [
        "Maximum Likelihood Estimation",
        "Bayesian Parameter Estimation",
        "Learning with Complete Data",
        "Learning with Incomplete Data",
        "Structure Learning"
      ]
    },
    {
      title: "Decision Making",
      icon: Target,
      path: "/theory/module5/decision-making",
      description: "Understand decision theory, influence diagrams, and sequential decision making under uncertainty using utility theory and dynamic programming.",
      subtopics: [
        "Decision Theory",
        "Influence Diagrams",
        "Value of Information",
        "Sequential Decision Making",
        "Risk Analysis"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <Link 
            to="/theory" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Theory Section
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Module 5: Learning and Taking Actions and Decisions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This module covers learning in graphical models, parameter estimation, causality, utilities and decisions, 
            and structured decision problems. You'll learn how to extract knowledge from data and make optimal decisions under uncertainty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <Link key={index} to={topic.path} className="block">
              <div className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer h-full hover:border-accent/50 hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <topic.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{topic.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {topic.description}
                </p>

                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">Topics Covered:</h4>
                  <ul className="space-y-1">
                    {topic.subtopics.map((subtopic, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>{subtopic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-colors">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold text-foreground mb-3">Learning Objectives</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Master parameter estimation techniques for graphical models</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Understand Bayesian and maximum likelihood approaches</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Learn decision theory and utility-based decision making</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Apply influence diagrams for complex decision problems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Understand sequential decision making and dynamic programming</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-accent/5 rounded-lg border-l-4 border-accent">
          <h3 className="text-xl font-semibold text-foreground mb-3">Prerequisites</h3>
          <p className="text-muted-foreground mb-3">
            Before starting this module, make sure you have completed:
          </p>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Module 1: Introduction to Probabilistic Graphical Modeling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Module 2: Bayesian Network Model and Inference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Module 3: Markov Network Model and Inference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Module 4: Hidden Markov Model and Inference</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Module5Overview;
