
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle, ChevronRight, Info, X } from "lucide-react";

export const GameProgress = ({ value }: { value: number }) => {
  return (
    <div className="mb-4 space-y-1">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
};

type GameScoreProps = {
  score: number;
  maxScore: number;
};

export const GameScore = ({ score, maxScore }: GameScoreProps) => {
  return (
    <div className="flex items-center justify-center rounded-full bg-primary text-primary-foreground h-16 w-16 text-lg font-bold">
      {score}/{maxScore}
    </div>
  );
};

type GameTimerProps = {
  seconds: number;
  onComplete?: () => void;
};

export const GameTimer = ({ seconds, onComplete }: GameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  const minutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;

  return (
    <div className="font-mono text-lg">
      {minutes.toString().padStart(2, "0")}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  );
};

type GameFeedbackProps = {
  type: "success" | "error" | "info" | "warning";
  children: React.ReactNode;
};

export const GameFeedback = ({ type, children }: GameFeedbackProps) => {
  const styles = {
    success: "bg-green-50 text-green-800 border-green-200",
    error: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <X className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertCircle className="h-5 w-5" />,
  };

  return (
    <div className={cn("flex items-start gap-2 rounded-md border p-3", styles[type])}>
      {icons[type]}
      <div>{children}</div>
    </div>
  );
};

type GameChoiceProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
};

export const GameChoice = ({ 
  label, 
  onClick, 
  disabled,
  selected,
  correct,
  incorrect
}: GameChoiceProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "mb-2 w-full justify-between border text-left font-normal",
        selected && "border-primary",
        correct && "border-green-500 bg-green-50 text-green-800",
        incorrect && "border-red-500 bg-red-50 text-red-800"
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{label}</span>
      {selected && <ChevronRight className="h-4 w-4 shrink-0" />}
    </Button>
  );
};
