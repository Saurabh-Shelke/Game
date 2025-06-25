
import { Layout } from "@/components/Layout";
import { GameCard } from "@/components/GameCard";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, Building, FileText, Gamepad, Heart, MessageSquare, Trophy, Users } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">Strategy & Role-Playing Games for Employee Training</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto animate-fade-in">
            Enhance engagement, decision-making, leadership, and problem-solving skills through interactive game-based learning.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">Explore Games</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Game Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GameCard
              title="Business Strategy Simulation"
              description="Train employees on business decision-making, market analysis, and strategic thinking"
              icon={<Briefcase className="h-6 w-6 text-white" />}
              color="bg-game-blue"
              to="/games/business-simulation"
            />
            <GameCard
              title="Crisis Management"
              description="Train employees on handling emergencies, managing risks, and making quick decisions"
              icon={<FileText className="h-6 w-6 text-white" />}
              color="bg-game-red"
              to="/games/crisis-management"
            />
            <GameCard
              title="Sales & Negotiation"
              description="Enhance persuasion, communication, and negotiation skills in employees"
              icon={<MessageSquare className="h-6 w-6 text-white" />}
              color="bg-game-green"
              to="/games/negotiation"
            />
            <GameCard
              title="Leadership & Team Management"
              description="Train employees in teamwork, delegation, conflict resolution, and leadership"
              icon={<Users className="h-6 w-6 text-white" />}
              color="bg-game-yellow"
              to="/games/leadership"
            />
            <GameCard
              title="AI-Powered Learning"
              description="Use AI-driven RPGs to personalize employee learning experiences"
              icon={<Gamepad className="h-6 w-6 text-white" />}
              color="bg-game-purple"
              to="/games/ai-learning"
            />
          </div>
        </section>

        <section className="mb-16 bg-secondary p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Benefits of Game-Based Training</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center p-4">
              <Heart className="h-12 w-12 text-primary mb-2" />
              <h3 className="text-lg font-semibold mb-2">Engagement</h3>
              <p className="text-muted-foreground">Employees stay motivated through interactive learning</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Building className="h-12 w-12 text-primary mb-2" />
              <h3 className="text-lg font-semibold mb-2">Practical Application</h3>
              <p className="text-muted-foreground">Real-world problem-solving in a risk-free environment</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Award className="h-12 w-12 text-primary mb-2" />
              <h3 className="text-lg font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-muted-foreground">Track employee progress, strengths, and weaknesses</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <Trophy className="h-12 w-12 text-primary mb-2" />
              <h3 className="text-lg font-semibold mb-2">Scalability</h3>
              <p className="text-muted-foreground">Train employees across global offices using cloud-based simulations</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
