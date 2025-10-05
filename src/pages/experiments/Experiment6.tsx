import { useState, useEffect } from "react";
import { ArrowLeft, Play, RotateCcw, Info, BookOpen, Code, BarChart3, Calculator, Target, TrendingUp, Activity } from "lucide-react";
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

interface DataPoint {
  x: number;
  y: number;
}

interface MLEParameters {
  mean?: number;
  variance?: number;
  lambda?: number;
  p?: number;
  n?: number;
  // Multi-class parameters for GMM and multi-class normal
  mean1?: number;
  variance1?: number;
  weight1?: number;
  mean2?: number;
  variance2?: number;
  weight2?: number;
  mean3?: number;
  variance3?: number;
  likelihood: number;
  logLikelihood: number;
}

interface TestCase {
  name: string;
  description: string;
  distribution: string;
  data: DataPoint[];
  trueParams: { [key: string]: number };
  features: string[];
  isMultiClass?: boolean;
  nClasses?: number;
  classLabels?: number[];
}

const Experiment6 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEstimating, setIsEstimating] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [sampleSize, setSampleSize] = useState(100);
  const [estimatedParams, setEstimatedParams] = useState<MLEParameters | null>(null);
  const [likelihoodHistory, setLikelihoodHistory] = useState<number[]>([]);
  const [parameterHistory, setParameterHistory] = useState<number[]>([]);
  const [currentData, setCurrentData] = useState<DataPoint[]>([]);
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});

  const experimentSteps = [
    {
      title: "Aim",
      description: "Implement Maximum Likelihood Estimation for parameter estimation in probabilistic models",
      content: "You will learn to estimate parameters of probability distributions using Maximum Likelihood Estimation (MLE), understand the mathematical foundations, implement MLE algorithms, and visualize the likelihood functions and parameter estimation process."
    },
    {
      title: "Objective",
      description: "Master MLE fundamentals and practical implementation",
      content: "By the end of this experiment, you will be able to: 1) Understand the concept of likelihood and log-likelihood, 2) Implement MLE for different probability distributions, 3) Visualize likelihood functions and parameter estimation, 4) Compare MLE estimates with true parameters, and 5) Apply MLE to real-world parameter estimation problems."
    },
    {
      title: "Theory - Maximum Likelihood Estimation",
      description: "Statistical method for estimating model parameters",
      content: "Maximum Likelihood Estimation (MLE) is a method of estimating the parameters of a statistical model by finding the parameter values that maximize the likelihood function. The likelihood function measures how well a particular set of parameters explains the observed data."
    },
    {
      title: "Likelihood Function",
      description: "Mathematical foundation for parameter estimation",
      content: "The likelihood function L(θ) is the probability of observing the given data as a function of the parameters θ. For independent observations, L(θ) = ∏(i=1 to n) f(xi|θ), where f(xi|θ) is the probability density function. We often work with the log-likelihood: ℓ(θ) = log L(θ) = ∑(i=1 to n) log f(xi|θ)."
    },
    {
      title: "MLE for Different Distributions",
      description: "Parameter estimation for common probability distributions",
      content: "MLE can be applied to various distributions: Normal distribution (μ, σ²), Poisson distribution (λ), Binomial distribution (n, p), Exponential distribution (λ), etc. Each distribution has its own likelihood function and optimization procedure for finding the maximum likelihood estimates."
    },
    {
      title: "Optimization Methods",
      description: "Numerical methods for finding MLE estimates",
      content: "Finding MLE estimates often requires numerical optimization methods such as gradient descent, Newton-Raphson method, or grid search. The choice of method depends on the complexity of the likelihood function and the number of parameters to estimate."
    }
  ];

  // Test cases for different distributions
  const testCases: TestCase[] = [
    {
      name: "Normal Distribution",
      description: "Estimate mean and variance of a normal distribution",
      distribution: "normal",
      data: [],
      trueParams: { mean: 5, variance: 2 },
      features: ['mean', 'variance']
    },
    {
      name: "Poisson Distribution",
      description: "Estimate lambda parameter of a Poisson distribution",
      distribution: "poisson",
      data: [],
      trueParams: { lambda: 3 },
      features: ['lambda']
    },
    {
      name: "Binomial Distribution",
      description: "Estimate probability parameter of a binomial distribution",
      distribution: "binomial",
      data: [],
      trueParams: { n: 20, p: 0.3 },
      features: ['n', 'p']
    },
    {
      name: "Exponential Distribution",
      description: "Estimate rate parameter of an exponential distribution",
      distribution: "exponential",
      data: [],
      trueParams: { lambda: 0.5 },
      features: ['lambda']
    },
    {
      name: "Gaussian Mixture Model",
      description: "Estimate parameters for 2-component Gaussian mixture",
      distribution: "gmm",
      data: [],
      trueParams: { 
        mean1: 2, variance1: 1, weight1: 0.6,
        mean2: 8, variance2: 1.5, weight2: 0.4
      },
      features: ['mean1', 'variance1', 'weight1', 'mean2', 'variance2', 'weight2'],
      isMultiClass: true,
      nClasses: 2
    },
    {
      name: "Multi-Class Normal",
      description: "Estimate parameters for 3-class normal distributions",
      distribution: "multiclass_normal",
      data: [],
      trueParams: { 
        mean1: 1, variance1: 0.5,
        mean2: 5, variance2: 1,
        mean3: 9, variance3: 0.8
      },
      features: ['mean1', 'variance1', 'mean2', 'variance2', 'mean3', 'variance3'],
      isMultiClass: true,
      nClasses: 3
    }
  ];

  // Generate sample data for a given distribution
  const generateSampleData = (testCase: TestCase, size: number): DataPoint[] => {
    const data: DataPoint[] = [];
    const { distribution, trueParams } = testCase;
    const classLabels: number[] = [];

    for (let i = 0; i < size; i++) {
      let value: number;
      let classLabel = 0;
      
      switch (distribution) {
        case 'normal':
          // Box-Muller transform for normal distribution
          const u1 = Math.random();
          const u2 = Math.random();
          const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
          value = trueParams.mean! + Math.sqrt(trueParams.variance!) * z0;
          break;
        case 'poisson':
          // Poisson distribution using inverse transform
          const lambda = trueParams.lambda!;
          let k = 0;
          let p = Math.exp(-lambda);
          let s = p;
          const u = Math.random();
          while (u > s) {
            k++;
            p *= lambda / k;
            s += p;
          }
          value = k;
          break;
        case 'binomial':
          // Binomial distribution
          const n = trueParams.n!;
          const p_binom = trueParams.p!;
          let successes = 0;
          for (let j = 0; j < n; j++) {
            if (Math.random() < p_binom) successes++;
          }
          value = successes;
          break;
        case 'exponential':
          // Exponential distribution using inverse transform
          value = -Math.log(1 - Math.random()) / trueParams.lambda!;
          break;
        case 'gmm':
          // Gaussian Mixture Model - 2 components
          const rand = Math.random();
          if (rand < trueParams.weight1!) {
            // Component 1
            const u1 = Math.random();
            const u2 = Math.random();
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            value = trueParams.mean1! + Math.sqrt(trueParams.variance1!) * z0;
            classLabel = 0;
          } else {
            // Component 2
            const u1 = Math.random();
            const u2 = Math.random();
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            value = trueParams.mean2! + Math.sqrt(trueParams.variance2!) * z0;
            classLabel = 1;
          }
          break;
        case 'multiclass_normal':
          // Multi-class normal - 3 classes with equal probability
          const classRand = Math.random();
          if (classRand < 0.33) {
            // Class 1
            const u1 = Math.random();
            const u2 = Math.random();
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            value = trueParams.mean1! + Math.sqrt(trueParams.variance1!) * z0;
            classLabel = 0;
          } else if (classRand < 0.66) {
            // Class 2
            const u1 = Math.random();
            const u2 = Math.random();
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            value = trueParams.mean2! + Math.sqrt(trueParams.variance2!) * z0;
            classLabel = 1;
          } else {
            // Class 3
            const u1 = Math.random();
            const u2 = Math.random();
            const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
            value = trueParams.mean3! + Math.sqrt(trueParams.variance3!) * z0;
            classLabel = 2;
          }
          break;
        default:
          value = Math.random();
      }
      
      data.push({ x: i, y: value });
      classLabels.push(classLabel);
    }
    
    // Store class labels in test case for multi-class scenarios
    if (testCase.isMultiClass) {
      testCase.classLabels = classLabels;
    }
    
    return data;
  };

  // Calculate likelihood for normal distribution
  const calculateNormalLikelihood = (data: DataPoint[], mean: number, variance: number): number => {
    const n = data.length;
    let likelihood = 1;
    
    for (const point of data) {
      const x = point.y;
      const prob = (1 / Math.sqrt(2 * Math.PI * variance)) * 
                   Math.exp(-0.5 * Math.pow(x - mean, 2) / variance);
      likelihood *= prob;
    }
    
    return likelihood;
  };

  // Calculate likelihood for Poisson distribution
  const calculatePoissonLikelihood = (data: DataPoint[], lambda: number): number => {
    let likelihood = 1;
    
    for (const point of data) {
      const k = Math.round(point.y);
      const prob = Math.pow(lambda, k) * Math.exp(-lambda) / factorial(k);
      likelihood *= prob;
    }
    
    return likelihood;
  };

  // Calculate likelihood for binomial distribution
  const calculateBinomialLikelihood = (data: DataPoint[], n: number, p: number): number => {
    let likelihood = 1;
    
    for (const point of data) {
      const k = Math.round(point.y);
      const prob = binomialCoefficient(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
      likelihood *= prob;
    }
    
    return likelihood;
  };

  // Calculate likelihood for exponential distribution
  const calculateExponentialLikelihood = (data: DataPoint[], lambda: number): number => {
    let likelihood = 1;
    
    for (const point of data) {
      const x = point.y;
      const prob = lambda * Math.exp(-lambda * x);
      likelihood *= prob;
    }
    
    return likelihood;
  };

  // Helper functions
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const binomialCoefficient = (n: number, k: number): number => {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  // MLE estimation for normal distribution
  const estimateNormalMLE = (data: DataPoint[]): MLEParameters => {
    const n = data.length;
    const values = data.map(d => d.y);
    
    // MLE estimates
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    
    const likelihood = calculateNormalLikelihood(data, mean, variance);
    const logLikelihood = Math.log(likelihood);
    
    return { mean, variance, likelihood, logLikelihood };
  };

  // MLE estimation for Poisson distribution
  const estimatePoissonMLE = (data: DataPoint[]): MLEParameters => {
    const values = data.map(d => d.y);
    const lambda = values.reduce((sum, val) => sum + val, 0) / data.length;
    
    const likelihood = calculatePoissonLikelihood(data, lambda);
    const logLikelihood = Math.log(likelihood);
    
    return { lambda, likelihood, logLikelihood };
  };

  // MLE estimation for binomial distribution
  const estimateBinomialMLE = (data: DataPoint[]): MLEParameters => {
    const values = data.map(d => d.y);
    const n = Math.max(...values); // Assume n is the maximum observed value
    const p = values.reduce((sum, val) => sum + val, 0) / (data.length * n);
    
    const likelihood = calculateBinomialLikelihood(data, n, p);
    const logLikelihood = Math.log(likelihood);
    
    return { n, p, likelihood, logLikelihood };
  };

  // MLE estimation for exponential distribution
  const estimateExponentialMLE = (data: DataPoint[]): MLEParameters => {
    const values = data.map(d => d.y);
    const lambda = 1 / (values.reduce((sum, val) => sum + val, 0) / data.length);
    
    const likelihood = calculateExponentialLikelihood(data, lambda);
    const logLikelihood = Math.log(likelihood);
    
    return { lambda, likelihood, logLikelihood };
  };

  // Calculate likelihood for Gaussian Mixture Model
  const calculateGMMLikelihood = (data: DataPoint[], params: any): number => {
    let likelihood = 1;
    
    for (const point of data) {
      const x = point.y;
      const prob1 = params.weight1 * (1 / Math.sqrt(2 * Math.PI * params.variance1)) * 
                   Math.exp(-0.5 * Math.pow(x - params.mean1, 2) / params.variance1);
      const prob2 = params.weight2 * (1 / Math.sqrt(2 * Math.PI * params.variance2)) * 
                   Math.exp(-0.5 * Math.pow(x - params.mean2, 2) / params.variance2);
      likelihood *= (prob1 + prob2);
    }
    
    return likelihood;
  };

  // Calculate likelihood for multi-class normal
  const calculateMultiClassNormalLikelihood = (data: DataPoint[], classLabels: number[], params: any): number => {
    let likelihood = 1;
    
    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      const classLabel = classLabels[i];
      const x = point.y;
      
      let prob: number;
      if (classLabel === 0) {
        prob = (1 / Math.sqrt(2 * Math.PI * params.variance1)) * 
               Math.exp(-0.5 * Math.pow(x - params.mean1, 2) / params.variance1);
      } else if (classLabel === 1) {
        prob = (1 / Math.sqrt(2 * Math.PI * params.variance2)) * 
               Math.exp(-0.5 * Math.pow(x - params.mean2, 2) / params.variance2);
      } else {
        prob = (1 / Math.sqrt(2 * Math.PI * params.variance3)) * 
               Math.exp(-0.5 * Math.pow(x - params.mean3, 2) / params.variance3);
      }
      likelihood *= prob;
    }
    
    return likelihood;
  };

  // MLE estimation for Gaussian Mixture Model
  const estimateGMMLE = (data: DataPoint[]): MLEParameters => {
    const values = data.map(d => d.y);
    const n = data.length;
    
    // Simple EM-like estimation (simplified)
    // Initialize with k-means-like approach
    const sortedValues = [...values].sort((a, b) => a - b);
    const mid = Math.floor(n / 2);
    
    // Initial estimates
    let mean1 = sortedValues.slice(0, mid).reduce((sum, val) => sum + val, 0) / mid;
    let mean2 = sortedValues.slice(mid).reduce((sum, val) => sum + val, 0) / (n - mid);
    
    // Calculate variances
    let variance1 = sortedValues.slice(0, mid).reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) / mid;
    let variance2 = sortedValues.slice(mid).reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) / (n - mid);
    
    // Calculate weights
    const weight1 = mid / n;
    const weight2 = (n - mid) / n;
    
    const params = { mean1, variance1, weight1, mean2, variance2, weight2 };
    const likelihood = calculateGMMLikelihood(data, params);
    const logLikelihood = Math.log(likelihood);
    
    return { 
      mean1, variance1, weight1, 
      mean2, variance2, weight2, 
      likelihood, logLikelihood 
    };
  };

  // MLE estimation for multi-class normal
  const estimateMultiClassNormalMLE = (data: DataPoint[], classLabels: number[]): MLEParameters => {
    const n = data.length;
    
    // Separate data by class
    const class0Data = data.filter((_, i) => classLabels[i] === 0).map(d => d.y);
    const class1Data = data.filter((_, i) => classLabels[i] === 1).map(d => d.y);
    const class2Data = data.filter((_, i) => classLabels[i] === 2).map(d => d.y);
    
    // Calculate MLE estimates for each class
    const mean1 = class0Data.reduce((sum, val) => sum + val, 0) / class0Data.length;
    const variance1 = class0Data.reduce((sum, val) => sum + Math.pow(val - mean1, 2), 0) / class0Data.length;
    
    const mean2 = class1Data.reduce((sum, val) => sum + val, 0) / class1Data.length;
    const variance2 = class1Data.reduce((sum, val) => sum + Math.pow(val - mean2, 2), 0) / class1Data.length;
    
    const mean3 = class2Data.reduce((sum, val) => sum + val, 0) / class2Data.length;
    const variance3 = class2Data.reduce((sum, val) => sum + Math.pow(val - mean3, 2), 0) / class2Data.length;
    
    const params = { mean1, variance1, mean2, variance2, mean3, variance3 };
    const likelihood = calculateMultiClassNormalLikelihood(data, classLabels, params);
    const logLikelihood = Math.log(likelihood);
    
    return { 
      mean1, variance1, mean2, variance2, mean3, variance3, 
      likelihood, logLikelihood 
    };
  };

  // Run MLE estimation
  const runMLEEstimation = () => {
    setIsEstimating(true);
    setLikelihoodHistory([]);
    setParameterHistory([]);
    
    const testCase = testCases[selectedTestCase];
    const data = generateSampleData(testCase, sampleSize);
    setCurrentData(data);
    
    // Calculate iterations and delay based on sample size
    let iterations, delay;
    if (sampleSize <= 20) {
      // Very fast for small samples
      iterations = 3;
      delay = 50;
    } else if (sampleSize <= 100) {
      // Fast for medium samples
      iterations = 5;
      delay = 80;
    } else {
      // Normal speed for large samples
      iterations = Math.min(15, Math.ceil(sampleSize / 20));
      delay = 100;
    }
    
    let currentIteration = 0;
    
    const estimationInterval = setInterval(() => {
      if (currentIteration >= iterations) {
        clearInterval(estimationInterval);
        setIsEstimating(false);
        return;
      }
      
      // Calculate actual MLE parameters
      let params: MLEParameters;
      switch (testCase.distribution) {
        case 'normal':
          params = estimateNormalMLE(data);
          break;
        case 'poisson':
          params = estimatePoissonMLE(data);
          break;
        case 'binomial':
          params = estimateBinomialMLE(data);
          break;
        case 'exponential':
          params = estimateExponentialMLE(data);
          break;
        case 'gmm':
          params = estimateGMMLE(data);
          break;
        case 'multiclass_normal':
          params = estimateMultiClassNormalMLE(data, testCase.classLabels || []);
          break;
        default:
          params = { likelihood: 0, logLikelihood: 0 };
      }
      
      // Debug log
      console.log(`Iteration ${currentIteration + 1}/${iterations}:`, params);
      
      // Add some noise to simulate iterative process (only for visualization)
      if (currentIteration < iterations - 1) {
        const noise = 0.2 * (1 - currentIteration / iterations);
        if (params.mean !== undefined) params.mean += (Math.random() - 0.5) * noise;
        if (params.variance !== undefined) params.variance += (Math.random() - 0.5) * noise;
        if (params.lambda !== undefined) params.lambda += (Math.random() - 0.5) * noise;
        if (params.p !== undefined) params.p += (Math.random() - 0.5) * noise;
        
        // Ensure parameters are positive where needed
        if (params.variance !== undefined) params.variance = Math.max(0.01, params.variance);
        if (params.lambda !== undefined) params.lambda = Math.max(0.01, params.lambda);
        if (params.p !== undefined) params.p = Math.max(0.01, Math.min(0.99, params.p));
        
        // Recalculate likelihood with noisy parameters for better visualization
        switch (testCase.distribution) {
          case 'normal':
            params.likelihood = calculateNormalLikelihood(data, params.mean!, params.variance!);
            params.logLikelihood = Math.log(params.likelihood);
            break;
          case 'poisson':
            params.likelihood = calculatePoissonLikelihood(data, params.lambda!);
            params.logLikelihood = Math.log(params.likelihood);
            break;
          case 'binomial':
            params.likelihood = calculateBinomialLikelihood(data, params.n!, params.p!);
            params.logLikelihood = Math.log(params.likelihood);
            break;
          case 'exponential':
            params.likelihood = calculateExponentialLikelihood(data, params.lambda!);
            params.logLikelihood = Math.log(params.likelihood);
            break;
          case 'gmm':
            params.likelihood = calculateGMMLikelihood(data, params);
            params.logLikelihood = Math.log(params.likelihood);
            break;
          case 'multiclass_normal':
            params.likelihood = calculateMultiClassNormalLikelihood(data, testCase.classLabels || [], params);
            params.logLikelihood = Math.log(params.likelihood);
            break;
        }
      }
      
      setLikelihoodHistory(prev => [...prev, params.logLikelihood]);
      setParameterHistory(prev => [...prev, currentIteration]);
      setEstimatedParams(params);
      
      currentIteration++;
    }, delay);
  };

  // Run all test cases
  const runAllTestCases = () => {
    setIsRunning(true);
    const results: { [key: string]: string } = {};
    
    testCases.forEach((testCase, index) => {
      const data = generateSampleData(testCase, 100);
      let params: MLEParameters;
      
      switch (testCase.distribution) {
        case 'normal':
          params = estimateNormalMLE(data);
          break;
        case 'poisson':
          params = estimatePoissonMLE(data);
          break;
        case 'binomial':
          params = estimateBinomialMLE(data);
          break;
        case 'exponential':
          params = estimateExponentialMLE(data);
          break;
        case 'gmm':
          params = estimateGMMLE(data);
          break;
        case 'multiclass_normal':
          params = estimateMultiClassNormalMLE(data, testCase.classLabels || []);
          break;
        default:
          params = { likelihood: 0, logLikelihood: 0 };
      }
      
      // Calculate accuracy (simplified)
      let accuracy = 0;
      if (testCase.distribution === 'normal') {
        const meanError = Math.abs((params.mean || 0) - testCase.trueParams.mean) / testCase.trueParams.mean;
        const varError = Math.abs((params.variance || 0) - testCase.trueParams.variance) / testCase.trueParams.variance;
        accuracy = 100 - (meanError + varError) * 50;
      } else if (testCase.distribution === 'poisson') {
        const lambdaError = Math.abs((params.lambda || 0) - testCase.trueParams.lambda) / testCase.trueParams.lambda;
        accuracy = 100 - lambdaError * 100;
      } else if (testCase.distribution === 'binomial') {
        const pError = Math.abs((params.p || 0) - testCase.trueParams.p) / testCase.trueParams.p;
        accuracy = 100 - pError * 100;
      } else if (testCase.distribution === 'exponential') {
        const lambdaError = Math.abs((params.lambda || 0) - testCase.trueParams.lambda) / testCase.trueParams.lambda;
        accuracy = 100 - lambdaError * 100;
      } else if (testCase.distribution === 'gmm') {
        const mean1Error = Math.abs((params.mean1 || 0) - testCase.trueParams.mean1) / testCase.trueParams.mean1;
        const mean2Error = Math.abs((params.mean2 || 0) - testCase.trueParams.mean2) / testCase.trueParams.mean2;
        const var1Error = Math.abs((params.variance1 || 0) - testCase.trueParams.variance1) / testCase.trueParams.variance1;
        const var2Error = Math.abs((params.variance2 || 0) - testCase.trueParams.variance2) / testCase.trueParams.variance2;
        accuracy = 100 - (mean1Error + mean2Error + var1Error + var2Error) * 25;
      } else if (testCase.distribution === 'multiclass_normal') {
        const mean1Error = Math.abs((params.mean1 || 0) - testCase.trueParams.mean1) / testCase.trueParams.mean1;
        const mean2Error = Math.abs((params.mean2 || 0) - testCase.trueParams.mean2) / testCase.trueParams.mean2;
        const mean3Error = Math.abs((params.mean3 || 0) - testCase.trueParams.mean3) / testCase.trueParams.mean3;
        const var1Error = Math.abs((params.variance1 || 0) - testCase.trueParams.variance1) / testCase.trueParams.variance1;
        const var2Error = Math.abs((params.variance2 || 0) - testCase.trueParams.variance2) / testCase.trueParams.variance2;
        const var3Error = Math.abs((params.variance3 || 0) - testCase.trueParams.variance3) / testCase.trueParams.variance3;
        accuracy = 100 - (mean1Error + mean2Error + mean3Error + var1Error + var2Error + var3Error) * 16.67;
      }
      
      results[testCase.name] = `${Math.max(0, accuracy).toFixed(1)}%`;
    });
    
    setTestResults(results);
    setTimeout(() => setIsRunning(false), 1500);
  };

  const handleTestCaseChange = (testCaseIndex: number) => {
    setSelectedTestCase(testCaseIndex);
    setEstimatedParams(null);
    setCurrentData([]);
    setLikelihoodHistory([]);
    setParameterHistory([]);
  };

  const resetExperiment = () => {
    setEstimatedParams(null);
    setCurrentData([]);
    setLikelihoodHistory([]);
    setParameterHistory([]);
    setTestResults({});
    setCurrentStep(0);
    setIsRunning(false);
    setIsEstimating(false);
  };

  // Initialize with first test case data
  useEffect(() => {
    const data = generateSampleData(testCases[selectedTestCase], sampleSize);
    setCurrentData(data);
  }, [selectedTestCase, sampleSize]);

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
            <Badge variant="secondary">Experiment 6</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Maximum Likelihood Estimation</h1>
          <p className="text-lg text-muted-foreground">
            Estimate parameters of probability distributions using Maximum Likelihood Estimation
          </p>
        </div>

        <Tabs defaultValue="theory" className="space-y-6">
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
                  Maximum Likelihood Estimation Theory
                </CardTitle>
                <CardDescription>
                  Follow the theoretical concepts to understand MLE algorithms
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
                  MLE Parameter Estimation Simulation
                </CardTitle>
                <CardDescription>
                  Interactive MLE parameter estimation for different probability distributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Test Case Selection */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-4">Distribution Selection</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            True Parameters: {Object.entries(testCase.trueParams).map(([key, value]) => `${key}=${value}`).join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={runAllTestCases}
                        disabled={isRunning}
                        variant="outline"
                        className="flex-1 min-w-0"
                      >
                        <Calculator className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {isRunning ? "Testing..." : "Accuracy Test"}
                        </span>
                      </Button>
                    </div>
                    {Object.keys(testResults).length > 0 && (
                      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                        <h6 className="font-medium text-sm mb-2">Test Results:</h6>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(testResults).map(([name, accuracy]) => (
                            <div key={name} className="flex justify-between">
                              <span>{name}:</span>
                              <span className="font-medium">{accuracy}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sample Size Control */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-4">Sample Size Control</h4>
                    <div className="flex items-center gap-4">
                      <label className="text-sm font-medium">Sample Size: {sampleSize}</label>
                      <Slider
                        value={[sampleSize]}
                        onValueChange={(value) => setSampleSize(value[0])}
                        max={500}
                        min={10}
                        step={10}
                        className="flex-1"
                      />
                      <Button
                        onClick={runMLEEstimation}
                        disabled={isEstimating}
                        className="flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        {isEstimating ? "Estimating..." : "Run MLE"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetExperiment}
                        disabled={isEstimating}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Data Visualization */}
                  {currentData.length > 0 && (
                    <div className="p-4 rounded-lg border-2 border-muted">
                      <h4 className="font-semibold mb-4">Sample Data</h4>
                      <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                          Sample size: {currentData.length} | 
                          Mean: {(currentData.reduce((sum, d) => sum + d.y, 0) / currentData.length).toFixed(3)} | 
                          Std Dev: {Math.sqrt(currentData.reduce((sum, d) => sum + Math.pow(d.y - currentData.reduce((s, d) => s + d.y, 0) / currentData.length, 2), 0) / currentData.length).toFixed(3)}
                          {testCases[selectedTestCase].isMultiClass && (
                            <span> | Classes: {testCases[selectedTestCase].nClasses}</span>
                          )}
                        </div>
                        
                        {/* Multi-class data visualization */}
                        {testCases[selectedTestCase].isMultiClass && testCases[selectedTestCase].classLabels && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-2">Class Distribution:</h5>
                            <div className="flex gap-2 flex-wrap">
                              {Array.from({ length: testCases[selectedTestCase].nClasses || 0 }, (_, classId) => {
                                const classCount = testCases[selectedTestCase].classLabels?.filter(label => label === classId).length || 0;
                                const percentage = (classCount / currentData.length * 100).toFixed(1);
                                return (
                                  <Badge key={classId} variant="secondary" className="text-xs">
                                    Class {classId}: {classCount} ({percentage}%)
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        <div className="h-32 overflow-y-auto">
                          <div className="grid grid-cols-10 gap-1">
                            {currentData.slice(0, 100).map((point, index) => {
                              const classLabel = testCases[selectedTestCase].classLabels?.[index];
                              const isMultiClass = testCases[selectedTestCase].isMultiClass;
                              
                              return (
                                <Badge 
                                  key={index} 
                                  variant={isMultiClass ? (classLabel === 0 ? "default" : classLabel === 1 ? "secondary" : "outline") : "outline"} 
                                  className="text-xs"
                                >
                                  {point.y.toFixed(2)}
                                  {isMultiClass && <span className="ml-1 text-xs opacity-70">C{classLabel}</span>}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Estimation Progress */}
                  {isEstimating && (
                    <div className="p-4 rounded-lg border-2 border-muted">
                      <h4 className="font-semibold mb-4">MLE Estimation Progress</h4>
                      <div className="flex flex-col items-center justify-center py-8">
                        <Activity className="w-16 h-16 text-primary animate-pulse" />
                        <p className="text-sm text-muted-foreground mt-2">Estimating parameters...</p>
                        <div className="w-full max-w-full bg-muted rounded-full h-2 mt-4 overflow-hidden">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, (likelihoodHistory.length / 20) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Results Display */}
                  {estimatedParams && !isEstimating && (
                    <div className="space-y-4">
                      {/* Parameter Estimates */}
                      <div className="p-4 rounded-lg border-2 border-muted">
                        <h4 className="font-semibold mb-4">MLE Parameter Estimates</h4>
                        
                        {/* Multi-class parameter grouping */}
                        {testCases[selectedTestCase].isMultiClass ? (
                          <div className="space-y-4">
                            {testCases[selectedTestCase].distribution === 'gmm' && (
                              <>
                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-blue-600">Component 1</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <div className="text-sm font-medium">Mean</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.mean1?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.mean1} | 
                                        Error: {Math.abs((estimatedParams.mean1 || 0) - testCases[selectedTestCase].trueParams.mean1) / testCases[selectedTestCase].trueParams.mean1 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <div className="text-sm font-medium">Variance</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.variance1?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.variance1} | 
                                        Error: {Math.abs((estimatedParams.variance1 || 0) - testCases[selectedTestCase].trueParams.variance1) / testCases[selectedTestCase].trueParams.variance1 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <div className="text-sm font-medium">Weight</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.weight1?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.weight1} | 
                                        Error: {Math.abs((estimatedParams.weight1 || 0) - testCases[selectedTestCase].trueParams.weight1) / testCases[selectedTestCase].trueParams.weight1 * 100}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-green-600">Component 2</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <div className="text-sm font-medium">Mean</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.mean2?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.mean2} | 
                                        Error: {Math.abs((estimatedParams.mean2 || 0) - testCases[selectedTestCase].trueParams.mean2) / testCases[selectedTestCase].trueParams.mean2 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <div className="text-sm font-medium">Variance</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.variance2?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.variance2} | 
                                        Error: {Math.abs((estimatedParams.variance2 || 0) - testCases[selectedTestCase].trueParams.variance2) / testCases[selectedTestCase].trueParams.variance2 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <div className="text-sm font-medium">Weight</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.weight2?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.weight2} | 
                                        Error: {Math.abs((estimatedParams.weight2 || 0) - testCases[selectedTestCase].trueParams.weight2) / testCases[selectedTestCase].trueParams.weight2 * 100}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                            
                            {testCases[selectedTestCase].distribution === 'multiclass_normal' && (
                              <>
                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-blue-600">Class 1</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <div className="text-sm font-medium">Mean</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.mean1?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.mean1} | 
                                        Error: {Math.abs((estimatedParams.mean1 || 0) - testCases[selectedTestCase].trueParams.mean1) / testCases[selectedTestCase].trueParams.mean1 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-blue-50 rounded-lg">
                                      <div className="text-sm font-medium">Variance</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.variance1?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.variance1} | 
                                        Error: {Math.abs((estimatedParams.variance1 || 0) - testCases[selectedTestCase].trueParams.variance1) / testCases[selectedTestCase].trueParams.variance1 * 100}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-green-600">Class 2</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <div className="text-sm font-medium">Mean</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.mean2?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.mean2} | 
                                        Error: {Math.abs((estimatedParams.mean2 || 0) - testCases[selectedTestCase].trueParams.mean2) / testCases[selectedTestCase].trueParams.mean2 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-green-50 rounded-lg">
                                      <div className="text-sm font-medium">Variance</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.variance2?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.variance2} | 
                                        Error: {Math.abs((estimatedParams.variance2 || 0) - testCases[selectedTestCase].trueParams.variance2) / testCases[selectedTestCase].trueParams.variance2 * 100}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-purple-600">Class 3</h5>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="p-3 bg-purple-50 rounded-lg">
                                      <div className="text-sm font-medium">Mean</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.mean3?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.mean3} | 
                                        Error: {Math.abs((estimatedParams.mean3 || 0) - testCases[selectedTestCase].trueParams.mean3) / testCases[selectedTestCase].trueParams.mean3 * 100}%
                                      </div>
                                    </div>
                                    <div className="p-3 bg-purple-50 rounded-lg">
                                      <div className="text-sm font-medium">Variance</div>
                                      <div className="text-lg font-bold text-primary">
                                        {estimatedParams.variance3?.toFixed(4)}
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        True: {testCases[selectedTestCase].trueParams.variance3} | 
                                        Error: {Math.abs((estimatedParams.variance3 || 0) - testCases[selectedTestCase].trueParams.variance3) / testCases[selectedTestCase].trueParams.variance3 * 100}%
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(estimatedParams).map(([key, value]) => {
                              if (key === 'likelihood' || key === 'logLikelihood') return null;
                              const trueValue = testCases[selectedTestCase].trueParams[key];
                              const error = trueValue ? Math.abs(value - trueValue) / trueValue * 100 : 0;
                              return (
                                <div key={key} className="p-3 bg-muted/50 rounded-lg">
                                  <div className="text-sm font-medium capitalize">{key}</div>
                                  <div className="text-lg font-bold text-primary">
                                    {typeof value === 'number' ? value.toFixed(4) : value}
                                  </div>
                                  {trueValue && (
                                    <div className="text-xs text-muted-foreground">
                                      True: {trueValue} | Error: {error.toFixed(2)}%
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        
                        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                          <div className="text-sm font-medium">
                            Log-Likelihood: {estimatedParams.logLikelihood.toFixed(4)}
                          </div>
                        </div>
                      </div>

                      {/* Data Visualization and Convergence */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Scatter Plot */}
                        <div className="p-4 rounded-lg border-2 border-muted">
                          <h4 className="font-semibold mb-4">Data Distribution</h4>
                          <div className="h-48 relative border border-muted-foreground/20 rounded">
                            {currentData.length > 0 && (() => {
                              const values = currentData.map(d => d.y);
                              const minVal = Math.min(...values);
                              const maxVal = Math.max(...values);
                              const range = maxVal - minVal;
                              const padding = range * 0.1;
                              const plotMin = minVal - padding;
                              const plotMax = maxVal + padding;
                              const plotRange = plotMax - plotMin;
                              
                              return (
                                <div className="w-full h-full p-2">
                                  {currentData.slice(0, 200).map((point, index) => {
                                    const x = (index / Math.min(200, currentData.length)) * 100;
                                    const y = 100 - ((point.y - plotMin) / plotRange) * 100;
                                    
                                    // Color coding for multi-class
                                    let color = '#3b82f6'; // default blue
                                    if (testCases[selectedTestCase].isMultiClass && testCases[selectedTestCase].classLabels) {
                                      const classLabel = testCases[selectedTestCase].classLabels![index];
                                      if (classLabel === 0) color = '#3b82f6'; // blue
                                      else if (classLabel === 1) color = '#10b981'; // green
                                      else if (classLabel === 2) color = '#8b5cf6'; // purple
                                    }
                                    
                                    return (
                                      <div
                                        key={index}
                                        className="absolute w-2 h-2 rounded-full opacity-70"
                                        style={{
                                          left: `${x}%`,
                                          top: `${y}%`,
                                          backgroundColor: color,
                                          transform: 'translate(-50%, -50%)'
                                        }}
                                        title={`Value: ${point.y.toFixed(3)}${testCases[selectedTestCase].isMultiClass ? `, Class: ${testCases[selectedTestCase].classLabels?.[index]}` : ''}`}
                                      />
                                    );
                                  })}
                                  
                                  {/* Y-axis labels */}
                                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                                    <span>{plotMax.toFixed(1)}</span>
                                    <span>{((plotMax + plotMin) / 2).toFixed(1)}</span>
                                    <span>{plotMin.toFixed(1)}</span>
                                  </div>
                                  
                                  {/* X-axis label */}
                                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                                    Sample Index
                                  </div>
                                  
                                  {/* Legend for multi-class */}
                                  {testCases[selectedTestCase].isMultiClass && (
                                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                                      {Array.from({ length: testCases[selectedTestCase].nClasses || 0 }, (_, classId) => {
                                        const colors = ['#3b82f6', '#10b981', '#8b5cf6'];
                                        return (
                                          <div key={classId} className="flex items-center gap-1 text-xs">
                                            <div 
                                              className="w-2 h-2 rounded-full" 
                                              style={{ backgroundColor: colors[classId] }}
                                            />
                                            <span>Class {classId}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                          <div className="text-xs text-muted-foreground mt-2 text-center">
                            {testCases[selectedTestCase].isMultiClass ? 'Multi-class Data Points' : 'Sample Data Points'}
                          </div>
                        </div>

                        {/* Likelihood Convergence */}
                        {likelihoodHistory.length > 0 && (
                          <div className="p-4 rounded-lg border-2 border-muted">
                            <h4 className="font-semibold mb-4">Likelihood Convergence</h4>
                            <div className="h-48 flex items-end justify-center space-x-1">
                              {likelihoodHistory.map((likelihood, index) => {
                                const minLikelihood = Math.min(...likelihoodHistory);
                                const maxLikelihood = Math.max(...likelihoodHistory);
                                const range = maxLikelihood - minLikelihood;
                                
                                // Calculate height percentage, with fallback for identical values
                                let heightPercent;
                                if (range === 0) {
                                  // If all values are the same, show equal height bars
                                  heightPercent = 50 + (index * 10); // Gradual increase
                                } else {
                                  heightPercent = Math.max(10, ((likelihood - minLikelihood) / range) * 80 + 10);
                                }
                                
                                return (
                                  <div
                                    key={index}
                                    className="bg-primary rounded-t"
                                    style={{
                                      height: `${heightPercent}%`,
                                      width: '12px'
                                    }}
                                    title={`Iteration ${index + 1}: ${likelihood.toFixed(4)}`}
                                  />
                                );
                              })}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2 text-center">
                              Iteration Progress (Log-Likelihood values)
                            </div>
                          </div>
                        )}
                      </div>
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
                  Code examples for implementing Maximum Likelihood Estimation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Basic MLE Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import numpy as np
import matplotlib.pyplot as plt
from scipy import stats
from scipy.optimize import minimize

class MaximumLikelihoodEstimator:
    def __init__(self):
        self.data = None
        self.estimated_params = None
    
    def normal_likelihood(self, params, data):
        """Calculate negative log-likelihood for normal distribution"""
        mu, sigma = params
        if sigma <= 0:
            return np.inf
        return -np.sum(stats.norm.logpdf(data, mu, sigma))
    
    def poisson_likelihood(self, params, data):
        """Calculate negative log-likelihood for Poisson distribution"""
        lambda_param = params[0]
        if lambda_param <= 0:
            return np.inf
        return -np.sum(stats.poisson.logpmf(data, lambda_param))
    
    def exponential_likelihood(self, params, data):
        """Calculate negative log-likelihood for exponential distribution"""
        lambda_param = params[0]
        if lambda_param <= 0:
            return np.inf
        return -np.sum(stats.expon.logpdf(data, scale=1/lambda_param))
    
    def estimate_normal(self, data):
        """Estimate parameters for normal distribution using MLE"""
        # Initial guess
        initial_params = [np.mean(data), np.std(data)]
        
        # Minimize negative log-likelihood
        result = minimize(
            self.normal_likelihood, 
            initial_params, 
            args=(data,),
            method='BFGS'
        )
        
        return result.x, result.fun
    
    def estimate_poisson(self, data):
        """Estimate parameters for Poisson distribution using MLE"""
        # Initial guess
        initial_params = [np.mean(data)]
        
        # Minimize negative log-likelihood
        result = minimize(
            self.poisson_likelihood, 
            initial_params, 
            args=(data,),
            method='BFGS'
        )
        
        return result.x, result.fun`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">2. MLE for Multiple Distributions</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`    def estimate_exponential(self, data):
        """Estimate parameters for exponential distribution using MLE"""
        # Initial guess
        initial_params = [1/np.mean(data)]
        
        # Minimize negative log-likelihood
        result = minimize(
            self.exponential_likelihood, 
            initial_params, 
            args=(data,),
            method='BFGS'
        )
        
        return result.x, result.fun
    
    def fit(self, data, distribution='normal'):
        """Fit MLE to data for specified distribution"""
        self.data = data
        
        if distribution == 'normal':
            params, neg_log_likelihood = self.estimate_normal(data)
            self.estimated_params = {
                'mean': params[0],
                'std': params[1],
                'neg_log_likelihood': neg_log_likelihood
            }
        elif distribution == 'poisson':
            params, neg_log_likelihood = self.estimate_poisson(data)
            self.estimated_params = {
                'lambda': params[0],
                'neg_log_likelihood': neg_log_likelihood
            }
        elif distribution == 'exponential':
            params, neg_log_likelihood = self.estimate_exponential(data)
            self.estimated_params = {
                'lambda': params[0],
                'neg_log_likelihood': neg_log_likelihood
            }
        
        return self.estimated_params

# Example usage
np.random.seed(42)

# Generate sample data
true_mu, true_sigma = 5, 2
sample_data = np.random.normal(true_mu, true_sigma, 1000)

# Fit MLE
mle = MaximumLikelihoodEstimator()
params = mle.fit(sample_data, 'normal')

print("MLE Estimates:")
print(f"Mean: {params['mean']:.4f} (True: {true_mu})")
print(f"Std: {params['std']:.4f} (True: {true_sigma})")
print(f"Negative Log-Likelihood: {params['neg_log_likelihood']:.4f}")`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">3. Visualization and Comparison</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`def plot_mle_results(data, estimated_params, distribution='normal'):
    """Plot MLE results and compare with true distribution"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))
    
    # Histogram of data
    ax1.hist(data, bins=30, density=True, alpha=0.7, color='skyblue', label='Data')
    
    if distribution == 'normal':
        # Plot estimated and true distributions
        x = np.linspace(data.min(), data.max(), 100)
        estimated_pdf = stats.norm.pdf(x, estimated_params['mean'], estimated_params['std'])
        true_pdf = stats.norm.pdf(x, true_mu, true_sigma)
        
        ax1.plot(x, estimated_pdf, 'r-', linewidth=2, label='MLE Estimate')
        ax1.plot(x, true_pdf, 'g--', linewidth=2, label='True Distribution')
        ax1.set_title('Normal Distribution MLE')
        ax1.legend()
    
    # Log-likelihood convergence (simulated)
    iterations = np.arange(1, 21)
    log_likelihoods = -estimated_params['neg_log_likelihood'] + np.random.normal(0, 0.1, 20)
    log_likelihoods = np.cumsum(np.diff(log_likelihoods, prepend=log_likelihoods[0]))
    
    ax2.plot(iterations, log_likelihoods, 'b-', linewidth=2)
    ax2.set_xlabel('Iteration')
    ax2.set_ylabel('Log-Likelihood')
    ax2.set_title('Log-Likelihood Convergence')
    ax2.grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.show()

# Plot results
plot_mle_results(sample_data, params, 'normal')`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">4. Multiple Test Cases</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`def test_multiple_distributions():
    """Test MLE on multiple probability distributions"""
    test_cases = {
        'normal': {
            'data': np.random.normal(5, 2, 1000),
            'true_params': {'mean': 5, 'std': 2}
        },
        'poisson': {
            'data': np.random.poisson(3, 1000),
            'true_params': {'lambda': 3}
        },
        'exponential': {
            'data': np.random.exponential(2, 1000),
            'true_params': {'lambda': 0.5}
        }
    }
    
    results = {}
    mle = MaximumLikelihoodEstimator()
    
    for dist_name, case in test_cases.items():
        print(f"\\nTesting {dist_name} distribution...")
        
        # Fit MLE
        params = mle.fit(case['data'], dist_name)
        
        # Calculate accuracy
        accuracy = {}
        for param_name, true_value in case['true_params'].items():
            if param_name in params:
                estimated_value = params[param_name]
                error = abs(estimated_value - true_value) / true_value * 100
                accuracy[param_name] = 100 - error
                print(f"{param_name}: {estimated_value:.4f} (True: {true_value}) - Error: {error:.2f}%")
        
        results[dist_name] = accuracy
    
    return results

# Run tests
test_results = test_multiple_distributions()

# Summary
print("\\n" + "="*50)
print("SUMMARY OF MLE ACCURACY")
print("="*50)
for dist_name, accuracy in test_results.items():
    print(f"\\n{dist_name.upper()}:")
    for param, acc in accuracy.items():
        print(f"  {param}: {acc:.1f}% accuracy")`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">5. Multi-Class MLE Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`class MultiClassMLE:
    def __init__(self, n_classes):
        self.n_classes = n_classes
        self.class_parameters = {}
    
    def estimate_gmm_parameters(self, data, n_components=2):
        """Estimate Gaussian Mixture Model parameters using EM algorithm"""
        from sklearn.mixture import GaussianMixture
        
        gmm = GaussianMixture(n_components=n_components, random_state=42)
        gmm.fit(data.reshape(-1, 1))
        
        return {
            'means': gmm.means_.flatten(),
            'covariances': gmm.covariances_.flatten(),
            'weights': gmm.weights_,
            'converged': gmm.converged_,
            'n_iter': gmm.n_iter_
        }
    
    def estimate_multiclass_normal(self, data, labels):
        """Estimate parameters for multi-class normal distributions"""
        class_params = {}
        
        for class_id in range(self.n_classes):
            class_data = data[labels == class_id]
            if len(class_data) > 0:
                mean = np.mean(class_data)
                variance = np.var(class_data, ddof=1)  # Sample variance
                class_params[class_id] = {
                    'mean': mean,
                    'variance': variance,
                    'count': len(class_data),
                    'prior': len(class_data) / len(data)
                }
        
        return class_params
    
    def calculate_multiclass_likelihood(self, data, labels, params):
        """Calculate likelihood for multi-class normal model"""
        likelihood = 1.0
        
        for i, (x, label) in enumerate(zip(data, labels)):
            if label in params:
                mean = params[label]['mean']
                variance = params[label]['variance']
                prob = (1 / np.sqrt(2 * np.pi * variance)) * \\
                       np.exp(-0.5 * (x - mean)**2 / variance)
                likelihood *= prob
        
        return likelihood

# Example usage for Gaussian Mixture Model
np.random.seed(42)

# Generate GMM data
n_samples = 1000
true_means = [2, 8]
true_vars = [1, 1.5]
true_weights = [0.6, 0.4]

# Generate samples
samples = []
for _ in range(n_samples):
    if np.random.random() < true_weights[0]:
        samples.append(np.random.normal(true_means[0], np.sqrt(true_vars[0])))
    else:
        samples.append(np.random.normal(true_means[1], np.sqrt(true_vars[1])))

samples = np.array(samples)

# Fit GMM
multiclass_mle = MultiClassMLE(n_classes=2)
gmm_params = multiclass_mle.estimate_gmm_parameters(samples, n_components=2)

print("Gaussian Mixture Model MLE Results:")
print(f"Component 1 - Mean: {gmm_params['means'][0]:.4f} (True: {true_means[0]})")
print(f"Component 1 - Variance: {gmm_params['covariances'][0]:.4f} (True: {true_vars[0]})")
print(f"Component 1 - Weight: {gmm_params['weights'][0]:.4f} (True: {true_weights[0]})")
print(f"Component 2 - Mean: {gmm_params['means'][1]:.4f} (True: {true_means[1]})")
print(f"Component 2 - Variance: {gmm_params['covariances'][1]:.4f} (True: {true_vars[1]})")
print(f"Component 2 - Weight: {gmm_params['weights'][1]:.4f} (True: {true_weights[1]})")
print(f"Converged: {gmm_params['converged']}, Iterations: {gmm_params['n_iter']}")`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">6. Multi-Class Normal Classification</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Example for multi-class normal classification
np.random.seed(42)

# Generate multi-class data
n_samples_per_class = 300
class_means = [1, 5, 9]
class_vars = [0.5, 1, 0.8]

data = []
labels = []

for class_id, (mean, var) in enumerate(zip(class_means, class_vars)):
    class_data = np.random.normal(mean, np.sqrt(var), n_samples_per_class)
    data.extend(class_data)
    labels.extend([class_id] * n_samples_per_class)

data = np.array(data)
labels = np.array(labels)

# Estimate multi-class parameters
multiclass_mle = MultiClassMLE(n_classes=3)
class_params = multiclass_mle.estimate_multiclass_normal(data, labels)

print("Multi-Class Normal MLE Results:")
for class_id, params in class_params.items():
    print(f"Class {class_id}:")
    print(f"  Mean: {params['mean']:.4f} (True: {class_means[class_id]})")
    print(f"  Variance: {params['variance']:.4f} (True: {class_vars[class_id]})")
    print(f"  Prior: {params['prior']:.4f}")
    print(f"  Count: {params['count']}")

# Calculate overall likelihood
likelihood = multiclass_mle.calculate_multiclass_likelihood(data, labels, class_params)
log_likelihood = np.log(likelihood)

print(f"\\nOverall Log-Likelihood: {log_likelihood:.4f}")

# Classification function
def classify_multiclass_normal(x, class_params):
    """Classify a sample using multi-class normal MLE"""
    posteriors = {}
    
    for class_id, params in class_params.items():
        mean = params['mean']
        variance = params['variance']
        prior = params['prior']
        
        # Calculate likelihood
        likelihood = (1 / np.sqrt(2 * np.pi * variance)) * \\
                    np.exp(-0.5 * (x - mean)**2 / variance)
        
        # Calculate posterior (likelihood * prior)
        posteriors[class_id] = likelihood * prior
    
    # Return class with highest posterior
    return max(posteriors, key=posteriors.get)

# Test classification
test_samples = [0.5, 4.8, 9.2]
for x in test_samples:
    predicted_class = classify_multiclass_normal(x, class_params)
    print(f"Sample {x:.1f} -> Class {predicted_class}")`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">7. Advanced MLE with Confidence Intervals</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`from scipy.stats import chi2

def mle_with_confidence_intervals(data, distribution='normal', confidence=0.95):
    """Calculate MLE with confidence intervals using likelihood ratio test"""
    mle = MaximumLikelihoodEstimator()
    params = mle.fit(data, distribution)
    
    # Calculate confidence intervals
    alpha = 1 - confidence
    chi2_critical = chi2.ppf(1 - alpha, df=1)  # 1 parameter at a time
    
    confidence_intervals = {}
    
    if distribution == 'normal':
        n = len(data)
        mean_ci = 1.96 * params['std'] / np.sqrt(n)  # Approximate 95% CI
        confidence_intervals['mean'] = (
            params['mean'] - mean_ci, 
            params['mean'] + mean_ci
        )
        confidence_intervals['std'] = (
            params['std'] * np.sqrt((n-1) / chi2.ppf(alpha/2, n-1)),
            params['std'] * np.sqrt((n-1) / chi2.ppf(1-alpha/2, n-1))
        )
    
    elif distribution == 'poisson':
        n = len(data)
        lambda_ci = 1.96 * np.sqrt(params['lambda'] / n)
        confidence_intervals['lambda'] = (
            params['lambda'] - lambda_ci,
            params['lambda'] + lambda_ci
        )
    
    return params, confidence_intervals

# Example with confidence intervals
sample_data = np.random.normal(5, 2, 1000)
params, ci = mle_with_confidence_intervals(sample_data, 'normal', 0.95)

print("MLE with 95% Confidence Intervals:")
print(f"Mean: {params['mean']:.4f} [{ci['mean'][0]:.4f}, {ci['mean'][1]:.4f}]")
print(f"Std: {params['std']:.4f} [{ci['std'][0]:.4f}, {ci['std'][1]:.4f}]")`}</pre>
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

export default Experiment6;
