
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import BusinessSimulation from "./pages/games/BusinessSimulation";
import CrisisManagement from "./pages/games/CrisisManagement";
import NegotiationGame from "./pages/games/NegotiationGame";
import LeadershipGame from "./pages/games/LeadershipGame";
import AILearningGame from "./pages/games/AILearningGame";
import ScribbleGame from "./pages/games/ScribbleGame";
import BingoGame from "./pages/games/BingoGame";
import TeamSudoku from "./pages/games/TeamSudoku";
import LiveSessions from "./pages/LiveSessions";
import Teams from "./pages/Teams";
import Community from "./pages/Community";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Achievements from "./pages/Achievements";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/business-simulation" 
        element={
          <ProtectedRoute>
            <BusinessSimulation />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/crisis-management" 
        element={
          <ProtectedRoute>
            <CrisisManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/negotiation" 
        element={
          <ProtectedRoute>
            <NegotiationGame />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/leadership" 
        element={
          <ProtectedRoute>
            <LeadershipGame />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/ai-learning" 
        element={
          <ProtectedRoute>
            <AILearningGame />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/scribble" 
        element={
          <ProtectedRoute>
            <ScribbleGame />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/bingo" 
        element={
          <ProtectedRoute>
            <BingoGame />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/games/team-sudoku" 
        element={
          <ProtectedRoute>
            <TeamSudoku />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/live-sessions" 
        element={
          <ProtectedRoute>
            <LiveSessions />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teams" 
        element={
          <ProtectedRoute>
            <Teams />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/community" 
        element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/events" 
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/achievements" 
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
