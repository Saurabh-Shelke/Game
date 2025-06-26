// import { Layout } from "@/components/Layout";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Separator } from "@/components/ui/separator";
// import { LogOut, User, Bell, Shield, Moon } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import { useNavigate } from "react-router-dom";



// const Settings = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <Layout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">Settings</h1>
//           <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
//         </div>

//         {/* Profile Settings */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <User className="h-5 w-5" />
//               Profile Settings
//             </CardTitle>
//             <CardDescription>
//               Update your personal information and profile details
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <Input id="firstName" placeholder="Enter your first name" />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input id="lastName" placeholder="Enter your last name" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" placeholder="Enter your email" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="company">Company</Label>
//               <Input id="company" placeholder="Enter your company name" />
//             </div>
//             <Button>Save Changes</Button>
//           </CardContent>
//         </Card>

//         {/* Notification Settings */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Bell className="h-5 w-5" />
//               Notifications
//             </CardTitle>
//             <CardDescription>
//               Configure how you receive notifications
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label>Email Notifications</Label>
//                 <p className="text-sm text-gray-500">Receive updates via email</p>
//               </div>
//               <Switch />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label>Training Reminders</Label>
//                 <p className="text-sm text-gray-500">Get reminders for scheduled training sessions</p>
//               </div>
//               <Switch />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label>Achievement Alerts</Label>
//                 <p className="text-sm text-gray-500">Be notified when you earn new achievements</p>
//               </div>
//               <Switch />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Appearance Settings */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Moon className="h-5 w-5" />
//               Appearance
//             </CardTitle>
//             <CardDescription>
//               Customize the look and feel of your interface
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label>Dark Mode</Label>
//                 <p className="text-sm text-gray-500">Enable dark theme</p>
//               </div>
//               <Switch />
            

//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="language">Language</Label>
//               <select 
//                 id="language" 
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="en">English</option>
//                 <option value="es">Spanish</option>
//                 <option value="fr">French</option>
//                 <option value="de">German</option>
//               </select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Privacy & Security */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Shield className="h-5 w-5" />
//               Privacy & Security
//             </CardTitle>
//             <CardDescription>
//               Manage your privacy settings and account security
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="currentPassword">Current Password</Label>
//               <Input id="currentPassword" type="password" placeholder="Enter current password" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="newPassword">New Password</Label>
//               <Input id="newPassword" type="password" placeholder="Enter new password" />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm New Password</Label>
//               <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
//             </div>
//             <Button variant="outline">Change Password</Button>
            
//             <Separator />
            
//             <div className="flex items-center justify-between">
//               <div className="space-y-0.5">
//                 <Label>Two-Factor Authentication</Label>
//                 <p className="text-sm text-gray-500">Add an extra layer of security</p>
//               </div>
//               <Button variant="outline" size="sm">Enable</Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Account Actions */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Account Actions</CardTitle>
//             <CardDescription>
//               Manage your account or sign out
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button 
//                 variant="destructive" 
//                 onClick={handleLogout}
//                 className="flex items-center gap-2"
//               >
//                 <LogOut className="h-4 w-4" />
//                 Logout
//               </Button>
//               <Button variant="outline" className="text-red-600 hover:text-red-700">
//                 Delete Account
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </Layout>
//   );
// };

// export default Settings;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner"; // Optional: ensure you have this installed
import {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LogOut, User, Bell, Shield, Moon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
  
     

    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const response = await axios.put(
        "http://localhost:8000/api/auth/update-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating password");
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information and profile details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter your first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter your last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Enter your company name" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Training Reminders</Label>
                <p className="text-sm text-gray-500">Get reminders for scheduled training sessions</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Achievement Alerts</Label>
                <p className="text-sm text-gray-500">Be notified when you earn new achievements</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your interface
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-gray-500">Enable dark theme</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <select 
                id="language" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>
              Manage your privacy settings and account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handlePasswordChange}>
              Change Password
            </Button>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>
              Manage your account or sign out
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;

