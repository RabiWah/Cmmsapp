import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

type NotificationType = "alert" | "update" | "reminder";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface RecentNotificationsProps {
  notifications?: Notification[];
  onViewAll?: () => void;
  onMarkAsRead?: (id: string) => void;
}

const RecentNotifications = ({
  notifications = [
    {
      id: "1",
      type: "alert",
      title: "Critical Alert",
      message: "HVAC System in Building A requires immediate attention",
      time: "10 minutes ago",
      isRead: false,
    },
    {
      id: "2",
      type: "update",
      title: "Work Order Updated",
      message: "WO-2023-089 has been completed by John Smith",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: "3",
      type: "reminder",
      title: "Scheduled Maintenance",
      message: "Preventive maintenance for Generator #4 due tomorrow",
      time: "3 hours ago",
      isRead: false,
    },
    {
      id: "4",
      type: "alert",
      title: "Low Inventory",
      message: "Replacement filters inventory below threshold",
      time: "5 hours ago",
      isRead: true,
    },
  ],
  onViewAll = () => console.log("View all notifications"),
  onMarkAsRead = (id) => console.log(`Mark notification ${id} as read`),
}: RecentNotificationsProps) => {
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

  return (
    <Card className="w-full h-full bg-white overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="text-sm"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
          {notifications.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No notifications at this time
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${notification.isRead ? "bg-gray-50" : "bg-blue-50 border-l-4 border-blue-500"}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm truncate">
                      {notification.title}
                    </h4>
                    {getNotificationBadge(notification.type)}
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
                        onClick={() => onMarkAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentNotifications;
