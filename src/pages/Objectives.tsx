import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Target, CheckCircle2 } from "lucide-react";

const objectives = [
  "Understand the fundamental concepts of probability theory and graph theory as they apply to probabilistic graphical models",
  "Master the representation and inference techniques for Bayesian networks and Markov networks",
  "Learn to model temporal and sequential data using Hidden Markov Models and Dynamic Bayesian Networks",
  "Develop skills in parameter learning using Maximum Likelihood Estimation and Expectation-Maximization algorithms",
  "Apply decision theory and influence diagrams to solve decision-making problems under uncertainty",
  "Implement and analyze various PGM algorithms using modern software tools like Bayes Server",
  "Design and execute experiments to validate PGM models on real-world datasets",
  "Critically evaluate research papers and current developments in the field of probabilistic graphical models",
];

const learningOutcomes = [
  "Build and visualize Bayesian networks for complex real-world scenarios",
  "Perform exact and approximate inference in graphical models",
  "Implement learning algorithms for parameter and structure estimation",
  "Apply Hidden Markov Models to sequence analysis problems",
  "Use decision networks for optimal decision-making under uncertainty",
  "Conduct comprehensive case studies applying PGM techniques to practical problems",
];

const Objectives = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">Module Objectives</h1>

        <div className="content-section mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-accent/10">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-semibold">Course Objectives</h2>
          </div>
          
          <p className="text-muted-foreground leading-relaxed mb-6">
            This course aims to provide students with a comprehensive understanding of probabilistic
            graphical models and their applications in machine learning and artificial intelligence.
          </p>

          <div className="space-y-4">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground leading-relaxed">{objective}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-6">Learning Outcomes</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Upon successful completion of this course, students will be able to:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
                <span className="font-bold text-accent text-lg">{index + 1}.</span>
                <p className="text-muted-foreground leading-relaxed">{outcome}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="content-section mt-6">
          <h2 className="text-2xl font-semibold mb-4">Assessment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Theory Examination (40%)</h3>
              <p className="text-muted-foreground text-sm">
                Written examination testing conceptual understanding and problem-solving skills
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Practical Experiments (30%)</h3>
              <p className="text-muted-foreground text-sm">
                Hands-on implementation and analysis of PGM algorithms
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Course Project (20%)</h3>
              <p className="text-muted-foreground text-sm">
                Independent research project applying PGM techniques to a real-world problem
              </p>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Continuous Assessment (10%)</h3>
              <p className="text-muted-foreground text-sm">
                Quizzes, assignments, and class participation
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Objectives;
