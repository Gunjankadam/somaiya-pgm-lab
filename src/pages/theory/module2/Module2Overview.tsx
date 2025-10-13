import React from 'react';
import { Link } from 'react-router-dom';
import { GitBranch, Settings, Database, Calculator, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Module2Overview = () => {
  const topics = [
    {
      title: "Directed Graph Models",
      icon: GitBranch,
      path: "/theory/module2/directed-graph-models",
      description: "A Bayesian Network falls under the category of Probabilistic Graphical Modeling (PGM) technique that is used to compute uncertainties by using the concept of probability. Popularly known as Belief Networks, Bayesian Networks are used to model uncertainties by using Directed Acyclic Graphs (DAG).",
      subtopics: [
        "Bayesian Network Exploiting Independence Properties",
        "Naive Bayes Model",
        "Bayesian Network Model",
        "Reasoning Patterns",
        "Basic Independencies in Bayesian Networks",
        "Bayesian Network Semantics",
        "Graphs and Distributions"
      ]
    },
    {
      title: "Modeling",
      icon: Settings,
      path: "/theory/module2/modeling",
      description: "This section covers the process of building Bayesian networks, including how to select variables, determine structure, and assign probabilities. It also covers d-separation, a key concept for understanding independence relationships in Bayesian networks.",
      subtopics: [
        "Picking variables",
        "Picking Structure",
        "Picking Probabilities",
        "D-separation"
      ]
    },
    {
      title: "Local Probabilistic Models",
      icon: Database,
      path: "/theory/module2/local-probabilistic-models",
      description: "Local probabilistic models define the conditional probability distributions (CPDs) for each variable in the network. This section covers different types of CPDs and their applications.",
      subtopics: [
        "Tabular CPDs",
        "Deterministic CPDs",
        "Context Specific CPDs",
        "Generalized Linear Models"
      ]
    },
    {
      title: "Exact Inference Variable Elimination",
      icon: Calculator,
      path: "/theory/module2/exact-inference",
      description: "Variable elimination is a fundamental algorithm for exact inference in Bayesian networks. This section covers the algorithm, its complexity analysis, and various optimization techniques.",
      subtopics: [
        "Analysis of Complexity",
        "Variable Elimination",
        "Conditioning",
        "Inference with Structured CPDs"
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
            Module 2: Bayesian Network Model and Inference
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This module provides comprehensive coverage of Bayesian networks, one of the most important types of 
            probabilistic graphical models. You'll learn about directed graph models, modeling techniques, 
            local probabilistic models, and exact inference algorithms.
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
              <span>Understand the structure and semantics of Bayesian networks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Learn how to model real-world problems using Bayesian networks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Master different types of conditional probability distributions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Implement and analyze exact inference algorithms</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Understand d-separation and independence relationships</span>
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
              <span>Basic understanding of probability theory and graph theory</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Module2Overview;
