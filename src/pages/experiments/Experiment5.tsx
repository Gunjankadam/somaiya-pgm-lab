import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Play, RotateCcw, Info, BookOpen, Code, BarChart3, Calculator, Target, TrendingUp, Activity, Eye, EyeOff, Network, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface HMMState {
  name: string;
  color: string;
  position: { x: number; y: number };
}

interface HMMObservation {
  name: string;
  symbol: string;
}

interface HMMParameters {
  states: string[];
  observations: string[];
  initialProbabilities: number[];
  transitionMatrix: number[][];
  emissionMatrix: number[][];
}

interface HMMResult {
  forwardProbabilities: number[][];
  backwardProbabilities: number[][];
  viterbiPath: number[];
  viterbiProbabilities: number[][];
  finalProbability: number;
}

interface TestCase {
  name: string;
  description: string;
  scenario: string;
  states: string[];
  observations: string[];
  trueParams: HMMParameters;
  observationSequence: string[];
}

const Experiment5 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('forward');
  const [sequenceLength, setSequenceLength] = useState(10);
  const [hmmResult, setHmmResult] = useState<HMMResult | null>(null);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [showHiddenStates, setShowHiddenStates] = useState(false);
  const [algorithmProgress, setAlgorithmProgress] = useState(0);
  const [showGraphicalView, setShowGraphicalView] = useState(false);
  const [userSequence, setUserSequence] = useState<string>('');
  const [activeTab, setActiveTab] = useState('theory');
  const [hasRunAlgorithm, setHasRunAlgorithm] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const experimentSteps = [
    {
      title: "Aim",
      description: "Implement Hidden Markov Models for sequence analysis and state prediction",
      content: "You will learn to implement Hidden Markov Models (HMMs), understand the mathematical foundations, implement key algorithms (Forward, Backward, Viterbi, Baum-Welch), and visualize state transitions and observations in probabilistic systems."
    },
    {
      title: "Objective",
      description: "Master HMM algorithms and practical applications",
      content: "By the end of this experiment, you will be able to: 1) Understand HMM structure and parameters, 2) Implement Forward and Backward algorithms, 3) Use Viterbi algorithm for state sequence decoding, 4) Apply Baum-Welch algorithm for parameter learning, and 5) Visualize HMM state transitions and observations."
    },
    {
      title: "Theory - Hidden Markov Models",
      description: "Probabilistic models for sequential data with hidden states",
      content: "A Hidden Markov Model (HMM) is a statistical model where the system being modeled is assumed to be a Markov process with unobserved (hidden) states. HMMs are characterized by: 1) A set of hidden states, 2) A set of observations, 3) State transition probabilities, 4) Observation emission probabilities, and 5) Initial state probabilities."
    },
    {
      title: "HMM Components",
      description: "Key components and parameters of Hidden Markov Models",
      content: "HMM consists of: States (S = {s1, s2, ..., sN}), Observations (O = {o1, o2, ..., oM}), Transition Matrix (A = {aij} where aij = P(qt+1 = sj | qt = si)), Emission Matrix (B = {bi(k)} where bi(k) = P(ot = vk | qt = si)), and Initial Probabilities (π = {πi} where πi = P(q1 = si))."
    },
    {
      title: "Forward Algorithm",
      description: "Computing the probability of observations given the model",
      content: "The Forward algorithm computes P(O|λ) using dynamic programming. It calculates αt(i) = P(o1, o2, ..., ot, qt = si | λ) recursively. The algorithm initializes α1(i) = πi * bi(o1) and then computes αt+1(j) = [Σi αt(i) * aij] * bj(ot+1). The final probability is P(O|λ) = Σi αT(i)."
    },
    {
      title: "Backward Algorithm",
      description: "Computing backward probabilities for parameter estimation",
      content: "The Backward algorithm computes βt(i) = P(ot+1, ot+2, ..., oT | qt = si, λ) recursively. It initializes βT(i) = 1 and computes βt(i) = Σj aij * bj(ot+1) * βt+1(j). This is used in the Baum-Welch algorithm for parameter re-estimation."
    },
    {
      title: "Viterbi Algorithm",
      description: "Finding the most likely sequence of hidden states",
      content: "The Viterbi algorithm finds the most probable sequence of hidden states that could have generated the observed sequence. It uses dynamic programming to compute δt(i) = max P(q1, q2, ..., qt-1, qt = si, o1, o2, ..., ot | λ) and tracks the path that achieves this maximum probability."
    },
    {
      title: "Baum-Welch Algorithm",
      description: "Expectation-Maximization for HMM parameter learning",
      content: "The Baum-Welch algorithm is an Expectation-Maximization (EM) algorithm that learns HMM parameters from observation sequences. It iteratively updates the transition probabilities, emission probabilities, and initial probabilities to maximize the likelihood of the observed data."
    }
  ];

  // Test cases for different HMM scenarios
  const testCases: TestCase[] = [
    {
      name: "Temperature Model",
      description: "Hot/Cold temperature with V1, V2, V3 observations",
      scenario: "temperature",
      states: ["Hot", "Cold"],
      observations: ["V1", "V2", "V3"],
      trueParams: {
        states: ["Hot", "Cold"],
        observations: ["V1", "V2", "V3"],
        initialProbabilities: [0.6, 0.4],
        transitionMatrix: [[0.7, 0.3], [0.4, 0.6]],
        emissionMatrix: [[0.1, 0.4, 0.5], [0.7, 0.2, 0.1]]
      },
      observationSequence: ["V1", "V2", "V3", "V1", "V2"]
    },
    {
      name: "Weather Model",
      description: "Simple weather prediction with hidden states",
      scenario: "weather",
      states: ["Sunny", "Rainy"],
      observations: ["Walk", "Shop", "Clean"],
      trueParams: {
        states: ["Sunny", "Rainy"],
        observations: ["Walk", "Shop", "Clean"],
        initialProbabilities: [0.6, 0.4],
        transitionMatrix: [[0.7, 0.3], [0.4, 0.6]],
        emissionMatrix: [[0.6, 0.3, 0.1], [0.1, 0.4, 0.5]]
      },
      observationSequence: ["Walk", "Shop", "Clean", "Walk"]
    },
    {
      name: "Coin Tossing",
      description: "Fair and biased coin with hidden bias states",
      scenario: "coin",
      states: ["Fair", "Biased"],
      observations: ["H", "T"],
      trueParams: {
        states: ["Fair", "Biased"],
        observations: ["H", "T"],
        initialProbabilities: [0.5, 0.5],
        transitionMatrix: [[0.8, 0.2], [0.3, 0.7]],
        emissionMatrix: [[0.5, 0.5], [0.3, 0.7]]
      },
      observationSequence: ["H", "H", "T", "H", "T"]
    },
    {
      name: "Speech Recognition",
      description: "Phoneme recognition with word states",
      scenario: "speech",
      states: ["Word1", "Word2", "Word3"],
      observations: ["A", "B", "C"],
      trueParams: {
        states: ["Word1", "Word2", "Word3"],
        observations: ["A", "B", "C"],
        initialProbabilities: [0.6, 0.3, 0.1],
        transitionMatrix: [[0.5, 0.3, 0.2], [0.2, 0.6, 0.2], [0.1, 0.3, 0.6]],
        emissionMatrix: [[0.7, 0.2, 0.1], [0.1, 0.6, 0.3], [0.2, 0.3, 0.5]]
      },
      observationSequence: ["A", "B", "C", "A", "B"]
    }
  ];

  // Forward Algorithm Implementation
  const forwardAlgorithm = (observations: string[], params: HMMParameters): number[][] => {
    const T = observations.length;
    const N = params.states.length;
    const alpha: number[][] = Array(T).fill(null).map(() => Array(N).fill(0));

    // Initialize
    for (let i = 0; i < N; i++) {
      const obsIndex = params.observations.indexOf(observations[0]);
      alpha[0][i] = params.initialProbabilities[i] * params.emissionMatrix[i][obsIndex];
    }

    // Recursion
    for (let t = 1; t < T; t++) {
      for (let j = 0; j < N; j++) {
        let sum = 0;
        for (let i = 0; i < N; i++) {
          sum += alpha[t-1][i] * params.transitionMatrix[i][j];
        }
        const obsIndex = params.observations.indexOf(observations[t]);
        alpha[t][j] = sum * params.emissionMatrix[j][obsIndex];
      }
    }

    return alpha;
  };

  // Backward Algorithm Implementation
  const backwardAlgorithm = (observations: string[], params: HMMParameters): number[][] => {
    const T = observations.length;
    const N = params.states.length;
    const beta: number[][] = Array(T).fill(null).map(() => Array(N).fill(0));

    // Initialize
    for (let i = 0; i < N; i++) {
      beta[T-1][i] = 1;
    }

    // Recursion
    for (let t = T-2; t >= 0; t--) {
      for (let i = 0; i < N; i++) {
        let sum = 0;
        for (let j = 0; j < N; j++) {
          const obsIndex = params.observations.indexOf(observations[t+1]);
          sum += params.transitionMatrix[i][j] * params.emissionMatrix[j][obsIndex] * beta[t+1][j];
        }
        beta[t][i] = sum;
      }
    }

    return beta;
  };

  // Viterbi Algorithm Implementation - CORRECTED
  const viterbiAlgorithm = (observations: string[], params: HMMParameters): { path: number[], probabilities: number[][] } => {
    const T = observations.length;
    const N = params.states.length;
    const delta: number[][] = Array(T).fill(null).map(() => Array(N).fill(0));
    const psi: number[][] = Array(T).fill(null).map(() => Array(N).fill(0));

    // Initialize
    for (let i = 0; i < N; i++) {
      const obsIndex = params.observations.indexOf(observations[0]);
      delta[0][i] = params.initialProbabilities[i] * params.emissionMatrix[i][obsIndex];
      psi[0][i] = 0;
    }

    // Recursion
    for (let t = 1; t < T; t++) {
      for (let j = 0; j < N; j++) {
        let maxProb = -Infinity;
        let maxState = 0;
        for (let i = 0; i < N; i++) {
          const prob = delta[t-1][i] * params.transitionMatrix[i][j];
          if (prob > maxProb) {
            maxProb = prob;
            maxState = i;
          }
        }
        const obsIndex = params.observations.indexOf(observations[t]);
        delta[t][j] = maxProb * params.emissionMatrix[j][obsIndex];
        psi[t][j] = maxState;
      }
    }

    // Backtracking - CORRECTED
    const path: number[] = Array(T).fill(0);
    
    // Find the state with maximum probability at time T-1
    let maxProb = -Infinity;
    let maxState = 0;
    for (let i = 0; i < N; i++) {
      if (delta[T-1][i] > maxProb) {
        maxProb = delta[T-1][i];
        maxState = i;
      }
    }
    path[T-1] = maxState;

    // Backtrack using psi to find the most likely path
    for (let t = T-2; t >= 0; t--) {
      path[t] = psi[t+1][path[t+1]];
    }

    return { path, probabilities: delta };
  };

  // Calculate final probability - CORRECTED
  const calculateFinalProbability = (alpha: number[][]): number => {
    const T = alpha.length;
    const N = alpha[0].length;
    let probability = 0;
    for (let i = 0; i < N; i++) {
      probability += alpha[T-1][i];
    }
    return probability; // Return actual probability sum
  };

  // Run HMM Algorithm
  const runHMMAlgorithm = () => {
    setIsAlgorithmRunning(true);
    setAlgorithmProgress(0);
    setHmmResult(null);

    const testCase = testCases[selectedTestCase];
    
    // Require user input sequence - no fallback to predefined sequence
    if (!userSequence.trim()) {
      alert('Please enter an observation sequence before running the algorithm.');
      setIsAlgorithmRunning(false);
      return;
    }
    
    // Parse user input sequence (comma or space separated)
    let observations = userSequence.split(/[,\s]+/).filter(obs => obs.trim() !== '');
    
    // Validate that all observations are valid for the current test case
    const validObservations = observations.filter(obs => 
      testCase.observations.includes(obs.trim())
    );
    if (validObservations.length !== observations.length) {
      alert(`Invalid observations detected. Valid observations for ${testCase.name} are: ${testCase.observations.join(', ')}`);
      setIsAlgorithmRunning(false);
      return;
    }
    observations = validObservations;
    
    setCurrentSequence(observations);

    // Simulate algorithm execution with progress
    const progressInterval = setInterval(() => {
      setAlgorithmProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          executeAlgorithm();
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const executeAlgorithm = () => {
    const testCase = testCases[selectedTestCase];
    let observations: string[];
    if (userSequence.trim()) {
      observations = userSequence.split(/[,\s]+/).filter(obs => obs.trim() !== '');
    } else {
      observations = testCase.observationSequence.slice(0, sequenceLength);
    }
    const params = testCase.trueParams;

    let result: HMMResult;

    switch (selectedAlgorithm) {
      case 'forward':
        const alpha = forwardAlgorithm(observations, params);
        result = {
          forwardProbabilities: alpha,
          backwardProbabilities: [],
          viterbiPath: [],
          viterbiProbabilities: [],
          finalProbability: calculateFinalProbability(alpha)
        };
        break;
      case 'backward':
        const beta = backwardAlgorithm(observations, params);
        result = {
          forwardProbabilities: [],
          backwardProbabilities: beta,
          viterbiPath: [],
          viterbiProbabilities: [],
          finalProbability: 0
        };
        break;
      case 'viterbi':
        const viterbiResult = viterbiAlgorithm(observations, params);
        result = {
          forwardProbabilities: [],
          backwardProbabilities: [],
          viterbiPath: viterbiResult.path,
          viterbiProbabilities: viterbiResult.probabilities,
          finalProbability: 0
        };
        break;
      case 'all':
        const alphaAll = forwardAlgorithm(observations, params);
        const betaAll = backwardAlgorithm(observations, params);
        const viterbiAll = viterbiAlgorithm(observations, params);
        result = {
          forwardProbabilities: alphaAll,
          backwardProbabilities: betaAll,
          viterbiPath: viterbiAll.path,
          viterbiProbabilities: viterbiAll.probabilities,
          finalProbability: calculateFinalProbability(alphaAll)
        };
        break;
      default:
        result = {
          forwardProbabilities: [],
          backwardProbabilities: [],
          viterbiPath: [],
          viterbiProbabilities: [],
          finalProbability: 0
        };
    }

    setHmmResult(result);
    setHasRunAlgorithm(true);
    setIsAlgorithmRunning(false);
  };

  const resetExperiment = () => {
    setHmmResult(null);
    setCurrentSequence([]);
    setAlgorithmProgress(0);
    setCurrentStep(0);
    setIsRunning(false);
    setIsAlgorithmRunning(false);
    setUserSequence('');
    setHasRunAlgorithm(false);
  };

  const handleTestCaseChange = (testCaseIndex: number) => {
    setSelectedTestCase(testCaseIndex);
    setHmmResult(null);
    setCurrentSequence([]);
    setAlgorithmProgress(0);
    setUserSequence('');
    setHasRunAlgorithm(false);
  };

  // HMM Graphical Representation Component
  const HMMGraphicalView = ({ testCase, showStates = true }: { testCase: TestCase, showStates?: boolean }) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Clear canvas with white background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const stateRadius = 35;
    const observationRadius = 30;
    const stateSpacing = 140;
    const obsSpacing = 100;
    const verticalSpacing = 120;

    // Colors matching the reference image
    const stateColors = ['#d1d5db', '#d1d5db']; // Light grey for states
    const obsColors = ['#fbbf24', '#10b981', '#ef4444', '#8b5cf6']; // Yellow, Green, Red, Purple

    // Draw states (hidden states at top)
    testCase.states.forEach((state, index) => {
      const x = centerX - (testCase.states.length - 1) * stateSpacing / 2 + index * stateSpacing;
      const y = centerY - verticalSpacing;
      
      // State circle with light grey background
      ctx.beginPath();
      ctx.arc(x, y, stateRadius, 0, 2 * Math.PI);
      ctx.fillStyle = stateColors[index % stateColors.length];
      ctx.fill();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // State label
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(state, x, y + 5);
      
      // Initial probability below state
      const initialProb = testCase.trueParams.initialProbabilities[index];
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial';
      ctx.fillText(initialProb.toFixed(1), x, y + stateRadius + 20);
    });

    // Draw observations (observation states at bottom)
    testCase.observations.forEach((obs, index) => {
      const x = centerX - (testCase.observations.length - 1) * obsSpacing / 2 + index * obsSpacing;
      const y = centerY + verticalSpacing;
      
      // Observation circle with colored background
      ctx.beginPath();
      ctx.arc(x, y, observationRadius, 0, 2 * Math.PI);
      ctx.fillStyle = obsColors[index % obsColors.length];
      ctx.fill();
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Observation label
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(obs, x, y + 4);
    });

    // Draw state transitions (curved arrows between states)
    if (showStates) {
      testCase.states.forEach((state, i) => {
        testCase.states.forEach((targetState, j) => {
          const x1 = centerX - (testCase.states.length - 1) * stateSpacing / 2 + i * stateSpacing;
          const y1 = centerY - verticalSpacing;
          const x2 = centerX - (testCase.states.length - 1) * stateSpacing / 2 + j * stateSpacing;
          const y2 = centerY - verticalSpacing;
          
          const prob = testCase.trueParams.transitionMatrix[i][j];
          
          if (i === j) {
            // Self-loop (curved arrow) - curve ABOVE the circle
            const controlX = x1 + (i === 0 ? -25 : 25);
            const controlY = y1 - 115; // Higher control point to curve above
            
            // Calculate start and end points on circle edge (top of circle)
            const startAngle = Math.PI * -0.10; // Top-right of circle
            const endAngle = Math.PI * 1.1;   // Top-left of circle
            
            const startX = x1 + stateRadius * Math.cos(startAngle);
            const startY = y1 + stateRadius * Math.sin(startAngle);
            const endX = x1 + stateRadius * Math.cos(endAngle);
            const endY = y1 + stateRadius * Math.sin(endAngle);
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(controlX, controlY, endX, endY);
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Arrowhead for self-loop at circle edge
            const arrowAngle = Math.atan2(endY - controlY, endX - controlX);
            
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 8 * Math.cos(arrowAngle - Math.PI / 6), endY - 8 * Math.sin(arrowAngle - Math.PI / 6));
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 8 * Math.cos(arrowAngle + Math.PI / 6), endY - 8 * Math.sin(arrowAngle + Math.PI / 6));
            ctx.stroke();
            
             // Probability label for self-loop (above the curve)
             ctx.fillStyle = '#000000';
             ctx.font = 'bold 16px Arial';
             ctx.textAlign = 'center';
             // Position self-loop numbers directly above the curve peak
             ctx.fillText(prob.toFixed(1), controlX, controlY + 50);
            
          } else if (prob > 0.01) {
            // Cross-state transition (curved arrow) - connect to circle edges
            const midX = (x1 + x2) / 2;
            const midY = y1 - 25;
            const controlX = midX;
            const controlY = midY - 25;
            
            // Calculate exact points on circle edges
            const dx = x2 - x1;
            const dy = y2 - y1;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const unitX = dx / distance;
            const unitY = dy / distance;
            
            // Start point on first circle edge
            const startX = x1 + unitX * stateRadius;
            const startY = y1 + unitY * stateRadius;
            
            // End point on second circle edge
            const endX = x2 - unitX * stateRadius;
            const endY = y2 - unitY * stateRadius;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.quadraticCurveTo(controlX, controlY, endX, endY);
            ctx.strokeStyle = '#374151';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Arrowhead at circle edge
            const arrowAngle = Math.atan2(endY - controlY, endX - controlX);
            
            ctx.beginPath();
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 10 * Math.cos(arrowAngle - Math.PI / 6), endY - 10 * Math.sin(arrowAngle - Math.PI / 6));
            ctx.moveTo(endX, endY);
            ctx.lineTo(endX - 10 * Math.cos(arrowAngle + Math.PI / 6), endY - 10 * Math.sin(arrowAngle + Math.PI / 6));
            ctx.stroke();
            
             // Probability label
             ctx.fillStyle = '#000000';
             ctx.font = 'bold 16px Arial';
             ctx.textAlign = 'center';
             // Position cross-state numbers on opposite sides to avoid overlap
             const offsetX = i === 0 ? -20 : 20; // Hot->Cold goes left, Cold->Hot goes right
             ctx.fillText(prob.toFixed(1), controlX + offsetX, controlY + 10);
          }
        });
      });
    }

    // Draw emission connections (straight arrows from states to observations)
    testCase.states.forEach((state, stateIndex) => {
      testCase.observations.forEach((obs, obsIndex) => {
        const stateX = centerX - (testCase.states.length - 1) * stateSpacing / 2 + stateIndex * stateSpacing;
        const stateY = centerY - verticalSpacing;
        const obsX = centerX - (testCase.observations.length - 1) * obsSpacing / 2 + obsIndex * obsSpacing;
        const obsY = centerY + verticalSpacing;
        
        const prob = testCase.trueParams.emissionMatrix[stateIndex][obsIndex];
        if (prob > 0.01) { // Only show significant probabilities
          // Calculate exact connection points on circle edges
          const dx = obsX - stateX;
          const dy = obsY - stateY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const unitX = dx / distance;
          const unitY = dy / distance;
          
          // Start point on state circle edge (bottom)
          const startX = stateX + unitX * stateRadius;
          const startY = stateY + unitY * stateRadius;
          
          // End point on observation circle edge (top)
          const endX = obsX - unitX * observationRadius;
          const endY = obsY - unitY * observationRadius;
          
          // Draw straight arrow connecting circle edges
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = '#374151';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          // Draw arrowhead at observation circle edge
          const arrowAngle = Math.atan2(dy, dx);
          
          ctx.beginPath();
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - 10 * Math.cos(arrowAngle - Math.PI / 6), endY - 10 * Math.sin(arrowAngle - Math.PI / 6));
          ctx.moveTo(endX, endY);
          ctx.lineTo(endX - 10 * Math.cos(arrowAngle + Math.PI / 6), endY - 10 * Math.sin(arrowAngle + Math.PI / 6));
          ctx.stroke();
          
          // Draw emission probability near the state (like in reference image)
          const labelX = stateX + (obsX - stateX) * 0.5; // Position in middle of arrow
          const labelY = stateY + stateRadius + (obsY - observationRadius - stateY - stateRadius) * 0.5;
          
          ctx.fillStyle = '#000000';
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          // Add small offset to avoid overlap with other emission numbers
          const offsetY = obsIndex * 3; // Small vertical offset for each observation
          ctx.fillText(prob.toFixed(1), labelX, labelY + offsetY);
        }
      });
    });

    return null;
  };

  // Initialize with first test case - but don't set currentSequence automatically
  useEffect(() => {
    // Only reset other states when test case changes, but keep currentSequence empty
    // until user explicitly runs the algorithm
  }, [selectedTestCase, sequenceLength]);

  // Draw HMM diagram when component mounts or test case changes
  useEffect(() => {
    if (showGraphicalView && activeTab === 'simulation') {
      setTimeout(() => {
        HMMGraphicalView({ testCase: testCases[selectedTestCase], showStates: showHiddenStates });
      }, 100);
    }
  }, [selectedTestCase, showHiddenStates, showGraphicalView, activeTab]);

  // Hide diagram when switching away from simulation tab
  useEffect(() => {
    if (activeTab !== 'simulation') {
      setShowGraphicalView(false);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/experiments")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Experiments
            </Button>
            <Badge variant="secondary">Experiment 5</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Hidden Markov Models</h1>
          <p className="text-lg text-muted-foreground">
            Implement and analyze Hidden Markov Models for sequence analysis and state prediction
          </p>
        </div>

        <Tabs defaultValue="theory" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theory" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Theory
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Simulation
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Implementation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="space-y-6">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Hidden Markov Model Theory
                </CardTitle>
                <CardDescription>
                  Follow the theoretical concepts to understand HMM algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experimentSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        currentStep === index
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      {currentStep === index && (
                        <p className="text-sm text-justify">{step.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  HMM Algorithm Simulation
                </CardTitle>
                <CardDescription>
                  Interactive HMM algorithm demonstration with different scenarios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* HMM Graphical Representation */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Network className="w-5 h-5" />
                        HMM Graphical Representation
                      </h4>
                      <div className="flex gap-2">
                        <Button
                          variant={showGraphicalView ? "default" : "outline"}
                          size="sm"
                          onClick={() => setShowGraphicalView(!showGraphicalView)}
                        >
                          {showGraphicalView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          {showGraphicalView ? "Hide" : "Show"} Diagram
                        </Button>
                        <Button
                          variant={showHiddenStates ? "default" : "outline"}
                          size="sm"
                          onClick={() => setShowHiddenStates(!showHiddenStates)}
                        >
                          <ArrowRight className="w-4 h-4" />
                          {showHiddenStates ? "Hide" : "Show"} Transitions
                        </Button>
                      </div>
                    </div>
                    
                    {showGraphicalView && (
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm">
                          <div className="text-center mb-4">
                            <h5 className="text-lg font-semibold text-gray-800">HMM Structure Diagram</h5>
                            <p className="text-sm text-gray-600">Hidden States (top) → Observations (bottom)</p>
                          </div>
                          <canvas
                            ref={canvasRef}
                            width={700}
                            height={400}
                            className="w-full max-w-full border border-gray-300 rounded-lg shadow-inner"
                            style={{ maxWidth: '100%', height: 'auto', backgroundColor: '#ffffff' }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <h5 className="font-medium mb-2">Legend:</h5>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded-full border border-gray-400"></div>
                                <span>Hidden States</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-yellow-400 rounded-full border border-gray-400"></div>
                                <span>Observations (V1, V2, V3)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-gray-600"></div>
                                <span>State Transitions (Curved)</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-0.5 bg-gray-600"></div>
                                <span>Emission Probabilities (Straight)</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Current Model:</h5>
                            <div className="space-y-1 text-xs">
                              <div><strong>States:</strong> {testCases[selectedTestCase].states.join(', ')}</div>
                              <div><strong>Observations:</strong> {testCases[selectedTestCase].observations.join(', ')}</div>
                              <div><strong>Scenario:</strong> {testCases[selectedTestCase].name}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Initial Probabilities:</h5>
                            <div className="space-y-1 text-xs">
                              {testCases[selectedTestCase].states.map((state, index) => (
                                <div key={index} className="flex justify-between">
                                  <span>{state}:</span>
                                  <span className="font-mono">{testCases[selectedTestCase].trueParams.initialProbabilities[index].toFixed(3)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Parameter Matrices */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                          {/* Transition Matrix */}
                          <div>
                            <h5 className="font-medium mb-2 text-sm">Transition Matrix:</h5>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr>
                                    <th className="p-1 border"></th>
                                    {testCases[selectedTestCase].states.map((state, index) => (
                                      <th key={index} className="p-1 border text-center">{state}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {testCases[selectedTestCase].trueParams.transitionMatrix.map((row, i) => (
                                    <tr key={i}>
                                      <td className="p-1 border font-medium">{testCases[selectedTestCase].states[i]}</td>
                                      {row.map((prob, j) => (
                                        <td key={j} className="p-1 border text-center">
                                          <div 
                                            className="p-1 rounded"
                                            style={{ backgroundColor: `rgba(59, 130, 246, ${prob * 2})` }}
                                          >
                                            {prob.toFixed(2)}
                                          </div>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          {/* Emission Matrix */}
                          <div>
                            <h5 className="font-medium mb-2 text-sm">Emission Matrix:</h5>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr>
                                    <th className="p-1 border"></th>
                                    {testCases[selectedTestCase].observations.map((obs, index) => (
                                      <th key={index} className="p-1 border text-center">{obs}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {testCases[selectedTestCase].trueParams.emissionMatrix.map((row, i) => (
                                    <tr key={i}>
                                      <td className="p-1 border font-medium">{testCases[selectedTestCase].states[i]}</td>
                                      {row.map((prob, j) => (
                                        <td key={j} className="p-1 border text-center">
                                          <div 
                                            className="p-1 rounded"
                                            style={{ backgroundColor: `rgba(139, 92, 246, ${prob * 2})` }}
                                          >
                                            {prob.toFixed(2)}
                                          </div>
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Test Case Selection */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-4">HMM Scenario Selection</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {testCases.map((testCase, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            selectedTestCase === index
                              ? "border-primary bg-primary/5"
                              : "border-muted hover:border-primary/50"
                          }`}
                          onClick={() => handleTestCaseChange(index)}
                        >
                          <h5 className="font-medium text-sm">{testCase.name}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{testCase.description}</p>
                          <div className="text-xs text-muted-foreground mt-2">
                            States: {testCase.states.join(', ')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Observations: {testCase.observations.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                   {/* Sequence Input */}
                   <div className="p-4 rounded-lg border-2 border-muted">
                     <h4 className="font-semibold mb-4">Observation Sequence Input</h4>
                     <div className="space-y-4">
                       <div>
                         <label className="text-sm font-medium mb-2 block">
                           Enter your observation sequence (required):
                         </label>
                         <p className="text-xs text-muted-foreground mb-2">
                           Enter observations separated by commas or spaces. Valid observations: {testCases[selectedTestCase].observations.join(', ')}
                         </p>
                         <div className="flex gap-2">
                           <Input
                             type="text"
                             placeholder={`e.g., ${testCases[selectedTestCase].observations.slice(0, 3).join(', ')}`}
                             value={userSequence}
                             onChange={(e) => setUserSequence(e.target.value)}
                             className="flex-1"
                           />
                           <Button
                             variant="outline"
                             size="sm"
                             onClick={() => setUserSequence('')}
                           >
                             Clear
                           </Button>
                         </div>
                         <p className="text-xs text-muted-foreground mt-2">
                           Valid observations for {testCases[selectedTestCase].name}: {testCases[selectedTestCase].observations.join(', ')}
                         </p>
                         <p className="text-xs text-muted-foreground">
                           Separate observations with commas or spaces (e.g., "V1, V2, V3" or "V1 V2 V3")
                         </p>
                       </div>
                       
                       {userSequence.trim() && (
                         <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                           <h5 className="text-sm font-medium mb-2">Parsed Sequence:</h5>
                           <div className="flex flex-wrap gap-2">
                             {userSequence.split(/[,\s]+/).filter(obs => obs.trim() !== '').map((obs, index) => (
                               <Badge 
                                 key={index} 
                                 variant={testCases[selectedTestCase].observations.includes(obs.trim()) ? "default" : "destructive"}
                                 className="text-sm"
                               >
                                 {obs.trim()}
                               </Badge>
                             ))}
                           </div>
                         </div>
                       )}
                     </div>
                   </div>

                   {/* Algorithm Selection */}
                   <div className="p-4 rounded-lg border-2 border-muted">
                     <h4 className="font-semibold mb-4">Algorithm Selection</h4>
                     <div className="flex flex-wrap gap-2">
                       {[
                         { id: 'forward', name: 'Forward Algorithm' },
                         { id: 'backward', name: 'Backward Algorithm' },
                         { id: 'viterbi', name: 'Viterbi Algorithm' },
                         { id: 'all', name: 'All Algorithms' }
                       ].map((algo) => (
                         <Button
                           key={algo.id}
                           variant={selectedAlgorithm === algo.id ? "default" : "outline"}
                           size="sm"
                           onClick={() => setSelectedAlgorithm(algo.id)}
                         >
                           {algo.name}
                         </Button>
                       ))}
                     </div>
                   </div>

                  {/* Run Algorithm Controls */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-4">Run Algorithm</h4>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={runHMMAlgorithm}
                        disabled={isAlgorithmRunning || !userSequence.trim()}
                        className="flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        {isAlgorithmRunning ? "Running..." : "Run Algorithm"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetExperiment}
                        disabled={isAlgorithmRunning}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Current Sequence Display */}
                  {hasRunAlgorithm && currentSequence.length > 0 && (
                    <div className="p-4 rounded-lg border-2 border-muted">
                      <h4 className="font-semibold mb-4">Observation Sequence Visualization</h4>
                      <div className="space-y-4">
                        {/* Observation Sequence */}
                        <div>
                          <h5 className="text-sm font-medium mb-2">Observations:</h5>
                          <div className="flex flex-wrap gap-2">
                            {currentSequence.map((obs, index) => (
                              <div key={index} className="flex flex-col items-center">
                                <Badge variant="outline" className="text-sm mb-1">
                                  {obs}
                                </Badge>
                                <span className="text-xs text-muted-foreground">t{index + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Predicted States (if Viterbi result available) */}
                        {hmmResult && hmmResult.viterbiPath.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium mb-2">Predicted Hidden States (Viterbi):</h5>
                            <div className="flex flex-wrap gap-2">
                              {hmmResult.viterbiPath.map((stateIndex, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  <Badge variant="secondary" className="text-sm mb-1">
                                    {testCases[selectedTestCase].states[stateIndex]}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">t{index + 1}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Sequence Flow Visualization */}
                        <div>
                          <h5 className="text-sm font-medium mb-2">Sequence Flow:</h5>
                          <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {currentSequence.map((obs, index) => (
                              <div key={index} className="flex items-center">
                                <div className="flex flex-col items-center">
                                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-xs font-medium">
                                    {obs}
                                  </div>
                                  <span className="text-xs text-muted-foreground mt-1">Obs</span>
                                </div>
                                {hmmResult && hmmResult.viterbiPath.length > 0 && index < hmmResult.viterbiPath.length && (
                                  <div className="flex flex-col items-center ml-2">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-medium">
                                      {testCases[selectedTestCase].states[hmmResult.viterbiPath[index]]}
                                    </div>
                                    <span className="text-xs text-muted-foreground mt-1">State</span>
                                  </div>
                                )}
                                {index < currentSequence.length - 1 && (
                                  <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Algorithm Progress */}
                  {isAlgorithmRunning && (
                    <div className="p-4 rounded-lg border-2 border-muted">
                      <h4 className="font-semibold mb-4">Algorithm Execution Progress</h4>
                      <div className="flex flex-col items-center justify-center py-8">
                        <Activity className="w-16 h-16 text-primary animate-pulse" />
                        <p className="text-sm text-muted-foreground mt-2">Running {selectedAlgorithm} algorithm...</p>
                        <div className="w-full max-w-full bg-muted rounded-full h-2 mt-4 overflow-hidden">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${algorithmProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{algorithmProgress}%</p>
                      </div>
                    </div>
                  )}

                  {/* Results Display - CORRECTED */}
                  {hmmResult && !isAlgorithmRunning && (
                    <div className="space-y-4">
                      {/* Final Probability */}
                      {hmmResult.finalProbability !== 0 && (
                        <div className="p-4 rounded-lg border-2 border-muted">
                          <h4 className="font-semibold mb-4">Forward Algorithm Results</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Final Probability P(O|λ):</h5>
                              <div className="text-2xl font-bold text-primary">
                                {hmmResult.finalProbability.toFixed(10)}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Sum of forward probabilities at final timestep
                              </p>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium mb-2">Log-Likelihood log(P(O|λ)):</h5>
                              <div className="text-2xl font-bold text-blue-600">
                                {Math.log(hmmResult.finalProbability).toFixed(6)}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Natural logarithm of the probability
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Viterbi Path */}
                      {hmmResult.viterbiPath.length > 0 && (
                        <div className="p-4 rounded-lg border-2 border-muted">
                          <h4 className="font-semibold mb-4">Most Likely State Sequence (Viterbi)</h4>
                          <div className="flex flex-wrap gap-2">
                            {hmmResult.viterbiPath.map((stateIndex, index) => (
                              <Badge key={index} variant="secondary" className="text-sm">
                                {testCases[selectedTestCase].states[stateIndex]}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                                            {/* Forward Probabilities */}
                                            {hmmResult.forwardProbabilities.length > 0 && (
                        <div className="p-4 rounded-lg border-2 border-muted">
                          <h4 className="font-semibold mb-4">Forward Probabilities</h4>
                          <div className="space-y-4">
                            {/* Table View */}
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr>
                                    <th className="text-left p-2">Time</th>
                                    {testCases[selectedTestCase].states.map((state, index) => (
                                      <th key={index} className="text-center p-2">{state}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {hmmResult.forwardProbabilities.map((row, t) => (
                                    <tr key={t}>
                                      <td className="p-2 font-medium">{t + 1}</td>
                                      {row.map((prob, stateIndex) => (
                                        <td key={stateIndex} className="text-center p-2">
                                          {prob.toFixed(6)}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            
                            {/* Heatmap Visualization */}
                            <div>
                              <h5 className="text-sm font-medium mb-2">Probability Heatmap:</h5>
                              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${testCases[selectedTestCase].states.length + 1}, 1fr)` }}>
                                {/* Header */}
                                <div className="p-2 text-xs font-medium bg-gray-100 dark:bg-gray-800">Time</div>
                                {testCases[selectedTestCase].states.map((state, index) => (
                                  <div key={index} className="p-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-center">
                                    {state}
                                  </div>
                                ))}
                                
                                {/* Data rows */}
                                {hmmResult.forwardProbabilities.map((row, t) => (
                                  <>
                                    <div className="p-2 text-xs font-medium bg-gray-50 dark:bg-gray-900">
                                      t{t + 1}
                                    </div>
                                    {row.map((prob, stateIndex) => {
                                      const intensity = Math.min(prob * 10, 1); // Scale for visualization
                                      const color = `rgba(59, 130, 246, ${intensity})`;
                                      return (
                                        <div 
                                          key={stateIndex} 
                                          className="p-2 text-xs text-center border"
                                          style={{ backgroundColor: color }}
                                        >
                                          {prob.toFixed(3)}
                                        </div>
                                      );
                                    })}
                                  </>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Backward Probabilities */}
                      {hmmResult.backwardProbabilities.length > 0 && (
                        <div className="p-4 rounded-lg border-2 border-muted">
                          <h4 className="font-semibold mb-4">Backward Probabilities</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr>
                                  <th className="text-left p-2">Time</th>
                                  {testCases[selectedTestCase].states.map((state, index) => (
                                    <th key={index} className="text-center p-2">{state}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {hmmResult.backwardProbabilities.map((row, t) => (
                                  <tr key={t}>
                                    <td className="p-2 font-medium">{t + 1}</td>
                                    {row.map((prob, stateIndex) => (
                                      <td key={stateIndex} className="text-center p-2">
                                        {prob.toFixed(6)}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Python Implementation</CardTitle>
                <CardDescription>
                  Code examples for implementing Hidden Markov Model algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Basic HMM Class Structure</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import numpy as np
from typing import List, Tuple, Dict

class HiddenMarkovModel:
    def __init__(self, states: List[str], observations: List[str]):
        self.states = states
        self.observations = observations
        self.n_states = len(states)
        self.n_observations = len(observations)
        
        # Initialize parameters
        self.initial_probs = np.random.dirichlet(np.ones(self.n_states))
        self.transition_matrix = np.random.dirichlet(
            np.ones(self.n_states), size=self.n_states
        )
        self.emission_matrix = np.random.dirichlet(
            np.ones(self.n_observations), size=self.n_states
        )
    
    def set_parameters(self, initial_probs, transition_matrix, emission_matrix):
        """Set HMM parameters manually"""
        self.initial_probs = np.array(initial_probs)
        self.transition_matrix = np.array(transition_matrix)
        self.emission_matrix = np.array(emission_matrix)
    
    def get_observation_index(self, observation: str) -> int:
        """Get index of observation in the observations list"""
        return self.observations.index(observation)
    
    def get_state_index(self, state: str) -> int:
        """Get index of state in the states list"""
        return self.states.index(state)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">2. Forward Algorithm Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`    def forward_algorithm(self, observations: List[str]) -> Tuple[np.ndarray, float]:
        """
        Forward algorithm to compute P(O|λ)
        Returns forward probabilities and final probability
        """
        T = len(observations)
        alpha = np.zeros((T, self.n_states))
        
        # Initialize
        obs_idx = self.get_observation_index(observations[0])
        alpha[0] = self.initial_probs * self.emission_matrix[:, obs_idx]
        
        # Recursion
        for t in range(1, T):
            obs_idx = self.get_observation_index(observations[t])
            for j in range(self.n_states):
                alpha[t, j] = np.sum(alpha[t-1] * self.transition_matrix[:, j]) * self.emission_matrix[j, obs_idx]
        
        # Compute final probability
        final_probability = np.sum(alpha[T-1])
        
        return alpha, final_probability`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">3. Backward Algorithm Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`    def backward_algorithm(self, observations: List[str]) -> np.ndarray:
        """
        Backward algorithm to compute backward probabilities
        """
        T = len(observations)
        beta = np.zeros((T, self.n_states))
        
        # Initialize
        beta[T-1] = 1.0
        
        # Recursion
        for t in range(T-2, -1, -1):
            obs_idx = self.get_observation_index(observations[t+1])
            for i in range(self.n_states):
                beta[t, i] = np.sum(
                    self.transition_matrix[i] * 
                    self.emission_matrix[:, obs_idx] * 
                    beta[t+1]
                )
        
        return beta`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">4. Viterbi Algorithm Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`    def viterbi_algorithm(self, observations: List[str]) -> Tuple[List[str], float]:
        """
        Viterbi algorithm to find most likely state sequence
        Returns state sequence and probability
        """
        T = len(observations)
        delta = np.zeros((T, self.n_states))
        psi = np.zeros((T, self.n_states), dtype=int)
        
        # Initialize
        obs_idx = self.get_observation_index(observations[0])
        delta[0] = self.initial_probs * self.emission_matrix[:, obs_idx]
        psi[0] = 0
        
        # Recursion
        for t in range(1, T):
            obs_idx = self.get_observation_index(observations[t])
            for j in range(self.n_states):
                probs = delta[t-1] * self.transition_matrix[:, j]
                delta[t, j] = np.max(probs) * self.emission_matrix[j, obs_idx]
                psi[t, j] = np.argmax(probs)
        
        # Backtracking
        state_sequence = []
        state_idx = np.argmax(delta[T-1])
        state_sequence.append(self.states[state_idx])
        
        for t in range(T-1, 0, -1):
            state_idx = psi[t, state_idx]
            state_sequence.append(self.states[state_idx])
        
        state_sequence.reverse()
        max_probability = np.max(delta[T-1])
        
        return state_sequence, max_probability`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">5. Example Usage</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Example: Temperature HMM
def temperature_hmm_example():
    # Define HMM
    states = ['Hot', 'Cold']
    observations = ['V1', 'V2', 'V3']
    
    hmm = HiddenMarkovModel(states, observations)
    
    # Set known parameters
    initial_probs = [0.6, 0.4]
    transition_matrix = [[0.7, 0.3], [0.4, 0.6]]
    emission_matrix = [[0.1, 0.4, 0.5], [0.7, 0.2, 0.1]]
    
    hmm.set_parameters(initial_probs, transition_matrix, emission_matrix)
    
    # Test sequence
    test_sequence = ['V2', 'V3', 'V1', 'V2']
    
    # Run algorithms
    print("=== Forward Algorithm ===")
    alpha, final_prob = hmm.forward_algorithm(test_sequence)
    print(f"Final probability: {final_prob:.10f}")
    print(f"Log-likelihood: {np.log(final_prob):.6f}")
    print("\\nForward probabilities:")
    print(alpha)
    
    print("\\n=== Viterbi Algorithm ===")
    state_sequence, max_prob = hmm.viterbi_algorithm(test_sequence)
    print(f"Most likely state sequence: {state_sequence}")
    print(f"Probability: {max_prob:.6f}")
    
    print("\\n=== Backward Algorithm ===")
    beta = hmm.backward_algorithm(test_sequence)
    print("Backward probabilities:")
    print(beta)
    
    return hmm, test_sequence

# Run example
hmm, sequence = temperature_hmm_example()`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Experiment5;