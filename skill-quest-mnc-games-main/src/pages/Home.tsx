
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthForms } from "@/components/AuthForms";
import { Link } from "react-router-dom";
import { 
  Gamepad, 
  Users, 
  Trophy, 
  BookOpen, 
  Video,
  MessageSquare,
  Calendar,
  BriefcaseBusiness,
  FileText,
  Pencil,
  Grid3X3,
  Play,
  Star,
  Clock
} from "lucide-react";

const Home = () => {
  const featuredGames = [
    {
      title: "Business Simulation",
      description: "Test your strategic thinking in realistic business scenarios",
      icon: <BriefcaseBusiness className="h-8 w-8 text-blue-600" />,
      link: "/games/business-simulation",
      difficulty: "Advanced",
      duration: "45 min"
    },
    {
      title: "Crisis Management",
      description: "Learn to handle critical situations under pressure",
      icon: <FileText className="h-8 w-8 text-red-600" />,
      link: "/games/crisis-management",
      difficulty: "Intermediate",
      duration: "30 min"
    },
    {
      title: "Leadership Game",
      description: "Develop your leadership skills through interactive challenges",
      icon: <Users className="h-8 w-8 text-green-600" />,
      link: "/games/leadership",
      difficulty: "Beginner",
      duration: "25 min"
    }
  ];

  const features = [
    {
      icon: <Video className="h-6 w-6" />,
      title: "Live Sessions",
      description: "Join interactive training sessions with experts"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Work together with colleagues on challenging scenarios"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Achievement System",
      description: "Track your progress and earn recognition"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Community Forums",
      description: "Connect with other learners and share experiences"
    }
  ];

  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to MNC Training Games
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Master essential business skills through engaging simulations and interactive learning experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AuthForms />
              <div className="text-sm opacity-75">
                or
              </div>
              <Link to="/dashboard">
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Continue as Guest
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Featured Training Games</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dive into our most popular training simulations designed to enhance your professional skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  {game.icon}
                  <div>
                    <h3 className="font-semibold text-lg">{game.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {game.difficulty}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {game.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <Link to={game.link}>
                  <Button className="w-full">
                    Start Training
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience comprehensive training with cutting-edge technology and expert-designed content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/live-sessions">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Video className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h3 className="font-medium text-sm">Live Sessions</h3>
              </Card>
            </Link>
            <Link to="/teams">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h3 className="font-medium text-sm">Teams</h3>
              </Card>
            </Link>
            <Link to="/community">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h3 className="font-medium text-sm">Community</h3>
              </Card>
            </Link>
            <Link to="/events">
              <Card className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-amber-600" />
                <h3 className="font-medium text-sm">Events</h3>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;
