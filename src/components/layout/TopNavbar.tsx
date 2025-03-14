import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import {
  LayoutDashboard,
  Clipboard,
  Wrench,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavbarProps {
  username?: string;
  notificationCount?: number;
}

const TopNavbar = ({
  username = "John Doe",
  notificationCount = 3,
}: TopNavbarProps) => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
    {
      icon: <Clipboard size={20} />,
      label: "Work Orders",
      path: "/work-orders",
    },
    { icon: <Wrench size={20} />, label: "Assets", path: "/assets" },
    {
      icon: <Calendar size={20} />,
      label: "Maintenance",
      path: "/maintenance",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      path: "/notifications",
    },
    {
      icon: <User size={20} />,
      label: "Users",
      path: "/users",
    },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
  ];

  // Function to handle search
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    console.log("Searching for:", searchQuery);
    // Implement search functionality here
  };

  return (
    <header className="bg-slate-800 text-white w-full flex flex-col shadow-md sticky top-0 z-50">
      {/* Top bar with logo and user profile */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-slate-700">
        <NavLink to="/" className="font-bold text-xl">
          UpKeep
        </NavLink>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden sm:flex relative max-w-md w-full mx-4"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            name="search"
            placeholder="Search..."
            className="pl-10 w-full bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 focus:bg-slate-600"
          />
        </form>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <NavLink to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-white hover:bg-slate-700"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </NavLink>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-8 w-8 rounded-full hover:bg-slate-700"
              >
                <Avatar>
                  <AvatarImage
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=maintenance"
                    alt={username}
                  />
                  <AvatarFallback>
                    {username
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/profile" className="flex w-full">
                  Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/settings" className="flex w-full">
                  Settings
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to="/help" className="flex w-full">
                  Help
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <NavLink to="/logout" className="flex w-full">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex justify-center bg-slate-700 overflow-x-auto">
        <ul className="flex">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-center px-3 py-3 hover:bg-slate-600 transition-colors",
                    isActive ? "bg-slate-600 border-b-2 border-primary" : "",
                  )
                }
                title={item.label}
              >
                <span>{item.icon}</span>
                <span className="sr-only">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default TopNavbar;
