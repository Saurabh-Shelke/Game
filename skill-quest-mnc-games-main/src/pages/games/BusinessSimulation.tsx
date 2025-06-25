
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GameProgress, GameScore, GameFeedback, GameChoice } from "@/components/GameComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Briefcase, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Game data
const gameScenario = {
  title: "Business Strategy Simulation",
  description: "You are the CEO of a tech startup. Make strategic decisions to grow your company.",
  rounds: [
    {
      id: 1,
      scenario: "Your company has $500,000 in investment funds. Where do you allocate it?",
      choices: [
        { id: "1a", text: "Hire more developers to improve your product", impact: { revenue: 20000, reputation: 5, talent: 20 } },
        { id: "1b", text: "Invest in marketing and customer acquisition", impact: { revenue: 50000, reputation: 15, talent: -5 } },
        { id: "1c", text: "Rent a prestigious office space", impact: { revenue: -10000, reputation: 10, talent: 10 } },
        { id: "1d", text: "Research and develop new products", impact: { revenue: -20000, reputation: 0, talent: 5 } }
      ],
      feedback: {
        "1a": "Good choice for long-term product quality, but slower revenue growth.",
        "1b": "Strong immediate revenue impact, but talent development suffers.",
        "1c": "Improved company image but high overhead costs.",
        "1d": "Investment in R&D will take time to pay off."
      }
    },
    {
      id: 2,
      scenario: "A competitor has launched a similar product at a lower price. How do you respond?",
      choices: [
        { id: "2a", text: "Lower your prices to match theirs", impact: { revenue: -30000, reputation: -5, talent: 0 } },
        { id: "2b", text: "Highlight your product's superior quality and features", impact: { revenue: 10000, reputation: 10, talent: 5 } },
        { id: "2c", text: "Add new features to differentiate your product", impact: { revenue: -10000, reputation: 15, talent: 10 } },
        { id: "2d", text: "Ignore them and continue with your current strategy", impact: { revenue: -20000, reputation: -10, talent: -5 } }
      ],
      feedback: {
        "2a": "Price war negatively impacts your margins.",
        "2b": "Effective differentiation maintains your market position.",
        "2c": "Product improvements strengthen your position but cost development resources.",
        "2d": "Ignoring competitive threats can erode market share."
      }
    },
    {
      id: 3,
      scenario: "Your team is experiencing burnout. What action do you take?",
      choices: [
        { id: "3a", text: "Implement a four-day workweek", impact: { revenue: -15000, reputation: 5, talent: 25 } },
        { id: "3b", text: "Hire more staff to distribute the workload", impact: { revenue: -25000, reputation: 5, talent: 15 } },
        { id: "3c", text: "Offer bonuses for completing projects", impact: { revenue: -20000, reputation: 0, talent: 10 } },
        { id: "3d", text: "Organize team-building activities", impact: { revenue: -5000, reputation: 0, talent: 5 } }
      ],
      feedback: {
        "3a": "Significant boost to team morale and retention with some productivity impacts.",
        "3b": "Expanded team capacity but increased overhead costs.",
        "3c": "Short-term motivation but doesn't address underlying burnout issues.",
        "3d": "Minor morale improvement but doesn't solve workload problems."
      }
    },
    {
      id: 4,
      scenario: "An investor offers $2 million for 25% equity in your company. Do you:",
      choices: [
        { id: "4a", text: "Accept the offer", impact: { revenue: 200000, reputation: 20, talent: 10 } },
        { id: "4b", text: "Counter with 15% equity for the same amount", impact: { revenue: 0, reputation: 5, talent: 0 } },
        { id: "4c", text: "Decline and seek other investors", impact: { revenue: -10000, reputation: -5, talent: -5 } },
        { id: "4d", text: "Bootstrap and grow without external investment", impact: { revenue: -50000, reputation: -10, talent: -10 } }
      ],
      feedback: {
        "4a": "Significant capital infusion but substantial equity dilution.",
        "4b": "Negotiation shows business acumen but risks losing the deal.",
        "4c": "Maintaining control but delays growth opportunities.",
        "4d": "Preserves full ownership but significantly slower growth."
      }
    }
  ]
};

const BusinessSimulation = () => {
  const { toast } = useToast();
  const [companyState, setCompanyState] = useState({
    revenue: 100000,
    reputation: 50,
    talent: 50,
    round: 1,
    history: [] as string[],
    gameOver: false
  });
  const [currentChoice, setCurrentChoice] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentRound = gameScenario.rounds.find(r => r.id === companyState.round);
  
  useEffect(() => {
    // Calculate progress percentage
    const progressPercent = ((companyState.round - 1) / gameScenario.rounds.length) * 100;
    setProgress(progressPercent);
  }, [companyState.round]);

  const handleChoice = (choiceId: string) => {
    setCurrentChoice(choiceId);
  };

  const confirmChoice = () => {
    if (!currentChoice || !currentRound) return;
    
    const choice = currentRound.choices.find(c => c.id === currentChoice);
    if (!choice) return;
    
    // Apply impacts to company state
    setCompanyState(prev => ({
      ...prev,
      revenue: prev.revenue + choice.impact.revenue,
      reputation: Math.max(0, Math.min(100, prev.reputation + choice.impact.reputation)),
      talent: Math.max(0, Math.min(100, prev.talent + choice.impact.talent)),
      history: [...prev.history, currentChoice],
    }));
    
    setShowFeedback(true);
    
    toast({
      title: "Decision Made!",
      description: `You chose: ${choice.text}`,
    });
  };

  const nextRound = () => {
    if (companyState.round >= gameScenario.rounds.length) {
      setCompanyState(prev => ({ ...prev, gameOver: true }));
    } else {
      setCompanyState(prev => ({ ...prev, round: prev.round + 1 }));
      setCurrentChoice(null);
      setShowFeedback(false);
    }
  };

  const restartGame = () => {
    setCompanyState({
      revenue: 100000,
      reputation: 50,
      talent: 50,
      round: 1,
      history: [],
      gameOver: false
    });
    setCurrentChoice(null);
    setShowFeedback(false);
    setProgress(0);
  };

  const calculateScore = () => {
    return Math.round((companyState.revenue / 1000) + companyState.reputation + companyState.talent);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Briefcase className="h-8 w-8" />
              {gameScenario.title}
            </h1>
            <p className="text-muted-foreground">{gameScenario.description}</p>
          </div>
        </div>

        <GameProgress value={progress} />

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${companyState.revenue < 0 ? 'text-red-500' : ''}`}>
                ${companyState.revenue.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Reputation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{companyState.reputation}/100</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Talent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{companyState.talent}/100</p>
            </CardContent>
          </Card>
        </div>

        {companyState.gameOver ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Game Complete!</CardTitle>
              <CardDescription>Let's see how your company performed</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <GameScore score={calculateScore()} maxScore={300} />
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Final Company Status</h3>
                <p className="mb-1">Revenue: ${companyState.revenue.toLocaleString()}</p>
                <p className="mb-1">Company Reputation: {companyState.reputation}/100</p>
                <p className="mb-1">Talent Satisfaction: {companyState.talent}/100</p>
                <p className="mt-4 text-lg">
                  {calculateScore() > 200
                    ? "Excellent! Your company is thriving under your leadership."
                    : calculateScore() > 150
                    ? "Good job! Your company is performing well in the market."
                    : "Your company survived but has room for improvement."}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={restartGame}>Play Again</Button>
            </CardFooter>
          </Card>
        ) : currentRound ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Round {currentRound.id}: Decision Point</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-lg">{currentRound.scenario}</p>

              {showFeedback && currentChoice ? (
                <GameFeedback type="info">
                  <p>{currentRound.feedback[currentChoice as keyof typeof currentRound.feedback]}</p>
                </GameFeedback>
              ) : (
                <div className="space-y-2">
                  {currentRound.choices.map((choice) => (
                    <GameChoice
                      key={choice.id}
                      label={choice.text}
                      selected={currentChoice === choice.id}
                      onClick={() => handleChoice(choice.id)}
                      disabled={showFeedback}
                    />
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {showFeedback ? (
                <Button onClick={nextRound}>
                  {companyState.round >= gameScenario.rounds.length ? "See Results" : "Next Round"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={confirmChoice} disabled={!currentChoice}>
                  Confirm Decision
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
};

export default BusinessSimulation;
