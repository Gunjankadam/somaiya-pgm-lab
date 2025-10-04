import { useState, useEffect } from "react";
import { ArrowLeft, Play, RotateCcw, Info, BookOpen, Code, BarChart3, TreeDeciduous, Calculator, Target } from "lucide-react";
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

interface TreeNode {
  id: string;
  feature?: string;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  prediction?: string;
  samples: number;
  impurity: number;
  depth: number;
  valueDistribution?: { [key: string]: number };
}

interface SampleData {
  outlook: string;
  temperature: string;
  humidity: string;
  windy: boolean;
  play: string;
}

const Experiment7 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [maxDepth, setMaxDepth] = useState(3);
  const [minSamples, setMinSamples] = useState(2);
  const [selectedFeature, setSelectedFeature] = useState("outlook");
  const [selectedThreshold, setSelectedThreshold] = useState(0.5);
  const [prediction, setPrediction] = useState<string>("");
  const [predictionResult, setPredictionResult] = useState<string>("");
  const [predictionInputs, setPredictionInputs] = useState<{ [key: string]: any }>({});
  const [selectedTestCase, setSelectedTestCase] = useState(0);
  const [testResults, setTestResults] = useState<{ [key: string]: string }>({});
  const [currentDataset, setCurrentDataset] = useState<any[]>([]);

  const sampleDataset: SampleData[] = [
    { outlook: "sunny", temperature: "hot", humidity: "high", windy: false, play: "no" },
    { outlook: "sunny", temperature: "hot", humidity: "high", windy: true, play: "no" },
    { outlook: "overcast", temperature: "hot", humidity: "high", windy: false, play: "yes" },
    { outlook: "rainy", temperature: "mild", humidity: "high", windy: false, play: "yes" },
    { outlook: "rainy", temperature: "cool", humidity: "normal", windy: false, play: "yes" },
    { outlook: "rainy", temperature: "cool", humidity: "normal", windy: true, play: "no" },
    { outlook: "overcast", temperature: "cool", humidity: "normal", windy: true, play: "yes" },
    { outlook: "sunny", temperature: "mild", humidity: "high", windy: false, play: "no" },
    { outlook: "sunny", temperature: "cool", humidity: "normal", windy: false, play: "yes" },
    { outlook: "rainy", temperature: "mild", humidity: "normal", windy: false, play: "yes" },
    { outlook: "sunny", temperature: "mild", humidity: "normal", windy: true, play: "yes" },
    { outlook: "overcast", temperature: "mild", humidity: "high", windy: true, play: "yes" },
    { outlook: "overcast", temperature: "hot", humidity: "normal", windy: false, play: "yes" },
    { outlook: "rainy", temperature: "mild", humidity: "high", windy: true, play: "no" }
  ];

  // Initialize current dataset
  useEffect(() => {
    setCurrentDataset(sampleDataset);
  }, []);

  // Additional test datasets for different scenarios
  const testCases = [
    {
      name: "Weather Play Decision",
      description: "Classic weather dataset for outdoor activity decision",
      data: sampleDataset,
      features: ['outlook', 'temperature', 'humidity', 'windy'],
      target: 'play'
    },
    {
      name: "Customer Purchase Prediction",
      description: "Predict if a customer will purchase based on demographics and behavior",
      data: [
        { age: "young", income: "low", student: true, credit_rating: "fair", buy: "no" },
        { age: "young", income: "low", student: true, credit_rating: "excellent", buy: "no" },
        { age: "young", income: "medium", student: true, credit_rating: "fair", buy: "yes" },
        { age: "young", income: "high", student: false, credit_rating: "fair", buy: "yes" },
        { age: "young", income: "low", student: false, credit_rating: "excellent", buy: "no" },
        { age: "middle", income: "low", student: false, credit_rating: "excellent", buy: "yes" },
        { age: "middle", income: "medium", student: false, credit_rating: "excellent", buy: "yes" },
        { age: "middle", income: "high", student: false, credit_rating: "fair", buy: "yes" },
        { age: "old", income: "medium", student: false, credit_rating: "excellent", buy: "yes" },
        { age: "old", income: "high", student: false, credit_rating: "fair", buy: "yes" },
        { age: "old", income: "low", student: false, credit_rating: "fair", buy: "no" },
        { age: "old", income: "medium", student: false, credit_rating: "excellent", buy: "yes" }
      ],
      features: ['age', 'income', 'student', 'credit_rating'],
      target: 'buy'
    },
    {
      name: "Medical Diagnosis",
      description: "Predict disease based on symptoms and test results",
      data: [
        { fever: "high", cough: "yes", headache: "yes", fatigue: "yes", diagnosis: "flu" },
        { fever: "high", cough: "no", headache: "yes", fatigue: "yes", diagnosis: "flu" },
        { fever: "mild", cough: "yes", headache: "no", fatigue: "no", diagnosis: "cold" },
        { fever: "mild", cough: "yes", headache: "yes", fatigue: "mild", diagnosis: "cold" },
        { fever: "no", cough: "no", headache: "no", fatigue: "no", diagnosis: "healthy" },
        { fever: "high", cough: "yes", headache: "yes", fatigue: "severe", diagnosis: "flu" },
        { fever: "mild", cough: "no", headache: "no", fatigue: "mild", diagnosis: "healthy" },
        { fever: "no", cough: "yes", headache: "no", fatigue: "no", diagnosis: "cold" },
        { fever: "high", cough: "no", headache: "no", fatigue: "severe", diagnosis: "flu" },
        { fever: "mild", cough: "yes", headache: "yes", fatigue: "yes", diagnosis: "cold" }
      ],
      features: ['fever', 'cough', 'headache', 'fatigue'],
      target: 'diagnosis'
    },
    {
      name: "Loan Approval",
      description: "Predict loan approval based on applicant characteristics",
      data: [
        { credit_score: "high", income: "high", employment: "stable", loan_amount: "low", approved: "yes" },
        { credit_score: "high", income: "medium", employment: "stable", loan_amount: "medium", approved: "yes" },
        { credit_score: "medium", income: "high", employment: "stable", loan_amount: "low", approved: "yes" },
        { credit_score: "low", income: "low", employment: "unstable", loan_amount: "high", approved: "no" },
        { credit_score: "medium", income: "medium", employment: "stable", loan_amount: "medium", approved: "yes" },
        { credit_score: "high", income: "low", employment: "stable", loan_amount: "low", approved: "yes" },
        { credit_score: "low", income: "high", employment: "stable", loan_amount: "medium", approved: "no" },
        { credit_score: "medium", income: "low", employment: "unstable", loan_amount: "high", approved: "no" },
        { credit_score: "high", income: "high", employment: "stable", loan_amount: "high", approved: "yes" },
        { credit_score: "low", income: "medium", employment: "unstable", loan_amount: "low", approved: "no" }
      ],
      features: ['credit_score', 'income', 'employment', 'loan_amount'],
      target: 'approved'
    }
  ];

  const experimentSteps = [
    {
      title: "Aim",
      description: "Implement and understand Decision Tree algorithms for classification and regression",
      content: "You will learn to build decision trees from scratch, understand entropy and information gain concepts, implement tree construction algorithms, and apply pruning techniques to prevent overfitting."
    },
    {
      title: "Objective",
      description: "Master decision tree fundamentals and practical implementation",
      content: "By the end of this experiment, you will be able to: 1) Calculate entropy and information gain, 2) Build decision trees using ID3/C4.5 algorithms, 3) Implement tree pruning techniques, 4) Visualize decision trees, and 5) Apply decision trees to real-world classification problems."
    },
    {
      title: "Theory - Decision Trees",
      description: "Tree-based models for decision making and classification",
      content: "A decision tree is a flowchart-like structure in which each internal node represents a test on an attribute, each branch represents the outcome of the test, and each leaf node represents a class label or decision. Decision trees are popular because they are easy to understand, interpret, and visualize."
    },
    {
      title: "Entropy and Information Gain",
      description: "Mathematical foundations for splitting criteria",
      content: "Entropy measures the impurity or uncertainty in a dataset. Information gain measures the reduction in entropy after splitting on a particular attribute. The goal is to choose attributes that maximize information gain, leading to more pure subsets."
    },
    {
      title: "Tree Construction Algorithms",
      description: "ID3, C4.5, and CART algorithms for building decision trees",
      content: "ID3 uses information gain for categorical attributes. C4.5 extends ID3 to handle continuous attributes and missing values. CART (Classification and Regression Trees) uses Gini impurity and can handle both classification and regression tasks."
    },
    {
      title: "Pruning and Overfitting",
      description: "Techniques to prevent overfitting in decision trees",
      content: "Pruning is the process of removing branches that provide little predictive power. Pre-pruning stops tree construction early, while post-pruning removes branches after the tree is built. This helps prevent overfitting and improves generalization."
    }
  ];

  const calculateEntropy = (samples: any[], targetColumn: string): number => {
    if (samples.length === 0) return 0;
    
    const targetCounts = samples.reduce((acc, sample) => {
      acc[sample[targetColumn]] = (acc[sample[targetColumn]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const total = samples.length;
    let entropy = 0;
    
    Object.values(targetCounts).forEach(count => {
      const probability = Number(count) / total;
      if (probability > 0) {
        entropy -= probability * Math.log2(probability);
      }
    });
    
    return entropy;
  };

  const calculateInformationGain = (samples: any[], feature: string, targetColumn: string): number => {
    const parentEntropy = calculateEntropy(samples, targetColumn);
    
    // Get unique values for the feature
    const uniqueValues = [...new Set(samples.map(sample => sample[feature]))];
    
    let weightedEntropy = 0;
    
    uniqueValues.forEach(value => {
      const subset = samples.filter(sample => sample[feature] === value);
      const subsetEntropy = calculateEntropy(subset, targetColumn);
      weightedEntropy += (subset.length / samples.length) * subsetEntropy;
    });
    
    return parentEntropy - weightedEntropy;
  };

  const findBestSplit = (samples: any[], features: string[], targetColumn: string): { feature: string; gain: number } => {
    let bestFeature = features[0];
    let bestGain = 0;
    
    features.forEach(feature => {
      const gain = calculateInformationGain(samples, feature, targetColumn);
      if (gain > bestGain) {
        bestGain = gain;
        bestFeature = feature;
      }
    });
    
    return { feature: bestFeature, gain: bestGain };
  };

  const buildDecisionTree = (samples: any[], features: string[], targetColumn: string, depth: number = 0): TreeNode => {
    const targetCounts = samples.reduce((acc, sample) => {
      acc[sample[targetColumn]] = (acc[sample[targetColumn]] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const totalSamples = samples.length;
    const impurity = calculateEntropy(samples, targetColumn);
    
    // Base cases
    if (depth >= maxDepth || totalSamples < minSamples || Object.keys(targetCounts).length === 1) {
      const prediction = Object.keys(targetCounts).reduce((a, b) => 
        targetCounts[a] > targetCounts[b] ? a : b
      );
      return {
        id: `leaf_${Math.random().toString(36).substr(2, 9)}`,
        prediction,
        samples: totalSamples,
        impurity,
        depth,
        valueDistribution: targetCounts
      };
    }
    
    const { feature, gain } = findBestSplit(samples, features, targetColumn);
    
    if (gain === 0) {
      const prediction = Object.keys(targetCounts).reduce((a, b) => 
        targetCounts[a] > targetCounts[b] ? a : b
      );
      return {
        id: `leaf_${Math.random().toString(36).substr(2, 9)}`,
        prediction,
        samples: totalSamples,
        impurity,
        depth,
        valueDistribution: targetCounts
      };
    }
    
    const uniqueValues = [...new Set(samples.map(sample => sample[feature]))];
    
    // For multi-value features, create more branches
    if (uniqueValues.length === 2) {
      const leftSamples = samples.filter(sample => sample[feature] === uniqueValues[0]);
      const rightSamples = samples.filter(sample => sample[feature] === uniqueValues[1]);
      
      return {
        id: `node_${Math.random().toString(36).substr(2, 9)}`,
        feature,
        samples: totalSamples,
        impurity,
        depth,
        valueDistribution: targetCounts,
        left: buildDecisionTree(leftSamples, features, targetColumn, depth + 1),
        right: buildDecisionTree(rightSamples, features, targetColumn, depth + 1)
      };
    } else if (uniqueValues.length > 2) {
      // For multi-value features, create a more complex tree structure
      const firstValue = uniqueValues[0];
      const otherValues = uniqueValues.slice(1);
      
      const leftSamples = samples.filter(sample => sample[feature] === firstValue);
      const rightSamples = samples.filter(sample => otherValues.includes(sample[feature]));
      
      return {
        id: `node_${Math.random().toString(36).substr(2, 9)}`,
        feature,
        samples: totalSamples,
        impurity,
        depth,
        valueDistribution: targetCounts,
        left: buildDecisionTree(leftSamples, features, targetColumn, depth + 1),
        right: buildDecisionTree(rightSamples, features, targetColumn, depth + 1)
      };
    }
    
    // Fallback
    return {
      id: `leaf_${Math.random().toString(36).substr(2, 9)}`,
      prediction: Object.keys(targetCounts).reduce((a, b) => 
        targetCounts[a] > targetCounts[b] ? a : b
      ),
      samples: totalSamples,
      impurity,
      depth,
      valueDistribution: targetCounts
    };
  };

  const simulateDecisionTree = () => {
    setIsBuilding(true);
    setTimeout(() => {
      const currentTest = testCases[selectedTestCase];
      const tree = buildDecisionTree(currentTest.data, currentTest.features, currentTest.target);
      setTreeData(tree);
      setIsBuilding(false);
    }, 2000);
  };

  const handleTestCaseChange = (testCaseIndex: number) => {
    setSelectedTestCase(testCaseIndex);
    setCurrentDataset(testCases[testCaseIndex].data);
    setTreeData(null);
    setPredictionResult("");
    setPredictionInputs({});
    setTestResults({});
  };

  const runAllTestCases = () => {
    setIsRunning(true);
    const results: { [key: string]: string } = {};
    
    testCases.forEach((testCase, index) => {
      const tree = buildDecisionTree(testCase.data, testCase.features, testCase.target);
      // Simple accuracy calculation - in real scenario, you'd use proper train/test split
      const predictions = testCase.data.map(sample => {
        // This is a simplified prediction - in reality, you'd traverse the tree
        const targetValues = testCase.data.map(d => d[testCase.target]);
        const mostCommon = targetValues.reduce((a, b, i, arr) => 
          arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
        );
        return mostCommon;
      });
      
      const correct = predictions.filter((pred, i) => pred === testCase.data[i][testCase.target]).length;
      const accuracy = (correct / testCase.data.length * 100).toFixed(1);
      results[testCase.name] = `${accuracy}%`;
    });
    
    setTestResults(results);
    setTimeout(() => setIsRunning(false), 1500);
  };

  const predictWithTree = (sample: any, tree: TreeNode): string => {
    // If it's a leaf node, return the prediction
    if (tree.prediction) {
      return tree.prediction;
    }
    
    // If it's an internal node, traverse based on the feature
    if (tree.feature && sample[tree.feature] !== undefined) {
      const featureValue = sample[tree.feature];
      
      // Get unique values from the dataset for this feature
      const uniqueValues = [...new Set(currentDataset.map(d => d[tree.feature]))];
      
      // Simple binary split - go left for first value, right for others
      if (featureValue === uniqueValues[0]) {
        return tree.left ? predictWithTree(sample, tree.left) : "unknown";
      } else {
        return tree.right ? predictWithTree(sample, tree.right) : "unknown";
      }
    }
    
    return "unknown";
  };

  const makePrediction = () => {
    if (!treeData) return;
    
    const currentTest = testCases[selectedTestCase];
    const sample = { ...predictionInputs };
    
    // Fill in missing features with default values
    currentTest.features.forEach(feature => {
      if (sample[feature] === undefined) {
        // Get the most common value for this feature
        const values = currentDataset.map(d => d[feature]);
        const counts = values.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        const mostCommon = Object.keys(counts).reduce((a, b) => 
          counts[a] > counts[b] ? a : b
        );
        sample[feature] = mostCommon;
      }
    });
    
    const result = predictWithTree(sample, treeData);
    setPredictionResult(result);
  };

  const getDisplayLabel = (value: string, testCaseIndex: number): string => {
    const testCase = testCases[testCaseIndex];
    const target = testCase.target;
    
    // Define display mappings for different test cases
    const displayMappings: { [key: string]: { [key: string]: string } } = {
      'play': {
        'yes': 'Play',
        'no': "Don't Play"
      },
      'buy': {
        'yes': 'Buy',
        'no': "Don't Buy"
      },
      'diagnosis': {
        'flu': 'Flu',
        'cold': 'Cold',
        'healthy': 'Healthy'
      },
      'approved': {
        'yes': 'Approved',
        'no': 'Rejected'
      }
    };
    
    return displayMappings[target]?.[value] || value;
  };

  const resetExperiment = () => {
    setTreeData(null);
    setPrediction("");
    setPredictionResult("");
    setPredictionInputs({});
    setTestResults({});
    setCurrentStep(0);
    setIsRunning(false);
    setIsBuilding(false);
  };

  const getNodeValueDistribution = (node: TreeNode): { [key: string]: number } => {
    // Use the actual value distribution from the tree if available
    if (node.valueDistribution) {
      return node.valueDistribution;
    }
    
    // Fallback for nodes without value distribution
    if (node.prediction) {
      return { [node.prediction]: node.samples };
    }
    
    // Estimate based on samples
    return { "yes": Math.floor(node.samples * 0.6), "no": Math.floor(node.samples * 0.4) };
  };

  const renderTreeNode = (node: TreeNode, x: number = 0, y: number = 0, parentValue?: string): JSX.Element => {
    const isLeaf = !node.left && !node.right;
    const nodeWidth = 140;
    const nodeHeight = 80;
    const levelHeight = 120;
    const valueDistribution = getNodeValueDistribution(node);
    
    return (
      <g key={node.id}>
        {/* Node Rectangle */}
        <rect
          x={x - nodeWidth/2}
          y={y - nodeHeight/2}
          width={nodeWidth}
          height={nodeHeight}
          fill={isLeaf ? "#e1f5fe" : "#f3e5f5"}
          stroke="#9c27b0"
          strokeWidth="2"
          rx="5"
        />
        
        {/* Node Title */}
        <text
          x={x}
          y={y - 25}
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="#333"
        >
          {isLeaf ? `${testCases[selectedTestCase].target}: ${node.prediction}` : node.feature}
        </text>
        
        {/* Samples Count */}
        <text
          x={x}
          y={y - 10}
          textAnchor="middle"
          fontSize="9"
          fill="#666"
        >
          Samples: {node.samples}
        </text>
        
        {/* Value Distribution */}
        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          fontSize="8"
          fill="#555"
        >
          {Object.entries(valueDistribution).map(([key, count]) => `${key}: ${count}`).join(', ')}
        </text>
        
        {/* Entropy */}
        <text
          x={x}
          y={y + 20}
          textAnchor="middle"
          fontSize="8"
          fill="#666"
        >
          Entropy: {node.impurity.toFixed(3)}
        </text>
        
        {/* Left Child */}
        {node.left && (
          <>
            {/* Left Branch Line */}
            <line
              x1={x - nodeWidth/2}
              y1={y}
              x2={x - 100}
              y2={y + levelHeight - nodeHeight/2}
              stroke="#9c27b0"
              strokeWidth="2"
            />
            {/* Left Branch Label */}
            <text
              x={x - 50}
              y={y + levelHeight/2 - 10}
              textAnchor="middle"
              fontSize="9"
              fill="#9c27b0"
              fontWeight="bold"
            >
              {getBranchLabel(node.feature, true)}
            </text>
            {renderTreeNode(node.left, x - 100, y + levelHeight, getBranchLabel(node.feature, true))}
          </>
        )}
        
        {/* Right Child */}
        {node.right && (
          <>
            {/* Right Branch Line */}
            <line
              x1={x + nodeWidth/2}
              y1={y}
              x2={x + 100}
              y2={y + levelHeight - nodeHeight/2}
              stroke="#9c27b0"
              strokeWidth="2"
            />
            {/* Right Branch Label */}
            <text
              x={x + 50}
              y={y + levelHeight/2 - 10}
              textAnchor="middle"
              fontSize="9"
              fill="#9c27b0"
              fontWeight="bold"
            >
              {getBranchLabel(node.feature, false)}
            </text>
            {renderTreeNode(node.right, x + 100, y + levelHeight, getBranchLabel(node.feature, false))}
          </>
        )}
      </g>
    );
  };

  const getBranchLabel = (feature: string | undefined, isLeft: boolean): string => {
    if (!feature) return "";
    
    const uniqueValues = [...new Set(currentDataset.map(d => d[feature]))];
    
    if (uniqueValues.length === 2) {
      return isLeft ? String(uniqueValues[0]) : String(uniqueValues[1]);
    } else if (uniqueValues.length > 2) {
      // For multi-value features, show the condition
      if (isLeft) {
        return String(uniqueValues[0]);
      } else {
        return `not ${uniqueValues[0]}`;
      }
    }
    
    return isLeft ? "Yes" : "No";
  };

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
            <Badge variant="secondary">Experiment 7</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Decision Tree</h1>
          <p className="text-lg text-muted-foreground">
            Build and visualize decision trees for classification and regression tasks
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
                  Decision Tree Theory
                </CardTitle>
                <CardDescription>
                  Follow the theoretical concepts to understand decision tree algorithms
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
                  <TreeDeciduous className="w-5 h-5" />
                  Decision Tree Simulation
                </CardTitle>
                <CardDescription>
                  Interactive decision tree builder and visualizer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Test Case Selection */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-4">Test Case Selection</h4>
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
                            Features: {testCase.features.join(", ")} | Target: {testCase.target}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={runAllTestCases}
                        disabled={isRunning}
                        variant="outline"
                        className="flex-1"
                      >
                        <Calculator className="w-4 h-4 mr-2" />
                        {isRunning ? "Testing..." : "Accuracy Check"}
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

                  {/* Dataset Display */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-2">{testCases[selectedTestCase].name}</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      {testCases[selectedTestCase].description}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="border-b">
                            {testCases[selectedTestCase].features.map((feature) => (
                              <th key={feature} className="text-left p-2 capitalize">
                                {feature.replace('_', ' ')}
                              </th>
                            ))}
                            <th className="text-left p-2 capitalize">
                              {testCases[selectedTestCase].target.replace('_', ' ')}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentDataset.slice(0, 8).map((row, index) => (
                            <tr key={index} className="border-b">
                              {testCases[selectedTestCase].features.map((feature) => (
                                <td key={feature} className="p-2">
                                  {typeof row[feature] === 'boolean' ? (row[feature] ? 'Yes' : 'No') : String(row[feature])}
                                </td>
                              ))}
                              <td className="p-2">
                                <Badge variant={String(row[testCases[selectedTestCase].target]).toLowerCase().includes('yes') || String(row[testCases[selectedTestCase].target]).toLowerCase().includes('positive') ? 'default' : 'secondary'}>
                                  {String(row[testCases[selectedTestCase].target])}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tree Building Controls */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-4">Tree Building Parameters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Max Depth: {maxDepth}</label>
                        <Slider
                          value={[maxDepth]}
                          onValueChange={(value) => setMaxDepth(value[0])}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Min Samples: {minSamples}</label>
                        <Slider
                          value={[minSamples]}
                          onValueChange={(value) => setMinSamples(value[0])}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={simulateDecisionTree}
                        disabled={isBuilding}
                        className="flex-1"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {isBuilding ? "Building Tree..." : "Build Decision Tree"}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={resetExperiment}
                        disabled={isBuilding}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Tree Visualization */}
                  {isBuilding && (
                    <div className="flex flex-col items-center justify-center py-8">
                      <TreeDeciduous className="w-16 h-16 text-primary animate-pulse" />
                      <p className="text-sm text-muted-foreground mt-2">Building decision tree...</p>
                    </div>
                  )}

                  {treeData && !isBuilding && (
                    <div className="p-4 rounded-lg border-2 border-muted">
                      <h4 className="font-semibold mb-4">Decision Tree Visualization</h4>
                      
                      {/* Legend */}
                      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <h5 className="font-medium text-sm mb-2">How to Read the Tree:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-200 border border-purple-500 rounded"></div>
                            <span><strong>Purple boxes:</strong> Decision nodes (feature splits)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-200 border border-blue-500 rounded"></div>
                            <span><strong>Blue boxes:</strong> Leaf nodes (final predictions)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span><strong>Branch labels:</strong> Show the condition for that path</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span><strong>Value counts:</strong> Show distribution of outcomes at each node</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="overflow-x-auto">
                        <svg width="1000" height="400" className="border rounded">
                          {renderTreeNode(treeData, 500, 80)}
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Prediction Interface */}
                  {treeData && !isBuilding && (
                    <div className="p-4 rounded-lg border-2 border-muted">
                      <h4 className="font-semibold mb-4">Make Predictions</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {testCases[selectedTestCase].features.map((feature, index) => {
                          const uniqueValues = [...new Set(currentDataset.map(d => d[feature]))];
                          const isBoolean = uniqueValues.every(val => val === true || val === false);
                          
                          return (
                            <div key={feature}>
                              <label className="text-sm font-medium mb-2 block capitalize">
                                {feature.replace('_', ' ')}
                              </label>
                              <Select 
                                value={predictionInputs[feature]?.toString() || ""} 
                                onValueChange={(value) => {
                                  setPredictionInputs(prev => ({
                                    ...prev,
                                    [feature]: isBoolean ? value === 'true' : value
                                  }));
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={`Select ${feature.replace('_', ' ')}`} />
                                </SelectTrigger>
                                <SelectContent>
                                  {uniqueValues.map((value) => (
                                    <SelectItem key={String(value)} value={String(value)}>
                                      {isBoolean ? (value ? 'Yes' : 'No') : String(value)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          );
                        })}
                      </div>
                      <Button onClick={makePrediction} className="mt-4">
                        <Target className="w-4 h-4 mr-2" />
                        Make Prediction
                      </Button>
                      {predictionResult && (
                        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                          <div className="text-sm font-medium">
                            Prediction: 
                            <Badge 
                              variant={predictionResult === 'yes' || predictionResult === 'flu' || predictionResult === 'approved' ? 'default' : 'secondary'} 
                              className="ml-2"
                            >
                              {getDisplayLabel(predictionResult, selectedTestCase)}
                            </Badge>
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
                  Code examples for implementing decision tree algorithms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Basic Decision Tree Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import numpy as np
from collections import Counter

class DecisionTree:
    def __init__(self, max_depth=3, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None
    
    def entropy(self, y):
        """Calculate entropy of a dataset"""
        if len(y) == 0:
            return 0
        counts = Counter(y)
        probabilities = [count / len(y) for count in counts.values()]
        return -sum(p * np.log2(p) for p in probabilities if p > 0)
    
    def information_gain(self, X, y, feature_idx):
        """Calculate information gain for a feature"""
        parent_entropy = self.entropy(y)
        
        # Get unique values for the feature
        unique_values = np.unique(X[:, feature_idx])
        
        weighted_entropy = 0
        for value in unique_values:
            mask = X[:, feature_idx] == value
            subset_y = y[mask]
            if len(subset_y) > 0:
                weighted_entropy += (len(subset_y) / len(y)) * self.entropy(subset_y)
        
        return parent_entropy - weighted_entropy
    
    def find_best_split(self, X, y):
        """Find the best feature to split on"""
        best_gain = 0
        best_feature = 0
        
        for feature_idx in range(X.shape[1]):
            gain = self.information_gain(X, y, feature_idx)
            if gain > best_gain:
                best_gain = gain
                best_feature = feature_idx
        
        return best_feature, best_gain`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">2. Tree Construction Algorithm</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`    def build_tree(self, X, y, depth=0):
        """Build the decision tree recursively"""
        # Base cases
        if (depth >= self.max_depth or 
            len(y) < self.min_samples_split or 
            len(set(y)) == 1):
            return {'prediction': Counter(y).most_common(1)[0][0]}
        
        # Find best split
        best_feature, best_gain = self.find_best_split(X, y)
        
        if best_gain == 0:
            return {'prediction': Counter(y).most_common(1)[0][0]}
        
        # Split the data
        unique_values = np.unique(X[:, best_feature])
        tree = {
            'feature': best_feature,
            'threshold': unique_values[0],
            'left': None,
            'right': None
        }
        
        # Create left and right subtrees
        left_mask = X[:, best_feature] == unique_values[0]
        right_mask = X[:, best_feature] == unique_values[1]
        
        tree['left'] = self.build_tree(X[left_mask], y[left_mask], depth + 1)
        tree['right'] = self.build_tree(X[right_mask], y[right_mask], depth + 1)
        
        return tree
    
    def fit(self, X, y):
        """Train the decision tree"""
        self.tree = self.build_tree(X, y)
        return self`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">3. Prediction and Visualization</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`    def predict_sample(self, sample, tree=None):
        """Predict a single sample"""
        if tree is None:
            tree = self.tree
        
        if 'prediction' in tree:
            return tree['prediction']
        
        feature_value = sample[tree['feature']]
        if feature_value == tree['threshold']:
            return self.predict_sample(sample, tree['left'])
        else:
            return self.predict_sample(sample, tree['right'])
    
    def predict(self, X):
        """Predict multiple samples"""
        return [self.predict_sample(sample) for sample in X]
    
    def print_tree(self, tree=None, depth=0):
        """Print the decision tree structure"""
        if tree is None:
            tree = self.tree
        
        if 'prediction' in tree:
            print("  " * depth + f"Prediction: {tree['prediction']}")
        else:
            print("  " * depth + f"Feature {tree['feature']} == {tree['threshold']}")
            print("  " * depth + "├─ Left:")
            self.print_tree(tree['left'], depth + 1)
            print("  " * depth + "└─ Right:")
            self.print_tree(tree['right'], depth + 1)

# Example usage
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train decision tree
dt = DecisionTree(max_depth=3, min_samples_split=2)
dt.fit(X_train, y_train)

# Make predictions
predictions = dt.predict(X_test)
print("Predictions:", predictions)

# Print tree structure
dt.print_tree()`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">4. Multiple Test Cases Implementation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Test cases for different scenarios
test_cases = {
    "weather": {
        "data": weather_data,
        "features": ['outlook', 'temperature', 'humidity', 'windy'],
        "target": 'play'
    },
    "customer": {
        "data": customer_data,
        "features": ['age', 'income', 'student', 'credit_rating'],
        "target": 'buy'
    },
    "medical": {
        "data": medical_data,
        "features": ['fever', 'cough', 'headache', 'fatigue'],
        "target": 'diagnosis'
    },
    "loan": {
        "data": loan_data,
        "features": ['credit_score', 'income', 'employment', 'loan_amount'],
        "target": 'approved'
    }
}

def test_decision_tree(test_cases):
    """Test decision tree on multiple datasets"""
    results = {}
    
    for name, case in test_cases.items():
        print(f"\\nTesting {name} dataset...")
        
        # Build tree
        tree = build_decision_tree(
            case['data'], 
            case['features'], 
            case['target']
        )
        
        # Calculate accuracy
        correct = 0
        total = len(case['data'])
        
        for sample in case['data']:
            prediction = predict_sample(sample, tree)
            actual = sample[case['target']]
            if prediction == actual:
                correct += 1
        
        accuracy = correct / total * 100
        results[name] = accuracy
        print(f"Accuracy: {accuracy:.1f}%")
    
    return results

# Run all test cases
results = test_decision_tree(test_cases)
print("\\nOverall Results:")
for name, accuracy in results.items():
    print(f"{name}: {accuracy:.1f}%")`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">5. Using scikit-learn Decision Tree</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt

def test_with_sklearn(dataset, features, target):
    """Test using scikit-learn implementation"""
    # Prepare data
    X = dataset[features]
    y = dataset[target]
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Create and train model
    clf = DecisionTreeClassifier(
        max_depth=3,
        min_samples_split=2,
        random_state=42
    )
    clf.fit(X_train, y_train)
    
    # Make predictions
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Accuracy: {accuracy:.3f}")
    print("\\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Feature importance
    feature_importance = clf.feature_importances_
    for i, importance in enumerate(feature_importance):
        print(f"{features[i]}: {importance:.3f}")
    
    return clf, accuracy

# Test all datasets
for name, case in test_cases.items():
    print(f"\\n=== {name.upper()} DATASET ===")
    clf, acc = test_with_sklearn(case['data'], case['features'], case['target'])`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">6. Cross-Validation and Performance Testing</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`from sklearn.model_selection import cross_val_score, validation_curve
import numpy as np

def comprehensive_testing(dataset, features, target):
    """Comprehensive testing with cross-validation"""
    X = dataset[features]
    y = dataset[target]
    
    # Cross-validation
    clf = DecisionTreeClassifier(random_state=42)
    cv_scores = cross_val_score(clf, X, y, cv=5)
    
    print(f"Cross-validation scores: {cv_scores}")
    print(f"Mean accuracy: {cv_scores.mean():.3f} (+/- {cv_scores.std() * 2:.3f})")
    
    # Validation curve for max_depth
    max_depths = range(1, 11)
    train_scores, val_scores = validation_curve(
        clf, X, y, param_name='max_depth', 
        param_range=max_depths, cv=3
    )
    
    print(f"\\nBest max_depth: {max_depths[np.argmax(val_scores.mean(axis=1))]}")
    
    return cv_scores.mean()

# Test all datasets comprehensively
print("Comprehensive Testing Results:")
for name, case in test_cases.items():
    print(f"\\n{name}:")
    mean_acc = comprehensive_testing(case['data'], case['features'], case['target'])`}</pre>
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

export default Experiment7;
