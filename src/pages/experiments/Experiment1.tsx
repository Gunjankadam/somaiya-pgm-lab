import { useState } from "react";
import { ArrowLeft, Play, RotateCcw, Info, BookOpen, Code, BarChart3 } from "lucide-react";
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

const Experiment1 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDiceRunning, setIsDiceRunning] = useState(false);
  const [isCoinRunning, setIsCoinRunning] = useState(false);
  const [isCardRunning, setIsCardRunning] = useState(false);
  const [results, setResults] = useState<number[]>([]);
  const [diceRolls, setDiceRolls] = useState<number[]>([]);
  const [coinFlips, setCoinFlips] = useState<string[]>([]);
  const [cardDraws, setCardDraws] = useState<string[]>([]);
  const [diceCount, setDiceCount] = useState(20);
  const [coinCount, setCoinCount] = useState(20);
  const [cardCount, setCardCount] = useState(10);
  const [requiredDiceValue, setRequiredDiceValue] = useState(6);
  const [requiredCoinFace, setRequiredCoinFace] = useState('Heads');
  const [requiredCardSuit, setRequiredCardSuit] = useState('♠');
  const [requiredCardNumber, setRequiredCardNumber] = useState('All');

  const experimentSteps = [
    {
      title: "Aim",
      description: "Implement probabilistic graphical models using Python libraries",
      content: "You will be able to visualise the probability graphs. This is the foundation for PGM and to continue implementation throughout the course, it's necessary to learn how to work with Python libraries like Matplotlib."
    },
    {
      title: "Objective",
      description: "Learn probability theory fundamentals for PGM implementation",
      content: "You will be able to visualise the probability graphs. This is the foundation for PGM and to continue implementation throughout the course, it's necessary to learn how to work with Python libraries like Matplotlib."
    },
    {
      title: "Theory - Probabilistic Modeling",
      description: "Understanding the statistical technique for predicting future outcomes",
      content: "Probabilistic modeling is a statistical technique used to take into account the impact of random events or actions in predicting the potential occurrence of future outcomes. Based on the fact that randomness or uncertainty plays a role in predicting outcomes, predictive modeling is used in a wide variety of fields and disciplines, from predicting the weather to potential nuclear fallout."
    },
    {
      title: "Probability Theory",
      description: "Mathematical foundation for uncertainty and random phenomena",
      content: "Probability theory is the branch of mathematics concerned with probability. Although there are several different probability interpretations, probability theory treats the concept in a rigorous mathematical manner by expressing it through a set of axioms. Typically these axioms formalise probability in terms of a probability space, which assigns a measure taking values between 0 and 1, termed the probability measure, to a set of outcomes called the sample space."
    },
    {
      title: "Probabilistic Graphical Model",
      description: "Graph-based representation for conditional dependence structures",
      content: "A graphical model or probabilistic graphical model (PGM) or structured probabilistic model is a probabilistic model for which a graph expresses the conditional dependence structure between random variables. They are commonly used in probability theory, statistics—particularly Bayesian statistics—and machine learning."
    }
  ];

  const simulateDiceRoll = () => {
    setIsDiceRunning(true);
    const newRolls = [];
    for (let i = 0; i < diceCount; i++) {
      newRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    setDiceRolls(newRolls);
    setTimeout(() => setIsDiceRunning(false), 1500);
  };

  const simulateCoinFlip = () => {
    setIsCoinRunning(true);
    const newFlips = [];
    for (let i = 0; i < coinCount; i++) {
      newFlips.push(Math.random() < 0.5 ? 'Heads' : 'Tails');
    }
    setCoinFlips(newFlips);
    setTimeout(() => setIsCoinRunning(false), 1500);
  };

  const simulateCardDraw = () => {
    setIsCardRunning(true);
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newCards = [];
    for (let i = 0; i < cardCount; i++) {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const rank = ranks[Math.floor(Math.random() * ranks.length)];
      newCards.push(`${rank}${suit}`);
    }
    setCardDraws(newCards);
    setTimeout(() => setIsCardRunning(false), 1500);
  };

  const simulateProbabilityDistribution = () => {
    setIsRunning(true);
    const newResults = [];
    for (let i = 0; i < 100; i++) {
      newResults.push(Math.floor(Math.random() * 6) + 1);
    }
    setResults(newResults);
    setTimeout(() => setIsRunning(false), 2000);
  };

  const resetExperiment = () => {
    setResults([]);
    setDiceRolls([]);
    setCoinFlips([]);
    setCardDraws([]);
    setCurrentStep(0);
    setIsRunning(false);
    setIsDiceRunning(false);
    setIsCoinRunning(false);
    setIsCardRunning(false);
  };

  const calculateFrequency = (value: number) => {
    return results.filter(r => r === value).length;
  };

  const calculateProbability = (value: number) => {
    return results.length > 0 ? (calculateFrequency(value) / results.length).toFixed(3) : "0.000";
  };

  const calculateDiceProbability = (value: number) => {
    return diceRolls.length > 0 ? (diceRolls.filter(r => r === value).length / diceRolls.length).toFixed(3) : "0.000";
  };

  const calculateCoinProbability = (outcome: string) => {
    return coinFlips.length > 0 ? (coinFlips.filter(f => f === outcome).length / coinFlips.length).toFixed(3) : "0.000";
  };

  const calculateCardProbability = (suit: string) => {
    return cardDraws.length > 0 ? (cardDraws.filter(c => c.includes(suit)).length / cardDraws.length).toFixed(3) : "0.000";
  };

  const calculateOverallDiceProbability = () => {
    if (diceRolls.length === 0) return "0.000";
    const targetCount = diceRolls.filter(r => r === requiredDiceValue).length;
    return (targetCount / diceRolls.length).toFixed(3);
  };

  const calculateOverallCoinProbability = () => {
    if (coinFlips.length === 0) return "0.000";
    const targetCount = coinFlips.filter(f => f === requiredCoinFace).length;
    return (targetCount / coinFlips.length).toFixed(3);
  };

  const calculateOverallCardProbability = () => {
    if (cardDraws.length === 0) return "0.000";
    let targetCount;
    if (requiredCardNumber === 'All') {
      // If "All" is selected, count all cards of the selected suit
      targetCount = cardDraws.filter(c => c.includes(requiredCardSuit)).length;
    } else {
      // If specific number is selected, count cards with both suit and number
      targetCount = cardDraws.filter(c => c.includes(requiredCardSuit) && c.includes(requiredCardNumber)).length;
    }
    return (targetCount / cardDraws.length).toFixed(3);
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
            <Badge variant="secondary">Experiment 1</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Probability Theory</h1>
          <p className="text-lg text-muted-foreground">
            Implement probabilistic graphical models using Python libraries and visualize probability graphs
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
                  Experiment Theory
                </CardTitle>
                <CardDescription>
                  Follow the theoretical concepts to understand probability theory for PGM
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
                  <BarChart3 className="w-5 h-5" />
                  Simulation
                </CardTitle>
                <CardDescription>
                  Interactive simulations to understand probability concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Dice Roll Simulation */}
                  <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                    <h4 className="font-semibold mb-2">1. Rolling Dice</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Simulate dice rolls to understand discrete probability distributions and observe the law of large numbers in action.
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          value={diceCount}
                          onChange={(e) => setDiceCount(parseInt(e.target.value) || 1)}
                          min="1"
                          max="100"
                          className="w-20"
                          disabled={isRunning}
                        />
                        <span className="text-sm text-muted-foreground">rolls</span>
                        <Select value={requiredDiceValue.toString()} onValueChange={(value) => setRequiredDiceValue(parseInt(value))} disabled={isRunning}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map(value => (
                              <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">required</span>
                        <Button
                          onClick={simulateDiceRoll}
                          disabled={isDiceRunning}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isDiceRunning ? "Rolling..." : "Roll Dice"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetExperiment}
                          disabled={isDiceRunning}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>

                      {isDiceRunning && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <img 
                            src="/rolling-dice.gif" 
                            alt="Rolling dice animation" 
                            className="w-24 h-24 object-contain"
                          />
                          <p className="text-sm text-muted-foreground mt-2">Rolling dice...</p>
                        </div>
                      )}

                      {diceRolls.length > 0 && !isDiceRunning && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Roll Results:</h5>
                          <div className="flex flex-wrap gap-1">
                            {diceRolls.map((result, index) => (
                              <Badge key={index} variant="outline">
                                {result}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Average: {(diceRolls.reduce((a, b) => a + b, 0) / diceRolls.length).toFixed(2)}
                          </div>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm font-medium">
                              Overall Probability for Value {requiredDiceValue}: 
                              <span className="ml-2 text-lg font-bold text-primary">
                                P = {calculateOverallDiceProbability()}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Expected: 0.167 (1/6)
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h6 className="font-medium text-sm">Probability Distribution:</h6>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {[1, 2, 3, 4, 5, 6].map(value => (
                                <div key={value} className="flex justify-between">
                                  <span>Value {value}:</span>
                                  <span>P = {calculateDiceProbability(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Coin Flip Simulation */}
                  <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                    <h4 className="font-semibold mb-2">2. Flipping Coin</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Simulate coin flips to understand binary probability distributions and the concept of fair probability.
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          value={coinCount}
                          onChange={(e) => setCoinCount(parseInt(e.target.value) || 1)}
                          min="1"
                          max="100"
                          className="w-20"
                          disabled={isRunning}
                        />
                        <span className="text-sm text-muted-foreground">flips</span>
                        <Select value={requiredCoinFace} onValueChange={setRequiredCoinFace} disabled={isRunning}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Heads">Heads</SelectItem>
                            <SelectItem value="Tails">Tails</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">required</span>
                        <Button
                          onClick={simulateCoinFlip}
                          disabled={isCoinRunning}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isCoinRunning ? "Flipping..." : "Flip Coin"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetExperiment}
                          disabled={isCoinRunning}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>

                      {isCoinRunning && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <img 
                            src="/coin-flip.gif" 
                            alt="Coin flipping animation" 
                            className="w-24 h-24 object-contain"
                          />
                          <p className="text-sm text-muted-foreground mt-2">Flipping coin...</p>
                        </div>
                      )}

                      {coinFlips.length > 0 && !isCoinRunning && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Flip Results:</h5>
                          <div className="flex flex-wrap gap-1">
                            {coinFlips.map((result, index) => (
                              <Badge key={index} variant={result === 'Heads' ? 'default' : 'secondary'}>
                                {result}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Heads: {coinFlips.filter(f => f === 'Heads').length} | 
                            Tails: {coinFlips.filter(f => f === 'Tails').length}
                          </div>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm font-medium">
                              Overall Probability for {requiredCoinFace}: 
                              <span className="ml-2 text-lg font-bold text-primary">
                                P = {calculateOverallCoinProbability()}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Expected: 0.500 (1/2)
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h6 className="font-medium text-sm">Probability Distribution:</h6>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex justify-between">
                                <span>Heads:</span>
                                <span>P = {calculateCoinProbability('Heads')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tails:</span>
                                <span>P = {calculateCoinProbability('Tails')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Playing Card Simulation */}
                  <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                    <h4 className="font-semibold mb-2">3. Playing Card</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Simulate card draws to understand uniform probability distributions across different outcomes.
                    </p>
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <Input
                          type="number"
                          value={cardCount}
                          onChange={(e) => setCardCount(parseInt(e.target.value) || 1)}
                          min="1"
                          max="52"
                          className="w-20"
                          disabled={isRunning}
                        />
                        <span className="text-sm text-muted-foreground">cards</span>
                        <Select value={requiredCardSuit} onValueChange={setRequiredCardSuit} disabled={isRunning}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="♠">♠ Spades</SelectItem>
                            <SelectItem value="♥">♥ Hearts</SelectItem>
                            <SelectItem value="♦">♦ Diamonds</SelectItem>
                            <SelectItem value="♣">♣ Clubs</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={requiredCardNumber} onValueChange={setRequiredCardNumber} disabled={isRunning}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="All">All</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="K">K</SelectItem>
                            <SelectItem value="Q">Q</SelectItem>
                            <SelectItem value="J">J</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="9">9</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                            <SelectItem value="7">7</SelectItem>
                            <SelectItem value="6">6</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-muted-foreground">required</span>
                        <Button
                          onClick={simulateCardDraw}
                          disabled={isCardRunning}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isCardRunning ? "Drawing..." : "Draw Cards"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetExperiment}
                          disabled={isCardRunning}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>

                      {isCardRunning && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <img 
                            src="/card-playing.gif" 
                            alt="Card playing animation" 
                            className="w-24 h-24 object-contain"
                          />
                          <p className="text-sm text-muted-foreground mt-2">Drawing cards...</p>
                        </div>
                      )}

                      {cardDraws.length > 0 && !isCardRunning && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Card Results:</h5>
                          <div className="flex flex-wrap gap-1">
                            {cardDraws.map((result, index) => (
                              <Badge key={index} variant="outline" className="font-mono">
                                {result}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Total cards drawn: {cardDraws.length}
                          </div>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm font-medium">
                              Overall Probability for {requiredCardNumber === 'All' ? `All ${requiredCardSuit}` : `${requiredCardNumber}${requiredCardSuit}`}: 
                              <span className="ml-2 text-lg font-bold text-primary">
                                P = {calculateOverallCardProbability()}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              Expected: {requiredCardNumber === 'All' ? '0.250 (1/4)' : '0.019 (1/52)'}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h6 className="font-medium text-sm">Suit Distribution:</h6>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="flex justify-between">
                                <span>♠ Spades:</span>
                                <span>P = {calculateCardProbability('♠')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>♥ Hearts:</span>
                                <span>P = {calculateCardProbability('♥')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>♦ Diamonds:</span>
                                <span>P = {calculateCardProbability('♦')}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>♣ Clubs:</span>
                                <span>P = {calculateCardProbability('♣')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle>Python Implementation</CardTitle>
                <CardDescription>
                  Code examples for implementing probability theory concepts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">1. Basic Probability Simulation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import numpy as np
import matplotlib.pyplot as plt

# Simulate dice rolls
def simulate_dice_rolls(n_rolls=1000):
    rolls = np.random.randint(1, 7, n_rolls)
    return rolls

# Calculate probability distribution
def calculate_probability_distribution(rolls):
    unique, counts = np.unique(rolls, return_counts=True)
    probabilities = counts / len(rolls)
    return unique, probabilities

# Example usage
rolls = simulate_dice_rolls(1000)
values, probs = calculate_probability_distribution(rolls)
print("Probability distribution:", dict(zip(values, probs)))`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">2. Visualization with Matplotlib</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import matplotlib.pyplot as plt

def plot_probability_distribution(values, probabilities):
    plt.figure(figsize=(10, 6))
    plt.bar(values, probabilities, alpha=0.7, color='skyblue')
    plt.xlabel('Dice Value')
    plt.ylabel('Probability')
    plt.title('Probability Distribution of Dice Rolls')
    plt.grid(True, alpha=0.3)
    plt.show()

# Plot the distribution
plot_probability_distribution(values, probs)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">3. Expected Value and Variance</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`def calculate_expected_value(values, probabilities):
    return np.sum(values * probabilities)

def calculate_variance(values, probabilities, expected_value):
    return np.sum(probabilities * (values - expected_value)**2)

# Calculate statistics
expected_val = calculate_expected_value(values, probs)
variance = calculate_variance(values, probs, expected_val)
std_dev = np.sqrt(variance)

print(f"Expected Value: {expected_val:.3f}")
print(f"Variance: {variance:.3f}")
print(f"Standard Deviation: {std_dev:.3f}")`}</pre>
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

export default Experiment1;
