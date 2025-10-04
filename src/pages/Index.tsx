import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, FlaskConical, GraduationCap, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Probabilistic Graphical Models
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Master the fundamentals of PGM through interactive experiments, comprehensive theory,
              and hands-on projects at K J Somaiya Institute of Technology
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/experiments">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  Explore Experiments <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" className="border-2 border-white text-white hover:bg-white hover:text-primary bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/theory" className="block">
              <div className="content-section text-center group hover:border-accent transition-colors border-2 border-transparent cursor-pointer">
                <div className="inline-block p-4 rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <BookOpen className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Comprehensive Theory</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deep dive into the theoretical foundations of probabilistic graphical models
                  with structured learning materials and mathematical proofs.
                </p>
              </div>
            </Link>

            <Link to="/experiments" className="block">
              <div className="content-section text-center group hover:border-accent transition-colors border-2 border-transparent cursor-pointer">
                <div className="inline-block p-4 rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <FlaskConical className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Interactive Experiments</h3>
                <p className="text-muted-foreground leading-relaxed">
                  8 carefully designed experiments covering everything from probability theory
                  to hidden Markov models with practical implementations.
                </p>
              </div>
            </Link>

            <Link to="/papers" className="block">
              <div className="content-section text-center group hover:border-accent transition-colors border-2 border-transparent cursor-pointer">
                <div className="inline-block p-4 rounded-full bg-accent/10 mb-4 group-hover:bg-accent/20 transition-colors">
                  <GraduationCap className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Research Projects</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Showcase of student research projects and academic papers in the field
                  of probabilistic graphical models and machine learning.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Module Objectives", href: "/objectives", desc: "Course learning outcomes" },
              { title: "Theory Section", href: "/theory", desc: "Core concepts explained" },
              { title: "Bayes Server", href: "/bayes-server", desc: "Software tools & guides" },
              { title: "Research Papers", href: "/papers", desc: "Latest publications" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="block">
                <div className="bg-card p-6 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
                  <h3 className="font-semibold text-lg mb-2">{link.title}</h3>
                  <p className="text-sm text-muted-foreground">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
