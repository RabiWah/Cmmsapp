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
  Menu,
  X,
} from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
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
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
    { icon: <HelpCircle size={20} />, label: "Help", path: "/help" },
  ];

  return (
    <aside
      className={cn(
        "h-full bg-slate-800 text-white flex flex-col transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && <div className="font-bold text-xl">UpKeep</div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-white hover:bg-slate-700"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 hover:bg-slate-700 transition-colors",
                    isActive ? "bg-slate-700" : "",
                    collapsed ? "justify-center" : "space-x-3",
                  )
                }
              >
                <span>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <NavLink
          to="/logout"
          className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors rounded-md"
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
