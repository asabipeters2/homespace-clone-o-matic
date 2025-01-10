import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, Home, User, Settings } from "lucide-react";

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("properties");

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Property listed successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 h-screen bg-white dark:bg-gray-800 shadow-lg fixed left-0 top-0">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-8">Agent Portal</h2>
            <nav className="space-y-4">
              <button
                onClick={() => setActiveTab("properties")}
                className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors ${
                  activeTab === "properties"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Home className="h-5 w-5" />
                <span>Properties</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors ${
                  activeTab === "profile"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors ${
                  activeTab === "settings"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          {activeTab === "properties" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">My Properties</h2>
                <Button className="bg-primary hover:bg-primary/90">
                  <Upload className="h-4 w-4 mr-2" />
                  Add New Property
                </Button>
              </div>

              <Card className="p-6">
                <form onSubmit={handlePropertySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Title</label>
                      <Input required placeholder="Modern Villa in Lekki" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price (₦)</label>
                      <Input type="number" required placeholder="250000000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <Input required placeholder="Lekki Phase 1, Lagos" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Property Type</label>
                      <select className="w-full p-2 border rounded-md">
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Villa</option>
                        <option>Land</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea required className="min-h-[150px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Images</label>
                    <Input type="file" multiple accept="image/*" />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    List Property
                  </Button>
                </form>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Agent Profile</h2>
              <Card className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input type="tel" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">License Number</label>
                      <Input required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <Textarea className="min-h-[150px]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Picture</label>
                    <Input type="file" accept="image/*" />
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Update Profile
                  </Button>
                </form>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Settings</h2>
              <Card className="p-6">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Change Password</label>
                    <Input type="password" placeholder="Current Password" className="mb-2" />
                    <Input type="password" placeholder="New Password" className="mb-2" />
                    <Input type="password" placeholder="Confirm New Password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Notification Preferences</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Email Notifications
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        SMS Notifications
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Save Settings
                  </Button>
                </form>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;