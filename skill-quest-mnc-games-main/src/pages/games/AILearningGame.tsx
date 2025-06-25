import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gamepad, Bot, MessageSquare, Book, User, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const AILearningGame = () => {
  const { toast } = useToast();
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([
    {
      role: "assistant",
      content: "Welcome to your first day at TechCorp! I'm AIDA, your AI onboarding assistant. How can I help you learn about your new role in IT Security?"
    }
  ]);
  const [gameState, setGameState] = useState({
    name: "",
    role: "IT Security Specialist",
    knowledgeProgress: 0,
    currentTopic: "Getting Started",
    challenges: [
      { id: 1, title: "Security Policy Quiz", completed: false },
      { id: 2, title: "Phishing Identification", completed: false },
      { id: 3, title: "Incident Response Simulation", completed: false }
    ],
    stage: "intro", // intro, conversation, challenge, completed
    currentChallenge: null as number | null,
    challengeData: null as any
  });

  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Simulated AI responses
  const aiResponses = {
    greeting: [
      "Great to meet you, {name}! What would you like to know about your IT Security role?",
      "Welcome aboard, {name}! I'm here to help you learn about IT Security at TechCorp. What questions do you have?",
      "Hello {name}! Ready to start your IT Security training? What would you like to explore first?"
    ],
    topics: {
      "security policy": [
        "TechCorp's security policy requires all employees to use 2FA, create strong passwords that are changed every 90 days, and encrypt sensitive data.",
        "Would you like to take a quick quiz about our security policies to test your knowledge?",
      ],
      "phishing": [
        "Phishing is one of the most common security threats at TechCorp. We see about 20 attempts per employee annually.",
        "I can show you examples of phishing emails so you can practice identifying them. Would that be helpful?",
      ],
      "incident response": [
        "Our incident response protocol follows the NIST framework: Identify, Protect, Detect, Respond, and Recover.",
        "Would you like to try a simulated security incident to practice your response skills?",
      ]
    },
    default: [
      "That's an interesting question. As you learn more about IT Security at TechCorp, we'll cover that topic in detail.",
      "Great question! That's something we'll explore during your first week. Is there anything specific about it you'd like to know?",
      "I'm still learning about that area myself. Let's focus on the security basics first, then we can explore that topic.",
    ],
    challenges: {
      1: {
        title: "Security Policy Quiz",
        description: "Let's test your knowledge of TechCorp's security policies.",
        questions: [
          {
            question: "How often should passwords be changed according to TechCorp policy?",
            options: ["30 days", "60 days", "90 days", "180 days"],
            answer: "90 days"
          },
          {
            question: "Which authentication method is required for all employees?",
            options: ["Single-factor", "Two-factor (2FA)", "Biometric only", "Password only"],
            answer: "Two-factor (2FA)"
          },
          {
            question: "What must be done with sensitive customer data?",
            options: ["Store locally", "Use cloud storage", "Encrypt it", "Share via email"],
            answer: "Encrypt it"
          }
        ]
      },
      2: {
        title: "Phishing Identification",
        description: "Can you identify which of these emails are phishing attempts?",
        examples: [
          {
            content: "URGENT: Your account has been compromised. Click here to reset your password immediately: http://teckcorp-security.net/reset",
            isPhishing: true,
            explanation: "This is phishing. Notice the urgency, suspicious URL (misspelled domain), and the request to click immediately."
          },
          {
            content: "Dear colleague, please review the attached Q2 report before tomorrow's meeting. Regards, Jennifer from Finance.",
            isPhishing: false,
            explanation: "This appears legitimate. It's from a known department, doesn't create urgency, and is requesting a normal business activity."
          },
          {
            content: "Your package delivery failed. Please update your information within 24 hours: [DOWNLOAD ATTACHMENT]",
            isPhishing: true,
            explanation: "This is phishing. It creates urgency and asks you to download an attachment for a vague delivery issue."
          }
        ]
      },
      3: {
        title: "Incident Response Simulation",
        description: "You receive an alert that multiple failed login attempts have occurred on a server. What do you do?",
        steps: [
          {
            question: "What should be your first action?",
            options: [
              "Immediately shut down the server", 
              "Call the police", 
              "Document the time and nature of the alert", 
              "Email all staff about the breach"
            ],
            correctAnswer: "Document the time and nature of the alert",
            explanation: "Always begin by documenting the incident details. This is the first step in proper incident response."
          },
          {
            question: "Who should you notify first?",
            options: [
              "The CEO", 
              "Your direct supervisor", 
              "The security incident response team", 
              "All employees"
            ],
            correctAnswer: "The security incident response team",
            explanation: "The security incident response team should be notified immediately as they are trained to handle such situations."
          },
          {
            question: "What should you do about the affected server?",
            options: [
              "Ignore it until more information is available", 
              "Isolate it from the network while maintaining it for investigation", 
              "Format and reinstall the operating system immediately", 
              "Do nothing until ordered by management"
            ],
            correctAnswer: "Isolate it from the network while maintaining it for investigation",
            explanation: "Isolating protects other systems while preserving evidence for investigation."
          }
        ]
      }
    }
  };
  
  function simulateAIResponse(userInput: string): string {
    // Check if user is introducing themselves
    if (userInput.toLowerCase().includes("my name") || userInput.toLowerCase().includes("i am ") || userInput.toLowerCase().includes("i'm ")) {
      // Extract name
      let name = userInput.match(/(?:my name is|i am|i'm) ([a-z]+)/i)?.[1] || "";
      if (name) {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        setGameState(prev => ({ ...prev, name }));
        return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)].replace("{name}", name);
      }
    }
    
    // Check if request is for a known topic
    for (const [topic, responses] of Object.entries(aiResponses.topics)) {
      if (userInput.toLowerCase().includes(topic)) {
        setGameState(prev => ({ 
          ...prev, 
          currentTopic: topic.charAt(0).toUpperCase() + topic.slice(1),
          knowledgeProgress: Math.min(prev.knowledgeProgress + 10, 100)
        }));
        return responses.join(" ");
      }
    }
    
    // Check for challenge interest
    if (userInput.toLowerCase().includes("quiz") || userInput.toLowerCase().includes("test")) {
      return "I can offer you a quick quiz on our security policies. Would you like to try it?";
    } else if (userInput.toLowerCase().includes("phishing") && (userInput.toLowerCase().includes("example") || userInput.toLowerCase().includes("practice"))) {
      return "I can show you some phishing examples to practice identifying them. Ready to start?";
    } else if (userInput.toLowerCase().includes("incident") && (userInput.toLowerCase().includes("simulation") || userInput.toLowerCase().includes("practice"))) {
      return "Would you like to try our incident response simulation exercise?";
    } else if (userInput.toLowerCase().includes("yes") || userInput.toLowerCase().includes("sure") || userInput.toLowerCase().includes("ready")) {
      // Check context from previous message
      const lastMessage = chatHistory[chatHistory.length - 1].content.toLowerCase();
      
      if (lastMessage.includes("security policies") || lastMessage.includes("quiz")) {
        startChallenge(1);
        return "Great! Let's start the Security Policy Quiz.";
      } else if (lastMessage.includes("phishing examples")) {
        startChallenge(2);
        return "Let's practice identifying phishing emails.";
      } else if (lastMessage.includes("incident response")) {
        startChallenge(3);
        return "Let's simulate an incident response scenario.";
      }
    }
    
    // Knowledge progress increases slightly with any interaction
    setGameState(prevState => ({ 
      ...prevState, 
      knowledgeProgress: Math.min(prevState.knowledgeProgress + 5, 100)
    }));
    
    // Default response
    return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
  }

  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { role: "user", content: userMessage }]);
    setUserMessage("");
    
    // Simulate AI typing
    setIsTyping(true);

    // Generate AI response with delay for realism
    setTimeout(() => {
      const aiResponse = simulateAIResponse(userMessage);
      setTypingMessage(aiResponse);

      let i = 0;
      const typingInterval = setInterval(() => {
        i++;
        if (i >= aiResponse.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
          setChatHistory(prev => [...prev, { role: "assistant", content: aiResponse }]);
          setTypingMessage("");
        }
      }, 30); // Fast typing speed
    }, 500);
  };

  const startChallenge = (challengeId: number) => {
    setGameState(prev => ({ 
      ...prev, 
      stage: "challenge",
      currentChallenge: challengeId,
      challengeData: {
        ...aiResponses.challenges[challengeId as keyof typeof aiResponses.challenges],
        currentStep: 0,
        userAnswers: [],
        score: 0,
        completed: false
      }
    }));
  };

  const handleChallengeAnswer = (answer: any) => {
    const challenge = gameState.currentChallenge;
    const challengeData = gameState.challengeData;
    
    if (!challenge || !challengeData) return;
    
    let isCorrect = false;
    let explanation = "";
    let newScore = challengeData.score;
    
    // Handle answer based on challenge type
    if (challenge === 1) { // Quiz
      const currentQuestion = challengeData.questions[challengeData.currentStep];
      isCorrect = answer === currentQuestion.answer;
      if (isCorrect) newScore++;
      
      if (challengeData.currentStep < challengeData.questions.length - 1) {
        // Move to next question
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            currentStep: prev.challengeData.currentStep + 1,
            userAnswers: [...prev.challengeData.userAnswers, answer],
            score: newScore
          }
        }));
      } else {
        // Challenge complete
        completeChallenge(newScore, challengeData.questions.length);
      }
    } else if (challenge === 2) { // Phishing examples
      const currentExample = challengeData.examples[challengeData.currentStep];
      isCorrect = answer === currentExample.isPhishing;
      explanation = currentExample.explanation;
      if (isCorrect) newScore++;
      
      if (challengeData.currentStep < challengeData.examples.length - 1) {
        // Show explanation then move to next example
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation,
            score: newScore
          }
        }));
        
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            challengeData: {
              ...prev.challengeData,
              currentStep: prev.challengeData.currentStep + 1,
              userAnswers: [...prev.challengeData.userAnswers, answer],
              showExplanation: false
            }
          }));
        }, 3000);
      } else {
        // Show final explanation then complete challenge
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation
          }
        }));
        
        setTimeout(() => {
          completeChallenge(newScore, challengeData.examples.length);
        }, 3000);
      }
    } else if (challenge === 3) { // Incident response
      const currentStep = challengeData.steps[challengeData.currentStep];
      isCorrect = answer === currentStep.correctAnswer;
      explanation = currentStep.explanation;
      if (isCorrect) newScore++;
      
      if (challengeData.currentStep < challengeData.steps.length - 1) {
        // Show explanation then move to next step
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation,
            score: newScore
          }
        }));
        
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            challengeData: {
              ...prev.challengeData,
              currentStep: prev.challengeData.currentStep + 1,
              userAnswers: [...prev.challengeData.userAnswers, answer],
              showExplanation: false
            }
          }));
        }, 3000);
      } else {
        // Show final explanation then complete challenge
        setGameState(prev => ({
          ...prev,
          challengeData: {
            ...prev.challengeData,
            showExplanation: true,
            isCorrect,
            explanation
          }
        }));
        
        setTimeout(() => {
          completeChallenge(newScore, challengeData.steps.length);
        }, 3000);
      }
    }
  };

  const completeChallenge = (score: number, totalPossible: number) => {
    if (!gameState.currentChallenge) return;
    
    // Mark challenge as completed
    const updatedChallenges = gameState.challenges.map(c => 
      c.id === gameState.currentChallenge ? { ...c, completed: true } : c
    );
    
    // Add significant knowledge progress
    const progressIncrease = Math.floor((score / totalPossible) * 30);
    
    setGameState(prev => ({ 
      ...prev, 
      challenges: updatedChallenges,
      knowledgeProgress: Math.min(prev.knowledgeProgress + progressIncrease, 100),
      stage: "conversation",
      currentChallenge: null
    }));
    
    // Add completion message to chat
    const performanceMessage = score === totalPossible 
      ? "Perfect score! Excellent work!" 
      : score >= totalPossible * 0.7 
      ? "Good job! You've shown a solid understanding." 
      : "You've completed the challenge. Some additional review might be helpful.";
    
    const challengeName = gameState.challenges.find(c => c.id === gameState.currentChallenge)?.title || "";
    
    setChatHistory(prev => [
      ...prev, 
      { 
        role: "assistant", 
        content: `You've completed the ${challengeName}! Score: ${score}/${totalPossible}. ${performanceMessage} What would you like to explore next?` 
      }
    ]);
    
    toast({
      title: `${challengeName} Completed`,
      description: `Score: ${score}/${totalPossible}`,
    });
    
    // Check if all challenges are completed
    if (updatedChallenges.every(c => c.completed) && gameState.knowledgeProgress + progressIncrease >= 90) {
      setTimeout(() => {
        setGameState(prev => ({ ...prev, stage: "completed" }));
        setChatHistory(prev => [
          ...prev, 
          { 
            role: "assistant", 
            content: "Congratulations! You've completed all the challenges and reached the required knowledge level for your role. You're ready to start your IT Security position at TechCorp!" 
          }
        ]);
        
        toast({
          title: "Training Complete!",
          description: "You've successfully completed your onboarding training.",
        });
      }, 2000);
    }
  };

  const restartGame = () => {
    setChatHistory([
      {
        role: "assistant",
        content: "Welcome to your first day at TechCorp! I'm AIDA, your AI onboarding assistant. How can I help you learn about your new role in IT Security?"
      }
    ]);
    setGameState({
      name: "",
      role: "IT Security Specialist",
      knowledgeProgress: 0,
      currentTopic: "Getting Started",
      challenges: [
        { id: 1, title: "Security Policy Quiz", completed: false },
        { id: 2, title: "Phishing Identification", completed: false },
        { id: 3, title: "Incident Response Simulation", completed: false }
      ],
      stage: "intro",
      currentChallenge: null,
      challengeData: null
    });
    setUserMessage("");
    setTypingMessage("");
    setIsTyping(false);
  };

  const renderChallengeContent = () => {
    if (!gameState.currentChallenge || !gameState.challengeData) return null;
    
    const { currentChallenge, challengeData } = gameState;
    
    if (currentChallenge === 1) { // Security Policy Quiz
      const currentQuestion = challengeData.questions[challengeData.currentStep];
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Question {challengeData.currentStep + 1} of {challengeData.questions.length}</h3>
          <p className="text-lg">{currentQuestion.question}</p>
          <div className="space-y-2 mt-4">
            {currentQuestion.options.map((option: string) => (
              <Button 
                key={option}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleChallengeAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    } else if (currentChallenge === 2) { // Phishing Identification
      if (challengeData.showExplanation) {
        return (
          <div className={`p-4 rounded-md ${challengeData.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium mb-2">{challengeData.isCorrect ? 'Correct!' : 'Incorrect!'}</p>
            <p>{challengeData.explanation}</p>
          </div>
        );
      }
      
      const currentExample = challengeData.examples[challengeData.currentStep];
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Example {challengeData.currentStep + 1} of {challengeData.examples.length}</h3>
          <div className="p-4 border rounded-md bg-white">
            <p className="font-mono">{currentExample.content}</p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => handleChallengeAnswer(true)}
            >
              This is phishing
            </Button>
            <Button 
              variant="outline"
              className="flex-1"
              onClick={() => handleChallengeAnswer(false)}
            >
              This is legitimate
            </Button>
          </div>
        </div>
      );
    } else if (currentChallenge === 3) { // Incident Response
      if (challengeData.showExplanation) {
        return (
          <div className={`p-4 rounded-md ${challengeData.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className="font-medium mb-2">{challengeData.isCorrect ? 'Correct!' : 'Incorrect!'}</p>
            <p>{challengeData.explanation}</p>
          </div>
        );
      }
      
      const currentStep = challengeData.steps[challengeData.currentStep];
      return (
        <div className="space-y-4">
          <h3 className="font-medium">Step {challengeData.currentStep + 1} of {challengeData.steps.length}</h3>
          <p className="text-lg">{currentStep.question}</p>
          <div className="space-y-2 mt-4">
            {currentStep.options.map((option: string) => (
              <Button 
                key={option}
                variant="outline"
                className="w-full justify-start text-left"
                onClick={() => handleChallengeAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Gamepad className="h-8 w-8" />
              AI-Powered Learning Simulation
            </h1>
            <p className="text-muted-foreground">Personalized onboarding experience with an AI assistant</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Left sidebar - Progress and challenges */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Role Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-2">
                    <AvatarFallback>
                      {gameState.name ? gameState.name.charAt(0).toUpperCase() : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">{gameState.name || "New Employee"}</p>
                  <p className="text-sm text-muted-foreground">{gameState.role}</p>
                  <p className="text-sm mt-2">Current Topic: {gameState.currentTopic}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Knowledge Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{gameState.knowledgeProgress}%</span>
                  </div>
                  <Progress value={gameState.knowledgeProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    {gameState.knowledgeProgress < 30
                      ? "Just getting started"
                      : gameState.knowledgeProgress < 60
                      ? "Making good progress"
                      : gameState.knowledgeProgress < 90
                      ? "Almost there!"
                      : "Expert level reached!"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Training Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gameState.challenges.map((challenge) => (
                    <div
                      key={challenge.id}
                      className="flex items-center gap-2 p-2 rounded-md border"
                    >
                      {challenge.completed ? (
                        <div className="bg-green-100 text-green-700 p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="bg-gray-100 text-gray-400 p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <span className="text-sm">{challenge.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area - Chat or Challenge */}
          <div className="md:col-span-2">
            {gameState.stage === "challenge" ? (
              <Card>
                <CardHeader>
                  <CardTitle>{gameState.challengeData?.title}</CardTitle>
                  <CardDescription>{gameState.challengeData?.description}</CardDescription>
                </CardHeader>
                <CardContent>{renderChallengeContent()}</CardContent>
              </Card>
            ) : gameState.stage === "completed" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Training Complete!</CardTitle>
                  <CardDescription>Congratulations on completing your onboarding training!</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="bg-primary text-primary-foreground p-4 rounded-full">
                      <Trophy className="h-12 w-12" />
                    </div>
                    <h3 className="text-xl font-bold">
                      {gameState.name ? gameState.name : "New Employee"} - IT Security Specialist
                    </h3>
                    <p className="text-center">
                      You've successfully completed your onboarding training and are ready to start your role at TechCorp.
                      Your knowledge of security policies, phishing identification, and incident response meets our requirements.
                    </p>
                    <Button onClick={restartGame} className="mt-4">
                      Start Over
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AIDA - AI Onboarding Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] overflow-y-auto space-y-4 mb-4">
                    {chatHistory.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {msg.role === "user" ? (
                              <>
                                <span className="text-xs font-medium">You</span>
                                <User className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                <Bot className="h-3 w-3" />
                                <span className="text-xs font-medium">AIDA</span>
                              </>
                            )}
                          </div>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                          <div className="flex items-center gap-2 mb-1">
                            <Bot className="h-3 w-3" />
                            <span className="text-xs font-medium">AIDA</span>
                          </div>
                          {typingMessage}
                          <span className="inline-block animate-pulse">_</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="text-xs text-muted-foreground">
                  {gameState.stage === "intro" && (
                    <div>
                      <p>Hint: Try introducing yourself or asking about security policies, phishing, or incident response.</p>
                    </div>
                  )}
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AILearningGame;
