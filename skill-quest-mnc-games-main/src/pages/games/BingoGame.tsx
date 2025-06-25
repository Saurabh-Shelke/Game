
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, RotateCcw, Trophy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type BingoCell = {
  number: number;
  isMarked: boolean;
};

type BingoCard = BingoCell[][];

const BingoGame = () => {
  const { toast } = useToast();
  const [bingoCard, setBingoCard] = useState<BingoCard>([]);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [teamMembers] = useState(["Alice", "Bob", "Charlie", "Diana"]);
  const [currentCaller, setCurrentCaller] = useState("Game Master");

  const generateBingoCard = (): BingoCard => {
    const card: BingoCard = [];
    const usedNumbers = new Set<number>();

    for (let row = 0; row < 5; row++) {
      const cardRow: BingoCell[] = [];
      for (let col = 0; col < 5; col++) {
        if (row === 2 && col === 2) {
          // Free space in the center
          cardRow.push({ number: 0, isMarked: true });
        } else {
          let number;
          do {
            number = Math.floor(Math.random() * 75) + 1;
          } while (usedNumbers.has(number));
          
          usedNumbers.add(number);
          cardRow.push({ number, isMarked: false });
        }
      }
      card.push(cardRow);
    }
    return card;
  };

  const checkForWin = (card: BingoCard): boolean => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (card[row].every(cell => cell.isMarked)) return true;
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      if (card.every(row => row[col].isMarked)) return true;
    }

    // Check diagonals
    if (card.every((row, index) => row[index].isMarked)) return true;
    if (card.every((row, index) => row[4 - index].isMarked)) return true;

    return false;
  };

  const markNumber = (rowIndex: number, colIndex: number) => {
    if (!gameStarted || hasWon) return;

    const cell = bingoCard[rowIndex][colIndex];
    if (cell.number === 0 || !calledNumbers.includes(cell.number)) return;

    const newCard = bingoCard.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === rowIndex && cIdx === colIndex) {
          return { ...cell, isMarked: true };
        }
        return cell;
      })
    );

    setBingoCard(newCard);

    if (checkForWin(newCard)) {
      setHasWon(true);
      toast({
        title: "BINGO! 🎉",
        description: "Congratulations! You've won the game!",
      });
    }
  };

  const callNumber = () => {
    if (hasWon) return;

    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
      .filter(num => !calledNumbers.includes(num));

    if (availableNumbers.length === 0) {
      toast({
        title: "Game Over",
        description: "All numbers have been called!",
      });
      return;
    }

    const newNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
    setCalledNumbers(prev => [...prev, newNumber]);

    toast({
      title: `Number Called: ${newNumber}`,
      description: `Called by ${currentCaller}`,
    });
  };

  const resetGame = () => {
    setBingoCard(generateBingoCard());
    setCalledNumbers([]);
    setGameStarted(false);
    setHasWon(false);
  };

  const startGame = () => {
    setGameStarted(true);
    toast({
      title: "Game Started!",
      description: "Good luck! Mark your numbers as they're called.",
    });
  };

  useEffect(() => {
    setBingoCard(generateBingoCard());
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Grid3X3 className="h-8 w-8 text-orange-600" />
            <h1 className="text-3xl font-bold">Team Bingo Challenge</h1>
          </div>
          <p className="text-gray-600">Work together and mark your cards as numbers are called!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Controls */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Game Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!gameStarted ? (
                  <Button onClick={startGame} className="w-full" size="lg">
                    Start Game
                  </Button>
                ) : (
                  <Button 
                    onClick={callNumber} 
                    className="w-full" 
                    size="lg"
                    disabled={hasWon}
                  >
                    Call Next Number
                  </Button>
                )}
                
                <Button 
                  onClick={resetGame} 
                  variant="outline" 
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Game
                </Button>

                {hasWon && (
                  <div className="text-center p-4 bg-green-100 rounded-lg">
                    <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="font-bold text-green-800">You Won!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{member}</span>
                      <Badge variant="outline">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bingo Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Bingo Card</CardTitle>
                <CardDescription>
                  Click on numbers as they're called. Get 5 in a row to win!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
                  {/* Header */}
                  {['B', 'I', 'N', 'G', 'O'].map(letter => (
                    <div key={letter} className="h-10 flex items-center justify-center font-bold text-lg bg-orange-100 rounded">
                      {letter}
                    </div>
                  ))}
                  
                  {/* Bingo Card */}
                  {bingoCard.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => markNumber(rowIndex, colIndex)}
                        className={`
                          h-12 rounded font-semibold transition-all
                          ${cell.isMarked 
                            ? 'bg-orange-500 text-white' 
                            : calledNumbers.includes(cell.number)
                              ? 'bg-yellow-200 hover:bg-yellow-300'
                              : 'bg-gray-100 hover:bg-gray-200'
                          }
                          ${cell.number === 0 ? 'bg-orange-300 text-white' : ''}
                        `}
                        disabled={!gameStarted || cell.isMarked || (!calledNumbers.includes(cell.number) && cell.number !== 0)}
                      >
                        {cell.number === 0 ? 'FREE' : cell.number}
                      </button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Called Numbers */}
        <Card>
          <CardHeader>
            <CardTitle>Called Numbers ({calledNumbers.length}/75)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {calledNumbers.map((number, index) => (
                <div
                  key={index}
                  className="h-8 w-8 bg-orange-500 text-white rounded flex items-center justify-center text-sm font-semibold"
                >
                  {number}
                </div>
              ))}
            </div>
            {calledNumbers.length === 0 && (
              <p className="text-gray-500 text-center py-4">No numbers called yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BingoGame;
