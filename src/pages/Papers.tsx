import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const papers = [
  {
    title: "Fusion, Propagation, and Structuring in Belief Networks",
    authors: "Judea Pearl",
    year: 1986,
    journal: "Artificial Intelligence, Volume 29, Issue 3, Pages 241-288, September 1986",
    tags: ["Bayesian Networks", "Belief Propagation", "Probabilistic Reasoning", "Conditional Independence", "Directed Acyclic Graphs (DAGs)"],
    significance: "This paper laid out the mathematical framework for representing dependencies using directed graphs and developed algorithms for propagating evidence through the network, which is the basis for inference in Bayesian networks.",
    link: "https://www.sciencedirect.com/science/article/abs/pii/000437028690072X"
  },
  {
    title: "Stochastic Relaxation, Gibbs Distributions, and the Bayesian Restoration of Images",
    authors: "Stuart Geman and Donald Geman",
    year: 1984,
    journal: "IEEE Transactions on Pattern Analysis and Machine Intelligence, Volume PAMI-6, Issue 6, Pages 721-741, November 1984",
    tags: ["Markov Random Field (MRF)", "Gibbs Sampler", "Image Restoration", "Bayesian Inference", "Simulated Annealing", "Computer Vision"],
    significance: "It established the equivalence between Gibbs distributions and Markov Random Fields (Hammersley-Clifford theorem) in a practical context and introduced the Gibbs sampling algorithm for drawing samples from complex probability distributions, enabling practical inference.",
    link: "https://ieeexplore.ieee.org/document/4767596"
  },
  {
    title: "Maximum Likelihood from Incomplete Data via the EM Algorithm",
    authors: "A. P. Dempster, N. M. Laird, and D. B. Rubin",
    year: 1977,
    journal: "Journal of the Royal Statistical Society, Series B (Methodological), Volume 39, Issue 1, Pages 1-38, 1977",
    tags: ["Expectation-Maximization (EM) Algorithm", "Maximum Likelihood Estimation", "Latent Variables", "Incomplete Data", "Mixture Models"],
    significance: "It provided a general framework for finding maximum likelihood estimates of parameters in statistical models where the data is incomplete or has hidden variables. It is essential for training models like Gaussian Mixture Models (GMMs) and Hidden Markov Models (HMMs).",
    link: "https://www.jstor.org/stable/2984875"
  },
  {
    title: "A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition",
    authors: "Lawrence R. Rabiner",
    year: 1989,
    journal: "Proceedings of the IEEE, Volume 77, Issue 2, Pages 257-286, February 1989",
    tags: ["Hidden Markov Model (HMM)", "Viterbi Algorithm", "Forward-Backward Algorithm", "Baum-Welch Algorithm", "Speech Recognition", "Time-Series Analysis"],
    significance: "This paper clearly explained the three fundamental problems of HMMs (evaluation, decoding, and learning) and their solutions (the Forward-Backward, Viterbi, and Baum-Welch algorithms). It made HMMs accessible to a wide audience and was crucial for the success of modern speech recognition systems.",
    link: "https://ieeexplore.ieee.org/document/18626"
  },
  {
    title: "An Introduction to Variational Methods for Graphical Models",
    authors: "Michael I. Jordan, Zoubin Ghahramani, Tommi S. Jaakkola, and Lawrence K. Saul",
    year: 1999,
    journal: "Machine Learning, Volume 37, 1999",
    tags: ["Variational Inference", "Approximate Inference", "KL Divergence", "Mean Field Theory"],
    significance: "This paper provided a clear and comprehensive introduction to variational inference, establishing it as a primary technique for performing scalable approximate inference in complex PGMs where exact inference is intractable.",
    link: "https://link.springer.com/article/10.1023/A:1007666512797"
  },
  {
    title: "Conditional Random Fields: Probabilistic Models for Segmenting and Labeling Sequence Data",
    authors: "John D. Lafferty, Andrew McCallum, and Fernando C.N. Pereira",
    year: 2001,
    journal: "Proceedings of the 18th International Conference on Machine Learning (ICML), 2001",
    tags: ["Conditional Random Fields (CRF)", "Sequential Labeling", "Discriminative Models", "Natural Language Processing (NLP)"],
    significance: "Introduced CRFs, a discriminative alternative to generative models like HMMs. CRFs overcame the 'label bias' problem and quickly became the state-of-the-art for many sequential labeling tasks in NLP, such as named-entity recognition.",
    link: "https://repository.upenn.edu/cis_papers/159/"
  },
  {
    title: "Factor Graphs and the Sum-Product Algorithm",
    authors: "Frank R. Kschischang, Brendan J. Frey, and Hans-Andrea Loeliger",
    year: 2001,
    journal: "IEEE Transactions on Information Theory, Volume 47, Issue 2, 2001",
    tags: ["Factor Graph", "Sum-Product Algorithm", "Belief Propagation", "Message Passing", "Error-Correcting Codes"],
    significance: "This paper showed that many different algorithms, including belief propagation, Viterbi, and Kalman filtering, are special cases of a single algorithm (the sum-product algorithm) operating on a general representation called a factor graph. It provided a powerful unified view of inference.",
    link: "https://ieeexplore.ieee.org/document/910572"
  },
  {
    title: "Latent Dirichlet Allocation",
    authors: "David M. Blei, Andrew Y. Ng, and Michael I. Jordan",
    year: 2003,
    journal: "Journal of Machine Learning Research (JMLR), Volume 3, 2003",
    tags: ["Latent Dirichlet Allocation (LDA)", "Topic Modeling", "Bayesian Models", "Natural Language Processing (NLP)"],
    significance: "Introduced LDA, a generative PGM for discovering latent 'topics' in a collection of documents. It became the standard for topic modeling and is a classic example of a hierarchical Bayesian model applied successfully to a real-world problem.",
    link: "http://www.jmlr.org/papers/volume3/blei03a/blei03a.pdf"
  },
  {
    title: "Causal diagrams for empirical research",
    authors: "Judea Pearl",
    year: 1995,
    journal: "Biometrika, Volume 82, Issue 4, 1995",
    tags: ["Causal Inference", "Directed Acyclic Graphs (DAGs)", "Confounding", "Structural Equation Models", "do-calculus"],
    significance: "This paper was a key step in developing a formal graphical framework for causal reasoning. It demonstrated how DAGs could be used not just for probabilistic inference, but to explicitly reason about causal effects and interventions, forming the basis of modern causal inference.",
    link: "https://academic.oup.com/biomet/article/82/4/669/234778"
  },
];

const Papers = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">Foundational Research Papers</h1>

        <div className="content-section mb-6">
          <p className="text-muted-foreground leading-relaxed mb-6">
            This curated collection presents the most influential and foundational research papers in the field of 
            Probabilistic Graphical Models. These papers have shaped the theoretical foundations and practical 
            applications of PGMs, from Bayesian networks and belief propagation to modern variational methods 
            and causal inference.
          </p>
        </div>

        <div className="space-y-6">
          {papers.map((paper, index) => (
            <div key={index} className="content-section hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-accent/10 flex-shrink-0">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Authors:</strong> {paper.authors}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      <strong>Published in:</strong> {paper.journal}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>Year:</strong> {paper.year}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-accent">Significance:</h4>
                <p className="text-muted-foreground leading-relaxed">{paper.significance}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="bg-accent hover:bg-black text-accent-foreground"
                  >
                    <a href={paper.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Paper
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="content-section mt-8 bg-accent/5 border border-accent/20">
          <h3 className="text-lg font-semibold mb-2 text-accent">About This Collection</h3>
          <p className="text-muted-foreground leading-relaxed">
            These papers represent the cornerstone works that have defined and advanced the field of Probabilistic 
            Graphical Models. Each paper has had a profound impact on both theoretical understanding and practical 
            applications, influencing generations of researchers and practitioners in machine learning, artificial 
            intelligence, and statistics.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Papers;