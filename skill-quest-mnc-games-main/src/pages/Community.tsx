
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Search } from "lucide-react";

// Sample community rooms data
const COMMUNITY_ROOMS = [
  {
    id: 1,
    name: "Leadership Discussions",
    description: "Share leadership challenges and solutions",
    members: 248,
    activeNow: 12,
    topics: ["Leadership", "Management"],
    recentActivity: "high",
    avatar: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Crisis Management",
    description: "Strategies for managing business crises effectively",
    members: 156,
    activeNow: 5,
    topics: ["Crisis", "Risk Management"],
    recentActivity: "medium",
    avatar: "/placeholder.svg"
  },
  {
    id: 3,
    name: "AI in Business",
    description: "Exploring AI applications in modern business",
    members: 342,
    activeNow: 21,
    topics: ["AI", "Technology", "Innovation"],
    recentActivity: "high",
    avatar: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Negotiation Tactics",
    description: "Advanced negotiation skills for sales professionals",
    members: 189,
    activeNow: 8,
    topics: ["Sales", "Negotiation"],
    recentActivity: "medium",
    avatar: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Career Growth",
    description: "Tips and discussions on career advancement",
    members: 274,
    activeNow: 15,
    topics: ["Career", "Professional Development"],
    recentActivity: "high",
    avatar: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Strategy & Innovation",
    description: "Business strategy and innovative thinking",
    members: 203,
    activeNow: 7,
    topics: ["Strategy", "Innovation"],
    recentActivity: "low",
    avatar: "/placeholder.svg"
  }
];

// Sample trending topics
const TRENDING_TOPICS = [
  { id: 1, name: "AI in Leadership", count: 128 },
  { id: 2, name: "Remote Team Management", count: 97 },
  { id: 3, name: "Crisis Communication", count: 84 },
  { id: 4, name: "Sustainable Business", count: 72 },
  { id: 5, name: "Digital Transformation", count: 65 },
];

const Community = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRooms = COMMUNITY_ROOMS.filter(room => 
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Community Rooms</h1>
            <p className="text-muted-foreground mt-1">Connect with other professionals in discussion rooms.</p>
          </div>
          
          <Button>
            <MessageSquare className="mr-2 h-4 w-4" />
            Create Room
          </Button>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for rooms by name, description, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Tabs defaultValue="featured" className="space-y-4">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="active">Most Active</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="joined">Joined</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map(room => (
                <Card key={room.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={room.avatar} alt={room.name} />
                        <AvatarFallback>{room.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{room.name}</CardTitle>
                        <CardDescription>{room.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {room.topics.map(topic => (
                        <Badge key={topic} variant="outline">{topic}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{room.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <span className="relative flex h-2 w-2 mr-1">
                          <span className={`absolute inline-flex h-full w-full rounded-full ${
                            room.recentActivity === 'high' ? 'bg-green-500 animate-ping opacity-75' : 
                            room.recentActivity === 'medium' ? 'bg-amber-500' : 'bg-gray-300'
                          }`}></span>
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${
                            room.recentActivity === 'high' ? 'bg-green-500' : 
                            room.recentActivity === 'medium' ? 'bg-amber-500' : 'bg-gray-300'
                          }`}></span>
                        </span>
                        <span className="text-sm text-muted-foreground">{room.activeNow} active now</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button className="w-full" variant="outline">Join Room</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredRooms.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No community rooms found matching your search.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms
                .sort((a, b) => b.activeNow - a.activeNow)
                .map(room => (
                  <Card key={room.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={room.avatar} alt={room.name} />
                          <AvatarFallback>{room.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{room.name}</CardTitle>
                          <CardDescription>{room.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {room.topics.map(topic => (
                          <Badge key={topic} variant="outline">{topic}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{room.members} members</span>
                        </div>
                        <div className="flex items-center">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className={`absolute inline-flex h-full w-full rounded-full ${
                              room.recentActivity === 'high' ? 'bg-green-500 animate-ping opacity-75' : 
                              room.recentActivity === 'medium' ? 'bg-amber-500' : 'bg-gray-300'
                            }`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${
                              room.recentActivity === 'high' ? 'bg-green-500' : 
                              room.recentActivity === 'medium' ? 'bg-amber-500' : 'bg-gray-300'
                            }`}></span>
                          </span>
                          <span className="text-sm text-muted-foreground">{room.activeNow} active now</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button className="w-full" variant="outline">Join Room</Button>
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">New community rooms will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="joined">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Rooms you've joined will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc pl-4">
                  <li>Be respectful and professional in all interactions</li>
                  <li>Share knowledge freely but respect confidential information</li>
                  <li>Stay on topic within each community room</li>
                  <li>No promotional content without prior approval</li>
                  <li>Report any inappropriate behavior to moderators</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {TRENDING_TOPICS.map(topic => (
                    <div key={topic.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500 font-medium">#{topic.name}</span>
                      </div>
                      <Badge variant="secondary">{topic.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-blue-500">
                  View All Topics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
