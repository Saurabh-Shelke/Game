
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type GameCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  color?: string;
  to: string;
  className?: string;
};

export const GameCard = ({
  title,
  description,
  icon,
  color = "bg-primary",
  to,
  className,
}: GameCardProps) => {
  return (
    <Card className={cn("transition-all hover:shadow-md", className)}>
      <CardHeader>
        <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-full", color)}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Click below to try an interactive demo of this training game type.
        </p>
      </CardContent>
      <CardFooter>
        <Link to={to} className="w-full">
          <Button className="w-full">Play Demo</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
