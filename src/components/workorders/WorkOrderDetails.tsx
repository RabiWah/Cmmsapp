import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  Calendar,
  Clipboard,
  Wrench,
  Edit,
  CheckSquare,
  UserPlus,
} from "lucide-react";

interface WorkOrder {
  id: string;
  title: string;
  asset: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  dueDate: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkOrderDetailsProps {
  workOrder: WorkOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (workOrder: WorkOrder) => void;
  onAssign: (workOrder: WorkOrder) => void;
  onComplete: (workOrder: WorkOrder) => void;
}

const WorkOrderDetails = ({
  workOrder,
  open,
  onOpenChange,
  onEdit,
  onAssign,
  onComplete,
}: WorkOrderDetailsProps) => {
  if (!workOrder) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Work Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">{workOrder.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-gray-500">
                {workOrder.id}
              </Badge>
              {getStatusBadge(workOrder.status)}
              {getPriorityBadge(workOrder.priority)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Asset</p>
              <p>{workOrder.asset}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Due Date</p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p>{workOrder.dueDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Assigned To</p>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-3 w-3 text-gray-500" />
                </div>
                <p>{workOrder.assignedTo}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Created</p>
              <p>{workOrder.createdAt}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Description</p>
            <div className="mt-1 p-3 bg-gray-50 rounded-md">
              <p className="text-sm">
                {workOrder.description || "No description provided."}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Activity</h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                  <Clipboard className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Work Order Created</p>
                  <p className="text-xs text-gray-500">{workOrder.createdAt}</p>
                </div>
              </div>
              {workOrder.status === "in-progress" && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex-shrink-0 flex items-center justify-center">
                    <Wrench className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Work Started</p>
                    <p className="text-xs text-gray-500">
                      {workOrder.updatedAt}
                    </p>
                  </div>
                </div>
              )}
              {workOrder.status === "completed" && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Work Completed</p>
                    <p className="text-xs text-gray-500">
                      {workOrder.updatedAt}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 mt-6">
          <Button variant="outline" onClick={() => onEdit(workOrder)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={() => onAssign(workOrder)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Reassign
          </Button>
          {workOrder.status !== "completed" && (
            <Button onClick={() => onComplete(workOrder)}>
              <CheckSquare className="mr-2 h-4 w-4" />
              Mark Complete
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WorkOrderDetails;
