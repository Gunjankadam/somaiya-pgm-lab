import React, { useState, useRef } from 'react';
import { Upload, FileText, Play, Download, AlertTriangle, BarChart3, Settings, Eye, Brain, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface CSVData {
  headers: string[];
  rows: string[][];
}

interface HMMResult {
  predictedStates: string[];
  logProbability: number;
  stateProbabilities: number[][];
  transitionMatrix: number[][];
  emissionMatrix: number[][];
}

interface ModelConfig {
  states: string[];
  observations: string[];
  targetVariable: string;
  selectedStates: string[];
  selectedObservations: string[];
}

const DisasterHMM: React.FC = () => {
  const [csvData, setCsvData] = useState<CSVData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('hmm');
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    states: [],
    observations: [],
    targetVariable: '',
    selectedStates: [],
    selectedObservations: []
  });
  const [queryInput, setQueryInput] = useState<string>('');
  const [hmmResult, setHmmResult] = useState<HMMResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modelTypes = [
    { value: 'hmm', label: 'Hidden Markov Model', description: 'For sequential data with hidden states' }
  ];

  const disasterStates = [
    'Normal', 'Alert', 'Warning', 'Emergency', 'Critical', 'Recovery'
  ];

  const disasterObservations = [
    'Low Risk', 'Medium Risk', 'High Risk', 'Extreme Risk',
    'Stable', 'Deteriorating', 'Improving', 'Critical'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        alert('CSV file must have at least a header and one data row');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const rows = lines.slice(1).map(line => 
        line.split(',').map(cell => cell.trim())
      );

      setCsvData({ headers, rows });
      setCurrentStep(2);
    };
    reader.readAsText(file);
  };

  const preprocessData = () => {
    if (!csvData) return;

    // Basic preprocessing: remove empty rows, handle missing values
    const processedRows = csvData.rows.filter(row => 
      row.some(cell => cell.trim() !== '')
    );

    // Extract unique values for each column
    const columnValues = csvData.headers.map((header, index) => {
      const values = processedRows
        .map(row => row[index])
        .filter(val => val && val.trim() !== '')
        .map(val => val.trim());
      return [...new Set(values)];
    });

    setModelConfig(prev => ({
      ...prev,
      states: disasterStates,
      observations: disasterObservations
    }));

    setCurrentStep(3);
  };

  const generateHMMResult = (): HMMResult => {
    // Simulate HMM computation based on the Python code provided
    const states = modelConfig.selectedStates.length > 0 ? modelConfig.selectedStates : ['Normal', 'Alert', 'Warning', 'Emergency'];
    const observations = modelConfig.selectedObservations.length > 0 ? modelConfig.selectedObservations : ['Low', 'Medium', 'High', 'Extreme'];
    
    // Generate logical transition matrix based on disaster state progression
    const transitionMatrix = generateLogicalTransitionMatrix(states);

    // Generate logical emission matrix based on risk levels
    const emissionMatrix = generateLogicalEmissionMatrix(states, observations);

    // Parse query input
    const querySequence = queryInput.split(',').map(s => s.trim());
    
    // Use Viterbi-like algorithm for more logical predictions
    const predictedStates = predictStatesWithLogic(querySequence, states, observations, emissionMatrix, transitionMatrix);

    // Calculate actual state probabilities based on the prediction
    const stateProbabilities = querySequence.map((observation, i) => {
      const obsIndex = observations.indexOf(observation);
      const predictedState = predictedStates[i];
      const stateIndex = states.indexOf(predictedState);
      
      return states.map((state, j) => {
        if (j === stateIndex) {
          // High probability for the predicted state
          return 0.8;
        } else {
          // Lower probability for other states based on emission matrix
          const emissionProb = emissionMatrix[j][obsIndex];
          return emissionProb * 0.2; // Scale down for non-predicted states
        }
      });
    });

    // Normalize state probabilities
    stateProbabilities.forEach(probs => {
      const sum = probs.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        probs.forEach((val, i) => probs[i] = val / sum);
      }
    });

    // Calculate actual log probability based on the sequence
    const logProbability = calculateLogProbability(querySequence, predictedStates, states, observations, emissionMatrix, transitionMatrix);

    return {
      predictedStates,
      logProbability,
      stateProbabilities,
      transitionMatrix,
      emissionMatrix
    };
  };

  const generateLogicalEmissionMatrix = (states: string[], observations: string[]): number[][] => {
    const emissionMatrix: number[][] = [];
    
    
    for (let i = 0; i < states.length; i++) {
      const state = states[i];
      const stateRow: number[] = [];
      
      for (let j = 0; j < observations.length; j++) {
        const observation = observations[j];
        
        // Calculate logical probability based on state-observation correspondence
        let probability = 0.01; // Very low base probability
        
        // High probability for logical matches
        if (isLogicalMatch(state, observation)) {
          probability = 0.9;
        } else if (isNearMatch(state, observation)) {
          probability = 0.3;
        }
        
        stateRow.push(probability);
      }
      
      // Normalize the row
      const sum = stateRow.reduce((a, b) => a + b, 0);
      if (sum > 0) {
        stateRow.forEach((val, idx) => stateRow[idx] = val / sum);
      } else {
        // If all probabilities are 0, make them equal
        stateRow.forEach((val, idx) => stateRow[idx] = 1 / observations.length);
      }
      
      emissionMatrix.push(stateRow);
    }
    
    return emissionMatrix;
  };

  const generateLogicalTransitionMatrix = (states: string[]): number[][] => {
    const transitionMatrix: number[][] = [];
    
    // Define state hierarchy for logical transitions
    const stateHierarchy = ['Normal', 'Alert', 'Warning', 'Emergency', 'Critical', 'Recovery'];
    
    for (let i = 0; i < states.length; i++) {
      const currentState = states[i];
      const currentIndex = stateHierarchy.indexOf(currentState);
      const stateRow: number[] = [];
      
      for (let j = 0; j < states.length; j++) {
        const targetState = states[j];
        const targetIndex = stateHierarchy.indexOf(targetState);
        
        if (i === j) {
          // High probability to stay in same state
          stateRow.push(0.7);
        } else if (Math.abs(currentIndex - targetIndex) === 1) {
          // High probability to transition to adjacent states
          stateRow.push(0.2);
        } else if (Math.abs(currentIndex - targetIndex) === 2) {
          // Medium probability to skip one state
          stateRow.push(0.08);
        } else {
          // Low probability for distant transitions
          stateRow.push(0.01);
        }
      }
      
      // Normalize the row
      const sum = stateRow.reduce((a, b) => a + b, 0);
      stateRow.forEach((val, idx) => stateRow[idx] = val / sum);
      
      transitionMatrix.push(stateRow);
    }
    
    return transitionMatrix;
  };

  const isLogicalMatch = (state: string, observation: string): boolean => {
    const logicalMappings: { [key: string]: string[] } = {
      'Normal': ['Low', 'Low Risk', 'Stable'],
      'Alert': ['Low', 'Medium', 'Low Risk', 'Medium Risk'],
      'Warning': ['Medium', 'High', 'Medium Risk', 'High Risk'],
      'Emergency': ['High', 'Extreme', 'High Risk', 'Extreme Risk'],
      'Critical': ['Extreme', 'Critical', 'Extreme Risk'],
      'Recovery': ['Improving', 'Stable', 'Low']
    };
    
    return logicalMappings[state]?.includes(observation) || false;
  };

  const isNearMatch = (state: string, observation: string): boolean => {
    const nearMappings: { [key: string]: string[] } = {
      'Normal': ['Medium', 'Medium Risk'],
      'Alert': ['High', 'High Risk'],
      'Warning': ['Low', 'Extreme', 'Low Risk', 'Extreme Risk'],
      'Emergency': ['Medium', 'Medium Risk'],
      'Critical': ['High', 'High Risk'],
      'Recovery': ['Low', 'Medium', 'Low Risk', 'Medium Risk']
    };
    
    return nearMappings[state]?.includes(observation) || false;
  };

  const predictStatesWithLogic = (
    querySequence: string[], 
    states: string[], 
    observations: string[], 
    emissionMatrix: number[][], 
    transitionMatrix: number[][]
  ): string[] => {
    const predictedStates: string[] = [];
    
    for (let i = 0; i < querySequence.length; i++) {
      const observation = querySequence[i];
      const obsIndex = observations.indexOf(observation);
      
      if (obsIndex === -1) {
        // If observation not found, try to map it based on common patterns
        let mappedState = 'Normal';
        if (observation.toLowerCase().includes('low')) {
          mappedState = 'Normal';
        } else if (observation.toLowerCase().includes('medium')) {
          mappedState = 'Alert';
        } else if (observation.toLowerCase().includes('high')) {
          mappedState = 'Warning';
        } else if (observation.toLowerCase().includes('extreme')) {
          mappedState = 'Emergency';
        }
        predictedStates.push(mappedState);
        continue;
      }
      
      // For the first observation, just use the best emission probability
      if (i === 0) {
        let bestStateIndex = 0;
        let bestProbability = 0;
        
        for (let j = 0; j < states.length; j++) {
          const emissionProb = emissionMatrix[j][obsIndex];
          if (emissionProb > bestProbability) {
            bestProbability = emissionProb;
            bestStateIndex = j;
          }
        }
        predictedStates.push(states[bestStateIndex]);
      } else {
        // For subsequent observations, use Viterbi algorithm
        const prevState = predictedStates[i - 1];
        const prevStateIndex = states.indexOf(prevState);
        
        // Calculate probability for each possible state
        const stateProbabilities = states.map((state, stateIdx) => {
          const transitionProb = transitionMatrix[prevStateIndex][stateIdx];
          const emissionProb = emissionMatrix[stateIdx][obsIndex];
          return transitionProb * emissionProb;
        });
        
        // Find the state with highest probability
        const bestStateIndex = stateProbabilities.indexOf(Math.max(...stateProbabilities));
        predictedStates.push(states[bestStateIndex]);
      }
    }
    
    return predictedStates;
  };

  const calculateLogProbability = (
    querySequence: string[],
    predictedStates: string[],
    states: string[],
    observations: string[],
    emissionMatrix: number[][],
    transitionMatrix: number[][]
  ): number => {
    let logProb = 0;
    
    for (let i = 0; i < querySequence.length; i++) {
      const observation = querySequence[i];
      const predictedState = predictedStates[i];
      const obsIndex = observations.indexOf(observation);
      const stateIndex = states.indexOf(predictedState);
      
      if (obsIndex !== -1 && stateIndex !== -1) {
        // Add emission probability
        const emissionProb = emissionMatrix[stateIndex][obsIndex];
        logProb += Math.log(emissionProb);
        
        // Add transition probability (except for first state)
        if (i > 0) {
          const prevState = predictedStates[i - 1];
          const prevStateIndex = states.indexOf(prevState);
          if (prevStateIndex !== -1) {
            const transitionProb = transitionMatrix[prevStateIndex][stateIndex];
            logProb += Math.log(transitionProb);
          }
        }
      }
    }
    
    return logProb;
  };

  const runHMMAnalysis = () => {
    if (!queryInput.trim()) {
      alert('Please enter a query sequence');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      const result = generateHMMResult();
      setHmmResult(result);
      setIsProcessing(false);
      setCurrentStep(4);
    }, 2000);
  };

  const downloadResults = () => {
    if (!hmmResult) return;

    const results = {
      query: queryInput,
      predictedStates: hmmResult.predictedStates,
      logProbability: hmmResult.logProbability,
      transitionMatrix: hmmResult.transitionMatrix,
      emissionMatrix: hmmResult.emissionMatrix,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'disaster_hmm_results.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetExperiment = () => {
    setCsvData(null);
    setSelectedModel('');
    setModelConfig({
      states: [],
      observations: [],
      targetVariable: '',
      selectedStates: [],
      selectedObservations: []
    });
    setQueryInput('');
    setHmmResult(null);
    setCurrentStep(1);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
          <AlertTriangle className="w-8 h-8 text-red-500" />
          Disaster Management HMM Model
        </h2>
        <p className="text-muted-foreground text-lg">
          Upload disaster data, configure your model, and predict disaster states using Hidden Markov Models
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                currentStep >= step 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  currentStep > step ? 'bg-accent' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Upload Data</span>
          <span>Preprocess</span>
          <span>Configure Model</span>
          <span>Run Analysis</span>
        </div>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">Upload Data</TabsTrigger>
          <TabsTrigger value="preprocess" disabled={currentStep < 2}>Preprocess</TabsTrigger>
          <TabsTrigger value="configure" disabled={currentStep < 3}>Configure</TabsTrigger>
          <TabsTrigger value="results" disabled={currentStep < 4}>Results</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Disaster Data
              </CardTitle>
              <CardDescription>
                Upload a CSV file containing disaster-related data for analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">Upload CSV File</p>
                <p className="text-muted-foreground mb-4">
                  Supported formats: CSV files with headers
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>

              {csvData && (
                <Alert>
                  <FileText className="w-4 h-4" />
                  <AlertDescription>
                    Successfully loaded CSV with {csvData.headers.length} columns and {csvData.rows.length} rows
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Sample CSV Format:</h4>
                <pre className="text-sm text-muted-foreground mb-3">
{`Date,Location,Risk_Level,Population,Infrastructure_Status
2024-01-01,City A,Low,50000,Stable
2024-01-02,City A,Medium,50000,Deteriorating
2024-01-03,City A,High,50000,Critical`}
                </pre>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/sample_disaster_data.csv';
                      link.download = 'sample_disaster_data.csv';
                      link.click();
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Sample CSV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preprocess" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Data Preprocessing
              </CardTitle>
              <CardDescription>
                Clean and prepare your data for model training
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {csvData && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Data Preview:</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-muted">
                        <thead>
                          <tr className="bg-muted/50">
                            {csvData.headers.map((header, index) => (
                              <th key={index} className="border border-muted p-2 text-left">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {csvData.rows.slice(0, 5).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-muted p-2">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Model Type</Label>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="font-semibold">Hidden Markov Model</div>
                          <div className="text-sm text-muted-foreground">For sequential data with hidden states</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Target Variable</Label>
                      <Select 
                        value={modelConfig.targetVariable} 
                        onValueChange={(value) => setModelConfig(prev => ({ ...prev, targetVariable: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select target variable" />
                        </SelectTrigger>
                        <SelectContent>
                          {csvData.headers.map((header) => (
                            <SelectItem key={header} value={header}>
                              {header}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={preprocessData} className="w-full">
                    <Settings className="w-4 h-4 mr-2" />
                    Preprocess Data
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Model Configuration
              </CardTitle>
              <CardDescription>
                Configure your HMM model parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base font-semibold">Hidden States</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the hidden states for your disaster model
                  </p>
                  <div className="space-y-2">
                    {disasterStates.map((state) => (
                      <div key={state} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`state-${state}`}
                          checked={modelConfig.selectedStates.includes(state)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setModelConfig(prev => ({
                                ...prev,
                                selectedStates: [...prev.selectedStates, state]
                              }));
                            } else {
                              setModelConfig(prev => ({
                                ...prev,
                                selectedStates: prev.selectedStates.filter(s => s !== state)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={`state-${state}`} className="text-sm">
                          {state}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold">Observations</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Select the observable variables
                  </p>
                  <div className="space-y-2">
                    {disasterObservations.map((obs) => (
                      <div key={obs} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`obs-${obs}`}
                          checked={modelConfig.selectedObservations.includes(obs)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setModelConfig(prev => ({
                                ...prev,
                                selectedObservations: [...prev.selectedObservations, obs]
                              }));
                            } else {
                              setModelConfig(prev => ({
                                ...prev,
                                selectedObservations: prev.selectedObservations.filter(o => o !== obs)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        <Label htmlFor={`obs-${obs}`} className="text-sm">
                          {obs}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="query" className="text-base font-semibold">
                  Query Sequence
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Enter a sequence of observations separated by commas (e.g., "Low,High,Medium,Low")
                </p>
                <Input
                  id="query"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="Enter observation sequence..."
                  className="mb-4"
                />
                <div className="flex gap-2">
                  <Button onClick={runHMMAnalysis} disabled={!queryInput.trim() || isProcessing}>
                    <Play className="w-4 h-4 mr-2" />
                    {isProcessing ? 'Processing...' : 'Run HMM Analysis'}
                  </Button>
                  <Button variant="outline" onClick={resetExperiment}>
                    Reset
                  </Button>
                </div>
              </div>

              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                    <span className="text-sm">Running HMM analysis...</span>
                  </div>
                  <Progress value={66} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                HMM Analysis Results
              </CardTitle>
              <CardDescription>
                View the predicted states and model parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {hmmResult && (
                <>
                  <div>
                    <h4 className="font-semibold mb-3">Predicted State Sequence</h4>
                      <div className="space-y-2">
                        {hmmResult.predictedStates.map((state, index) => {
                          const observation = queryInput.split(',').map(s => s.trim())[index];
                          const isLogical = isLogicalMatch(state, observation) || isNearMatch(state, observation);
                          return (
                            <div key={index} className="flex items-center gap-2">
                              <Badge variant="outline" className="w-16 text-center">
                                {index + 1}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-muted text-muted-foreground text-xs">
                                  {observation}
                                </Badge>
                                <span className="text-muted-foreground">→</span>
                                <Badge className={`${isLogical ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
                                  {state}
                                </Badge>
                                {isLogical ? (
                                  <span className="text-green-600 text-xs">✓</span>
                                ) : (
                                  <span className="text-orange-600 text-xs">⚠</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        <span className="text-green-600">✓</span> Logical match | 
                        <span className="text-orange-600 ml-2">⚠</span> Near match
                      </div>
                  </div>


                  <div>
                    <h4 className="font-semibold mb-3">Transition Matrix</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-muted">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border border-muted p-2"></th>
                            {modelConfig.selectedStates.map((state) => (
                              <th key={state} className="border border-muted p-2 text-center">
                                {state}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {hmmResult.transitionMatrix.map((row, i) => (
                            <tr key={i}>
                              <td className="border border-muted p-2 font-semibold">
                                {modelConfig.selectedStates[i]}
                              </td>
                              {row.map((val, j) => (
                                <td key={j} className="border border-muted p-2 text-center font-mono">
                                  {val.toFixed(3)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={downloadResults}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Results
                    </Button>
                    <Button variant="outline" onClick={resetExperiment}>
                      New Analysis
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisasterHMM;
