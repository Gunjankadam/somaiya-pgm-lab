import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Network, GitBranch, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Module1Overview = () => {
  const topics = [
    {
      title: "Introduction to Probability Theory",
      icon: BookOpen,
      path: "/theory/module1/probability-theory",
      description: "Probability theory provides a solid mathematical framework to analyze and model uncertain situations. By understanding the principles of probability, researchers and practitioners can make informed decisions, predict outcomes, and assess risks in a wide range of fields.",
      subtopics: [
        "Probability Theory",
        "Basic Concepts in Probability", 
        "Random Variables and Joint Distribution",
        "Independence and Conditional Independence",
        "Continuous Spaces",
        "Expectation and Variances Theory of Predicate Calculus",
        "Mathematical Induction"
      ]
    },
    {
      title: "Introduction to Graphs",
      icon: Network,
      path: "/theory/module1/graph-theory",
      description: "Graph theory provides the foundation for understanding how probabilistic graphical models represent relationships between variables. Understanding nodes, edges, and graph structures is essential for working with PGMs.",
      subtopics: [
        "Nodes and Edges",
        "Subgraphs",
        "Paths and Trails",
        "Cycles and Loop"
      ]
    },
    {
      title: "Introduction to Probabilistic Graph Models",
      icon: GitBranch,
      path: "/theory/module1/probabilistic-models",
      description: "This section introduces the core concepts of probabilistic graphical models, including Bayesian networks, Markov models, and Hidden Markov models.",
      subtopics: [
        "Bayesian Network",
        "Markov Model",
        "Hidden Markov Model"
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
            Module 1: Introduction to Probabilistic Graphical Modeling
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This module provides the foundational knowledge required to understand probabilistic graphical models. 
            It covers probability theory, graph theory basics, and introduces the core concepts of PGMs including 
            Bayesian networks, Markov models, and Hidden Markov models.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <span>Understand the fundamental concepts of probability theory and its applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Learn the basics of graph theory and how graphs represent relationships</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Introduce probabilistic graphical models and their types</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Understand the difference between directed and undirected models</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Module1Overview;
