import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { FolderOpen, Users, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Medical Diagnosis System using Bayesian Networks",
    students: ["Priya Sharma", "Rahul Verma"],
    year: 2024,
    description:
      "Developed a diagnostic support system for identifying diseases based on patient symptoms using a Bayesian network trained on medical datasets.",
    tags: ["Healthcare", "Bayesian Networks", "Classification"],
    status: "Completed",
  },
  {
    title: "Stock Market Prediction with Hidden Markov Models",
    students: ["Amit Patel", "Sneha Kumar"],
    year: 2024,
    description:
      "Built a predictive model for stock price movements using HMMs, incorporating multiple financial indicators and market sentiment data.",
    tags: ["Finance", "HMM", "Time Series"],
    status: "Completed",
  },
  {
    title: "Natural Language Processing with Dynamic Bayesian Networks",
    students: ["Arjun Reddy"],
    year: 2024,
    description:
      "Implemented a part-of-speech tagger and named entity recognizer using DBNs, achieving competitive accuracy on benchmark datasets.",
    tags: ["NLP", "DBN", "Sequential Data"],
    status: "In Progress",
  },
  {
    title: "Image Segmentation using Markov Random Fields",
    students: ["Neha Singh", "Vikram Joshi"],
    year: 2023,
    description:
      "Applied Markov random fields for semantic segmentation of medical images, with applications in tumor detection and organ boundary identification.",
    tags: ["Computer Vision", "MRF", "Medical Imaging"],
    status: "Completed",
  },
  {
    title: "Traffic Flow Prediction in Smart Cities",
    students: ["Rohan Mehta"],
    year: 2023,
    description:
      "Developed a traffic prediction system using dynamic Bayesian networks to model and forecast congestion patterns in urban environments.",
    tags: ["Smart Cities", "DBN", "IoT"],
    status: "Completed",
  },
  {
    title: "Anomaly Detection in Cybersecurity with PGMs",
    students: ["Kavya Iyer", "Sanjay Das"],
    year: 2023,
    description:
      "Created an intrusion detection system using probabilistic graphical models to identify unusual network behavior and potential security threats.",
    tags: ["Cybersecurity", "Anomaly Detection", "Networks"],
    status: "Completed",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">Student Projects</h1>

        <div className="content-section mb-6">
          <p className="text-muted-foreground leading-relaxed">
            Explore innovative projects developed by students in the Probabilistic Graphical Models
            course. These projects demonstrate practical applications of PGM techniques across various
            domains including healthcare, finance, NLP, computer vision, and more.
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
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{project.students.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={project.status === "Completed" ? "default" : "secondary"}
                  className={
                    project.status === "Completed"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {project.status}
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-accent/30 text-accent">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="content-section mt-6 bg-accent/5">
          <h2 className="text-xl font-semibold mb-3">Submit Your Project</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Are you working on an interesting PGM project? We'd love to feature your work!
            Submit your project details to be showcased in our gallery.
          </p>
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            Submit Project
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
