
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GameProgress } from "@/components/GameComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, User, Briefcase, DollarSign, ChevronRight } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";

// Game data
const negotiationScenario = {
  title: "Sales & Negotiation Simulation",
  description: "You're a sales representative negotiating a software deal with a potential client.",
  clientBudget: 80000, // Client's actual budget
  clientPriorities: {
    price: 0.4, // 40% weight on price
    features: 0.3, // 30% weight on features
    support: 0.2, // 20% weight on support
    timeline: 0.1, // 10% weight on implementation timeline
  },
  stages: [
    {
      id: 1,
      title: "Initial Contact",
      description: "You're meeting the client for the first time. What's your approach?",
      options: [
        {
          id: "1a",
          text: "Launch directly into your sales pitch",
          result: "The client seems disinterested as you haven't taken time to understand their needs.",
          rapport: -10,
          insight: 0,
        },
        {
          id: "1b",
          text: "Ask open-ended questions about their business needs",
          result: "The client appreciates your interest in understanding their specific situation.",
          rapport: 20,
          insight: 15,
        },
        {
          id: "1c",
          text: "Share case studies from similar clients",
          result: "The client is engaged but wishes you'd asked about their unique situation first.",
          rapport: 5,
          insight: 5,
        },
        {
          id: "1d",
          text: "Suggest a solution immediately based on your first impression",
          result: "The client feels you're making assumptions without proper discovery.",
          rapport: -5,
          insight: -5,
        },
      ],
    },
    {
      id: 2,
      title: "Discovery Discussion",
      description: "You learn the client needs a CRM solution for a 50-person sales team with integration capabilities.",
      options: [
        {
          id: "2a",
          text: "Focus on all technical features of your solution",
          result: "The client is overwhelmed with technical details that don't all seem relevant to their needs.",
          rapport: -5,
          insight: 5,
        },
        {
          id: "2b",
          text: "Ask about their current pain points and processes",
          result: "The client reveals critical information about workflow issues you can address.",
          rapport: 15,
          insight: 20,
        },
        {
          id: "2c",
          text: "Talk about how much time/money they'll save",
          result: "The client is interested but wants more specifics relevant to their situation.",
          rapport: 5,
          insight: 5,
        },
        {
          id: "2d",
          text: "Compare your solution to competitors they mentioned",
          result: "The client appreciates the comparative analysis but wonders if you're focusing too much on competition.",
          rapport: 0,
          insight: 10,
        },
      ],
    },
    {
      id: 3,
      title: "Budget Discussion",
      description: "It's time to discuss pricing. The client hasn't mentioned their budget yet.",
      options: [
        {
          id: "3a",
          text: "Ask directly: 'What's your budget for this project?'",
          result: "The client is reluctant to share a specific number and deflects the question.",
          rapport: -5,
          insight: 5,
        },
        {
          id: "3b",
          text: "Present your highest package price first",
          result: "The client appears concerned about the cost and questions if they need all included features.",
          rapport: -10,
          insight: 10,
        },
        {
          id: "3c",
          text: "Provide a range of options at different price points",
          result: "The client engages with the different options, showing most interest in the middle tier.",
          rapport: 10,
          insight: 15,
        },
        {
          id: "3d",
          text: "Ask about the value they expect from the solution before discussing price",
          result: "The client openly discusses expected ROI, giving you insight into what they might be willing to spend.",
          rapport: 15,
          insight: 20,
        },
      ],
    },
  ],
  negotiationStage: {
    description: "After several discussions, it's time to finalize the deal. Make your proposal:",
    basePrice: 75000,
    sliders: [
      {
        id: "price",
        name: "Price Discount",
        min: 0,
        max: 30,
        step: 5,
        default: 0,
        format: (val) => `${val}%`,
      },
      {
        id: "features",
        name: "Premium Features",
        min: 1,
        max: 5,
        step: 1,
        default: 3,
        format: (val) => `${val}/5`,
      },
      {
        id: "support",
        name: "Support Level",
        min: 1,
        max: 3,
        step: 1,
        default: 1,
        format: (val) => ["Basic", "Standard", "Premium"][val - 1],
      },
      {
        id: "timeline",
        name: "Implementation Time",
        min: 1,
        max: 6,
        step: 1,
        default: 3,
        format: (val) => `${val} ${val === 1 ? "month" : "months"}`,
      },
    ],
  },
};

const NegotiationGame = () => {
  const { toast } = useToast();
  const [stage, setStage] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameState, setGameState] = useState({
    rapport: 50,
    insight: 0,
    completed: false,
  });
  
  // For the negotiation stage
  const [sliderValues, setSliderValues] = useState({
    price: 0, // Discount percentage
    features: 3, // Number of premium features
    support: 1, // Support level
    timeline: 3, // Implementation time in months
  });
  
  const [negotiationComplete, setNegotiationComplete] = useState(false);
  const [dealAccepted, setDealAccepted] = useState(false);
  const [clientFeedback, setClientFeedback] = useState("");
  
  const currentScenarioStage = stage <= negotiationScenario.stages.length
    ? negotiationScenario.stages[stage - 1]
    : null;
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const confirmSelection = () => {
    if (!selectedOption || !currentScenarioStage) return;
    
    const option = currentScenarioStage.options.find(o => o.id === selectedOption);
    if (!option) return;
    
    // Update game state based on selection
    setGameState(prev => ({
      ...prev,
      rapport: Math.max(0, Math.min(100, prev.rapport + option.rapport)),
      insight: Math.max(0, Math.min(100, prev.insight + option.insight)),
    }));
    
    setShowResult(true);
    
    toast({
      title: "Response noted!",
      description: `You chose: ${option.text}`,
    });
  };
  
  const nextStage = () => {
    if (stage >= negotiationScenario.stages.length) {
      // Move to the final negotiation stage
      setGameState(prev => ({
        ...prev,
        completed: true,
      }));
    } else {
      // Move to next regular stage
      setStage(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };
  
  const handleSliderChange = (sliderId: string, value: number[]) => {
    setSliderValues(prev => ({
      ...prev,
      [sliderId]: value[0],
    }));
  };
  
  const calculateFinalPrice = () => {
    const basePrice = negotiationScenario.negotiationStage.basePrice;
    const discount = sliderValues.price / 100;
    return basePrice * (1 - discount);
  };
  
  const submitProposal = () => {
    // Calculate how well the proposal matches client preferences
    const finalPrice = calculateFinalPrice();
    const priceScore = finalPrice <= negotiationScenario.clientBudget
      ? 100
      : 100 - ((finalPrice - negotiationScenario.clientBudget) / negotiationScenario.clientBudget * 100);
    
    const featureScore = (sliderValues.features / 5) * 100;
    
    const supportScore = (sliderValues.support / 3) * 100;
    
    // Lower timeline is better (faster implementation)
    const timelineScore = ((7 - sliderValues.timeline) / 6) * 100;
    
    // Weight the scores according to client priorities
    const totalScore = 
      (priceScore * negotiationScenario.clientPriorities.price) +
      (featureScore * negotiationScenario.clientPriorities.features) +
      (supportScore * negotiationScenario.clientPriorities.support) +
      (timelineScore * negotiationScenario.clientPriorities.timeline);
    
    // Factor in rapport from previous stages
    const adjustedScore = totalScore * (0.7 + (gameState.rapport / 100 * 0.3));
    
    setNegotiationComplete(true);
    
    // Determine if deal is accepted based on the score
    if (adjustedScore >= 75) {
      setDealAccepted(true);
      setClientFeedback("Your proposal has been accepted! The client is impressed with how well you understood their needs.");
      toast({
        title: "Deal Accepted!",
        description: "Congratulations on closing the sale!",
      });
    } else if (adjustedScore >= 60) {
      setDealAccepted(true);
      setClientFeedback("The client accepts your proposal, though they mention they had to compromise on some aspects.");
      toast({
        title: "Deal Accepted",
        description: "The client has agreed to your terms.",
      });
    } else {
      setDealAccepted(false);
      setClientFeedback("The client has declined your proposal, stating it doesn't adequately address their requirements and budget constraints.");
      toast({
        title: "Deal Rejected",
        description: "Your proposal didn't meet the client's expectations.",
        variant: "destructive",
      });
    }
  };
  
  const restartGame = () => {
    setStage(1);
    setSelectedOption(null);
    setShowResult(false);
    setGameState({
      rapport: 50,
      insight: 0,
      completed: false,
    });
    setSliderValues({
      price: 0,
      features: 3,
      support: 1,
      timeline: 3,
    });
    setNegotiationComplete(false);
    setDealAccepted(false);
    setClientFeedback("");
  };
  
  // Calculate progress percentage
  const progressValue = gameState.completed 
    ? (negotiationComplete ? 100 : 90) 
    : ((stage - 1) / negotiationScenario.stages.length) * 90;
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              {negotiationScenario.title}
            </h1>
            <p className="text-muted-foreground">{negotiationScenario.description}</p>
          </div>
        </div>
        
        <GameProgress value={progressValue} />
        
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Client Rapport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <User className="h-6 w-6 text-blue-500" />
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      gameState.rapport >= 70 
                        ? 'bg-green-500' 
                        : gameState.rapport >= 40 
                        ? 'bg-yellow-500' 
                        : 'bg-red-500'
                    }`} 
                    style={{ width: `${gameState.rapport}%` }}
                  ></div>
                </div>
                <span className="text-sm">{gameState.rapport}%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Client Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Briefcase className="h-6 w-6 text-purple-500" />
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${gameState.insight}%` }}
                  ></div>
                </div>
                <span className="text-sm">{gameState.insight}%</span>
              </div>
            </CardContent>
          </Card>
          
          {gameState.completed && !negotiationComplete && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Deal Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-green-500" />
                  <span className="text-xl font-bold">${calculateFinalPrice().toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Regular stages */}
        {!gameState.completed && currentScenarioStage && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{currentScenarioStage.title}</CardTitle>
              <CardDescription>{currentScenarioStage.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {showResult && selectedOption ? (
                <div className="p-4 bg-secondary rounded-md mb-4">
                  <p className="font-medium">Result:</p>
                  <p className="text-muted-foreground">
                    {currentScenarioStage.options.find(o => o.id === selectedOption)?.result}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {currentScenarioStage.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 border rounded-md hover:bg-secondary cursor-pointer ${
                        selectedOption === option.id ? "border-primary" : ""
                      }`}
                      onClick={() => handleOptionSelect(option.id)}
                    >
                      {option.text}
                      {selectedOption === option.id && (
                        <ChevronRight className="inline ml-2 h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {showResult ? (
                <Button onClick={nextStage}>
                  {stage >= negotiationScenario.stages.length ? "Proceed to Final Negotiation" : "Next Stage"}
                </Button>
              ) : (
                <Button onClick={confirmSelection} disabled={!selectedOption}>
                  Confirm Selection
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
        
        {/* Final negotiation stage */}
        {gameState.completed && !negotiationComplete && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Final Negotiation</CardTitle>
              <CardDescription>
                {negotiationScenario.negotiationStage.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {negotiationScenario.negotiationStage.sliders.map((slider) => (
                <div key={slider.id} className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium">{slider.name}</label>
                    <span className="text-sm">
                      {typeof slider.format === 'function' 
                        ? slider.format(sliderValues[slider.id as keyof typeof sliderValues]) 
                        : sliderValues[slider.id as keyof typeof sliderValues]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[slider.default]}
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={[sliderValues[slider.id as keyof typeof sliderValues]]}
                    onValueChange={(value) => handleSliderChange(slider.id, value)}
                  />
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Final Price:</span>
                  <span>${calculateFinalPrice().toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={submitProposal}>
                Submit Proposal
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {/* Game result */}
        {negotiationComplete && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {dealAccepted ? "Deal Accepted!" : "Deal Rejected"}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className={`mb-8 p-6 rounded-md ${dealAccepted ? "bg-green-50" : "bg-red-50"}`}>
                <p className="text-lg">{clientFeedback}</p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 mb-6">
                <div className="p-4 bg-secondary rounded-md">
                  <h3 className="font-bold mb-2">Your Negotiation Strategy</h3>
                  <ul className="text-left space-y-2">
                    <li>Price Discount: {sliderValues.price}%</li>
                    <li>Premium Features: {sliderValues.features}/5</li>
                    <li>Support Level: {["Basic", "Standard", "Premium"][sliderValues.support - 1]}</li>
                    <li>Implementation Time: {sliderValues.timeline} months</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-secondary rounded-md">
                  <h3 className="font-bold mb-2">Client Relationship</h3>
                  <ul className="text-left space-y-2">
                    <li>Rapport Built: {gameState.rapport}%</li>
                    <li>Needs Understanding: {gameState.insight}%</li>
                    <li>Final Deal Value: ${calculateFinalPrice().toLocaleString()}</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-bold mb-2">Key Negotiation Insights:</h3>
                <ul className="text-left list-disc list-inside">
                  <li>Building rapport before negotiating increases success chances</li>
                  <li>Understanding client priorities helps tailor your proposal</li>
                  <li>Price is rarely the only factor in decision making</li>
                  <li>Successful negotiations balance your profit with client value</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={restartGame}>Start New Negotiation</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default NegotiationGame;
