
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

// Sample events data
const EVENTS = [
  {
    id: 1,
    title: "Global Leadership Summit",
    description: "Annual event for leadership training and networking",
    date: "May 25, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "Virtual Event",
    attendees: 450,
    category: "Leadership",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "AI in Business Conference",
    description: "Learn how AI is transforming modern business practices",
    date: "June 2, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "New York Convention Center",
    attendees: 320,
    category: "Technology",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Crisis Management Workshop",
    description: "Interactive workshop on crisis response strategies",
    date: "June 10, 2025",
    time: "1:00 PM - 5:00 PM",
    location: "Virtual Event",
    attendees: 120,
    category: "Crisis Management",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Sales Excellence Forum",
    description: "Advanced techniques for sales professionals",
    date: "June 15, 2025",
    time: "9:30 AM - 3:30 PM",
    location: "Chicago Business Center",
    attendees: 180,
    category: "Sales",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Team Building Retreat",
    description: "Strengthen team bonds and collaboration skills",
    date: "June 22-24, 2025",
    time: "All Day",
    location: "Mountain View Resort",
    attendees: 85,
    category: "Team Building",
    image: "/placeholder.svg"
  }
];

const Events = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(EVENTS.map(event => event.category)));
  
  const filteredEvents = selectedCategory 
    ? EVENTS.filter(event => event.category === selectedCategory)
    : EVENTS;

  return (
    <Layout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Upcoming Events</h1>
            <p className="text-muted-foreground mt-1">Training events and networking opportunities.</p>
          </div>
          
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button>Add to Calendar</Button>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="text-sm"
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden">
              <div 
                className="w-full md:w-1/3 bg-center bg-cover h-40 md:h-auto" 
                style={{ backgroundImage: `url(${event.image})` }}
              />
              <div className="flex-1 flex flex-col">
                <CardHeader className="pb-1">
                  <Badge className="w-fit mb-1">{event.category}</Badge>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full">Register</Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No events found matching your filters.</p>
          </div>
        )}
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Host Your Own Event</CardTitle>
            <CardDescription>
              Interested in organizing a training event or workshop? We can help you set it up and promote it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our platform supports both virtual and in-person events with built-in registration management, 
              attendee communications, and post-event analytics. Get started by submitting your event proposal.
            </p>
          </CardContent>
          <CardFooter>
            <Button>Submit Event Proposal</Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Events;
