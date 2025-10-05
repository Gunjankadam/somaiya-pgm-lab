import { useMemo, useState } from "react";
import { ArrowLeft, Info, BookOpen, BarChart3, Code, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Bool = "T" | "F";

type Cpts = {
  pB: number; // P(B=true)
  pE: number; // P(E=true)
  pA: { // P(A=true | B,E)
    TT: number;
    TF: number;
    FT: number;
    FF: number;
  };
  pD: { T: number; F: number }; // P(D=true | A)
  pS: { T: number; F: number }; // P(S=true | A)
};

// Network presets
const networkPresets = {
  alarm: {
    name: "Alarm Network",
    description: "Burglary–Earthquake–Alarm with David and Sophia calls",
    cpts: {
      pB: 0.002, pE: 0.001,
      pA: { TT: 0.95, TF: 0.94, FT: 0.29, FF: 0.001 },
      pD: { T: 0.91, F: 0.05 }, pS: { T: 0.75, F: 0.02 }
    },
    nodeLabels: { B: "Burglary", E: "Earthquake", A: "Alarm", D: "David Calls", S: "Sophia Calls" }
  },
  medical: {
    name: "Medical Diagnosis",
    description: "Disease–Symptoms–Test results with Patient reports",
    cpts: {
      pB: 0.01, pE: 0.005, // Disease prevalence
      pA: { TT: 0.98, TF: 0.95, FT: 0.15, FF: 0.001 }, // Symptoms given diseases
      pD: { T: 0.85, F: 0.02 }, pS: { T: 0.70, F: 0.01 } // Test results given symptoms
    },
    nodeLabels: { B: "Disease A", E: "Disease B", A: "Symptoms", D: "Test Positive", S: "Patient Reports" }
  },
  weather: {
    name: "Weather Prediction",
    description: "Season–Clouds–Rain with Weather station and Satellite",
    cpts: {
      pB: 0.25, pE: 0.3, // Season probabilities (Winter, Summer)
      pA: { TT: 0.90, TF: 0.60, FT: 0.40, FF: 0.05 }, // Rain given season and clouds
      pD: { T: 0.95, F: 0.10 }, pS: { T: 0.80, F: 0.15 } // Weather station and satellite accuracy
    },
    nodeLabels: { B: "Winter", E: "Cloudy", A: "Rain", D: "Weather Station", S: "Satellite" }
  }
};

const defaultCpts = networkPresets.alarm.cpts;

const boolToIndex = (b: Bool) => (b === "T" ? 1 : 0);

const Experiment3 = () => {
  const navigate = useNavigate();
  const [activeTab] = useState("theory");
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedNetwork, setSelectedNetwork] = useState<keyof typeof networkPresets>("alarm");
  const [cpts, setCpts] = useState<Cpts>(defaultCpts);
  const [eD, setED] = useState<"T" | "F" | "U">("U");
  const [eS, setES] = useState<"T" | "F" | "U">("U");

  const resetDefaults = () => {
    setCpts(networkPresets[selectedNetwork].cpts);
    setED("U");
    setES("U");
  };

  const loadNetwork = (networkKey: keyof typeof networkPresets) => {
    setSelectedNetwork(networkKey);
    setCpts(networkPresets[networkKey].cpts);
    setED("U");
    setES("U");
  };

  const currentNetwork = networkPresets[selectedNetwork];

  const setNumber = (path: (c: Cpts) => number, upd: (c: Cpts, v: number) => void) => (v: string) => {
    const num = Math.max(0, Math.min(1, parseFloat(v)));
    setCpts((prev) => {
      const copy = structuredClone(prev);
      upd(copy, isNaN(num) ? 0 : num);
      return copy;
    });
  };

  const pA = (b: Bool, e: Bool) => {
    const key = (b + e) as keyof Cpts["pA"];
    return cpts.pA[key];
  };

  const pB = (b: Bool) => (b === "T" ? cpts.pB : 1 - cpts.pB);
  const pE = (e: Bool) => (e === "T" ? cpts.pE : 1 - cpts.pE);
  const pD = (d: Bool, a: Bool) => (d === "T" ? cpts.pD[a] : 1 - cpts.pD[a]);
  const pS = (s: Bool, a: Bool) => (s === "T" ? cpts.pS[a] : 1 - cpts.pS[a]);

  const joint = (b: Bool, e: Bool, a: Bool, d: Bool, s: Bool) => {
    const pAtrue = pA(b, e);
    const pAgiven = a === "T" ? pAtrue : 1 - pAtrue;
    return pB(b) * pE(e) * pAgiven * pD(d, a) * pS(s, a);
  };

  const sumOverHidden = (evidence: Partial<{ B: Bool; E: Bool; A: Bool; D: Bool; S: Bool }>) => {
    const vals: Record<string, Bool[]> = {
      B: evidence.B ? [evidence.B] : ["F", "T"],
      E: evidence.E ? [evidence.E] : ["F", "T"],
      A: evidence.A ? [evidence.A] : ["F", "T"],
      D: evidence.D ? [evidence.D] : ["F", "T"],
      S: evidence.S ? [evidence.S] : ["F", "T"],
    };
    let s = 0;
    for (const B of vals.B) for (const E of vals.E) for (const A of vals.A) for (const D of vals.D) for (const S of vals.S) s += joint(B, E, A, D, S);
    return s;
  };

  const posterior = useMemo(() => {
    const ev: Partial<{ D: Bool; S: Bool }> = {};
    if (eD !== "U") ev.D = eD;
    if (eS !== "U") ev.S = eS;

    const denom = sumOverHidden(ev);
    const pBTrue = sumOverHidden({ ...ev, B: "T" }) / (denom || 1);
    const pETrue = sumOverHidden({ ...ev, E: "T" }) / (denom || 1);
    const pATrue = sumOverHidden({ ...ev, A: "T" }) / (denom || 1);
    const pDTrue = sumOverHidden({ ...ev, D: "T" }) / (denom || 1);
    const pSTrue = sumOverHidden({ ...ev, S: "T" }) / (denom || 1);
    return { pBTrue, pETrue, pATrue, pDTrue, pSTrue, denom };
  }, [cpts, eD, eS]);

  const fmt = (v: number, d: number = 3) => (isFinite(v) ? v.toFixed(d) : "0.000");

  // ---- Custom probability builder state ----
  const [qbTarget, setQbTarget] = useState<"B" | "E" | "A" | "D" | "S">("D");
  const [qbTargetVal, setQbTargetVal] = useState<Bool>("T");
  const [qbB, setQbB] = useState<"U" | Bool>("U");
  const [qbE, setQbE] = useState<"U" | Bool>("U");
  const [qbA, setQbA] = useState<"U" | Bool>("U");
  const [qbD, setQbD] = useState<"U" | Bool>("U");
  const [qbS, setQbS] = useState<"U" | Bool>("U");

  const probGiven = useMemo(() => {
    const ev: Partial<{ B: Bool; E: Bool; A: Bool; D: Bool; S: Bool }> = {};
    const push = (k: "B"|"E"|"A"|"D"|"S", v: "U"|Bool) => {
      if (v !== "U" && k !== qbTarget) (ev as any)[k] = v;
    };
    push("B", qbB); push("E", qbE); push("A", qbA); push("D", qbD); push("S", qbS);
    const denom = sumOverHidden(ev);
    const num = sumOverHidden({ ...ev, [qbTarget]: qbTargetVal } as any);
    const pT = num / (denom || 1);
    const pF = 1 - pT;
    return { pT, pF, denom, ev };
  }, [qbTarget, qbTargetVal, qbB, qbE, qbA, qbD, qbS, cpts]);

  const experimentSteps = [
    {
      title: "Aim",
      description: "Understand Bayesian Networks and exact inference",
      content:
        "This experiment demonstrates a classic Alarm network. You can edit conditional probability tables (CPTs), set evidence on calls, and compute posteriors for Burglary, Earthquake and Alarm using full enumeration.",
    },
    {
      title: "What is a Bayesian Network?",
      description: "Directed acyclic graph of random variables",
      content:
        "Each node represents a variable and edges encode conditional dependencies. The joint distribution factorizes as Π P(node | parents). Inference combines priors and likelihood from evidence.",
    },
    {
      title: "Inference",
      description: "Compute P(Query | Evidence)",
      content:
        "We enumerate all hidden variables and sum the joint probabilities consistent with the query and evidence, then normalize by the evidence probability.",
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
            <Badge variant="secondary">Experiment 3</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-2">Bayesian Network</h1>
          <p className="text-lg text-muted-foreground">{currentNetwork.description}</p>
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
                  Bayesian Network Theory
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

                  {/* Minimal inline network diagram */}
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium mb-2">Network Structure</div>
                    <div className="relative w-full max-w-3xl mx-auto h-56">
                      <svg viewBox="0 0 600 220" className="w-full h-full">
                        {/* Nodes */}
                        <g id="nodes">
                          <circle cx="150" cy="40" r="24" className="fill-primary/10 stroke-primary" />
                          <text x="150" y="45" textAnchor="middle" className="fill-current text-sm">B</text>
                          <circle cx="450" cy="40" r="24" className="fill-primary/10 stroke-primary" />
                          <text x="450" y="45" textAnchor="middle" className="fill-current text-sm">E</text>
                          <circle cx="300" cy="110" r="28" className="fill-primary/10 stroke-primary" />
                          <text x="300" y="115" textAnchor="middle" className="fill-current text-sm">A</text>
                          <circle cx="210" cy="190" r="26" className="fill-primary/10 stroke-primary" />
                          <text x="210" y="195" textAnchor="middle" className="fill-current text-sm">D</text>
                          <circle cx="390" cy="190" r="26" className="fill-primary/10 stroke-primary" />
                          <text x="390" y="195" textAnchor="middle" className="fill-current text-sm">S</text>
                        </g>
                        {/* Arrows */}
                        <defs>
                          <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                            <path d="M0,0 L0,6 L9,3 z" className="fill-current" />
                          </marker>
                        </defs>
                        <g className="stroke-current" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                          <line x1="170" y1="55" x2="280" y2="95" />
                          <line x1="430" y1="55" x2="320" y2="95" />
                          <line x1="285" y1="135" x2="225" y2="170" />
                          <line x1="315" y1="135" x2="375" y2="170" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <Card className="w-full max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Exact Inference (Enumeration)
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  Edit CPTs and set evidence to update posteriors
                  <div className="ml-auto flex items-center gap-2">
                    <Select value={selectedNetwork} onValueChange={loadNetwork}>
                      <SelectTrigger className="w-48 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alarm">Alarm Network</SelectItem>
                        <SelectItem value="medical">Medical Diagnosis</SelectItem>
                        <SelectItem value="weather">Weather Prediction</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" variant="outline" className="flex items-center gap-2" onClick={resetDefaults}>
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </Button>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Evidence controls */}
                  <div className="p-4 rounded-lg border-2 border-muted">
                    <div className="text-sm font-medium mb-3">Evidence</div>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{currentNetwork.nodeLabels.D} (D)</div>
                        <Select value={eD} onValueChange={(v) => setED(v as any)}>
                          <SelectTrigger className="w-40 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="U">Unknown</SelectItem>
                            <SelectItem value="T">Observed True</SelectItem>
                            <SelectItem value="F">Observed False</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">{currentNetwork.nodeLabels.S} (S)</div>
                        <Select value={eS} onValueChange={(v) => setES(v as any)}>
                          <SelectTrigger className="w-40 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="U">Unknown</SelectItem>
                            <SelectItem value="T">Observed True</SelectItem>
                            <SelectItem value="F">Observed False</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="ml-auto text-sm">
                        <div>Evidence probability P(e) = {fmt(posterior.denom, 6)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic graph with node colors by P(node=T | e) */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Network Graph (colored by probability)</CardTitle>
                      <CardDescription>Fill intensity shows P(node = T | evidence). Values shown under nodes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full max-w-3xl mx-auto h-64">
                        <svg viewBox="0 0 600 240" className="w-full h-full">
                          {/* Helper to compute fill via CSS HSL string constructed in JSX */}
                          {/* Edges */}
                          <defs>
                            <marker id="arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                              <path d="M0,0 L0,6 L9,3 z" className="fill-current" />
                            </marker>
                          </defs>
                          <g className="stroke-current" strokeWidth="2" fill="none" markerEnd="url(#arrow2)">
                            <line x1="170" y1="60" x2="280" y2="110" />
                            <line x1="430" y1="60" x2="320" y2="110" />
                            <line x1="285" y1="140" x2="225" y2="185" />
                            <line x1="315" y1="140" x2="375" y2="185" />
                          </g>

                          {/* Node circles with dynamic fill */}
                          {(() => {
                            const toFill = (p: number) => `hsl(210 90% ${Math.max(30, Math.min(90, 30 + p * 60))}%)`;
                            const txt = (p: number) => `${(p * 100).toFixed(2)}%`;
                            return (
                              <g>
                                <g>
                                  <circle cx="150" cy="60" r="26" style={{ fill: toFill(posterior.pBTrue), stroke: "hsl(210 90% 40%)" }} />
                                  <text x="150" y="58" textAnchor="middle" className="fill-background font-semibold">B</text>
                                  <text x="150" y="80" textAnchor="middle" className="fill-current text-xs font-mono">{txt(posterior.pBTrue)}</text>
                                </g>
                                <g>
                                  <circle cx="450" cy="60" r="26" style={{ fill: toFill(posterior.pETrue), stroke: "hsl(210 90% 40%)" }} />
                                  <text x="450" y="58" textAnchor="middle" className="fill-background font-semibold">E</text>
                                  <text x="450" y="80" textAnchor="middle" className="fill-current text-xs font-mono">{txt(posterior.pETrue)}</text>
                                </g>
                                <g>
                                  <circle cx="300" cy="130" r="30" style={{ fill: toFill(posterior.pATrue), stroke: "hsl(210 90% 40%)" }} />
                                  <text x="300" y="128" textAnchor="middle" className="fill-background font-semibold">A</text>
                                  <text x="300" y="150" textAnchor="middle" className="fill-current text-xs font-mono">{txt(posterior.pATrue)}</text>
                                </g>
                                <g>
                                  <circle cx="210" cy="200" r="26" style={{ fill: toFill(posterior.pDTrue), stroke: "hsl(210 90% 40%)" }} />
                                  <text x="210" y="198" textAnchor="middle" className="fill-background font-semibold">D</text>
                                  <text x="210" y="218" textAnchor="middle" className="fill-current text-xs font-mono">{txt(posterior.pDTrue)}</text>
                                </g>
                                <g>
                                  <circle cx="390" cy="200" r="26" style={{ fill: toFill(posterior.pSTrue), stroke: "hsl(210 90% 40%)" }} />
                                  <text x="390" y="198" textAnchor="middle" className="fill-background font-semibold">S</text>
                                  <text x="390" y="218" textAnchor="middle" className="fill-current text-xs font-mono">{txt(posterior.pSTrue)}</text>
                                </g>
                              </g>
                            );
                          })()}
                        </svg>
                        <div className="mt-2 text-xs text-muted-foreground text-center">Colors update as you change evidence/CPTs.</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Step 1: Read-only CPT tables for quick understanding */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">{currentNetwork.nodeLabels.A} CPT (read-only view)</CardTitle>
                        <CardDescription>P(A=T) for each (B,E) combination • P(A=F)=1−P(A=T)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <table className="w-full text-xs border">
                          <thead>
                            <tr>
                              <th className="border p-2">B</th>
                              <th className="border p-2">E</th>
                              <th className="border p-2">P(A=T)</th>
                              <th className="border p-2">P(A=F)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {([
                              { b: "T", e: "T", k: "TT" },
                              { b: "T", e: "F", k: "TF" },
                              { b: "F", e: "T", k: "FT" },
                              { b: "F", e: "F", k: "FF" },
                            ] as const).map((r) => (
                              <tr key={r.k}>
                                <td className="border p-2 text-center">{r.b}</td>
                                <td className="border p-2 text-center">{r.e}</td>
                                <td className="border p-2 text-center font-mono">{fmt(cpts.pA[r.k])}</td>
                                <td className="border p-2 text-center font-mono">{fmt(1 - cpts.pA[r.k])}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Priors (read-only view)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <table className="w-full text-xs border">
                          <thead>
                            <tr>
                              <th className="border p-2">Variable</th>
                              <th className="border p-2">P(T)</th>
                              <th className="border p-2">P(F)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border p-2">{currentNetwork.nodeLabels.B} (B)</td>
                              <td className="border p-2 text-center font-mono">{fmt(cpts.pB)}</td>
                              <td className="border p-2 text-center font-mono">{fmt(1 - cpts.pB)}</td>
                            </tr>
                            <tr>
                              <td className="border p-2">{currentNetwork.nodeLabels.E} (E)</td>
                              <td className="border p-2 text-center font-mono">{fmt(cpts.pE)}</td>
                              <td className="border p-2 text-center font-mono">{fmt(1 - cpts.pE)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">{currentNetwork.nodeLabels.D}/{currentNetwork.nodeLabels.S} given {currentNetwork.nodeLabels.A} (read-only view)</CardTitle>
                          <CardDescription>Rows are A, columns show P(observation=T) and P(observation=F)</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                          <table className="w-full text-xs border">
                            <thead>
                              <tr>
                                <th className="border p-2">A</th>
                                <th className="border p-2">P(D=T)</th>
                                <th className="border p-2">P(D=F)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(["T", "F"] as const).map((a) => (
                                <tr key={a}>
                                  <td className="border p-2 text-center">{a}</td>
                                  <td className="border p-2 text-center font-mono">{fmt(cpts.pD[a])}</td>
                                  <td className="border p-2 text-center font-mono">{fmt(1 - cpts.pD[a])}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <table className="w-full text-xs border">
                            <thead>
                              <tr>
                                <th className="border p-2">A</th>
                                <th className="border p-2">P(S=T)</th>
                                <th className="border p-2">P(S=F)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(["T", "F"] as const).map((a) => (
                                <tr key={a}>
                                  <td className="border p-2 text-center">{a}</td>
                                  <td className="border p-2 text-center font-mono">{fmt(cpts.pS[a])}</td>
                                  <td className="border p-2 text-center font-mono">{fmt(1 - cpts.pS[a])}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Step 2: Editable CPT controls (optional tweaks) */}
                  <div className="text-sm font-medium">Adjust values (optional)</div>
                  {/* CPT editors (compact) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Priors</CardTitle>
                        <CardDescription>{currentNetwork.nodeLabels.B} (B), {currentNetwork.nodeLabels.E} (E)</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-xs">P(B = T)</div>
                        <Input type="number" step="0.001" value={cpts.pB} onChange={(e) => setNumber((c) => c.pB, (c, v) => (c.pB = v))(e.target.value)} />
                        <div className="text-xs">P(E = T)</div>
                        <Input type="number" step="0.001" value={cpts.pE} onChange={(e) => setNumber((c) => c.pE, (c, v) => (c.pE = v))(e.target.value)} />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">{currentNetwork.nodeLabels.A} CPT P(A=T | B,E)</CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-2 text-sm">
                        {(["TT", "TF", "FT", "FF"] as const).map((k) => (
                          <div key={k} className="space-y-1">
                            <div className="text-xs text-muted-foreground">B{(k as string)[0]} E{(k as string)[1]}</div>
                            <Input
                              type="number"
                              step="0.001"
                              value={cpts.pA[k]}
                              onChange={(e) =>
                                setNumber((c) => c.pA[k], (c, v) => (c.pA[k] = v))(e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Observation CPTs</CardTitle>
                        <CardDescription>{currentNetwork.nodeLabels.D} (D), {currentNetwork.nodeLabels.S} (S)</CardDescription>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <div className="text-xs">P(D=T | A=T)</div>
                          <Input type="number" step="0.001" value={cpts.pD.T} onChange={(e) => setNumber((c) => c.pD.T, (c, v) => (c.pD.T = v))(e.target.value)} />
                          <div className="text-xs">P(D=T | A=F)</div>
                          <Input type="number" step="0.001" value={cpts.pD.F} onChange={(e) => setNumber((c) => c.pD.F, (c, v) => (c.pD.F = v))(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs">P(S=T | A=T)</div>
                          <Input type="number" step="0.001" value={cpts.pS.T} onChange={(e) => setNumber((c) => c.pS.T, (c, v) => (c.pS.T = v))(e.target.value)} />
                          <div className="text-xs">P(S=T | A=F)</div>
                          <Input type="number" step="0.001" value={cpts.pS.F} onChange={(e) => setNumber((c) => c.pS.F, (c, v) => (c.pS.F = v))(e.target.value)} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Step 3: Results */}
                  <div className="p-4 rounded-lg border-2">
                    <div className="text-sm font-medium mb-2">Posterior Probabilities (given evidence)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                      <div className="p-3 rounded-md bg-primary/10">
                        <div>{currentNetwork.nodeLabels.B} P(B=T | e)</div>
                        <div className="text-lg font-semibold">{fmt(posterior.pBTrue, 6)}</div>
                      </div>
                      <div className="p-3 rounded-md bg-primary/10">
                        <div>{currentNetwork.nodeLabels.E} P(E=T | e)</div>
                        <div className="text-lg font-semibold">{fmt(posterior.pETrue, 6)}</div>
                      </div>
                      <div className="p-3 rounded-md bg-primary/10">
                        <div>{currentNetwork.nodeLabels.A} P(A=T | e)</div>
                        <div className="text-lg font-semibold">{fmt(posterior.pATrue, 6)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 4: Custom Probability Builder */}
                  <div className="p-4 rounded-lg border-2">
                    <div className="text-sm font-medium mb-3">Custom Probability Builder</div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Query variable</div>
                        <div className="flex gap-2">
                          <Select value={qbTarget} onValueChange={(v) => setQbTarget(v as any)}>
                            <SelectTrigger className="w-28 text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="B">{currentNetwork.nodeLabels.B} (B)</SelectItem>
                              <SelectItem value="E">{currentNetwork.nodeLabels.E} (E)</SelectItem>
                              <SelectItem value="A">{currentNetwork.nodeLabels.A} (A)</SelectItem>
                              <SelectItem value="D">{currentNetwork.nodeLabels.D} (D)</SelectItem>
                              <SelectItem value="S">{currentNetwork.nodeLabels.S} (S)</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={qbTargetVal} onValueChange={(v) => setQbTargetVal(v as any)}>
                            <SelectTrigger className="w-24 text-sm"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="T">= True</SelectItem>
                              <SelectItem value="F">= False</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-xs text-muted-foreground">This computes P(Target | Selected Evidence)</div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Select evidence values (leave as Unknown to omit)</div>
                        <div className="grid grid-cols-2 gap-2">
                          {([
                            { k: "B", label: "B" },
                            { k: "E", label: "E" },
                            { k: "A", label: "A" },
                            { k: "D", label: "D" },
                            { k: "S", label: "S" },
                          ] as const).map((v) => (
                            <div key={v.k} className="flex items-center gap-2">
                              <span className="w-6 text-sm">{v.label}</span>
                              <Select
                                value={{ B: qbB, E: qbE, A: qbA, D: qbD, S: qbS }[v.k] as any}
                                onValueChange={(val) => {
                                  if (v.k === "B") setQbB(val as any);
                                  if (v.k === "E") setQbE(val as any);
                                  if (v.k === "A") setQbA(val as any);
                                  if (v.k === "D") setQbD(val as any);
                                  if (v.k === "S") setQbS(val as any);
                                }}
                              >
                                <SelectTrigger className="w-28 text-sm"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="U">Unknown</SelectItem>
                                  <SelectItem value="T">True</SelectItem>
                                  <SelectItem value="F">False</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs text-muted-foreground">Result</div>
                        <div className="p-3 rounded-md bg-primary/10">
                          <div className="text-sm font-medium">P({qbTarget}={qbTargetVal} | evidence)</div>
                          <div className="text-xl font-semibold">{fmt(probGiven.pT, 6)}</div>
                          <div className="text-xs text-muted-foreground">P(evidence) = {fmt(probGiven.denom, 6)}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">Other value probability: {fmt(probGiven.pF, 6)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Python Sketch</CardTitle>
                <CardDescription>Simple enumeration for Alarm network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`# P(B)=0.002, P(E)=0.001
pB, pE = 0.002, 0.001
PA = {('T','T'):0.95, ('T','F'):0.94, ('F','T'):0.29, ('F','F'):0.001}
pD = {'T':0.91, 'F':0.05}
pS = {'T':0.75, 'F':0.02}

def joint(b,e,a,d,s):
    import math
    def bern(p,x):
        return p if x=='T' else 1-p
    pA = PA[(b,e)] if a=='T' else 1-PA[(b,e)]
    return bern(pB, b) * bern(pE, e) * pA * bern(pD[a], d) * bern(pS[a], s)

def sum_over(ev):
    from itertools import product
    keys = ['B','E','A','D','S']
    vals = {k:([ev[k]] if k in ev else ['F','T']) for k in keys}
    s = 0.0
    for B,E,A,D,S in product(*[vals[k] for k in keys]):
        s += joint(B,E,A,D,S)
    return s

# Example: P(B|D='T', S='T')
den = sum_over({'D':'T','S':'T'})
post_B = sum_over({'D':'T','S':'T','B':'T'}) / den
print(round(post_B,6))`}</pre>
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

export default Experiment3;


