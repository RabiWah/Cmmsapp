import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  MoreVertical,
  Filter,
  CheckSquare,
  Trash2,
  BellOff,
} from "lucide-react";

type NotificationType = "alert" | "update" | "reminder";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  timestamp: Date;
  isRead: boolean;
  category?: "work-order" | "asset" | "maintenance" | "system";
  relatedId?: string;
}

const generateNotifications = (): Notification[] => {
  const notifications: Notification[] = [];
  const now = new Date();

  // Sample notifications
  const sampleData = [
    {
      type: "alert" as NotificationType,
      title: "Critical Alert",
      message: "HVAC System in Building A requires immediate attention",
      hoursAgo: 0.2,
      isRead: false,
      category: "asset" as const,
      relatedId: "AST-001",
    },
    {
      type: "update" as NotificationType,
      title: "Work Order Updated",
      message: "WO-2023-089 has been completed by John Smith",
      hoursAgo: 1,
      isRead: true,
      category: "work-order" as const,
      relatedId: "WO-2023-089",
    },
    {
      type: "reminder" as NotificationType,
      title: "Scheduled Maintenance",
      message: "Preventive maintenance for Generator #4 due tomorrow",
      hoursAgo: 3,
      isRead: false,
      category: "maintenance" as const,
      relatedId: "MT-2023-045",
    },
    {
      type: "alert" as NotificationType,
      title: "Low Inventory",
      message: "Replacement filters inventory below threshold",
      hoursAgo: 5,
      isRead: true,
      category: "system" as const,
    },
    {
      type: "update" as NotificationType,
      title: "Asset Status Changed",
      message: "Elevator #3 status changed to 'Under Repair'",
      hoursAgo: 6,
      isRead: false,
      category: "asset" as const,
      relatedId: "AST-002",
    },
    {
      type: "reminder" as NotificationType,
      title: "Work Order Due Soon",
      message: "WO-2023-092 is due in 2 days",
      hoursAgo: 8,
      isRead: false,
      category: "work-order" as const,
      relatedId: "WO-2023-092",
    },
    {
      type: "update" as NotificationType,
      title: "New Work Order Assigned",
      message: "You have been assigned to WO-2023-095",
      hoursAgo: 10,
      isRead: true,
      category: "work-order" as const,
      relatedId: "WO-2023-095",
    },
    {
      type: "alert" as NotificationType,
      title: "Maintenance Overdue",
      message: "Scheduled maintenance for Boiler #2 is overdue",
      hoursAgo: 12,
      isRead: false,
      category: "maintenance" as const,
      relatedId: "MT-2023-038",
    },
    {
      type: "update" as NotificationType,
      title: "System Update",
      message: "System will be down for maintenance tonight from 2-4 AM",
      hoursAgo: 24,
      isRead: true,
      category: "system" as const,
    },
    {
      type: "reminder" as NotificationType,
      title: "License Expiring",
      message: "Equipment license for Forklift #3 expires in 7 days",
      hoursAgo: 30,
      isRead: false,
      category: "asset" as const,
      relatedId: "AST-015",
    },
  ];

  // Generate notifications with timestamps
  sampleData.forEach((item, index) => {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - item.hoursAgo);

    let timeString = "";
    if (item.hoursAgo < 1) {
      timeString = `${Math.round(item.hoursAgo * 60)} minutes ago`;
    } else if (item.hoursAgo < 24) {
      timeString = `${Math.round(item.hoursAgo)} hours ago`;
    } else {
      timeString = `${Math.round(item.hoursAgo / 24)} days ago`;
    }

    notifications.push({
      id: `notif-${index + 1}`,
      type: item.type,
      title: item.title,
      message: item.message,
      time: timeString,
      timestamp: timestamp,
      isRead: item.isRead,
      category: item.category,
      relatedId: item.relatedId,
    });
  });

  // Add more random notifications
  for (let i = 0; i < 15; i++) {
    const types = ["alert", "update", "reminder"] as NotificationType[];
    const categories = [
      "work-order",
      "asset",
      "maintenance",
      "system",
    ] as const;
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomHoursAgo = Math.floor(Math.random() * 72) + 1;
    const randomIsRead = Math.random() > 0.5;

    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - randomHoursAgo);

    let timeString = "";
    if (randomHoursAgo < 24) {
      timeString = `${randomHoursAgo} hours ago`;
    } else {
      timeString = `${Math.floor(randomHoursAgo / 24)} days ago`;
    }

    let title = "";
    let message = "";
    let relatedId = "";

    if (randomType === "alert") {
      if (randomCategory === "asset") {
        title = "Asset Alert";
        message = `Asset AST-${(i + 20).toString().padStart(3, "0")} requires attention`;
        relatedId = `AST-${(i + 20).toString().padStart(3, "0")}`;
      } else if (randomCategory === "work-order") {
        title = "Work Order Alert";
        message = `Work Order WO-2023-${(i + 100).toString().padStart(3, "0")} is high priority`;
        relatedId = `WO-2023-${(i + 100).toString().padStart(3, "0")}`;
      } else {
        title = "System Alert";
        message = "System performance issue detected";
      }
    } else if (randomType === "update") {
      if (randomCategory === "work-order") {
        title = "Work Order Updated";
        message = `Work Order WO-2023-${(i + 100).toString().padStart(3, "0")} status changed`;
        relatedId = `WO-2023-${(i + 100).toString().padStart(3, "0")}`;
      } else if (randomCategory === "asset") {
        title = "Asset Updated";
        message = `Asset AST-${(i + 20).toString().padStart(3, "0")} information updated`;
        relatedId = `AST-${(i + 20).toString().padStart(3, "0")}`;
      } else {
        title = "Maintenance Update";
        message = `Maintenance schedule updated for next week`;
      }
    } else {
      if (randomCategory === "maintenance") {
        title = "Maintenance Reminder";
        message = `Scheduled maintenance due for MT-2023-${(i + 50).toString().padStart(3, "0")}`;
        relatedId = `MT-2023-${(i + 50).toString().padStart(3, "0")}`;
      } else if (randomCategory === "work-order") {
        title = "Work Order Reminder";
        message = `Work Order WO-2023-${(i + 100).toString().padStart(3, "0")} due soon`;
        relatedId = `WO-2023-${(i + 100).toString().padStart(3, "0")}`;
      } else {
        title = "System Reminder";
        message = "Remember to complete your weekly reports";
      }
    }

    notifications.push({
      id: `notif-${sampleData.length + i + 1}`,
      type: randomType,
      title: title,
      message: message,
      time: timeString,
      timestamp: timestamp,
      isRead: randomIsRead,
      category: randomCategory,
      relatedId: relatedId || undefined,
    });
  }

  // Sort by timestamp (newest first)
  return notifications.sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  );
};

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    generateNotifications(),
  );
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") {
      return (
        categoryFilter === "all" || notification.category === categoryFilter
      );
    } else if (activeTab === "unread") {
      return (
        !notification.isRead &&
        (categoryFilter === "all" || notification.category === categoryFilter)
      );
    } else if (activeTab === "alerts") {
      return (
        notification.type === "alert" &&
        (categoryFilter === "all" || notification.category === categoryFilter)
      );
    } else if (activeTab === "updates") {
      return (
        notification.type === "update" &&
        (categoryFilter === "all" || notification.category === categoryFilter)
      );
    } else if (activeTab === "reminders") {
      return (
        notification.type === "reminder" &&
        (categoryFilter === "all" || notification.category === categoryFilter)
      );
    }
    return false;
  });

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      case "update":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "reminder":
        return <Clock className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getNotificationBadge = (type: NotificationType) => {
    switch (type) {
      case "alert":
        return <Badge variant="destructive">Alert</Badge>;
      case "update":
        return <Badge variant="secondary">Update</Badge>;
      case "reminder":
        return <Badge>Reminder</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category?: string) => {
    if (!category) return null;

    switch (category) {
      case "work-order":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Work Order
          </Badge>
        );
      case "asset":
        return (
          <Badge
            variant="outline"
            className="border-purple-500 text-purple-500"
          >
            Asset
          </Badge>
        );
      case "maintenance":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Maintenance
          </Badge>
        );
      case "system":
        return (
          <Badge variant="outline" className="border-gray-500 text-gray-500">
            System
          </Badge>
        );
      default:
        return null;
    }
  };

  const markAsRead = (id: string) => {
    // In a real app, this would call an API to mark the notification as read
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification,
      ),
    );

    // Update notification count in UI
    const updatedUnreadCount = notifications.filter(
      (n) => !n.isRead && n.id !== id,
    ).length;
    console.log(
      `Marked notification ${id} as read. Unread count: ${updatedUnreadCount}`,
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );
  };

  return (
    <div className="h-full">
      <Card className="bg-white h-full">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} Unread
                </Badge>
              )}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                    All Categories
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCategoryFilter("work-order")}
                  >
                    Work Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("asset")}>
                    Assets
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCategoryFilter("maintenance")}
                  >
                    Maintenance
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCategoryFilter("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <CheckSquare className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-4 overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="alerts">Alerts</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground border rounded-md">
                    <BellOff className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p>No notifications to display</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 p-4 rounded-lg transition-colors ${notification.isRead ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"}`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {notification.title}
                          </h4>
                          <div className="flex gap-1">
                            {getNotificationBadge(notification.type)}
                            {getCategoryBadge(notification.category)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            {notification.time}
                          </span>
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs h-6 px-2 text-blue-600 hover:text-blue-800"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
