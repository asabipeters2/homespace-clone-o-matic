import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const AgentAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, implement actual authentication
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    navigate("/agent-dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto">
          <Card className="p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 shadow-xl rounded-2xl">
            <h1 className="text-3xl font-bold text-center mb-8">
              {isLogin ? "Agent Login" : "Agent Registration"}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input required placeholder="John Doe" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input type="email" required placeholder="agent@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input type="password" required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                {isLogin ? "Login" : "Register"}
              </Button>
            </form>
            <p className="text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline ml-2"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentAuth;