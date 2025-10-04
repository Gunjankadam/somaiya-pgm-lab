import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Target, CheckCircle2 } from "lucide-react";

const objectives = [
  "To give comprehensive introduction of probabilistic graphical models.",
  "To make inferences, learning, actions and decisions while applying these models.",
  "To introduce real-world trade offs when using probabilistic graphical models in practice.",
  "To develop the knowledge and skills necessary to apply these models to solve real world problems"
];

const learningOutcomes = [
  "Describe basic concepts of probabilistic graphical modelling",
  "Model and extract inference from various graphical models like Bayesian Network model and inference.",
  "Perform learning and take actions and decisions using probabilistic graphical models - Markov Model.",
  "Devise learning and take actions and decisions using probabilistic graphical models - Hidden Markov Model",
  "Represent real world problems using graphical models; design inference algorithms; and learn the structure of the graphical model from data",
  "Design real life applications using probabilistic graphical models."
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

      </main>

      <Footer />
    </div>
  );
};

export default Objectives;
