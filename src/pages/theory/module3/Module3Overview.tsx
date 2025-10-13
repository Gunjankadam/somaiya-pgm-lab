import React from 'react';
import { Link } from 'react-router-dom';
import { Network, Calculator, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Module3Overview = () => {
  const topics = [
    {
      title: "Undirected Graph Models",
      icon: Network,
      path: "/theory/module3/undirected-graph-models",
      description: "Undirected Graphical Models are used to represent the joint probability distribution of a set of random variables. They are represented by an undirected graph where nodes represent random variables and edges represent dependencies.",
      subtopics: [
        "Markov Model-Markov Network",
        "Parameterization of Markov Network",
        "Gibbs distribution",
        "Reduced Markov Network",
        "Markov Network Independences",
        "From Distributions to Graphs",
        "Fine Grained Parameterization",
        "Over Parameterization"
      ]
    },
    {
      title: "Exact Inference Variable Elimination",
      icon: Calculator,
      path: "/theory/module3/exact-inference",
      description: "This section covers exact inference algorithms for undirected graphical models, including graph theoretic analysis for variable elimination and conditioning techniques.",
      subtopics: [
        "Graph Theoretic Analysis for Variable Elimination",
        "Conditioning"
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
            Module 3: Markov Network Model and Inference
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This module covers undirected graphical models, also known as Markov networks or Markov random fields. 
            You'll learn about their structure, parameterization, and inference algorithms.
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
              <span>Understand the structure and semantics of Markov networks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Learn about Gibbs distributions and potential functions</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Master independence relationships in undirected graphs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Implement exact inference algorithms for Markov networks</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Module3Overview;
