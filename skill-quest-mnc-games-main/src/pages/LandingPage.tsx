
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuthForms } from "@/components/AuthForms";
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
  Star,
  Clock,
  Shield,
  Target,
  Zap
} from "lucide-react";

const LandingPage = () => {
  const featuredGames = [
    {
      title: "Business Simulation",
      description: "Test your strategic thinking in realistic business scenarios",
      icon: <BriefcaseBusiness className="h-8 w-8 text-blue-600" />,
      difficulty: "Advanced",
      duration: "45 min"
    },
    {
      title: "Crisis Management",
      description: "Learn to handle critical situations under pressure",
      icon: <FileText className="h-8 w-8 text-red-600" />,
      difficulty: "Intermediate",
      duration: "30 min"
    },
    {
      title: "Leadership Game",
      description: "Develop your leadership skills through interactive challenges",
      icon: <Users className="h-8 w-8 text-green-600" />,
      difficulty: "Beginner",
      duration: "25 min"
    }
  ];

  const features = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Skill-Based Learning",
      description: "Targeted training for specific business competencies"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Interactive Simulations",
      description: "Real-world scenarios in a safe learning environment"
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Achievement Tracking",
      description: "Monitor progress and celebrate milestones"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Ready",
      description: "Secure, scalable platform for organizations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Gamepad className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">MNC Training Games</h1>
            </div>
            <AuthForms />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Master Business Skills Through
            <span className="text-blue-600 block">Interactive Games</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Elevate your professional capabilities with engaging simulations, real-world scenarios, 
            and expert-designed training modules that deliver measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AuthForms />
            <p className="text-sm text-gray-500">
              Join thousands of professionals advancing their careers
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience comprehensive training with cutting-edge technology and expert-designed content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Training Modules</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Preview our most popular training simulations designed to enhance your professional skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-white">
                <div className="flex items-center gap-4 mb-4">
                  {game.icon}
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{game.title}</h3>
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
                <Button disabled className="w-full">
                  Login to Access
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Skills?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our platform today and start your journey to professional excellence
          </p>
          <AuthForms />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Gamepad className="h-8 w-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-bold">MNC Training Games</h3>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering professionals worldwide with innovative training solutions 
                that drive real business results.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Business Simulations</li>
                <li>Crisis Management</li>
                <li>Leadership Training</li>
                <li>Team Collaboration</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MNC Training Games. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
