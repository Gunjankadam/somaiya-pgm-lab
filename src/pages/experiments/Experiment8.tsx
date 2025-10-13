import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import DisasterHMM from "@/components/DisasterHMM";
import { BookOpen, Target, Lightbulb, Globe, Stethoscope, Search, Languages, CheckCircle, Volume2, FileText, Bot, Download, Play, ExternalLink, AlertTriangle, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const Experiment8 = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const navigate = useNavigate();

  const caseStudyDomains = [
    {
      title: "Disaster Management with HMM",
      icon: AlertTriangle,
      description: "A comprehensive case study on using Hidden Markov Models for disaster management and emergency response. This interactive tool allows users to upload disaster data, configure HMM parameters, and predict disaster states based on observable variables.",
      focus: "This case study demonstrates how HMMs can model the hidden states of disaster situations (Normal, Alert, Warning, Emergency, Critical, Recovery) based on observable indicators like risk levels, infrastructure status, and population data.",
      tags: ["Disaster Management", "HMM", "Emergency Response", "Risk Assessment", "Interactive Tool"],
      isInteractive: true
    },
    {
      title: "Social Media Sentiment Analysis",
      icon: Globe,
      description: "In this domain, we aim to analyze the sentiment of social media posts (e.g., tweets, Facebook statuses) to understand public opinion about a particular topic or brand. POS tagging can be used to preprocess the text and extract important features for sentiment classification.",
      focus: "This case study would focus on how POS tagging improves sentiment analysis accuracy and helps identify sentiment-bearing words more effectively.",
      tags: ["Sentiment Analysis", "Social Media", "Feature Extraction", "Classification"]
    },
    {
      title: "Medical Text Analysis",
      icon: Stethoscope,
      description: "In the medical domain, electronic health records (EHRs), research articles, and clinical notes contain valuable information. POS tagging can assist in extracting medical entities like diseases, symptoms, medications, and procedures.",
      focus: "This case study would explore how POS tagging aids in the information extraction process and contributes to medical data analysis and knowledge discovery.",
      tags: ["Medical NLP", "Entity Extraction", "EHR", "Knowledge Discovery"]
    }
  ];

  const applications = [
    {
      title: "Information Retrieval and Search",
      icon: Search,
      description: "In search engines, POS tagging helps identify important keywords and their grammatical roles in user queries, improving the relevance of search results.",
      tags: ["Search Engines", "Query Processing", "Relevance"]
    },
    {
      title: "Machine Translation",
      icon: Languages,
      description: "POS tagging is crucial for machine translation systems to understand the role of words in the source language sentence and generate appropriate translations in the target language.",
      tags: ["Translation", "Cross-lingual", "Language Processing"]
    },
    {
      title: "Grammar Checking and Proofreading",
      icon: CheckCircle,
      description: "POS tagging is applied in grammar checking and proofreading tools to identify grammatical errors and suggest appropriate corrections.",
      tags: ["Grammar", "Error Detection", "Writing Tools"]
    },
    {
      title: "Text-to-Speech (TTS) Systems",
      icon: Volume2,
      description: "In TTS systems, POS tagging can improve the prosody and naturalness of synthesized speech by guiding the intonation and stress patterns based on the grammatical roles of words.",
      tags: ["Speech Synthesis", "Prosody", "Naturalness"]
    },
    {
      title: "Text Summarization",
      icon: FileText,
      description: "POS tagging assists in identifying important content words in a text, making it valuable for text summarization algorithms to extract key information.",
      tags: ["Summarization", "Content Extraction", "Key Information"]
    },
    {
      title: "Language Understanding in Virtual Assistants",
      icon: Bot,
      description: "Virtual assistants like Siri, Alexa, and Google Assistant use POS tagging to understand user queries better and provide more accurate responses.",
      tags: ["Virtual Assistants", "Query Understanding", "Conversational AI"]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Experiment 8: Case Study on Part-of-Speech Tagging</h1>
          <p className="text-muted-foreground text-lg">
            A comprehensive case study exploring the theory, applications, and real-world domains of Part-of-Speech tagging in Natural Language Processing.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="theory" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Theory
            </TabsTrigger>
            <TabsTrigger value="domains" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Case Study Domains
            </TabsTrigger>
            <TabsTrigger value="disaster-hmm" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Disaster HMM Tool
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Applications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="mt-6">
            <div className="content-section">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-accent" />
                Theory of Part-of-Speech Tagging
              </h2>
              
              <div className="space-y-6">
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    Part-of-Speech (POS) tagging is a natural language processing (NLP) technique that involves assigning a grammatical category or part-of-speech label to each word in a sentence. The part-of-speech of a word defines its syntactic or grammatical role within the sentence. Common POS categories include nouns, verbs, adjectives, adverbs, pronouns, prepositions, conjunctions, and more.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-accent">Main Objective</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      The main objective of POS tagging is to analyze the structure and meaning of a sentence by categorizing each word correctly. By determining the part-of-speech of each word, NLP systems can better understand the relationships between words and phrases, which is essential for various language processing tasks like information extraction, syntactic parsing, sentiment analysis, machine translation, and more.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-accent">Supervised Learning Approach</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      POS tagging is usually approached as a supervised machine learning problem, where a model is trained on a labeled dataset of sentences where each word is annotated with its corresponding part-of-speech label. The model learns the patterns and context in which different words occur and can then generalize to tag unseen sentences.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-accent">Evolution of POS Tagging Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Traditional Methods:</h4>
                        <p className="text-muted-foreground">
                          Traditional POS tagging methods involved rule-based approaches and the use of lexicons or dictionaries.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Modern Techniques:</h4>
                        <p className="text-muted-foreground">
                          More advanced techniques, such as Hidden Markov Models (HMMs), Conditional Random Fields (CRFs), and neural network-based models like Bidirectional Long Short-Term Memory networks (BiLSTM) or Transformer models, have shown superior performance in modern NLP tasks.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent/5 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-accent">Importance in NLP Pipeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      POS tagging is a crucial preprocessing step in many NLP applications, as it provides essential linguistic information that enables subsequent analysis and understanding of text data.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="domains" className="mt-6">
            <div className="content-section">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-accent" />
                Case Study Domains
              </h2>
              
              <div className="grid gap-6">
                {caseStudyDomains.map((domain, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <domain.icon className="w-6 h-6 text-accent" />
                        {domain.title}
                        {domain.isInteractive && (
                          <Badge variant="outline" className="ml-auto bg-green-50 text-green-700 border-green-200">
                            Interactive
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {domain.description}
                      </p>
                      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-4">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-accent">Focus:</strong> {domain.focus}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {domain.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-accent/10 text-accent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {domain.isInteractive && (
                        <Button 
                          onClick={() => setActiveTab("disaster-hmm")}
                          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          <Brain className="w-4 h-4 mr-2" />
                          Launch Interactive Tool
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="content-section mt-8 bg-accent/5 border border-accent/20">
                <h3 className="text-xl font-semibold mb-4 text-accent">Explore More PGM Projects</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Ready to dive deeper into practical implementations? Explore our curated collection of real-world PGM projects 
                  that demonstrate these concepts in action. Download, run, and experiment with complete implementations.
                </p>
                
                 <div className="flex justify-center mb-6">
                   <Card className="hover:shadow-lg transition-shadow max-w-md">
                     <CardHeader className="pb-3">
                       <CardTitle className="flex items-center gap-2 text-lg">
                         <ExternalLink className="w-5 h-5 text-accent" />
                         Explore Projects
                       </CardTitle>
                     </CardHeader>
                     <CardContent>
                       <p className="text-sm text-muted-foreground mb-4">
                         Browse through our collection of PGM implementations across different domains.
                       </p>
                       <Button 
                         onClick={() => navigate('/projects')}
                         className="w-full bg-accent hover:bg-black text-accent-foreground"
                       >
                         <ExternalLink className="w-4 h-4 mr-2" />
                         View All Projects
                       </Button>
                     </CardContent>
                   </Card>
                 </div>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 text-accent">Featured Projects for POS Tagging</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• <strong>HMM POS Tagger:</strong> Complete implementation with Viterbi algorithm</li>
                    <li>• <strong>CRF-based NER:</strong> Named Entity Recognition using Conditional Random Fields</li>
                    <li>• <strong>Neural POS Tagger:</strong> Modern deep learning approach with BiLSTM</li>
                    <li>• <strong>Medical Text Analysis:</strong> POS tagging for clinical document processing</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="disaster-hmm" className="mt-6">
            <div className="content-section">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-accent" />
                Interactive Disaster Management HMM Tool
              </h2>
              
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3 text-accent">About This Tool</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This interactive tool demonstrates how Hidden Markov Models can be applied to disaster management scenarios. 
                  Upload your disaster data, configure the model parameters, and predict disaster states based on observable indicators.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• CSV data upload and preprocessing</li>
                      <li>• Interactive model configuration</li>
                      <li>• Real-time HMM analysis</li>
                      <li>• Visual results and statistics</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Use Cases:</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Emergency response planning</li>
                      <li>• Risk assessment and monitoring</li>
                      <li>• Disaster state prediction</li>
                      <li>• Resource allocation optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              <DisasterHMM />
            </div>
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <div className="content-section">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-accent" />
                Real-World Applications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applications.map((app, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <app.icon className="w-5 h-5 text-accent" />
                        {app.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {app.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {app.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="border-accent/30 text-accent">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="content-section mt-8 bg-accent/5 border border-accent/20">
          <h3 className="text-lg font-semibold mb-2 text-accent">Key Takeaways</h3>
          <ul className="text-muted-foreground space-y-2">
            <li>• POS tagging is fundamental to understanding sentence structure and meaning</li>
            <li>• Modern approaches using HMMs, CRFs, and neural networks have significantly improved accuracy</li>
            <li>• POS tagging serves as a crucial preprocessing step for many downstream NLP tasks</li>
            <li>• Real-world applications span across multiple domains from healthcare to virtual assistants</li>
            <li>• The technique continues to evolve with advances in deep learning and transformer models</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Experiment8;
