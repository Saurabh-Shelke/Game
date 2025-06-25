
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { GameProgress, GameFeedback } from "@/components/GameComponents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Award, BarChart, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Game data
const leadershipScenario = {
  title: "Team Leadership Simulation",
  description: "You're leading a cross-functional team on a high-priority project with a tight deadline.",
  project: {
    name: "NextGen Product Launch",
    deadline: "6 weeks",
    teamSize: 8,
    budget: 150000,
  },
  metrics: [
    {
      id: "morale",
      name: "Team Morale",
      icon: <Users className="h-5 w-5" />,
      startValue: 70,
    },
    {
      id: "progress",
      name: "Project Progress",
      icon: <BarChart className="h-5 w-5" />,
      startValue: 0,
    },
    {
      id: "quality",
      name: "Quality Score",
      icon: <Award className="h-5 w-5" />,
      startValue: 75,
    },
    {
      id: "timeRemaining",
      name: "Time Remaining",
      icon: <Clock className="h-5 w-5" />,
      startValue: 6, // weeks
    },
  ],
  team: [
    {
      id: "alex",
      name: "Alex",
      role: "Senior Developer",
      skills: ["Coding", "Architecture"],
      traits: "Experienced but works independently, sometimes doesn't communicate well with others.",
      image: "👨‍💻",
    },
    {
      id: "jamie",
      name: "Jamie",
      role: "UX Designer",
      skills: ["Design", "User Research"],
      traits: "Creative and detail-oriented but tends to miss deadlines.",
      image: "👩‍🎨",
    },
    {
      id: "taylor",
      name: "Taylor",
      role: "Product Manager",
      skills: ["Strategy", "Market Analysis"],
      traits: "Strategic thinker but sometimes gets caught in analysis paralysis.",
      image: "🧑‍💼",
    },
    {
      id: "morgan",
      name: "Morgan",
      role: "QA Specialist",
      skills: ["Testing", "Quality Assurance"],
      traits: "Thorough and detail-oriented but can be resistant to change.",
      image: "👩‍🔬",
    },
    {
      id: "casey",
      name: "Casey",
      role: "Junior Developer",
      skills: ["Coding", "Learning Quickly"],
      traits: "Enthusiastic but inexperienced and needs mentorship.",
      image: "🧑‍💻",
    },
  ],
  weeks: [
    {
      week: 1,
      title: "Project Kickoff",
      description: "It's time to start the project. How will you organize the team?",
      options: [
        {
          id: "1a",
          text: "Assign specific tasks to each team member based on their roles",
          impact: { morale: 0, progress: 10, quality: 5, timeRemaining: -1 },
          feedback: "Team members understand their immediate responsibilities but might miss the bigger picture.",
        },
        {
          id: "1b",
          text: "Hold a collaborative session to define project goals and allow team members to volunteer for responsibilities",
          impact: { morale: 10, progress: 5, quality: 10, timeRemaining: -1 },
          feedback: "The team feels engaged and takes ownership, though the kickoff process takes a bit longer.",
        },
        {
          id: "1c",
          text: "Create detailed documentation and a strict schedule for everyone to follow",
          impact: { morale: -10, progress: 15, quality: 5, timeRemaining: -1 },
          feedback: "The team has clear guidance but feels micromanaged and less creative.",
        },
        {
          id: "1d",
          text: "Focus on relationship building exercises first, then gradually introduce project details",
          impact: { morale: 15, progress: -5, quality: 0, timeRemaining: -1 },
          feedback: "Team bonding improves but the project gets a slower start than expected.",
        },
      ],
    },
    {
      week: 2,
      title: "Technical Challenge",
      description: "Alex, your senior developer, identifies a major technical challenge that wasn't anticipated.",
      options: [
        {
          id: "2a",
          text: "Ask Alex to handle it independently since they're the most experienced",
          impact: { morale: -5, progress: 5, quality: -10, timeRemaining: -1 },
          feedback: "Alex feels overloaded and the solution lacks input from other team members.",
        },
        {
          id: "2b",
          text: "Organize a problem-solving session with the whole team",
          impact: { morale: 10, progress: 10, quality: 15, timeRemaining: -1 },
          feedback: "The collaborative approach yields a creative solution and strengthens team dynamics.",
        },
        {
          id: "2c",
          text: "Bring in an external consultant to solve the problem quickly",
          impact: { morale: -10, progress: 15, quality: 5, timeRemaining: -1 },
          feedback: "The solution is implemented quickly but the team feels their capabilities were doubted.",
        },
        {
          id: "2d",
          text: "Adjust the project scope to work around the challenge",
          impact: { morale: 5, progress: -5, quality: -15, timeRemaining: -1 },
          feedback: "The project moves forward but the final product will have limitations.",
        },
      ],
    },
    {
      week: 3,
      title: "Team Conflict",
      description: "Jamie (designer) and Morgan (QA) are having a disagreement about the user interface testing approach.",
      options: [
        {
          id: "3a",
          text: "Make an executive decision to resolve the conflict quickly",
          impact: { morale: -15, progress: 10, quality: -5, timeRemaining: -1 },
          feedback: "The conflict ends but both team members feel unheard and resentful.",
        },
        {
          id: "3b",
          text: "Facilitate a discussion between them to find common ground",
          impact: { morale: 15, progress: 5, quality: 10, timeRemaining: -1 },
          feedback: "They develop mutual respect and a stronger working relationship.",
        },
        {
          id: "3c",
          text: "Ask Taylor (product manager) to mediate and make the final call",
          impact: { morale: 5, progress: 5, quality: 5, timeRemaining: -1 },
          feedback: "The solution is balanced but it creates some dependency on Taylor for future conflicts.",
        },
        {
          id: "3d",
          text: "Separate their work streams to minimize interaction",
          impact: { morale: -5, progress: -5, quality: -10, timeRemaining: -1 },
          feedback: "The conflict is avoided but creates silos that harm the integrated quality of the project.",
        },
      ],
    },
    {
      week: 4,
      title: "Resource Constraint",
      description: "Your budget is running low, and Casey (junior dev) needs additional tools for development.",
      options: [
        {
          id: "4a",
          text: "Deny the request to stay within budget",
          impact: { morale: -10, progress: -10, quality: -10, timeRemaining: -1 },
          feedback: "Casey struggles with inadequate tools, affecting morale and productivity.",
        },
        {
          id: "4b",
          text: "Approve the request by reallocating funds from another area",
          impact: { morale: 10, progress: 5, quality: 5, timeRemaining: -1 },
          feedback: "Casey's productivity improves but you'll need to be creative with the budget elsewhere.",
        },
        {
          id: "4c",
          text: "Ask Alex to share resources and mentor Casey",
          impact: { morale: 5, progress: 5, quality: 10, timeRemaining: -1 },
          feedback: "This creates a valuable mentoring relationship but adds some workload to Alex.",
        },
        {
          id: "4d",
          text: "Find free/open-source alternatives to the needed tools",
          impact: { morale: 5, progress: 0, quality: -5, timeRemaining: -1 },
          feedback: "Budget is preserved but there's a learning curve and some limitations to the tools.",
        },
      ],
    },
    {
      week: 5,
      title: "Time Pressure",
      description: "With one week left, you're behind schedule. How do you address this?",
      options: [
        {
          id: "5a",
          text: "Require overtime from all team members",
          impact: { morale: -20, progress: 20, quality: -5, timeRemaining: -1 },
          feedback: "Progress accelerates but team morale plummets and quality suffers from fatigue.",
        },
        {
          id: "5b",
          text: "Prioritize features and cut non-essential elements",
          impact: { morale: 5, progress: 15, quality: 5, timeRemaining: -1 },
          feedback: "The team appreciates the focused approach and delivers a solid core product.",
        },
        {
          id: "5c",
          text: "Request a deadline extension from stakeholders",
          impact: { morale: 10, progress: 5, quality: 15, timeRemaining: 1 },
          feedback: "The extra time allows for better quality, but there's some disappointment about missing the original deadline.",
        },
        {
          id: "5d",
          text: "Bring in additional temporary team members",
          impact: { morale: -5, progress: 10, quality: -10, timeRemaining: -1 },
          feedback: "New people help with workload but integration challenges create inconsistencies in the product.",
        },
      ],
    },
  ],
};

const LeadershipGame = () => {
  const { toast } = useToast();
  const [currentWeek, setCurrentWeek] = useState(1);
  const [gameStatus, setGameStatus] = useState({
    morale: leadershipScenario.metrics.find(m => m.id === "morale")?.startValue || 70,
    progress: leadershipScenario.metrics.find(m => m.id === "progress")?.startValue || 0,
    quality: leadershipScenario.metrics.find(m => m.id === "quality")?.startValue || 75,
    timeRemaining: leadershipScenario.metrics.find(m => m.id === "timeRemaining")?.startValue || 6,
    decisions: [] as string[],
    gameComplete: false,
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const scenario = leadershipScenario.weeks.find(w => w.week === currentWeek);
  
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };
  
  const confirmDecision = () => {
    if (!selectedOption || !scenario) return;
    
    const option = scenario.options.find(o => o.id === selectedOption);
    if (!option) return;
    
    // Update game status with impacts
    setGameStatus(prev => ({
      ...prev,
      morale: Math.max(0, Math.min(100, prev.morale + option.impact.morale)),
      progress: Math.max(0, Math.min(100, prev.progress + option.impact.progress)),
      quality: Math.max(0, Math.min(100, prev.quality + option.impact.quality)),
      timeRemaining: prev.timeRemaining + option.impact.timeRemaining,
      decisions: [...prev.decisions, selectedOption],
    }));
    
    setShowFeedback(true);
    
    toast({
      title: "Decision Made!",
      description: `Week ${currentWeek}: ${option.text}`,
    });
  };
  
  const nextWeek = () => {
    if (currentWeek >= leadershipScenario.weeks.length || gameStatus.timeRemaining <= 0) {
      // Game complete
      setGameStatus(prev => ({
        ...prev,
        gameComplete: true,
      }));
    } else {
      // Move to next week
      setCurrentWeek(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };
  
  const restartGame = () => {
    setCurrentWeek(1);
    setGameStatus({
      morale: leadershipScenario.metrics.find(m => m.id === "morale")?.startValue || 70,
      progress: leadershipScenario.metrics.find(m => m.id === "progress")?.startValue || 0,
      quality: leadershipScenario.metrics.find(m => m.id === "quality")?.startValue || 75,
      timeRemaining: leadershipScenario.metrics.find(m => m.id === "timeRemaining")?.startValue || 6,
      decisions: [],
      gameComplete: false,
    });
    setSelectedOption(null);
    setShowFeedback(false);
  };
  
  const calculateLeadershipScore = () => {
    const moraleScore = gameStatus.morale * 0.3; // 30% weight
    const progressScore = gameStatus.progress * 0.3; // 30% weight
    const qualityScore = gameStatus.quality * 0.4; // 40% weight
    return Math.round(moraleScore + progressScore + qualityScore);
  };
  
  const getLeadershipStyle = () => {
    const decisions = gameStatus.decisions;
    
    // Count different types of decisions
    const collaborativeCount = decisions.filter(d => 
      d === "1b" || d === "2b" || d === "3b" || d === "4c").length;
      
    const directiveCount = decisions.filter(d => 
      d === "1a" || d === "1c" || d === "3a" || d === "5a").length;
      
    const adaptiveCount = decisions.filter(d => 
      d === "2d" || d === "4b" || d === "5b" || d === "5c").length;
      
    // Determine predominant style
    if (collaborativeCount >= Math.max(directiveCount, adaptiveCount)) {
      return {
        style: "Collaborative Leader",
        description: "You prioritize team input and shared decision-making. This approach builds strong team dynamics and creativity.",
      };
    } else if (directiveCount >= Math.max(collaborativeCount, adaptiveCount)) {
      return {
        style: "Directive Leader",
        description: "You take charge with clear instructions and decisive action. This style can be effective in crisis situations but may limit team autonomy.",
      };
    } else {
      return {
        style: "Adaptive Leader",
        description: "You flexibly adjust to circumstances and find balanced solutions. This approach helps navigate complex situations but might sometimes lack conviction.",
      };
    }
  };
  
  // Calculate progress percentage for the progress bar
  const progressValue = gameStatus.gameComplete 
    ? 100 
    : ((currentWeek - 1) / leadershipScenario.weeks.length) * 100;
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8" />
              {leadershipScenario.title}
            </h1>
            <p className="text-muted-foreground">{leadershipScenario.description}</p>
          </div>
        </div>

        <GameProgress value={progressValue} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {leadershipScenario.metrics.map(metric => (
            <Card key={metric.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  {metric.icon}
                  <CardTitle className="text-base">{metric.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-center">
                  {metric.id === "timeRemaining" 
                    ? `${gameStatus[metric.id as keyof typeof gameStatus]} ${gameStatus.timeRemaining === 1 ? 'week' : 'weeks'}` 
                    : `${gameStatus[metric.id as keyof typeof gameStatus]}${metric.id !== 'timeRemaining' ? '%' : ''}`}
                </p>
                {metric.id !== "timeRemaining" && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${
                        Number(gameStatus[metric.id as keyof typeof gameStatus]) >= 70 
                          ? 'bg-green-500' 
                          : Number(gameStatus[metric.id as keyof typeof gameStatus]) >= 40 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${gameStatus[metric.id as keyof typeof gameStatus]}%` }}
                    ></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {gameStatus.gameComplete ? (
          <Card>
            <CardHeader>
              <CardTitle>Project Complete!</CardTitle>
              <CardDescription>Let's evaluate your leadership performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-primary-foreground text-3xl font-bold mb-2">
                  {calculateLeadershipScore()}
                </div>
                <p className="text-muted-foreground">Leadership Score</p>
              </div>

              <Tabs defaultValue="results">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="results">Results</TabsTrigger>
                  <TabsTrigger value="style">Leadership Style</TabsTrigger>
                  <TabsTrigger value="team">Team Impact</TabsTrigger>
                </TabsList>
                <TabsContent value="results">
                  <div className="space-y-4 py-4">
                    <h3 className="text-lg font-medium">Project Outcomes</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary rounded-md">
                        <p className="font-semibold">Team Morale</p>
                        <p className="text-2xl">{gameStatus.morale}%</p>
                        <p className="text-sm text-muted-foreground">
                          {gameStatus.morale >= 80 
                            ? "Excellent team spirit and engagement" 
                            : gameStatus.morale >= 60 
                            ? "Good team dynamics with room for improvement" 
                            : "Team morale issues affected performance"}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <p className="font-semibold">Project Completion</p>
                        <p className="text-2xl">{gameStatus.progress}%</p>
                        <p className="text-sm text-muted-foreground">
                          {gameStatus.progress >= 80 
                            ? "Project delivered beyond expectations" 
                            : gameStatus.progress >= 60 
                            ? "Project successfully completed with minor gaps" 
                            : "Project delivered with significant compromises"}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <p className="font-semibold">Quality Score</p>
                        <p className="text-2xl">{gameStatus.quality}%</p>
                        <p className="text-sm text-muted-foreground">
                          {gameStatus.quality >= 80 
                            ? "Exceptional quality with attention to detail" 
                            : gameStatus.quality >= 60 
                            ? "Acceptable quality standards met" 
                            : "Quality issues may require post-launch fixes"}
                        </p>
                      </div>
                      <div className="p-4 bg-secondary rounded-md">
                        <p className="font-semibold">Overall Evaluation</p>
                        <p className="text-2xl">
                          {calculateLeadershipScore() >= 80 
                            ? "Excellent" 
                            : calculateLeadershipScore() >= 65 
                            ? "Good" 
                            : calculateLeadershipScore() >= 50 
                            ? "Satisfactory" 
                            : "Needs Improvement"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Leadership Score: {calculateLeadershipScore()}/100
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="style">
                  <div className="space-y-4 py-4">
                    <div className="p-6 bg-secondary rounded-md text-center">
                      <h3 className="text-xl font-bold mb-2">{getLeadershipStyle().style}</h3>
                      <p>{getLeadershipStyle().description}</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Your Key Leadership Traits:</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {gameStatus.morale >= 75 && (
                          <li>Strong team motivator and morale builder</li>
                        )}
                        {gameStatus.progress >= 75 && (
                          <li>Effective at driving project execution and results</li>
                        )}
                        {gameStatus.quality >= 75 && (
                          <li>Maintains high quality standards under pressure</li>
                        )}
                        {gameStatus.decisions.some(d => ["1b", "2b", "3b"].includes(d)) && (
                          <li>Good at fostering collaboration and team input</li>
                        )}
                        {gameStatus.decisions.some(d => ["2c", "4b", "5b"].includes(d)) && (
                          <li>Practical and resourceful problem solver</li>
                        )}
                        {gameStatus.decisions.some(d => ["1a", "3c", "5c"].includes(d)) && (
                          <li>Strategic and thoughtful in approach</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="team">
                  <div className="space-y-4 py-4">
                    <h3 className="text-lg font-medium mb-4">Team Member Outcomes</h3>
                    
                    <div className="space-y-3">
                      {leadershipScenario.team.map((member) => (
                        <div key={member.id} className="p-4 bg-secondary rounded-md flex items-center gap-4">
                          <div className="text-4xl">{member.image}</div>
                          <div>
                            <h4 className="font-medium">{member.name}, {member.role}</h4>
                            <p className="text-sm text-muted-foreground">
                              {gameStatus.morale >= 75
                                ? `${member.name} was highly engaged and delivered exceptional work.`
                                : gameStatus.morale >= 50
                                ? `${member.name} contributed solidly to the project effort.`
                                : `${member.name} struggled with motivation and engagement.`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={restartGame}>Start New Project</Button>
            </CardFooter>
          </Card>
        ) : scenario ? (
          <Card>
            <CardHeader>
              <CardTitle>Week {scenario.week}: {scenario.title}</CardTitle>
              <CardDescription className="text-lg">{scenario.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {showFeedback && selectedOption ? (
                <GameFeedback type="info">
                  <p>{scenario.options.find(o => o.id === selectedOption)?.feedback}</p>
                </GameFeedback>
              ) : (
                <div className="space-y-3">
                  {scenario.options.map((option) => (
                    <div
                      key={option.id}
                      className={`p-3 border rounded-md cursor-pointer hover:bg-secondary transition-colors ${
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
            <CardFooter className="flex justify-end">
              {showFeedback ? (
                <Button onClick={nextWeek}>
                  Continue to Week {currentWeek + 1}
                </Button>
              ) : (
                <Button onClick={confirmDecision} disabled={!selectedOption}>
                  Make Decision
                </Button>
              )}
            </CardFooter>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
};

export default LeadershipGame;
