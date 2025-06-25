import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pencil, Eraser, Undo, Trash2, Save, Download, Users, Clock, Trophy } from "lucide-react";
import { toast } from "sonner";

type Tool = "pencil" | "eraser";
type ColorOption = "#000000" | "#FF0000" | "#4CAF50" | "#2196F3" | "#FFC107" | "#9C27B0";
type GameMode = "solo" | "multiplayer";
type GamePhase = "waiting" | "drawing" | "guessing" | "reveal";

type Player = {
  id: string;
  name: string;
  score: number;
  isDrawer: boolean;
};

const ScribbleGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool>("pencil");
  const [lineWidth, setLineWidth] = useState(5);
  const [color, setColor] = useState<ColorOption>("#000000");
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Game state
  const [gameMode, setGameMode] = useState<GameMode>("solo");
  const [gamePhase, setGamePhase] = useState<GamePhase>("waiting");
  const [currentPrompt, setCurrentPrompt] = useState("Draw a friendly robot!");
  const [timeLeft, setTimeLeft] = useState(60);
  const [round, setRound] = useState(1);
  const [maxRounds] = useState(3);
  
  // Multiplayer state
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "You", score: 0, isDrawer: true },
    { id: "2", name: "Alice", score: 0, isDrawer: false },
    { id: "3", name: "Bob", score: 0, isDrawer: false },
    { id: "4", name: "Carol", score: 0, isDrawer: false }
  ]);
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState<{player: string, guess: string, correct: boolean}[]>([]);

  const prompts = [
    "Draw a friendly robot!",
    "Sketch a flying car",
    "Draw your dream office",
    "Create a futuristic city",
    "Design a new company logo",
    "Illustrate your team mascot",
    "Draw your ideal meeting room",
    "Sketch a productivity tool",
    "Draw a coffee machine",
    "Sketch a video conference call"
  ];

  // Get current player's drawer status
  const isCurrentPlayerDrawer = () => {
    if (gameMode === "solo") return true;
    const currentPlayer = players.find(p => p.id === "1");
    return currentPlayer?.isDrawer || false;
  };

  // Timer effect
  useEffect(() => {
    if (gameMode === "multiplayer" && (gamePhase === "drawing" || gamePhase === "guessing") && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gamePhase === "drawing") {
      setGamePhase("guessing");
      setTimeLeft(30); // 30 seconds for guessing
    } else if (timeLeft === 0 && gamePhase === "guessing") {
      handleRoundEnd();
    }
  }, [timeLeft, gamePhase, gameMode]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas to fill its container while maintaining aspect ratio
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const context = canvas.getContext("2d");
    if (!context) return;
    
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
    
    // Save initial blank state
    saveToHistory();
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || !contextRef.current) return;
      
      // Save current drawing
      const tempCanvas = document.createElement("canvas");
      const tempContext = tempCanvas.getContext("2d");
      if (!tempContext) return;
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempContext.drawImage(canvas, 0, 0);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore drawing
      contextRef.current.lineCap = "round";
      contextRef.current.lineJoin = "round";
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = lineWidth;
      contextRef.current.drawImage(tempCanvas, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update context when color or line width changes
  useEffect(() => {
    if (!contextRef.current) return;
    contextRef.current.strokeStyle = activeTool === "eraser" ? "#FFFFFF" : color;
    contextRef.current.lineWidth = activeTool === "eraser" ? lineWidth * 2 : lineWidth;
  }, [color, lineWidth, activeTool]);

  // Game functions
  const startMultiplayerGame = () => {
    setGameMode("multiplayer");
    setGamePhase("drawing");
    setTimeLeft(60);
    setRound(1);
    generateRandomPrompt();
    handleClear();
    
    // Set the first player as drawer
    setPlayers(prev => prev.map((p, index) => ({
      ...p,
      isDrawer: index === 0
    })));
    
    toast("Multiplayer game started! You are the drawer - start drawing!");
  };

  const generateRandomPrompt = () => {
    const newPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(newPrompt);
  };

  const submitGuess = () => {
    if (!guess.trim()) return;
    
    const isCorrect = guess.toLowerCase().includes(currentPrompt.toLowerCase().split(' ')[2]?.toLowerCase() || "robot");
    const newGuess = { player: "You", guess: guess.trim(), correct: isCorrect };
    setGuesses(prev => [...prev, newGuess]);
    
    if (isCorrect) {
      setPlayers(prev => prev.map(p => 
        p.id === "1" ? { ...p, score: p.score + 10 } : p
      ));
      toast("Correct guess! +10 points");
      handleRoundEnd();
    } else {
      toast("Keep trying!");
    }
    
    setGuess("");
  };

  const handleRoundEnd = () => {
    setGamePhase("reveal");
    setTimeLeft(5);
    
    setTimeout(() => {
      if (round < maxRounds) {
        setRound(prev => prev + 1);
        setGamePhase("drawing");
        setTimeLeft(60);
        setGuesses([]);
        generateRandomPrompt();
        handleClear();
        
        // Rotate drawer
        setPlayers(prev => prev.map((p, index) => ({
          ...p,
          isDrawer: index === (round % prev.length)
        })));
        
        const newDrawer = players[(round % players.length)];
        if (newDrawer.id === "1") {
          toast("Your turn to draw!");
        } else {
          toast(`${newDrawer.name} is now drawing!`);
        }
      } else {
        setGamePhase("waiting");
        const winner = players.reduce((prev, current) => prev.score > current.score ? prev : current);
        toast(`Game Over! Winner: ${winner.name} with ${winner.score} points!`);
      }
    }, 3000);
  };

  // Save current state to history
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    const currentData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    // If we've gone back in history and draw something new,
    // we need to remove everything after current historyIndex
    if (historyIndex < drawingHistory.length - 1) {
      setDrawingHistory(prevHistory => prevHistory.slice(0, historyIndex + 1));
    }
    
    setDrawingHistory(prevHistory => [...prevHistory, currentData]);
    setHistoryIndex(prevIndex => prevIndex + 1);
  };

  // Undo last action
  const handleUndo = () => {
    if (historyIndex <= 0) {
      toast("Nothing to undo!");
      return;
    }
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    setHistoryIndex(prevIndex => prevIndex - 1);
    const imageData = drawingHistory[historyIndex - 1];
    context.putImageData(imageData, 0, 0);
    toast("Undid last action");
  };

  // Clear canvas
  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
    toast("Canvas cleared");
  };

  // Download the drawing
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `scribble-${Date.now()}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast("Drawing downloaded!");
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Only allow drawing if in solo mode or if current player is the drawer
    if (gameMode === "multiplayer" && !isCurrentPlayerDrawer()) {
      return;
    }
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    setIsDrawing(true);
    
    const { offsetX, offsetY } = getCoordinates(e, canvas);
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    
    // Only allow drawing if in solo mode or if current player is the drawer
    if (gameMode === "multiplayer" && !isCurrentPlayerDrawer()) {
      return;
    }
    
    e.preventDefault(); // Prevent scrolling on touch devices
    
    const { offsetX, offsetY } = getCoordinates(e, canvasRef.current);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  
  const stopDrawing = () => {
    if (!isDrawing) return;
    
    const context = contextRef.current;
    if (context) {
      context.closePath();
      saveToHistory();
    }
    
    setIsDrawing(false);
  };

  // Helper to get coordinates from both mouse and touch events
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      // Get touch coordinates
      const touch = e.touches[0];
      return {
        offsetX: touch.clientX - rect.left,
        offsetY: touch.clientY - rect.top
      };
    } else {
      // Get mouse coordinates
      return {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY
      };
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold">Scribble Fun Game</h1>
          <p className="text-muted-foreground mt-1">
            Practice creative thinking through collaborative drawing and guessing.
          </p>
        </header>

        <Tabs defaultValue="play">
          <TabsList className="mb-4">
            <TabsTrigger value="play">Play</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="play" className="space-y-4">
            {/* Game Mode Selection */}
            {gamePhase === "waiting" && (
              <Card>
                <CardHeader>
                  <CardTitle>Choose Game Mode</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button 
                      onClick={() => setGameMode("solo")}
                      variant={gameMode === "solo" ? "default" : "outline"}
                      className="h-20"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">Solo Practice</div>
                        <div className="text-sm opacity-75">Draw freely with prompts</div>
                      </div>
                    </Button>
                    <Button 
                      onClick={startMultiplayerGame}
                      variant="default"
                      className="h-20"
                    >
                      <div className="text-center">
                        <div className="text-lg font-bold">Team Game</div>
                        <div className="text-sm opacity-75">Draw and guess with teammates</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Multiplayer Game Interface */}
            {gameMode === "multiplayer" && gamePhase !== "waiting" && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Game Status */}
                <Card className="lg:col-span-4">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">Round {round}/{maxRounds}</Badge>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-mono text-lg">{timeLeft}s</span>
                        </div>
                        <Badge variant={gamePhase === "drawing" ? "default" : "secondary"}>
                          {gamePhase === "drawing" ? "Drawing Phase" : 
                           gamePhase === "guessing" ? "Guessing Phase" : "Round Complete"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Current Drawer</div>
                        <div className="font-medium">
                          {players.find(p => p.isDrawer)?.name || "Unknown"}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Drawing Area */}
                <Card className="lg:col-span-3">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>
                        {isCurrentPlayerDrawer() ? "Your turn to draw:" : "Guess what's being drawn!"}
                      </span>
                    </CardTitle>
                    {isCurrentPlayerDrawer() && (
                      <CardDescription className="text-lg font-medium text-blue-600">
                        {currentPrompt}
                      </CardDescription>
                    )}
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Canvas */}
                    <div className="relative w-full bg-white border-2 border-blue-100 rounded-md overflow-hidden">
                      <canvas
                        ref={canvasRef}
                        className={`w-full touch-none ${isCurrentPlayerDrawer() ? 'cursor-crosshair' : 'cursor-not-allowed'}`}
                        style={{ height: "400px" }}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                      />
                    </div>
                    
                    {/* Drawing Tools */}
                    {isCurrentPlayerDrawer() && (
                      <>
                        <div className="flex flex-wrap gap-3 items-center">
                          <div className="flex items-center gap-2 bg-secondary p-1 rounded-md">
                            <Button
                              size="icon"
                              variant={activeTool === "pencil" ? "default" : "ghost"}
                              onClick={() => setActiveTool("pencil")}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant={activeTool === "eraser" ? "default" : "ghost"}
                              onClick={() => setActiveTool("eraser")}
                            >
                              <Eraser className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex-1"></div>
                          
                          <div className="flex items-center gap-2">
                            <Button size="icon" variant="outline" onClick={handleUndo}>
                              <Undo className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="outline" onClick={handleClear}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Color & Size Picker */}
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {(["#000000", "#FF0000", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0"] as ColorOption[]).map(c => (
                              <button
                                key={c}
                                className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setColor(c)}
                              />
                            ))}
                          </div>
                          
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Brush Size: {lineWidth}px</p>
                            <input
                              type="range"
                              min="1"
                              max="20"
                              value={lineWidth}
                              onChange={(e) => setLineWidth(parseInt(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Guessing Interface */}
                    {!isCurrentPlayerDrawer() && gamePhase === "guessing" && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter your guess..."
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
                          />
                          <Button onClick={submitGuess} disabled={!guess.trim()}>
                            Guess
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Players & Chat */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Players
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {players.map((player) => (
                      <div key={player.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {player.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{player.name}</span>
                          {player.isDrawer && <Pencil className="h-3 w-3 text-blue-500" />}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm">{player.score}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Guesses */}
                {gameMode === "multiplayer" && (
                  <Card className="lg:col-span-4">
                    <CardHeader>
                      <CardTitle>Recent Guesses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {guesses.map((g, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded">
                            <span className="font-medium">{g.player}:</span>
                            <span className={g.correct ? "text-green-600 font-bold" : ""}>{g.guess}</span>
                            {g.correct && <Badge variant="secondary">Correct!</Badge>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Solo Mode */}
            {gameMode === "solo" && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>Drawing Challenge</span>
                    <Button onClick={generateRandomPrompt} variant="ghost" size="sm">
                      New Challenge
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-lg font-medium text-blue-600">
                    {currentPrompt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Canvas Container */}
                  <div className="relative w-full bg-white border-2 border-blue-100 rounded-md overflow-hidden">
                    <canvas
                      ref={canvasRef}
                      className="w-full touch-none cursor-crosshair"
                      style={{ height: "400px" }}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                  </div>
                  
                  {/* Drawing Tools */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <div className="flex items-center gap-2 bg-secondary p-1 rounded-md">
                      <Button
                        size="icon"
                        variant={activeTool === "pencil" ? "default" : "ghost"}
                        onClick={() => setActiveTool("pencil")}
                        title="Pencil"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant={activeTool === "eraser" ? "default" : "ghost"}
                        onClick={() => setActiveTool("eraser")}
                        title="Eraser"
                      >
                        <Eraser className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex-1"></div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={handleUndo}
                        title="Undo"
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={handleClear}
                        title="Clear"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={handleDownload}
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Color & Size Picker */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Color:</p>
                    <div className="flex flex-wrap gap-2">
                      {(["#000000", "#FF0000", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0"] as ColorOption[]).map(c => (
                        <button
                          key={c}
                          className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                          style={{ backgroundColor: c }}
                          onClick={() => setColor(c)}
                        />
                      ))}
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Brush Size: {lineWidth}px</p>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        value={lineWidth}
                        onChange={(e) => setLineWidth(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4">
                  <div className="w-full flex items-center justify-between">
                    <Button variant="outline" onClick={generateRandomPrompt}>
                      New Challenge
                    </Button>
                    <Button onClick={handleDownload}>
                      <Save className="h-4 w-4 mr-2" />
                      Save Drawing
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="instructions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
                <CardDescription>
                  Scribble Fun is a collaborative drawing and guessing game that develops creative thinking and team communication.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Solo Mode:</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Choose a prompt and practice drawing</li>
                    <li>Use different tools and colors to express your ideas</li>
                    <li>Save your drawings and try new challenges</li>
                  </ol>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Team Game Mode:</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>One player draws while others guess</li>
                    <li>Drawer sees the prompt and has 60 seconds to draw</li>
                    <li>Other players have 30 seconds to guess</li>
                    <li>Correct guesses earn points for both drawer and guesser</li>
                    <li>Players take turns being the drawer</li>
                    <li>Player with most points after all rounds wins!</li>
                  </ol>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Benefits:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Improves visual communication skills</li>
                    <li>Develops quick thinking and creativity</li>
                    <li>Enhances team collaboration and communication</li>
                    <li>Practices interpreting and conveying abstract concepts</li>
                    <li>Builds empathy through perspective-taking</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <p className="text-sm">
                    <span className="font-bold">Business Application:</span> This game mirrors real workplace scenarios where clear visual communication is crucial, such as explaining concepts to clients, brainstorming sessions, and cross-functional team collaboration.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ScribbleGame;
