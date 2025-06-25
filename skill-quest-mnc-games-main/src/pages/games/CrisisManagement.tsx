
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { GameProgress, GameTimer, GameFeedback, GameChoice } from "@/components/GameComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, FileText, ShieldAlert } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Game data
const gameScenario = {
  title: "Cybersecurity Crisis Simulation",
  description: "Your company is experiencing a cybersecurity breach. You must respond quickly to minimize damage.",
  timeLimit: 30, // seconds per decision
  stages: [
    {
      id: 1,
      title: "Initial Detection",
      description: "Your security team has detected unusual network activity indicating a possible breach.",
      question: "What's your first response?",
      options: [
        {
          id: "1a",
          text: "Immediately shut down all systems",
          isCorrect: false,
          feedback: "This causes significant business disruption before confirming the threat."
        },
        {
          id: "1b",
          text: "Notify only the IT department and continue investigation",
          isCorrect: true,
          feedback: "Good first step - gather more information before wider action."
        },
        {
          id: "1c",
          text: "Ignore it as a false alarm",
          isCorrect: false,
          feedback: "Never ignore security alerts without investigation."
        },
        {
          id: "1d",
          text: "Publicly announce the possible breach",
          isCorrect: false,
          feedback: "Premature disclosure before assessment could cause unnecessary panic."
        }
      ]
    },
    {
      id: 2,
      title: "Breach Confirmation",
      description: "The IT team confirms customer data has been compromised. Around 50,000 user records may be affected.",
      question: "What's your next step?",
      options: [
        {
          id: "2a",
          text: "Quietly fix the vulnerability without telling customers",
          isCorrect: false,
          feedback: "This violates transparency principles and possibly legal requirements."
        },
        {
          id: "2b",
          text: "Notify only those customers whose data was definitely compromised",
          isCorrect: false,
          feedback: "Without knowing the full scope, this risks missing affected customers."
        },
        {
          id: "2c",
          text: "Prepare comprehensive communication for all potentially affected customers",
          isCorrect: true,
          feedback: "Transparent communication builds trust and meets regulatory requirements."
        },
        {
          id: "2d",
          text: "Blame the breach on a third-party vendor",
          isCorrect: false,
          feedback: "Deflecting responsibility damages credibility and relationships."
        }
      ]
    },
    {
      id: 3,
      title: "Media Response",
      description: "News of the breach has leaked to the press. Reporters are calling for comments.",
      question: "How do you handle media inquiries?",
      options: [
        {
          id: "3a",
          text: "Issue a brief 'no comment' statement",
          isCorrect: false,
          feedback: "This appears evasive and increases speculation."
        },
        {
          id: "3b",
          text: "Provide a detailed technical explanation of what happened",
          isCorrect: false,
          feedback: "Technical details could enable copycat attacks and confuse most audiences."
        },
        {
          id: "3c",
          text: "Deny the severity of the breach",
          isCorrect: false,
          feedback: "Downplaying a serious incident damages credibility when the full scope emerges."
        },
        {
          id: "3d",
          text: "Release a transparent statement acknowledging the breach and outlining response steps",
          isCorrect: true,
          feedback: "Transparency with appropriate detail builds trust during crisis management."
        }
      ]
    },
    {
      id: 4,
      title: "Recovery Actions",
      description: "The immediate crisis has been contained. Now you need to prevent future incidents.",
      question: "What long-term action do you prioritize?",
      options: [
        {
          id: "4a",
          text: "Fire someone from the IT security team",
          isCorrect: false,
          feedback: "Scapegoating doesn't address systemic issues and damages team morale."
        },
        {
          id: "4b",
          text: "Implement a comprehensive security audit and improvement plan",
          isCorrect: true,
          feedback: "A systematic approach addresses root causes rather than symptoms."
        },
        {
          id: "4c",
          text: "Return to normal operations as quickly as possible",
          isCorrect: false,
          feedback: "Rushing back to normal without fixing vulnerabilities invites repeat incidents."
        },
        {
          id: "4d",
          text: "Outsource all security to a third-party vendor",
          isCorrect: false,
          feedback: "While vendors can help, fully outsourcing abdicates responsibility for core business risks."
        }
      ]
    }
  ]
};

const CrisisManagement = () => {
  const { toast } = useToast();
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeExpired, setTimeExpired] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const stage = gameScenario.stages[currentStage];

  useEffect(() => {
    // Calculate progress percentage
    const progressPercent = (currentStage / gameScenario.stages.length) * 100;
    setProgress(progressPercent);
  }, [currentStage]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (!selectedOption) return;
    
    const option = stage.options.find(o => o.id === selectedOption);
    if (!option) return;
    
    if (option.isCorrect) {
      setScore(prevScore => prevScore + 1);
      toast({
        title: "Good decision!",
        description: "That was the right call.",
        variant: "default",
      });
    } else {
      toast({
        title: "Room for improvement",
        description: "Not the optimal decision.",
        variant: "destructive",
      });
    }
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentStage >= gameScenario.stages.length - 1) {
      setGameOver(true);
    } else {
      setCurrentStage(prevStage => prevStage + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setTimeExpired(false);
    }
  };

  const handleTimeExpired = () => {
    if (!selectedOption) {
      setTimeExpired(true);
      toast({
        title: "Time expired!",
        description: "You must make decisions quickly in a crisis.",
        variant: "destructive",
      });
    }
  };

  const restartGame = () => {
    setCurrentStage(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setTimeExpired(false);
    setGameOver(false);
    setProgress(0);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8" />
              {gameScenario.title}
            </h1>
            <p className="text-muted-foreground">{gameScenario.description}</p>
          </div>
        </div>

        <GameProgress value={progress} />

        {gameOver ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Crisis Response Evaluation</CardTitle>
              <CardDescription>See how well you managed the cybersecurity crisis</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Your Score: {score}/{gameScenario.stages.length}</h3>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${(score / gameScenario.stages.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="mb-4">
                {score === gameScenario.stages.length 
                  ? "Perfect! You handled this crisis masterfully." 
                  : score >= gameScenario.stages.length / 2 
                  ? "Good job! You managed the crisis reasonably well." 
                  : "There's room for improvement in your crisis management skills."}
              </p>

              <div className="mt-4 p-4 bg-secondary rounded-md">
                <h4 className="font-semibold mb-2">Key Crisis Management Principles:</h4>
                <ul className="text-left list-disc list-inside">
                  <li>Gather information before taking major actions</li>
                  <li>Communicate transparently with affected parties</li>
                  <li>Have clear roles and responsibilities during a crisis</li>
                  <li>Address root causes, not just symptoms</li>
                  <li>Document lessons learned for future improvement</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={restartGame}>Try Again</Button>
            </CardFooter>
          </Card>
        ) : stage ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{stage.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  <GameTimer 
                    seconds={gameScenario.timeLimit} 
                    onComplete={handleTimeExpired}
                  />
                </div>
              </div>
              <CardDescription>{stage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-medium mb-4">{stage.question}</h3>

              {timeExpired && !selectedOption && (
                <GameFeedback type="warning">
                  <p>You ran out of time! In a crisis, delayed decisions can worsen outcomes.</p>
                </GameFeedback>
              )}

              {showFeedback && selectedOption ? (
                <div className="mb-4">
                  <GameFeedback 
                    type={stage.options.find(o => o.id === selectedOption)?.isCorrect ? "success" : "error"}
                  >
                    <p>{stage.options.find(o => o.id === selectedOption)?.feedback}</p>
                  </GameFeedback>
                </div>
              ) : (
                <div className="space-y-2">
                  {stage.options.map((option) => (
                    <GameChoice
                      key={option.id}
                      label={option.text}
                      selected={selectedOption === option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      disabled={timeExpired || showFeedback}
                      correct={showFeedback && selectedOption === option.id && option.isCorrect}
                      incorrect={showFeedback && selectedOption === option.id && !option.isCorrect}
                    />
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {showFeedback || timeExpired ? (
                <Button onClick={handleNext}>
                  {currentStage >= gameScenario.stages.length - 1 ? "See Results" : "Next Stage"}
                </Button>
              ) : (
                <Button 
                  onClick={handleConfirm} 
                  disabled={!selectedOption}
                >
                  Confirm Decision
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
};

export default CrisisManagement;
