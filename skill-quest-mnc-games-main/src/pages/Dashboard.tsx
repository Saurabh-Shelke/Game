
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Award, BookOpen, Check, Clock, Trophy } from "lucide-react";

// Sample data for demonstration
const progressData = [
  { name: 'Business Simulation', value: 75, color: '#3B82F6' },
  { name: 'Crisis Management', value: 45, color: '#EF4444' },
  { name: 'Negotiation', value: 60, color: '#10B981' },
  { name: 'Leadership', value: 30, color: '#F59E0B' },
  { name: 'AI Learning', value: 15, color: '#8B5CF6' },
];

const achievementData = [
  {
    id: 1,
    title: "First Simulation Completed",
    date: "Today",
    icon: <Award className="h-8 w-8 text-blue-500" />,
    game: "Business Simulation"
  },
  {
    id: 2,
    title: "Negotiation Master",
    date: "Yesterday",
    icon: <Trophy className="h-8 w-8 text-amber-500" />,
    game: "Sales & Negotiation"
  },
  {
    id: 3,
    title: "Crisis Resolved",
    date: "3 days ago",
    icon: <Check className="h-8 w-8 text-green-500" />,
    game: "Crisis Management"
  }
];

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

const trainingTimeData = [
  { name: 'Mon', hours: 1.5 },
  { name: 'Tue', hours: 2 },
  { name: 'Wed', hours: 0.5 },
  { name: 'Thu', hours: 3 },
  { name: 'Fri', hours: 1 },
  { name: 'Sat', hours: 0 },
  { name: 'Sun', hours: 0.75 },
];

const chartConfig = {
  business: { label: "Business Simulation", theme: { light: "#3B82F6", dark: "#3B82F6" } },
  crisis: { label: "Crisis Management", theme: { light: "#EF4444", dark: "#EF4444" } },
  negotiation: { label: "Sales & Negotiation", theme: { light: "#10B981", dark: "#10B981" } },
  leadership: { label: "Leadership", theme: { light: "#F59E0B", dark: "#F59E0B" } },
  ai: { label: "AI Learning", theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
};

const Dashboard = () => {
  // Calculate total progress percentage across all modules
  const totalProgress = progressData.reduce((sum, item) => sum + item.value, 0) / progressData.length;
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <section className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Alex!</h1>
              <p className="opacity-90">Ready to continue your training journey?</p>
            </div>
            <div className="hidden md:block">
              <div className="rounded-full bg-white/20 p-4">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{totalProgress.toFixed(0)}%</span>
            </div>
            <Progress value={totalProgress} className="h-2 bg-white/30 [&>div]:bg-yellow-400" />
          </div>
        </section>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Training Progress - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Learning Progress</h2>
                <div className="text-sm text-muted-foreground">Last updated: Today</div>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="min-h-[300px]">
                  <h3 className="text-lg font-medium mb-4 text-center">Course Progress</h3>
                  <ChartContainer config={chartConfig} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={progressData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={60}
                          innerRadius={30}
                          dataKey="value"
                        >
                          {progressData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Progress']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  
                  {/* Custom Legend */}
                  <div className="mt-4 space-y-2">
                    {progressData.map((entry) => (
                      <div key={entry.name} className="flex items-center gap-2 text-sm">
                        <div 
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="flex-1">{entry.name}</span>
                        <span className="font-medium">{entry.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="min-h-[300px]">
                  <h3 className="text-lg font-medium mb-4 text-center">Weekly Training Hours</h3>
                  <ChartContainer config={chartConfig} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trainingTimeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
            </Card>
          </div>

          {/* Current Training - Takes 1 column */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-fit">
              <h2 className="text-xl font-semibold mb-4">Current Training</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-md">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="font-medium text-sm">Business Strategy Simulation</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Module 3 of 5</span>
                      <span className="font-medium">75% complete</span>
                    </div>
                    <Progress value={75} className="h-1.5" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 hover:bg-secondary/50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-red-100 p-2 rounded-md">
                      <BookOpen className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="font-medium text-sm">Crisis Management</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Module 2 of 4</span>
                      <span className="font-medium">45% complete</span>
                    </div>
                    <Progress value={45} className="h-1.5" />
                  </div>
                </div>

                <button className="w-full mt-4 text-center text-sm text-blue-600 hover:underline">
                  View all courses
                </button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Achievements */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementData.map(achievement => (
              <div key={achievement.id} className="border rounded-lg p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{achievement.title}</h3>
                    <p className="text-xs text-muted-foreground truncate">{achievement.game}</p>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    {achievement.icon}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">{achievement.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
