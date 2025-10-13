import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { FolderOpen, ExternalLink, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Image Segmentation using Conditional Random Fields (CRFs)",
    description: "This project demonstrates how to use a Conditional Random Field (CRF) for semantic segmentation in images. The initial pixel-level classification is typically done by a deep learning model (like a CNN), which can produce noisy or coarse results. A CRF is then applied as a post-processing step to refine the segmentation map, ensuring that nearby pixels with similar colors are more likely to be assigned the same label. This enforces smoothness and produces much cleaner outputs.",
    technique: "Fully Connected Conditional Random Field (CRF)",
    tags: ["Computer Vision", "Image Segmentation", "CRF", "Deep Learning"],
    githubLink: "https://github.com/lucasb-eyer/pydensecrf",
    note: "This repository provides a Python wrapper for a highly efficient implementation of a fully connected CRF. The examples folder contains clear notebooks showing how to use it for image segmentation."
  },
  {
    title: "Part-of-Speech (POS) Tagging using a Hidden Markov Model (HMM)",
    description: "This is a classic Natural Language Processing (NLP) project that implements a Hidden Markov Model to assign a part-of-speech tag (like noun, verb, adjective) to each word in a sentence. The HMM learns the transition probabilities (e.g., the likelihood of a verb following a noun) and emission probabilities (e.g., the likelihood of the word 'run' being a verb). The Viterbi algorithm is then used to find the most likely sequence of tags for a new sentence.",
    technique: "Hidden Markov Model (HMM) with Viterbi decoding",
    tags: ["NLP", "HMM", "Viterbi Algorithm", "Part-of-Speech Tagging"],
    githubLink: "https://github.com/pratikb2/HMM-POS-Tagger",
    note: "This is a clear and straightforward implementation in Python that is great for educational purposes. It shows the core logic of training the HMM and using the Viterbi algorithm for inference."
  },
  {
    title: "Medical Diagnosis using Bayesian Networks",
    description: "This project uses the pgmpy library to build a Bayesian Network for diagnosing heart disease. It demonstrates how to structure a network based on expert knowledge (e.g., how smoking and high cholesterol influence heart disease) and then perform probabilistic inference. For example, you can enter a patient's symptoms (evidence) and calculate the probability of them having the disease.",
    technique: "Bayesian Network",
    tags: ["Healthcare", "Bayesian Networks", "Medical Diagnosis", "Probabilistic Inference"],
    githubLink: "https://github.com/pgmpy/pgmpy/blob/dev/examples/Medical%20Diagnosis%20using%20Bayesian%20Networks.ipynb",
    note: "This links directly to a Jupyter Notebook tutorial in the official pgmpy repository. It's an excellent, well-documented example of building and using a Bayesian Network for real-world reasoning."
  },
  {
    title: "Topic Modeling on Text Documents with Latent Dirichlet Allocation (LDA)",
    description: "This project implements Latent Dirichlet Allocation (LDA) to discover abstract 'topics' from a corpus of text documents. LDA is a generative PGM that assumes each document is a mixture of various topics, and each topic is a distribution of words. By training the model, you can uncover these latent topics and see which words are most important for each, and which topics are most prevalent in each document.",
    technique: "Latent Dirichlet Allocation (LDA)",
    tags: ["Topic Modeling", "LDA", "Text Mining", "Natural Language Processing"],
    githubLink: "https://github.com/lda-project/lda",
    note: "This is the original C implementation of LDA from David Blei, one of the authors of the original paper. While in C, it's a foundational piece of code. For a simpler Python implementation for learning, you might look at this one: https://github.com/aravindh-krishnamoorthy/Latent-Dirichlet-Allocation."
  },
  {
    title: "Robotics: Simultaneous Localization and Mapping (SLAM) using Factor Graphs",
    description: "This project demonstrates how to solve a SLAM problem, a fundamental task in robotics. A robot navigates an unknown environment and must simultaneously build a map while tracking its own location. Factor graphs are the modern PGM of choice for this, as they can efficiently represent the relationships between robot poses at different times, sensor measurements (odometry), and landmark sightings. Inference on the graph finds the most likely configuration of the robot's path and the map.",
    technique: "Factor Graph with optimization (smoothing and mapping)",
    tags: ["Robotics", "SLAM", "Factor Graphs", "Computer Vision", "Navigation"],
    githubLink: "https://github.com/borglab/gtsam/tree/develop/examples",
    note: "This link points to the examples folder of GTSAM (Georgia Tech Smoothing and Mapping), a popular C++ library for factor graph optimization. The OdometryExample.cpp and Pose2SLAMExample.cpp files are great starting points to see how SLAM problems are formulated as factor graphs."
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">PGM Projects & Implementations</h1>

        <div className="content-section mb-6">
          <p className="text-muted-foreground leading-relaxed">
            Explore real-world projects that demonstrate practical applications of Probabilistic Graphical Models. 
            These projects showcase different PGM techniques across various domains including computer vision, 
            natural language processing, healthcare, robotics, and text mining. Each project includes complete 
            source code and detailed documentation.
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={index} className="content-section hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <FolderOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-accent">{project.technique}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-muted-foreground leading-relaxed mb-3">{project.description}</p>
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-accent">Note:</strong> {project.note}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-accent/30 text-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button 
                  asChild 
                  size="sm" 
                  className="bg-accent hover:bg-black text-accent-foreground"
                >
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="content-section mt-8 bg-accent/5 border border-accent/20">
          <h3 className="text-lg font-semibold mb-2 text-accent">About These Projects</h3>
          <p className="text-muted-foreground leading-relaxed">
            These projects represent practical implementations of core Probabilistic Graphical Model techniques. 
            Each project demonstrates how PGMs can be applied to solve real-world problems across different domains. 
            The source code is available on GitHub, making these excellent resources for learning and understanding 
            how to implement PGM algorithms in practice.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;