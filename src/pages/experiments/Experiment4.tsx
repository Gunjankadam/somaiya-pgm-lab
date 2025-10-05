import { useMemo, useState } from "react";
import { ArrowLeft, Info, BookOpen, BarChart3, Code, Play, RotateCcw, Plus, Minus, Pause, StepForward, StepBack, Shuffle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

type Matrix = number[][];

const clamp01 = (v: number) => (isFinite(v) ? Math.max(0, Math.min(1, v)) : 0);

const normalizeRow = (row: number[]): number[] => {
  const sum = row.reduce((a, b) => a + b, 0);
  if (sum === 0) {
    const equal = 1 / row.length;
    return row.map(() => equal);
  }
  return row.map((x) => x / sum);
};

const multiplyDistribution = (dist: number[], matrix: Matrix): number[] => {
  const n = matrix.length;
  const result = new Array(n).fill(0);
  for (let j = 0; j < n; j++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += dist[i] * matrix[i][j];
    result[j] = s;
  }
  return result;
};

const l1Distance = (a: number[], b: number[]) => a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0);

const Experiment4 = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("theory");
  const [currentStep, setCurrentStep] = useState(0);
  const [numStates, setNumStates] = useState(3);
  const [stateNames, setStateNames] = useState<string[]>(["S1", "S2", "S3"]);
  const [transition, setTransition] = useState<Matrix>([
    [0.6, 0.3, 0.1],
    [0.2, 0.6, 0.2],
    [0.3, 0.3, 0.4],
  ]);
  const [initial, setInitial] = useState<number[]>([1, 0, 0]);
  const [steps, setSteps] = useState(10);
  const [history, setHistory] = useState<number[][]>([]);
  const [trials, setTrials] = useState(10000);
  const [mcResult, setMcResult] = useState<number[] | null>(null);
  const [isMcRunning, setIsMcRunning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentT, setCurrentT] = useState(0);

  const resizeStates = (next: number) => {
    const n = Math.max(2, Math.min(6, next));
    setNumStates(n);
    setStateNames((prev) => {
      const copy = prev.slice(0, n);
      while (copy.length < n) copy.push(`S${copy.length + 1}`);
      return copy;
    });
    setTransition((prev) => {
      const out: Matrix = [];
      for (let i = 0; i < n; i++) {
        const row = prev[i] ? prev[i].slice(0, n) : [];
        while (row.length < n) row.push(0);
        out.push(normalizeRow(row.map(clamp01)));
      }
      return out;
    });
    setInitial((prev) => {
      const arr = prev.slice(0, n);
      while (arr.length < n) arr.push(0);
      const norm = normalizeRow(arr);
      return norm;
    });
  };

  const normalizedTransition = useMemo(() => transition.map(normalizeRow), [transition]);
  const normalizedInitial = useMemo(() => normalizeRow(initial), [initial]);

  const runSimulation = () => {
    const traj: number[][] = [normalizedInitial];
    let curr = normalizedInitial;
    for (let t = 0; t < Math.max(1, Math.min(200, steps)); t++) {
      curr = multiplyDistribution(curr, normalizedTransition);
      traj.push(curr);
    }
    setHistory(traj);
    setCurrentT(0);
    setIsPlaying(false);
  };

  const reset = () => {
    setHistory([]);
    setMcResult(null);
    setIsPlaying(false);
    setCurrentT(0);
  };

  const estimateStationary = () => {
    const maxIters = 500;
    const tol = 1e-8;
    let curr = normalizedInitial;
    for (let k = 0; k < maxIters; k++) {
      const next = multiplyDistribution(curr, normalizedTransition);
      if (l1Distance(curr, next) < tol) return next;
      curr = next;
    }
    return curr;
  };

  const piStar = useMemo(estimateStationary, [normalizedInitial, normalizedTransition]);

  const setProb = (i: number, j: number, val: string) => {
    const num = clamp01(parseFloat(val));
    setTransition((prev) => {
      const copy = prev.map((r) => r.slice());
      if (!copy[i]) copy[i] = new Array(numStates).fill(0);
      copy[i][j] = isNaN(num) ? 0 : num;
      return copy;
    });
  };

  const setInitialAt = (i: number, val: string) => {
    const num = clamp01(parseFloat(val));
    setInitial((prev) => {
      const copy = prev.slice();
      copy[i] = isNaN(num) ? 0 : num;
      return copy;
    });
  };

  const randomizeMatrix = () => {
    setTransition(() => {
      const out: Matrix = [];
      for (let i = 0; i < numStates; i++) {
        // generate positive randoms then normalize
        const rowRaw: number[] = [];
        for (let j = 0; j < numStates; j++) rowRaw.push(Math.random());
        const norm = normalizeRow(rowRaw);
        // round to 4 decimals while preserving sum to 1 by adjusting last cell
        const rounded = norm.map((v) => Math.round(v * 10000) / 10000);
        const sum = rounded.reduce((a, b) => a + b, 0);
        const diff = Math.round((1 - sum) * 10000) / 10000;
        const lastIndex = rounded.length - 1;
        rounded[lastIndex] = clamp01(Math.round((rounded[lastIndex] + diff) * 10000) / 10000);
        out.push(rounded);
      }
      return out;
    });
  };

  const sampleCategorical = (probs: number[]): number => {
    const r = Math.random();
    let acc = 0;
    for (let i = 0; i < probs.length; i++) {
      acc += probs[i];
      if (r <= acc) return i;
    }
    return probs.length - 1;
  };

  const runMonteCarlo = () => {
    setIsMcRunning(true);
    setTimeout(() => {
      const nTrials = Math.max(1, Math.min(1_000_000, trials | 0));
      const counts = new Array(numStates).fill(0);
      for (let t = 0; t < nTrials; t++) {
        // sample start state from initial distribution
        let s = sampleCategorical(normalizedInitial);
        // simulate for given steps
        for (let k = 0; k < Math.max(1, Math.min(200, steps)); k++) {
          const row = normalizedTransition[s] ?? [];
          s = sampleCategorical(row);
        }
        counts[s] += 1;
      }
      const probs = counts.map((c) => c / nTrials);
      setMcResult(probs);
      setIsMcRunning(false);
    }, 0);
  };

  const experimentSteps = [
    {
      title: "Why Markov Chains?",
      description: "Applications across maths, economics, game theory, comms, genetics, finance.",
      content:
        "Markov Chains have prolific usage in mathematics and are widely employed in economics, game theory, communication theory, genetics and finance. They arise in Bayesian statistics and information-theoretic contexts. Real-world uses include vehicle cruise control, airport queues, currency exchange rates, and PageRank for web search.",
    },
    {
      title: "Markov Chain",
      description: "Random process with the Markov (memoryless) property.",
      content:
        "A Markov chain is a random process where the future depends only on the present state, not the past. It has discrete state space or discrete time index and is defined as a collection of random variables.",
    },
    {
      title: "Model",
      description: "Transitions and transition probabilities via a matrix.",
      content:
        "The system is represented by a probabilistic automaton. Transitions between states have associated probabilities captured in a transition matrix. For an N-state chain, this is an N×N matrix where entry (i,j) gives P(X_{t+1}=j | X_t=i). Rows represent current state; columns represent next state.",
    },
  ];

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
            <Badge variant="secondary">Experiment 4</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-2">Markov Chain Model</h1>
          <p className="text-lg text-muted-foreground">Study stochastic processes with the memoryless property</p>
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
            <Card className="w-full mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Markov Chain Theory
                </CardTitle>
                <CardDescription>Overview and key definitions</CardDescription>
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
            <Card className="w-full max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Transition Matrix Simulator
                </CardTitle>
                <CardDescription>Edit the transition matrix, set initial distribution, and simulate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium">States:</span>
                    <Button variant="outline" size="sm" onClick={() => resizeStates(numStates - 1)} disabled={numStates <= 2}>
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">{numStates}</span>
                    <Button variant="outline" size="sm" onClick={() => resizeStates(numStates + 1)} disabled={numStates >= 6}>
                      <Plus className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-sm">Steps:</span>
                      <Input
                        type="number"
                        value={steps}
                        onChange={(e) => setSteps(Math.max(1, Math.min(200, parseInt(e.target.value) || 1)))}
                        className="w-20"
                      />
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Button variant="outline" className="flex items-center gap-2" onClick={randomizeMatrix}>
                        <Shuffle className="w-4 h-4" />
                        Randomize Matrix
                      </Button>
                      <Button className="flex items-center gap-2" onClick={runSimulation}>
                        <Play className="w-4 h-4" />
                        Run
                      </Button>
                      <Button variant="outline" onClick={reset}>
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* State names */}
                  <div className="overflow-x-auto">
                    <div className="text-sm font-medium mb-2">State Names</div>
                    <div className="flex gap-2">
                      {Array.from({ length: numStates }).map((_, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-xs text-muted-foreground">State {i + 1}</div>
                          <Input
                            value={stateNames[i] ?? `S${i + 1}`}
                            onChange={(e) =>
                              setStateNames((prev) => {
                                const copy = prev.slice();
                                copy[i] = e.target.value;
                                return copy;
                              })
                            }
                            className="w-28 text-sm focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transition matrix */}
                  <div className="overflow-x-auto">
                    <div className="text-sm font-medium mb-2">Transition Matrix (rows sum to 1)</div>
                    <table className="text-xs border w-full max-w-full">
                      <thead>
                        <tr>
                          <th className="p-2 border bg-muted/40 sticky left-0 z-10"></th>
                          {Array.from({ length: numStates }).map((_, j) => (
                            <th key={j} className="p-2 border text-center bg-muted/40">{stateNames[j] ?? `S${j + 1}`}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: numStates }).map((_, i) => (
                          <tr key={i}>
                            <td className="p-2 border font-medium sticky left-0 bg-background z-10 shadow-[2px_0_0_rgba(0,0,0,0.04)]">{stateNames[i] ?? `S${i + 1}`}</td>
                            {Array.from({ length: numStates }).map((_, j) => (
                              <td key={j} className="p-1 border">
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  max="1"
                                  value={(transition[i]?.[j] ?? 0).toString()}
                                  onChange={(e) => setProb(i, j, e.target.value)}
                                  className="w-28 h-9 px-3 text-sm font-mono text-right focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-xs text-muted-foreground mt-2">
                      Rows are auto-normalized during computation.
                    </div>
                  </div>

                  {/* Initial distribution */}
                  <div className="overflow-x-auto">
                    <div className="text-sm font-medium mb-2">Initial Distribution π₀</div>
                    <div className="flex items-end gap-2">
                      {Array.from({ length: numStates }).map((_, i) => (
                        <div key={i} className="space-y-1">
                          <div className="text-xs text-muted-foreground">{stateNames[i] ?? `S${i + 1}`}</div>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            value={(initial[i] ?? 0).toString()}
                            onChange={(e) => setInitialAt(i, e.target.value)}
                            className="w-28 h-9 px-3 text-sm font-mono text-right focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">Automatically normalized to sum to 1.</div>
                  </div>

                  {/* Results */}
                  {history.length > 0 && (
                    <div className="space-y-4">
                      <div className="text-sm font-medium">Distribution over time</div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border">
                          <thead>
                            <tr>
                              <th className="p-2 border text-left">t</th>
                              {Array.from({ length: numStates }).map((_, j) => (
                                <th key={j} className="p-2 border text-center">{stateNames[j] ?? `S${j + 1}`}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {history.map((dist, t) => (
                              <tr key={t}>
                                <td className="p-2 border">{t}</td>
                                {dist.map((p, j) => (
                                  <td key={j} className="p-2 border text-center font-mono">{p.toFixed(4)}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="text-sm font-medium mb-1">Estimated Stationary Distribution π* (by power iteration)</div>
                        <div className="flex flex-wrap gap-2">
                          {piStar.map((p, i) => (
                            <Badge key={i} variant="outline" className="font-mono text-sm">
                              {(stateNames[i] ?? `S${i + 1}`)}: {p.toFixed(4)}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Animated distribution over time */}
                      <div className="p-4 rounded-lg border-2 border-muted">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Distribution over Steps</h4>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={() => setCurrentT((t) => Math.max(0, t - 1))} disabled={currentT <= 0}>
                              <StepBack className="w-4 h-4" />
                            </Button>
                            <Button size="sm" onClick={() => {
                              if (!isPlaying) {
                                setIsPlaying(true);
                                const id = setInterval(() => {
                                  setCurrentT((t) => {
                                    if (!history.length) return 0;
                                    const next = Math.min(history.length - 1, t + 1);
                                    if (next === history.length - 1) {
                                      clearInterval(id as unknown as number);
                                      setIsPlaying(false);
                                    }
                                    return next;
                                  });
                                }, 600);
                              } else {
                                setIsPlaying(false);
                              }
                            }}>
                              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setCurrentT((t) => Math.min(history.length - 1, t + 1))} disabled={currentT >= history.length - 1}>
                              <StepForward className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-xs text-muted-foreground mb-2">t = {currentT}</div>
                        <ChartContainer
                          config={Object.fromEntries(stateNames.map((name, idx) => [name || `S${idx + 1}`, { label: name || `S${idx + 1}` }]))}
                          className="w-full h-64"
                        >
                          <BarChart data={(stateNames.map((name, i) => ({ name: name || `S${i + 1}`, value: (history[currentT]?.[i] ?? 0) * 100, fill: `hsl(${(i * 90) % 360} 90% 50%)` })))}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="value" />
                          </BarChart>
                        </ChartContainer>
                      </div>
                    </div>
                  )}

                  {/* Monte Carlo simulation */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <h4 className="font-semibold mb-2">Monte Carlo Mode (sampling)</h4>
                    <p className="text-xs text-muted-foreground mb-4">
                      Approximates end-state probabilities by random sampling, similar to your teacher's example.
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Trials:</span>
                        <Input
                          type="number"
                          value={trials}
                          onChange={(e) => setTrials(Math.max(1, Math.min(1000000, parseInt(e.target.value) || 1)))}
                          className="w-28"
                        />
                      </div>
                      <Button onClick={runMonteCarlo} disabled={isMcRunning} className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        {isMcRunning ? "Running..." : "Run Monte Carlo"}
                      </Button>
                    </div>

                    {mcResult && (
                      <div className="mt-4 space-y-2">
                        <div className="text-sm font-medium">Estimated end-state probabilities after {steps} steps (trials: {trials.toLocaleString()})</div>
                        <div className="flex flex-wrap gap-2">
                          {mcResult.map((p, i) => (
                            <Badge key={i} variant="outline" className="font-mono text-sm">
                              {(stateNames[i] ?? `S${i + 1}`)}: {(p * 100).toFixed(2)}%
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Compare with exact π{`{${steps}}`} end distribution row above.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card className="w-500 ">
              <CardHeader>
                <CardTitle>Python/Numpy Sketch</CardTitle>
                <CardDescription>Simple simulation of a Markov chain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import numpy as np

# Transition matrix (rows sum to 1)
P = np.array([[0.6, 0.3, 0.1],
              [0.2, 0.6, 0.2],
              [0.3, 0.3, 0.4]])

# Initial distribution (row vector)
pi0 = np.array([1.0, 0.0, 0.0])

# Evolve distribution for T steps
def simulate(pi, P, T=10):
    hist = [pi]
    for _ in range(T):
        pi = pi @ P
        hist.append(pi)
    return np.stack(hist)

# Stationary distribution via power iteration
def stationary(P, tol=1e-10, max_iters=1000):
    n = P.shape[0]
    pi = np.ones(n)/n
    for _ in range(max_iters):
        nxt = pi @ P
        if np.linalg.norm(nxt - pi, 1) < tol:
            return nxt
        pi = nxt
    return pi

hist = simulate(pi0, P, T=10)
pi_star = stationary(P)
print(hist)
print(pi_star)`}</pre>
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

export default Experiment4;


