import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Module6Overview = () => {
  const topics = [
    {
      title: "Applications of Probabilistic Graphical Models",
      icon: Globe,
      path: "/theory/module6/applications",
      description: "Explore real-world applications of PGMs across diverse domains including computer vision, natural language processing, bioinformatics, finance, and cybersecurity. Learn how these models solve complex problems in practice.",
      subtopics: [
        "Computer Vision",
        "Natural Language Processing",
        "Bioinformatics",
        "Finance and Economics",
        "Security and Privacy",
        "Emerging Applications"
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
            Module 6: Applications
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This module covers real-world applications of probabilistic graphical models including Bayesian networks, 
            Markov models, and HMMs in various domains. Discover how PGMs are transforming industries and solving 
            complex real-world problems.
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
                  <h4 className="font-semibold text-foreground mb-2">Application Domains:</h4>
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
                  Explore Applications →
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
              <span>Understand how PGMs are applied in computer vision and image analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Learn about NLP applications including language modeling and translation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Explore bioinformatics applications in genomics and drug discovery</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Understand financial applications in risk management and trading</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Discover cybersecurity and privacy-preserving applications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Explore emerging applications in autonomous systems and healthcare AI</span>
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
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>Module 5: Learning and Taking Actions and Decisions</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-xl font-semibold text-foreground mb-3">Real-World Impact</h3>
          <p className="text-muted-foreground mb-3">
            Probabilistic Graphical Models have revolutionized numerous industries and continue to drive innovation 
            in artificial intelligence, data science, and decision-making systems. This module showcases the 
            practical power and versatility of PGMs in solving complex real-world problems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1000+</div>
              <div className="text-sm text-muted-foreground">Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Application Domains</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">$10B+</div>
              <div className="text-sm text-muted-foreground">Market Impact</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Module6Overview;
