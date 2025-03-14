import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Clock, AlertCircle, CheckCircle2, User } from "lucide-react";

interface WorkOrder {
  id: string;
  title: string;
  asset: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  dueDate: string;
}

interface PendingWorkOrdersProps {
  workOrders?: WorkOrder[];
}

const PendingWorkOrders = ({
  workOrders = defaultWorkOrders,
}: PendingWorkOrdersProps) => {
  const getPriorityBadge = (priority: WorkOrder["priority"]) => {
    switch (priority) {
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      case "medium":
        return <Badge>Medium</Badge>;
      case "high":
        return (
          <Badge variant="destructive" className="bg-orange-500">
            High
          </Badge>
        );
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge>Medium</Badge>;
    }
  };

  const getStatusBadge = (status: WorkOrder["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <AlertCircle className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Pending Work Orders</CardTitle>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Work Order</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workOrders.map((order) => (
              <TableRow
                key={order.id}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell className="font-medium">{order.title}</TableCell>
                <TableCell>{order.asset}</TableCell>
                <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <span>{order.assignedTo}</span>
                  </div>
                </TableCell>
                <TableCell>{order.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const defaultWorkOrders: WorkOrder[] = [
  {
    id: "1",
    title: "HVAC Repair - Building A",
    asset: "HVAC System #103",
    priority: "high",
    status: "pending",
    assignedTo: "John Smith",
    dueDate: "2023-06-15",
  },
  {
    id: "2",
    title: "Conveyor Belt Maintenance",
    asset: "Conveyor #B-12",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Maria Rodriguez",
    dueDate: "2023-06-18",
  },
  {
    id: "3",
    title: "Generator Inspection",
    asset: "Backup Generator #2",
    priority: "low",
    status: "pending",
    assignedTo: "David Chen",
    dueDate: "2023-06-22",
  },
  {
    id: "4",
    title: "Boiler Pressure Check",
    asset: "Main Boiler",
    priority: "critical",
    status: "pending",
    assignedTo: "Sarah Johnson",
    dueDate: "2023-06-14",
  },
  {
    id: "5",
    title: "Elevator Safety Inspection",
    asset: "Elevator #3",
    priority: "high",
    status: "in-progress",
    assignedTo: "Robert Williams",
    dueDate: "2023-06-16",
  },
];

export default PendingWorkOrders;
