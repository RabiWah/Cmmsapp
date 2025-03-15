import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  Shield,
  Bell,
  Lock,
  Save,
  Upload,
  Wrench,
} from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Maintenance Manager",
    department: "Maintenance",
    location: "Building A - Floor 3",
    bio: "Experienced maintenance manager with over 10 years in industrial equipment maintenance and team leadership.",
    joinDate: "2020-03-15",
    skills: [
      "HVAC Systems",
      "Electrical Troubleshooting",
      "Preventive Maintenance",
      "Team Leadership",
      "Work Order Management",
    ],
    recentActivity: [
      {
        type: "work-order",
        action: "completed",
        id: "WO-2023-089",
        date: "2023-06-15 11:45 AM",
      },
      {
        type: "asset",
        action: "updated",
        id: "AST-002",
        date: "2023-06-14 09:30 AM",
      },
      {
        type: "maintenance",
        action: "scheduled",
        id: "MT-2023-045",
        date: "2023-06-13 02:15 PM",
      },
    ],
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Validate data
    if (!userData.name.trim()) {
      alert("Name cannot be empty");
      return;
    }
    if (
      !userData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)
    ) {
      alert("Please enter a valid email address");
      return;
    }

    // In a real app, this would save to the backend
    console.log("Profile saved:", userData);

    // Update local storage to reflect changes
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...storedUser,
        name: userData.name,
        email: userData.email,
      }),
    );
  };

  return (
    <div className="h-full">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              My Profile
            </CardTitle>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Sidebar */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="flex flex-col items-center p-6 border rounded-lg bg-gray-50">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=maintenance"
                      alt={userData.name}
                    />
                    <AvatarFallback>
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h3 className="text-xl font-bold">{userData.name}</h3>
                <p className="text-gray-500">{userData.jobTitle}</p>
                <Badge className="mt-2">{userData.department}</Badge>

                <div className="w-full mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Joined {new Date(userData.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="w-full mt-6">
                  <h4 className="text-sm font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="personal">
                    <User className="h-4 w-4 mr-2" />
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    <Shield className="h-4 w-4 mr-2" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="activity">
                    <Bell className="h-4 w-4 mr-2" />
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={userData.name}
                            onChange={(e) =>
                              setUserData({ ...userData, name: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={userData.phone}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                phone: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input
                            id="jobTitle"
                            value={userData.jobTitle}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                jobTitle: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={userData.department}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                department: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={userData.location}
                            onChange={(e) =>
                              setUserData({
                                ...userData,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={userData.bio}
                          onChange={(e) =>
                            setUserData({ ...userData, bio: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Input
                          id="skills"
                          value={userData.skills.join(", ")}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              skills: e.target.value
                                .split(",")
                                .map((skill) => skill.trim())
                                .filter((skill) => skill !== ""),
                            })
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">About Me</h3>
                        <p className="text-gray-600">{userData.bio}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Contact Information
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">
                                {userData.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">
                                {userData.phone}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-2">
                            Work Information
                          </h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">
                                {userData.jobTitle}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">
                                {userData.department} - {userData.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {userData.skills.map((skill, index) => (
                            <Badge key={index}>{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="grid gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="current-password"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="new-password"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            id="confirm-password"
                            type="password"
                            className="pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                    <Button className="mt-2">Update Password</Button>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Add an extra layer of security to your account by enabling
                      two-factor authentication.
                    </p>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>

                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-sm text-gray-500">
                              Windows 10 • Chrome • New York, USA
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Started 2 hours ago
                            </p>
                          </div>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Mobile App</p>
                            <p className="text-sm text-gray-500">
                              iOS 15 • iPhone • New York, USA
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              Last active 3 days ago
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-3">
                      Log Out All Other Sessions
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="p-4 border rounded-md hover:bg-gray-50"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`h-10 w-10 rounded-full flex items-center justify-center ${activity.type === "work-order" ? "bg-blue-100" : activity.type === "asset" ? "bg-purple-100" : "bg-green-100"}`}
                          >
                            {activity.type === "work-order" ? (
                              <Briefcase
                                className={`h-5 w-5 ${activity.type === "work-order" ? "text-blue-600" : activity.type === "asset" ? "text-purple-600" : "text-green-600"}`}
                              />
                            ) : activity.type === "asset" ? (
                              <Wrench
                                className={`h-5 w-5 ${activity.type === "work-order" ? "text-blue-600" : activity.type === "asset" ? "text-purple-600" : "text-green-600"}`}
                              />
                            ) : (
                              <Calendar
                                className={`h-5 w-5 ${activity.type === "work-order" ? "text-blue-600" : activity.type === "asset" ? "text-purple-600" : "text-green-600"}`}
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">
                              {activity.action === "completed"
                                ? "Completed"
                                : activity.action === "updated"
                                  ? "Updated"
                                  : "Scheduled"}{" "}
                              {activity.type === "work-order"
                                ? "Work Order"
                                : activity.type === "asset"
                                  ? "Asset"
                                  : "Maintenance"}{" "}
                              {activity.id}
                            </p>
                            <p className="text-sm text-gray-500">
                              {activity.date}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
