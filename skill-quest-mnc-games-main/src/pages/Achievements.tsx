
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, Calendar, Lock, CheckCircle } from "lucide-react";

const Achievements = () => {
  const unlockedAchievements = [
    {
      id: 1,
      title: "First Simulation Completed",
      description: "Successfully completed your first Business Simulation game",
      icon: "🎯",
      points: 100,
      unlockedDate: "2024-06-20",
      category: "Business",
      rarity: "Common"
    },
    {
      id: 2,
      title: "Negotiation Master",
      description: "Won 10 consecutive negotiation scenarios",
      icon: "🤝",
      points: 250,
      unlockedDate: "2024-06-18",
      category: "Negotiation",
      rarity: "Rare"
    },
    {
      id: 3,
      title: "Crisis Resolver",
      description: "Successfully handled 5 crisis management scenarios",
      icon: "🚨",
      points: 200,
      unlockedDate: "2024-06-15",
      category: "Crisis Management",
      rarity: "Uncommon"
    },
    {
      id: 4,
      title: "Team Player",
      description: "Participated in 20 team-based training sessions",
      icon: "👥",
      points: 150,
      unlockedDate: "2024-06-10",
      category: "Leadership",
      rarity: "Common"
    },
    {
      id: 5,
      title: "Quick Learner",
      description: "Completed AI Learning modules in record time",
      icon: "⚡",
      points: 300,
      unlockedDate: "2024-06-08",
      category: "AI Learning",
      rarity: "Epic"
    }
  ];

  const lockedAchievements = [
    {
      id: 6,
      title: "Master Strategist",
      description: "Complete 50 Business Simulation scenarios",
      icon: "🏆",
      points: 500,
      category: "Business",
      rarity: "Legendary",
      progress: 32,
      total: 50
    },
    {
      id: 7,
      title: "Perfect Score",
      description: "Achieve 100% accuracy in 10 consecutive games",
      icon: "💯",
      points: 400,
      category: "General",
      rarity: "Epic",
      progress: 6,
      total: 10
    },
    {
      id: 8,
      title: "Innovation Leader",
      description: "Propose 25 innovative solutions in training",
      icon: "💡",
      points: 350,
      category: "Leadership",
      rarity: "Rare",
      progress: 12,
      total: 25
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800";
      case "Uncommon": return "bg-green-100 text-green-800";
      case "Rare": return "bg-blue-100 text-blue-800";
      case "Epic": return "bg-purple-100 text-purple-800";
      case "Legendary": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalPoints = unlockedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Track your training progress and unlock rewards</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">{unlockedAchievements.length} Unlocked</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">{totalPoints} Points</span>
            </div>
          </div>
        </header>

        <Tabs defaultValue="unlocked" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="unlocked">Unlocked ({unlockedAchievements.length})</TabsTrigger>
            <TabsTrigger value="locked">In Progress ({lockedAchievements.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="unlocked" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlockedAchievements.map((achievement) => (
                <Card key={achievement.id} className="relative overflow-hidden border-2 border-green-200 bg-green-50/30">
                  <div className="absolute top-2 right-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight">{achievement.title}</CardTitle>
                        <Badge className={`mt-1 ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(achievement.unlockedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {achievement.points} pts
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="locked" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {lockedAchievements.map((achievement) => (
                <Card key={achievement.id} className="relative overflow-hidden border-2 border-gray-200 bg-gray-50/30">
                  <div className="absolute top-2 right-2">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl opacity-50">{achievement.icon}</div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg leading-tight text-gray-700">{achievement.title}</CardTitle>
                        <Badge className={`mt-1 ${getRarityColor(achievement.rarity)}`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                      <span className="flex items-center gap-1 font-medium text-gray-600">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {achievement.points} pts
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Achievement Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Achievement Statistics</CardTitle>
            <CardDescription>Your overall achievement progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{unlockedAchievements.length}</div>
                <div className="text-sm text-muted-foreground">Achievements Unlocked</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {unlockedAchievements.filter(a => a.rarity === "Epic" || a.rarity === "Legendary").length}
                </div>
                <div className="text-sm text-muted-foreground">Rare Achievements</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((unlockedAchievements.length / (unlockedAchievements.length + lockedAchievements.length)) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Completion Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Achievements;
