import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { FileText, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const papers = [
  {
    title: "Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference",
    authors: "Judea Pearl",
    year: 1988,
    journal: "Morgan Kaufmann",
    tags: ["Bayesian Networks", "Inference", "Foundational"],
    abstract: "Seminal work introducing Bayesian networks and probabilistic reasoning methods.",
  },
  {
    title: "Graphical Models, Exponential Families, and Variational Inference",
    authors: "Martin J. Wainwright, Michael I. Jordan",
    year: 2008,
    journal: "Foundations and Trends in Machine Learning",
    tags: ["Variational Inference", "Exponential Families", "Theory"],
    abstract: "Comprehensive review of variational methods for approximate inference in graphical models.",
  },
  {
    title: "Learning Bayesian Networks: The Combination of Knowledge and Statistical Data",
    authors: "David Heckerman, Dan Geiger, David M. Chickering",
    year: 1995,
    journal: "Machine Learning",
    tags: ["Structure Learning", "Parameter Learning", "Algorithms"],
    abstract: "Methods for learning Bayesian network structure from data combined with prior knowledge.",
  },
  {
    title: "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition",
    authors: "Lawrence R. Rabiner",
    year: 1989,
    journal: "Proceedings of the IEEE",
    tags: ["HMM", "Speech Recognition", "Applications"],
    abstract: "Comprehensive tutorial on HMMs with applications to speech processing.",
  },
  {
    title: "Dynamic Bayesian Networks: Representation, Inference and Learning",
    authors: "Kevin P. Murphy",
    year: 2002,
    journal: "UC Berkeley PhD Thesis",
    tags: ["DBN", "Temporal Models", "Learning"],
    abstract: "Thorough treatment of dynamic Bayesian networks for modeling temporal processes.",
  },
  {
    title: "Loopy Belief Propagation for Approximate Inference: An Empirical Study",
    authors: "Kevin P. Murphy, Yair Weiss, Michael I. Jordan",
    year: 1999,
    journal: "UAI",
    tags: ["Belief Propagation", "Approximate Inference", "Algorithms"],
    abstract: "Empirical analysis of loopy belief propagation in graphs with cycles.",
  },
];

const Papers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPapers = papers.filter(
    (paper) =>
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">Research Papers</h1>

        <div className="content-section mb-6">
          <p className="text-muted-foreground leading-relaxed mb-6">
            Explore foundational and contemporary research papers in probabilistic graphical models.
            This curated collection covers key theoretical developments and practical applications
            in the field.
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, author, or tag..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredPapers.map((paper, index) => (
            <div key={index} className="content-section hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {paper.authors} • {paper.journal} ({paper.year})
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">{paper.abstract}</p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Online
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="content-section text-center py-12">
            <p className="text-muted-foreground">No papers found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Papers;
