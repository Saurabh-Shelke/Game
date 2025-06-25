
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Calendar, User, Users } from "lucide-react";

const UPCOMING_SESSIONS = [
  {
    id: 1,
    title: "Crisis Management Masterclass",
    host: "Sarah Johnson",
    date: "Today, 3:00 PM",
    participants: 28,
    tags: ["Crisis", "Leadership"],
    status: "live"
  },
  {
    id: 2,
    title: "Negotiation Tactics Workshop",
    host: "Michael Chen",
    date: "Tomorrow, 10:00 AM",
    participants: 15,
    tags: ["Negotiation", "Sales"],
    status: "upcoming"
  },
  {
    id: 3,
    title: "AI for Business Leaders",
    host: "Dr. Emily Rodriguez",
    date: "May 22, 2:00 PM",
    participants: 42,
    tags: ["AI", "Leadership"],
    status: "upcoming"
  },
  {
    id: 4,
    title: "Team Collaboration Strategies",
    host: "David Park",
    date: "May 23, 11:00 AM",
    participants: 35,
    tags: ["Teams", "Management"],
    status: "upcoming"
  }
];

const LiveSessions = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filteredSessions = UPCOMING_SESSIONS.filter(session => 
    activeFilter === "all" || 
    (activeFilter === "live" && session.status === "live") ||
    (activeFilter === "upcoming" && session.status === "upcoming")
  );

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Live Training Sessions</h1>
            <p className="text-muted-foreground mt-1">Join interactive training sessions with experts.</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"} 
              onClick={() => setActiveFilter("all")}
            >
              All
            </Button>
            <Button 
              variant={activeFilter === "live" ? "default" : "outline"} 
              onClick={() => setActiveFilter("live")}
              className="flex gap-2 items-center"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Live Now
            </Button>
            <Button 
              variant={activeFilter === "upcoming" ? "default" : "outline"} 
              onClick={() => setActiveFilter("upcoming")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSessions.map(session => (
            <Card key={session.id} className={`overflow-hidden transition-all duration-300 ${session.status === 'live' ? 'border-red-500 shadow-md hover:shadow-lg' : ''}`}>
              <CardHeader className="relative pb-2">
                {session.status === 'live' && (
                  <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 flex gap-1 items-center">
                    <span className="h-2 w-2 rounded-full bg-white animate-pulse"></span>
                    LIVE
                  </Badge>
                )}
                <CardTitle>{session.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> {session.host}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {session.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    {session.participants} attending
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {session.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={session.status === 'live' ? 'destructive' : 'default'}>
                  <Video className="h-4 w-4 mr-2" />
                  {session.status === 'live' ? 'Join Now' : 'Register'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredSessions.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No sessions found matching your filters.</p>
          </div>
        )}
        
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Host Your Own Session</h2>
          <p className="text-muted-foreground mb-4">
            Share your expertise with the community by hosting a training session on any topic.
          </p>
          <Button>Request to Host a Session</Button>
        </div>
      </div>
    </Layout>
  );
};

export default LiveSessions;
