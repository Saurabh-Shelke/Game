
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Trophy, MessageSquare } from "lucide-react";

// Sample team data
const TEAMS = [
  {
    id: 1,
    name: "Sales Champions",
    members: 8,
    completionRate: 78,
    activeChallenge: "Negotiation Mastery",
    nextMeeting: "Tomorrow, 2:00 PM",
    achievements: 12,
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Executive Leadership",
    members: 5,
    completionRate: 92,
    activeChallenge: "Crisis Response Drill",
    nextMeeting: "Today, 4:30 PM",
    achievements: 18,
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Marketing Innovators",
    members: 6,
    completionRate: 65,
    activeChallenge: "Brand Strategy Simulation",
    nextMeeting: "May 23, 11:00 AM",
    achievements: 9,
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Product Development",
    members: 7,
    completionRate: 83,
    activeChallenge: "Agile Leadership",
    nextMeeting: "May 24, 9:00 AM",
    achievements: 14,
    avatar: "/placeholder.svg"
  }
];

// Sample team members data
const TEAM_MEMBERS = [
  { id: 1, name: "Alex Johnson", role: "Team Leader", avatar: "/placeholder.svg", status: "online" },
  { id: 2, name: "Maria Garcia", role: "Sales Manager", avatar: "/placeholder.svg", status: "online" },
  { id: 3, name: "David Kim", role: "Account Executive", avatar: "/placeholder.svg", status: "offline" },
  { id: 4, name: "Sarah Mitchell", role: "Business Analyst", avatar: "/placeholder.svg", status: "offline" },
  { id: 5, name: "James Wilson", role: "Marketing Specialist", avatar: "/placeholder.svg", status: "away" },
  { id: 6, name: "Emma Davis", role: "Customer Success", avatar: "/placeholder.svg", status: "online" },
  { id: 7, name: "Michael Brown", role: "Operations", avatar: "/placeholder.svg", status: "online" },
  { id: 8, name: "Olivia Smith", role: "Product Manager", avatar: "/placeholder.svg", status: "away" },
];

// Sample achievements data
const TEAM_ACHIEVEMENTS = [
  { id: 1, title: "Perfect Score: Crisis Simulation", date: "May 15, 2025", icon: <Trophy className="h-5 w-5 text-amber-500" /> },
  { id: 2, title: "Team Collaboration Milestone", date: "May 10, 2025", icon: <Users className="h-5 w-5 text-blue-500" /> },
  { id: 3, title: "First Place: Sales Competition", date: "May 5, 2025", icon: <Trophy className="h-5 w-5 text-amber-500" /> },
  { id: 4, title: "50+ Training Sessions Completed", date: "April 28, 2025", icon: <Trophy className="h-5 w-5 text-amber-500" /> },
];

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState(TEAMS[0]);
  
  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Teams</h1>
            <p className="text-muted-foreground mt-1">Collaborate and compete with your teams.</p>
          </div>
          
          <Button>
            <Users className="mr-2 h-4 w-4" />
            Create New Team
          </Button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Teams List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-medium">Your Teams</h2>
            <div className="flex flex-col gap-3">
              {TEAMS.map(team => (
                <Card 
                  key={team.id} 
                  className={`cursor-pointer transition-all hover:border-blue-500 ${selectedTeam.id === team.id ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : ''}`}
                  onClick={() => setSelectedTeam(team)}
                >
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={team.avatar} alt={team.name} />
                        <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{team.name}</CardTitle>
                        <CardDescription>{team.members} members</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Team Progress</span>
                      <span className="font-medium">{team.completionRate}%</span>
                    </div>
                    <Progress value={team.completionRate} className="h-1.5" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Team Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedTeam.avatar} alt={selectedTeam.name} />
                      <AvatarFallback>{selectedTeam.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedTeam.name}</CardTitle>
                      <CardDescription>Active Challenge: {selectedTeam.activeChallenge}</CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Team Chat
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="members">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="members">Members</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                  </TabsList>
                  <TabsContent value="members" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {TEAM_MEMBERS.map(member => (
                        <div key={member.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                              member.status === 'online' ? 'bg-green-500' : 
                              member.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
                            } border-2 border-white`}></span>
                          </div>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="achievements" className="mt-4">
                    <div className="space-y-3">
                      {TEAM_ACHIEVEMENTS.map(achievement => (
                        <div key={achievement.id} className="flex items-center justify-between p-3 rounded-md bg-secondary/20">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary">
                              {achievement.icon}
                            </div>
                            <div>
                              <p className="font-medium">{achievement.title}</p>
                              <p className="text-xs text-muted-foreground">{achievement.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="progress" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Crisis Management</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Leadership Skills</span>
                          <span className="text-sm font-medium">72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Negotiation Tactics</span>
                          <span className="text-sm font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">AI Integration</span>
                          <span className="text-sm font-medium">53%</span>
                        </div>
                        <Progress value={53} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Next team meeting: <span className="font-medium">{selectedTeam.nextMeeting}</span>
                </div>
                <Button size="sm" variant="outline">View Calendar</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
