
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trophy, Users, RotateCcw, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SudokuCell = {
  value: number;
  isFixed: boolean;
  isCorrect: boolean;
  assignedTo?: string;
};

type SudokuGrid = SudokuCell[][];

const TeamSudoku = () => {
  const { toast } = useToast();
  const [grid, setGrid] = useState<SudokuGrid>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [teamMembers] = useState(["Alice", "Bob", "Charlie", "Diana"]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Simple Sudoku puzzle (easy level)
  const initialPuzzle = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ];

  const solution = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ];

  const initializeGrid = (): SudokuGrid => {
    return initialPuzzle.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        value: cell,
        isFixed: cell !== 0,
        isCorrect: cell !== 0,
        assignedTo: cell === 0 ? teamMembers[Math.floor(Math.random() * teamMembers.length)] : undefined
      }))
    );
  };

  const isValidMove = (grid: SudokuGrid, row: number, col: number, num: number): boolean => {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (i !== col && grid[row][i].value === num) return false;
    }

    // Check column
    for (let i = 0; i < 9; i++) {
      if (i !== row && grid[i][col].value === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
      for (let j = boxCol; j < boxCol + 3; j++) {
        if ((i !== row || j !== col) && grid[i][j].value === num) return false;
      }
    }

    return true;
  };

  const checkCompletion = (grid: SudokuGrid): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col].value === 0 || !grid[row][col].isCorrect) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCellInput = (row: number, col: number, value: string) => {
    if (!gameStarted || gameCompleted || grid[row][col].isFixed) return;

    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 9) {
      // Clear cell if invalid input
      updateCell(row, col, 0, false);
      return;
    }

    const isValid = isValidMove(grid, row, col, num);
    const isCorrect = solution[row][col] === num;
    
    updateCell(row, col, num, isCorrect && isValid);

    if (isCorrect && isValid) {
      toast({
        title: "Correct!",
        description: `${teamMembers[currentPlayer]} placed ${num} correctly!`,
      });
      
      const newGrid = [...grid];
      newGrid[row][col] = { ...newGrid[row][col], value: num, isCorrect: true };
      
      if (checkCompletion(newGrid)) {
        setGameCompleted(true);
        toast({
          title: "Puzzle Completed! 🎉",
          description: "Congratulations team! You solved the Sudoku!",
        });
      }
    } else if (!isValid) {
      toast({
        title: "Invalid Move",
        description: "This number conflicts with Sudoku rules!",
        variant: "destructive",
      });
    }

    // Switch to next player
    setCurrentPlayer((prev) => (prev + 1) % teamMembers.length);
  };

  const updateCell = (row: number, col: number, value: number, isCorrect: boolean) => {
    setGrid(prev => prev.map((gridRow, rowIndex) =>
      gridRow.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, value, isCorrect };
        }
        return cell;
      })
    ));
  };

  const startGame = () => {
    setGameStarted(true);
    setTimer(0);
    toast({
      title: "Game Started!",
      description: "Work together to solve the Sudoku puzzle!",
    });
  };

  const resetGame = () => {
    setGrid(initializeGrid());
    setGameStarted(false);
    setGameCompleted(false);
    setTimer(0);
    setCurrentPlayer(0);
    setSelectedCell(null);
  };

  useEffect(() => {
    setGrid(initializeGrid());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCellColor = (cell: SudokuCell, row: number, col: number) => {
    if (cell.isFixed) return 'bg-gray-100';
    if (selectedCell?.row === row && selectedCell?.col === col) return 'bg-blue-200';
    if (cell.value === 0) return 'bg-white border-2 border-gray-300';
    if (cell.isCorrect) return 'bg-green-100';
    return 'bg-red-100';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Trophy className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl font-bold">Team Sudoku Challenge</h1>
          </div>
          <p className="text-gray-600">Collaborate to solve this 9x9 Sudoku puzzle!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Game Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-mono font-bold">{formatTime(timer)}</div>
                  <div className="text-sm text-gray-500">Elapsed Time</div>
                </div>

                {!gameStarted ? (
                  <Button onClick={startGame} className="w-full" size="lg">
                    Start Game
                  </Button>
                ) : (
                  <Button 
                    onClick={resetGame} 
                    variant="outline" 
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Game
                  </Button>
                )}

                {gameCompleted && (
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-800">Puzzle Solved!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Team Players
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={index === currentPlayer ? 'font-bold' : ''}>
                        {member}
                      </span>
                      <Badge 
                        variant={index === currentPlayer ? "default" : "outline"}
                      >
                        {index === currentPlayer ? "Current Turn" : "Waiting"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sudoku Grid */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Sudoku Puzzle</CardTitle>
                <CardDescription>
                  Fill in the numbers 1-9 so each row, column, and 3x3 box contains all digits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-9 gap-1 max-w-lg mx-auto bg-gray-800 p-2 rounded">
                  {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`
                          relative
                          ${(rowIndex + 1) % 3 === 0 && rowIndex !== 8 ? 'border-b-2 border-gray-800' : ''}
                          ${(colIndex + 1) % 3 === 0 && colIndex !== 8 ? 'border-r-2 border-gray-800' : ''}
                        `}
                      >
                        {cell.isFixed ? (
                          <div className="w-12 h-12 bg-gray-100 flex items-center justify-center font-bold text-lg">
                            {cell.value}
                          </div>
                        ) : (
                          <Input
                            type="text"
                            maxLength={1}
                            value={cell.value === 0 ? '' : cell.value.toString()}
                            onChange={(e) => handleCellInput(rowIndex, colIndex, e.target.value)}
                            onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                            className={`
                              w-12 h-12 text-center font-bold text-lg border-0 rounded-none
                              ${getCellColor(cell, rowIndex, colIndex)}
                            `}
                            disabled={!gameStarted || gameCompleted}
                          />
                        )}
                        {cell.assignedTo && cell.value === 0 && (
                          <div className="absolute -top-1 -right-1 text-xs bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                            {cell.assignedTo[0]}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
                
                <div className="mt-4 text-center space-y-2">
                  <div className="text-sm text-gray-600">
                    Current Player: <span className="font-bold text-teal-600">
                      {teamMembers[currentPlayer]}
                    </span>
                  </div>
                  <div className="flex justify-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-gray-100 border"></div>
                      <span>Given</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-100 border"></div>
                      <span>Correct</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-100 border"></div>
                      <span>Incorrect</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamSudoku;
