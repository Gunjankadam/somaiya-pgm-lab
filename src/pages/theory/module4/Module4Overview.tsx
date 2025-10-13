import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Module4Overview = () => {
  const topics = [
    {
      title: "Template Based Graph Model",
      icon: Brain,
      path: "/theory/module4/template-based-graph-models",
      description: "Template-based models allow us to represent repeated structures in graphical models, making them particularly useful for temporal and relational data. This section covers HMMs, temporal models, and their applications.",
      subtopics: [
        "HMM- Temporal Models",
        "Template Variables and Template Factors",
        "Directed Probabilistic Models",
        "Undirected Representation",
        "Structural Uncertainty"
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
            Module 4: Hidden Markov Model and Inference
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This module covers template-based graph models, focusing on Hidden Markov Models and temporal models. 
            You'll learn about HMMs, Dynamic Bayesian Networks, and template-based representations for complex domains.
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
              <span>Understand Hidden Markov Models and their applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Learn about Dynamic Bayesian Networks and temporal modeling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Master template-based representations for complex domains</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Understand structural uncertainty and model selection</span>
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
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Module4Overview;
