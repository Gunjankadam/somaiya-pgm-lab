import React from 'react';
import { ArrowLeft, Globe, Brain, Microscope, TrendingUp, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Applications = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <Link 
            to="/theory/module6" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Module 6
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Applications of Probabilistic Graphical Models
          </h1>
        </div>

        <div className="space-y-8">
          {/* Computer Vision Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Computer Vision</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Probabilistic Graphical Models have revolutionized computer vision by providing powerful frameworks 
              for modeling spatial relationships, object recognition, and scene understanding.
            </p>

            <div className="my-4">
              <img src="/theory-images/module6/img1.png" alt="Computer Vision Applications" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Key Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Image Segmentation</h4>
                    <p className="text-muted-foreground text-sm">
                      Using Markov Random Fields to segment images into meaningful regions based on 
                      pixel similarities and spatial relationships.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Object Recognition</h4>
                    <p className="text-muted-foreground text-sm">
                      Bayesian networks for recognizing objects in images by modeling relationships 
                      between features and object classes.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Scene Understanding</h4>
                    <p className="text-muted-foreground text-sm">
                      Hierarchical models for understanding complex scenes by modeling relationships 
                      between objects and their contexts.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Motion Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Dynamic Bayesian Networks for tracking objects and analyzing motion patterns 
                      in video sequences.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Advantages in Computer Vision</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Handle uncertainty in visual data naturally</li>
                  <li>• Model complex spatial and temporal dependencies</li>
                  <li>• Integrate multiple sources of visual information</li>
                  <li>• Provide principled approaches to inference</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Natural Language Processing Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Natural Language Processing</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              PGMs have been instrumental in advancing NLP by modeling linguistic structures, 
              semantic relationships, and language generation processes.
            </p>

            <div className="my-4">
              <img src="/theory-images/module6/img2.png" alt="Natural Language Processing" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">NLP Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Part-of-Speech Tagging</h4>
                    <p className="text-muted-foreground text-sm">
                      Hidden Markov Models for assigning grammatical categories to words in sentences.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Named Entity Recognition</h4>
                    <p className="text-muted-foreground text-sm">
                      Conditional Random Fields for identifying and classifying named entities in text.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Machine Translation</h4>
                    <p className="text-muted-foreground text-sm">
                      Probabilistic models for translating text between different languages.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Sentiment Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Bayesian approaches for determining emotional tone and sentiment in text.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Language Modeling</h3>
                <p className="text-muted-foreground text-sm">
                  PGMs provide powerful frameworks for modeling language structure, including n-gram models, 
                  neural language models, and transformer architectures that incorporate probabilistic reasoning.
                </p>
              </div>
            </div>
          </div>

          {/* Bioinformatics Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Bioinformatics</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              Probabilistic Graphical Models have become essential tools in bioinformatics for analyzing 
              biological data, understanding molecular interactions, and predicting protein structures.
            </p>

            <div className="my-4">
              <img src="/theory-images/module6/img3.png" alt="Bioinformatics Applications" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Biological Applications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Protein Structure Prediction</h4>
                    <p className="text-muted-foreground text-sm">
                      Markov Random Fields for predicting 3D protein structures from amino acid sequences.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Gene Expression Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Bayesian networks for modeling gene regulatory networks and expression patterns.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Phylogenetic Analysis</h4>
                    <p className="text-muted-foreground text-sm">
                      Probabilistic models for reconstructing evolutionary relationships between species.
                    </p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Drug Discovery</h4>
                    <p className="text-muted-foreground text-sm">
                      PGMs for predicting drug-target interactions and optimizing drug design.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Sequence Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Hidden Markov Models and their variants are widely used for DNA sequence analysis, 
                  protein family classification, and motif discovery in biological sequences.
                </p>
              </div>
            </div>
          </div>

          {/* Finance and Economics Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Finance and Economics</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Financial Applications</h3>
                <p className="text-muted-foreground mb-3">
                  PGMs are increasingly used in finance for risk assessment, portfolio optimization, 
                  fraud detection, and market analysis.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module6/img4.png" alt="Finance Applications" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Risk Management</h4>
                  <p className="text-muted-foreground text-sm">
                    Bayesian networks for modeling complex risk factors and their interdependencies 
                    in financial portfolios.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Credit Scoring</h4>
                  <p className="text-muted-foreground text-sm">
                    Probabilistic models for assessing creditworthiness and predicting default probabilities.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Algorithmic Trading</h4>
                  <p className="text-muted-foreground text-sm">
                    Dynamic models for predicting market movements and optimizing trading strategies.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Fraud Detection</h4>
                  <p className="text-muted-foreground text-sm">
                    Anomaly detection using PGMs to identify suspicious patterns in financial transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security and Privacy Section */}
          <div className="bg-card border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-semibold text-foreground">Security and Privacy</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Cybersecurity Applications</h3>
                <p className="text-muted-foreground mb-3">
                  PGMs play a crucial role in cybersecurity for threat detection, intrusion analysis, 
                  and privacy-preserving data analysis.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module6/img5.jpg" alt="Security Applications" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Intrusion Detection</h4>
                  <p className="text-muted-foreground text-sm">
                    Bayesian networks for detecting malicious activities and network intrusions.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Malware Analysis</h4>
                  <p className="text-muted-foreground text-sm">
                    Probabilistic models for analyzing malware behavior and classification.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Privacy Preservation</h4>
                  <p className="text-muted-foreground text-sm">
                    Differential privacy and secure multi-party computation using PGMs.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Digital Forensics</h4>
                  <p className="text-muted-foreground text-sm">
                    Evidence analysis and reconstruction using probabilistic reasoning.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Privacy-Preserving Analytics</h3>
                <p className="text-muted-foreground text-sm">
                  PGMs enable analysis of sensitive data while preserving individual privacy through 
                  techniques like differential privacy and federated learning.
                </p>
              </div>
            </div>
          </div>

          {/* Emerging Applications Section */}
          <div className="bg-card border rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Emerging Applications</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Future Directions</h3>
                <p className="text-muted-foreground mb-3">
                  PGMs continue to evolve and find new applications in emerging fields and technologies.
                </p>

                <div className="my-4">
                  <img src="/theory-images/module6/img6.png" alt="Emerging Applications" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Autonomous Systems</h4>
                  <p className="text-muted-foreground text-sm">
                    Self-driving cars, drones, and robots using PGMs for decision making and perception.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Healthcare AI</h4>
                  <p className="text-muted-foreground text-sm">
                    Medical diagnosis, treatment planning, and drug discovery using probabilistic models.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Climate Modeling</h4>
                  <p className="text-muted-foreground text-sm">
                    Environmental monitoring and climate change prediction using spatiotemporal models.
                  </p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Social Networks</h4>
                  <p className="text-muted-foreground text-sm">
                    Social influence modeling, recommendation systems, and community detection.
                  </p>
                </div>
              </div>

              <div className="bg-accent/5 p-4 rounded-lg border-l-4 border-accent">
                <h3 className="font-semibold text-foreground mb-2">Integration with Deep Learning</h3>
                <p className="text-muted-foreground text-sm">
                  Modern applications increasingly combine PGMs with deep learning architectures, 
                  creating hybrid models that leverage both probabilistic reasoning and neural networks.
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

export default Applications;
