import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  FileText,
  Edit,
  Trash2,
  CheckSquare,
  UserPlus,
} from "lucide-react";
import WorkOrderForm from "./WorkOrderForm";
import WorkOrderDetails from "./WorkOrderDetails";
import AssignWorkOrderModal from "./AssignWorkOrderModal";
import CompleteWorkOrderModal from "./CompleteWorkOrderModal";

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

interface WorkOrderFormValues {
  title: string;
  priority: string;
  assetId: string;
  description: string;
  dueDate?: string;
  attachments?: FileList;
}

interface CompletionData {
  completionNotes: string;
  timeSpent: number;
  partsUsed: string;
  followUpNeeded: boolean;
}

const defaultWorkOrders: WorkOrder[] = [
  {
    id: "WO-2023-001",
    title: "HVAC Repair - Building A",
    asset: "HVAC System #103",
    priority: "high",
    status: "pending",
    assignedTo: "John Smith",
    dueDate: "2023-06-15",
    description:
      "Unit is making loud noises and not cooling properly. Check refrigerant levels and fan motor.",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-10",
  },
  {
    id: "WO-2023-002",
    title: "Conveyor Belt Maintenance",
    asset: "Conveyor #B-12",
    priority: "medium",
    status: "in-progress",
    assignedTo: "Maria Rodriguez",
    dueDate: "2023-06-18",
    description:
      "Scheduled preventive maintenance. Lubricate bearings, check tension, inspect for wear.",
    createdAt: "2023-06-08",
    updatedAt: "2023-06-12",
  },
  {
    id: "WO-2023-003",
    title: "Generator Inspection",
    asset: "Backup Generator #2",
    priority: "low",
    status: "pending",
    assignedTo: "David Chen",
    dueDate: "2023-06-22",
    description:
      "Quarterly inspection. Check fuel levels, test start sequence, inspect connections.",
    createdAt: "2023-06-05",
    updatedAt: "2023-06-05",
  },
  {
    id: "WO-2023-004",
    title: "Boiler Pressure Check",
    asset: "Main Boiler",
    priority: "critical",
    status: "pending",
    assignedTo: "Sarah Johnson",
    dueDate: "2023-06-14",
    description:
      "Pressure gauge showing fluctuations. Inspect valves, check for leaks, test safety systems.",
    createdAt: "2023-06-13",
    updatedAt: "2023-06-13",
  },
  {
    id: "WO-2023-005",
    title: "Elevator Safety Inspection",
    asset: "Elevator #3",
    priority: "high",
    status: "in-progress",
    assignedTo: "Robert Williams",
    dueDate: "2023-06-16",
    description:
      "Annual safety inspection. Test emergency brakes, check cables, inspect control systems.",
    createdAt: "2023-06-09",
    updatedAt: "2023-06-14",
  },
  {
    id: "WO-2023-006",
    title: "Lighting Replacement",
    asset: "Office Area - Floor 2",
    priority: "low",
    status: "completed",
    assignedTo: "Emma Davis",
    dueDate: "2023-06-12",
    description:
      "Replace fluorescent lights with LED fixtures in the main office area.",
    createdAt: "2023-06-07",
    updatedAt: "2023-06-12",
  },
  {
    id: "WO-2023-007",
    title: "Plumbing Leak Repair",
    asset: "Restroom - Building B",
    priority: "medium",
    status: "completed",
    assignedTo: "Michael Brown",
    dueDate: "2023-06-11",
    description:
      "Water leak under sink in men's restroom. Replace gasket and check for pipe damage.",
    createdAt: "2023-06-10",
    updatedAt: "2023-06-11",
  },
];

const WorkOrdersList = () => {
  const { toast } = useToast();
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(defaultWorkOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  // Modal states
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(
    null,
  );
  const [editMode, setEditMode] = useState(false);

  const filteredWorkOrders = workOrders.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.asset.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || order.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateWorkOrder = () => {
    setEditMode(false);
    setSelectedWorkOrder(null);
    setShowWorkOrderForm(true);
  };

  const handleViewDetails = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowDetailsModal(true);
  };

  const handleEditWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setEditMode(true);
    setShowWorkOrderForm(true);
    setShowDetailsModal(false);
  };

  const handleAssignWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowAssignModal(true);
    setShowDetailsModal(false);
  };

  const handleCompleteWorkOrder = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setShowCompleteModal(true);
    setShowDetailsModal(false);
  };

  const handleDeleteWorkOrder = (workOrderId: string) => {
    // In a real app, we would call an API to delete the work order
    setWorkOrders(workOrders.filter((order) => order.id !== workOrderId));
    toast({
      title: "Work Order Deleted",
      description: `Work Order ${workOrderId} has been deleted.`,
    });
  };

  const handleWorkOrderSubmit = (data: WorkOrderFormValues) => {
    if (editMode && selectedWorkOrder) {
      // Update existing work order
      const updatedWorkOrders = workOrders.map((order) =>
        order.id === selectedWorkOrder.id
          ? {
              ...order,
              ...data,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : order,
      );
      setWorkOrders(updatedWorkOrders);
      toast({
        title: "Work Order Updated",
        description: `Work Order ${selectedWorkOrder.id} has been updated.`,
      });
    } else {
      // Create new work order
      const newWorkOrder: WorkOrder = {
        id: `WO-2023-${String(workOrders.length + 8).padStart(3, "0")}`,
        title: data.title,
        asset: data.assetId, // In a real app, we would get the asset name from the asset ID
        priority: data.priority,
        status: "pending",
        assignedTo: "Unassigned",
        dueDate: data.dueDate || new Date().toISOString().split("T")[0],
        description: data.description,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setWorkOrders([...workOrders, newWorkOrder]);
      toast({
        title: "Work Order Created",
        description: `Work Order ${newWorkOrder.id} has been created.`,
      });
    }
    setShowWorkOrderForm(false);
    setEditMode(false);
    setSelectedWorkOrder(null);
  };

  const handleAssignSubmit = (
    workOrderId: string,
    technicianId: string,
    notes: string,
  ) => {
    // In a real app, we would call an API to assign the work order
    const updatedWorkOrders = workOrders.map((order) =>
      order.id === workOrderId
        ? {
            ...order,
            assignedTo:
              technicianId === "tech-001"
                ? "John Smith"
                : technicianId === "tech-002"
                  ? "Maria Rodriguez"
                  : technicianId === "tech-003"
                    ? "David Chen"
                    : technicianId === "tech-004"
                      ? "Sarah Johnson"
                      : "Robert Williams",
            status: order.status === "pending" ? "in-progress" : order.status,
            updatedAt: new Date().toISOString().split("T")[0],
          }
        : order,
    );
    setWorkOrders(updatedWorkOrders);
    toast({
      title: "Work Order Assigned",
      description: `Work Order ${workOrderId} has been assigned.`,
    });
  };

  const handleCompleteSubmit = (
    workOrderId: string,
    completionData: CompletionData,
  ) => {
    // In a real app, we would call an API to complete the work order
    const updatedWorkOrders = workOrders.map((order) =>
      order.id === workOrderId
        ? {
            ...order,
            status: "completed",
            updatedAt: new Date().toISOString().split("T")[0],
          }
        : order,
    );
    setWorkOrders(updatedWorkOrders);
    toast({
      title: "Work Order Completed",
      description: `Work Order ${workOrderId} has been marked as complete.`,
    });

    // If follow-up is needed, create a new work order
    if (completionData.followUpNeeded) {
      const originalOrder = workOrders.find(
        (order) => order.id === workOrderId,
      );
      if (originalOrder) {
        const followUpOrder: WorkOrder = {
          id: `WO-2023-${String(workOrders.length + 8).padStart(3, "0")}`,
          title: `Follow-up: ${originalOrder.title}`,
          asset: originalOrder.asset,
          priority: "medium",
          status: "pending",
          assignedTo: "Unassigned",
          dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
            .toISOString()
            .split("T")[0],
          description: `Follow-up maintenance required after completion of ${workOrderId}. Notes: ${completionData.completionNotes}`,
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        };
        setWorkOrders([...updatedWorkOrders, followUpOrder]);
        toast({
          title: "Follow-up Work Order Created",
          description: `A follow-up work order ${followUpOrder.id} has been created.`,
        });
      }
    }
  };

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
    <div className="h-full">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Work Orders</CardTitle>
            <Button
              onClick={handleCreateWorkOrder}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Create Work Order
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search work orders..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter by priority" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Work Order ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWorkOrders.length > 0 ? (
                  filteredWorkOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewDetails(order)}
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.title}</TableCell>
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
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(order);
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditWorkOrder(order);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAssignWorkOrder(order);
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Reassign
                            </DropdownMenuItem>
                            {order.status !== "completed" && (
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCompleteWorkOrder(order);
                                }}
                              >
                                <CheckSquare className="mr-2 h-4 w-4" />
                                Mark Complete
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteWorkOrder(order.id);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-6 text-gray-500"
                    >
                      No work orders found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Work Order Form Modal */}
      <WorkOrderForm
        open={showWorkOrderForm}
        onOpenChange={setShowWorkOrderForm}
        onSubmit={handleWorkOrderSubmit}
        defaultValues={
          editMode && selectedWorkOrder
            ? {
                title: selectedWorkOrder.title,
                assetId: selectedWorkOrder.asset,
                priority: selectedWorkOrder.priority,
                description: selectedWorkOrder.description || "",
              }
            : undefined
        }
      />

      {/* Work Order Details Modal */}
      <WorkOrderDetails
        workOrder={selectedWorkOrder}
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        onEdit={handleEditWorkOrder}
        onAssign={handleAssignWorkOrder}
        onComplete={handleCompleteWorkOrder}
      />

      {/* Assign Work Order Modal */}
      <AssignWorkOrderModal
        workOrder={selectedWorkOrder}
        open={showAssignModal}
        onOpenChange={setShowAssignModal}
        onAssign={handleAssignSubmit}
      />

      {/* Complete Work Order Modal */}
      <CompleteWorkOrderModal
        workOrder={selectedWorkOrder}
        open={showCompleteModal}
        onOpenChange={setShowCompleteModal}
        onComplete={handleCompleteSubmit}
      />
    </div>
  );
};

export default WorkOrdersList;
