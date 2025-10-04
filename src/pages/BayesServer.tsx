import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Download, BookOpen, Video, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const BayesServer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">Bayes Server</h1>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">About Bayes Server</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Bayes Server is a comprehensive software platform for modeling, inference, and learning
            with probabilistic graphical models. It provides both a graphical user interface for
            building models visually and a powerful API for programmatic access.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The software supports Bayesian networks, dynamic Bayesian networks, and other types of
            graphical models, making it an ideal tool for students and researchers working with PGMs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <Download className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Installation</h3>
            <p className="text-muted-foreground mb-4">
              Bayes Server is available for Windows, macOS, and Linux. Students can download the
              academic version free of charge.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Download Bayes Server
            </Button>
          </div>

          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Documentation</h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive documentation covering all features, with examples and best practices
              for building and analyzing graphical models.
            </p>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              View Documentation
            </Button>
          </div>
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Visual Model Builder</h4>
              <p className="text-muted-foreground text-sm">
                Intuitive drag-and-drop interface for creating Bayesian networks and other graphical models
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Powerful Inference Engine</h4>
              <p className="text-muted-foreground text-sm">
                State-of-the-art algorithms for exact and approximate inference in large networks
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Machine Learning</h4>
              <p className="text-muted-foreground text-sm">
                Automated parameter and structure learning from data with various algorithms
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Time Series Support</h4>
              <p className="text-muted-foreground text-sm">
                Built-in support for temporal models including HMMs and dynamic Bayesian networks
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">API & Integration</h4>
              <p className="text-muted-foreground text-sm">
                Comprehensive APIs for .NET, Python, Java, and other programming languages
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-2">Data Import/Export</h4>
              <p className="text-muted-foreground text-sm">
                Support for various data formats including CSV, Excel, databases, and more
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="content-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Video className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Tutorial Videos</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Getting started with Bayes Server</li>
              <li>• Building your first Bayesian network</li>
              <li>• Parameter learning from data</li>
              <li>• Performing inference and querying</li>
              <li>• Advanced modeling techniques</li>
            </ul>
          </div>

          <div className="content-section">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Code className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold">Code Examples</h3>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Python API examples</li>
              <li>• .NET integration samples</li>
              <li>• Data preprocessing scripts</li>
              <li>• Custom inference algorithms</li>
              <li>• Visualization utilities</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BayesServer;
