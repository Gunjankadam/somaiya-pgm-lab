import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Brain, Network, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">About Probabilistic Graphical Models</h1>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">What are Probabilistic Graphical Models?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Probabilistic Graphical Models (PGMs) are a powerful framework for representing and reasoning
            about complex systems with uncertainty. They combine probability theory and graph theory to
            provide a compact and intuitive way to model the dependencies among random variables in
            high-dimensional spaces.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            PGMs are widely used in machine learning, artificial intelligence, computer vision, natural
            language processing, and many other fields where reasoning under uncertainty is essential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <Brain className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Machine Learning</h3>
            <p className="text-muted-foreground">
              PGMs provide a probabilistic approach to machine learning, enabling better handling of
              uncertainty and missing data in predictive models.
            </p>
          </div>

          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <Network className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Network Modeling</h3>
            <p className="text-muted-foreground">
              Graph-based representations make it easy to visualize and understand complex relationships
              between variables in real-world systems.
            </p>
          </div>

          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Inference & Prediction</h3>
            <p className="text-muted-foreground">
              Efficient algorithms for probabilistic inference enable making predictions and decisions
              based on observed evidence.
            </p>
          </div>
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Applications of PGMs</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Computer Vision:</strong> Image segmentation, object
                recognition, and scene understanding using conditional random fields and Markov random fields.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Natural Language Processing:</strong> Language modeling,
                speech recognition, and machine translation using hidden Markov models and Bayesian networks.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Bioinformatics:</strong> Gene regulatory network modeling,
                protein structure prediction, and disease diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Robotics:</strong> Simultaneous localization and mapping
                (SLAM), decision making under uncertainty, and multi-agent coordination.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Finance:</strong> Risk assessment, portfolio optimization,
                and fraud detection using Bayesian inference.
              </span>
            </li>
          </ul>
        </div>

        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4">Why Study PGMs?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Understanding probabilistic graphical models equips you with essential tools for building
            intelligent systems that can reason about uncertainty. This course will provide you with
            both theoretical foundations and practical skills to apply PGMs to real-world problems.
            Through our interactive experiments and hands-on projects, you'll gain experience with
            state-of-the-art techniques in machine learning and artificial intelligence.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
