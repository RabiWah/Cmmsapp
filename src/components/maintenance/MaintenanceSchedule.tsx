import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  User,
  Clock,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  MoreVertical,
  FileText,
  Edit,
  Trash2,
  CheckSquare,
  UserPlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MaintenanceTask {
  id: string;
  title: string;
  date: Date;
  priority: "low" | "medium" | "high";
  asset: string;
  assetId: string;
  technician?: string;
  status: "scheduled" | "in-progress" | "completed" | "overdue";
  type: "preventive" | "corrective" | "predictive" | "inspection";
  estimatedHours: number;
}

const generateTasks = (): MaintenanceTask[] => {
  const today = new Date();
  const tasks: MaintenanceTask[] = [];

  // Generate 30 tasks spread across the current month
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - 10 + i);

    const priorities = ["low", "medium", "high"] as const;
    const statuses = [
      "scheduled",
      "in-progress",
      "completed",
      "overdue",
    ] as const;
    const types = [
      "preventive",
      "corrective",
      "predictive",
      "inspection",
    ] as const;
    const technicians = [
      "John Smith",
      "Maria Rodriguez",
      "David Chen",
      "Sarah Johnson",
      "Robert Williams",
    ];
    const assets = [
      { name: "HVAC System #103", id: "AST-001" },
      { name: "Elevator - Main Lobby", id: "AST-002" },
      { name: "Backup Generator #2", id: "AST-003" },
      { name: "Water Pump - Cooling Tower", id: "AST-004" },
      { name: "Lighting System - Floor 3", id: "AST-005" },
      { name: "Conveyor #B-12", id: "AST-006" },
      { name: "Main Boiler", id: "AST-007" },
    ];

    const randomPriority =
      priorities[Math.floor(Math.random() * priorities.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const randomTechnician =
      technicians[Math.floor(Math.random() * technicians.length)];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];

    tasks.push({
      id: `MT-2023-${i.toString().padStart(3, "0")}`,
      title: `${randomType.charAt(0).toUpperCase() + randomType.slice(1)} Maintenance - ${randomAsset.name}`,
      date: date,
      priority: randomPriority,
      asset: randomAsset.name,
      assetId: randomAsset.id,
      technician: randomTechnician,
      status: randomStatus,
      type: randomType,
      estimatedHours: Math.floor(Math.random() * 5) + 1,
    });
  }

  return tasks;
};

const MaintenanceSchedule = () => {
  const [tasks] = useState<MaintenanceTask[]>(generateTasks());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(
    null,
  );
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  // Get tasks for the selected date
  const getTasksForSelectedDate = () => {
    if (!selectedDate) return [];

    return tasks.filter((task) => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };

  // Get all dates that have tasks
  const datesWithTasks = tasks.map((task) => {
    const date = new Date(task.date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  });

  // Handle month navigation
  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Get filtered tasks for list view
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;
      const matchesType = typeFilter === "all" || task.type === typeFilter;
      return matchesStatus && matchesType;
    });
  };

  // Get priority badge
  const getPriorityBadge = (priority: "low" | "medium" | "high") => {
    switch (priority) {
      case "low":
        return <Badge variant="secondary">Low</Badge>;
      case "medium":
        return <Badge variant="default">Medium</Badge>;
      case "high":
        return <Badge variant="destructive">High</Badge>;
      default:
        return <Badge variant="secondary">Low</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: MaintenanceTask["status"]) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Clock className="mr-1 h-3 w-3" /> Scheduled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            <Wrench className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      case "overdue":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Overdue
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="mr-1 h-3 w-3" /> Scheduled
          </Badge>
        );
    }
  };

  // Handle task click
  const handleTaskClick = (task: MaintenanceTask) => {
    setSelectedTask(task);
    setShowTaskDetails(true);

    // Update task status if needed (e.g., mark as viewed)
    if (task.status === "scheduled") {
      // In a real app, this would update the backend
      console.log(`Task ${task.id} viewed`);
    }
  };

  return (
    <div className="h-full">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl font-bold flex items-center">
              <CalendarClock className="mr-2 h-6 w-6" />
              Maintenance Schedule
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  className="rounded-none"
                  onClick={() => setViewMode("calendar")}
                >
                  Calendar View
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  className="rounded-none"
                  onClick={() => setViewMode("list")}
                >
                  List View
                </Button>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-1" /> Add Task
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "calendar" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousMonth}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={currentMonth}
                  className="rounded-md border"
                  modifiers={{
                    hasTasks: datesWithTasks,
                  }}
                  modifiersClassNames={{
                    hasTasks: "bg-blue-100 font-bold text-blue-600",
                  }}
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-lg">
                  {selectedDate ? (
                    <>Tasks for {selectedDate.toLocaleDateString()}</>
                  ) : (
                    "Select a date to view tasks"
                  )}
                </h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {getTasksForSelectedDate().length > 0 ? (
                    getTasksForSelectedDate().map((task) => (
                      <div
                        key={task.id}
                        className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={() => handleTaskClick(task)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500">
                              {task.asset}
                            </p>
                          </div>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-4 w-4 mr-1" />
                            {task.technician || "Unassigned"}
                          </div>
                          {getStatusBadge(task.status)}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          <span className="font-medium">Type:</span>{" "}
                          {task.type.charAt(0).toUpperCase() +
                            task.type.slice(1)}
                          <span className="mx-2">•</span>
                          <span className="font-medium">Est. Time:</span>{" "}
                          {task.estimatedHours}{" "}
                          {task.estimatedHours === 1 ? "hour" : "hours"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500 border rounded-md">
                      {selectedDate
                        ? "No tasks scheduled for this date"
                        : "Select a date to view tasks"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 mb-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter size={16} />
                      <SelectValue placeholder="Filter by type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="preventive">Preventive</SelectItem>
                    <SelectItem value="corrective">Corrective</SelectItem>
                    <SelectItem value="predictive">Predictive</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Technician</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTasks().length > 0 ? (
                      getFilteredTasks().map((task) => (
                        <TableRow
                          key={task.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleTaskClick(task)}
                        >
                          <TableCell className="font-medium">
                            {task.id}
                          </TableCell>
                          <TableCell>{task.title}</TableCell>
                          <TableCell>
                            {task.date.toLocaleDateString()}
                          </TableCell>
                          <TableCell>{task.asset}</TableCell>
                          <TableCell>
                            {task.type.charAt(0).toUpperCase() +
                              task.type.slice(1)}
                          </TableCell>
                          <TableCell>
                            {getPriorityBadge(task.priority)}
                          </TableCell>
                          <TableCell>{getStatusBadge(task.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                              </div>
                              <span>{task.technician || "Unassigned"}</span>
                            </div>
                          </TableCell>
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
                                  onClick={() =>
                                    alert(`Viewing details for ${task.id}`)
                                  }
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() => alert(`Editing ${task.id}`)}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    alert(`Reassigning ${task.id}`)
                                  }
                                >
                                  <UserPlus className="mr-2 h-4 w-4" />
                                  Reassign
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer"
                                  onClick={() =>
                                    alert(`Marking ${task.id} as complete`)
                                  }
                                >
                                  <CheckSquare className="mr-2 h-4 w-4" />
                                  Mark Complete
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="cursor-pointer text-red-600"
                                  onClick={() => alert(`Deleting ${task.id}`)}
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
                          colSpan={9}
                          className="text-center py-6 text-gray-500"
                        >
                          No maintenance tasks found matching your filters
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4">
          <div className="flex justify-between w-full text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <Badge
                variant="destructive"
                className="h-2 w-2 p-0 rounded-full"
              />
              <span>High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="h-2 w-2 p-0 rounded-full" />
              <span>Low Priority</span>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Task Details Dialog */}
      {selectedTask && (
        <Dialog open={showTaskDetails} onOpenChange={setShowTaskDetails}>
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Maintenance Task Details
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">{selectedTask.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-gray-500">
                    {selectedTask.id}
                  </Badge>
                  {getStatusBadge(selectedTask.status)}
                  {getPriorityBadge(selectedTask.priority)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Asset</p>
                  <p>{selectedTask.asset}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Asset ID</p>
                  <p>{selectedTask.assetId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p>{selectedTask.date.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Estimated Time
                  </p>
                  <p>
                    {selectedTask.estimatedHours}{" "}
                    {selectedTask.estimatedHours === 1 ? "hour" : "hours"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p>
                    {selectedTask.type.charAt(0).toUpperCase() +
                      selectedTask.type.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Assigned To
                  </p>
                  <p>{selectedTask.technician || "Unassigned"}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-sm mt-1">
                  {selectedTask.type === "preventive"
                    ? "Scheduled preventive maintenance to ensure optimal performance and extend equipment lifespan. Includes inspection, cleaning, and part replacement as needed."
                    : selectedTask.type === "corrective"
                      ? "Corrective maintenance to address identified issues and restore equipment to proper working condition. Includes troubleshooting and repair of faulty components."
                      : selectedTask.type === "predictive"
                        ? "Predictive maintenance based on condition monitoring data. Aims to prevent potential failures before they occur by addressing early warning signs."
                        : "Comprehensive inspection to assess equipment condition, identify potential issues, and ensure compliance with safety and operational standards."}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm font-medium text-gray-500">
                  Maintenance Checklist
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Inspect for visible damage or wear
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-sm">
                      Check all connections and fasteners
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      Test operational performance
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">Clean components as needed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      Replace consumable parts if required
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button>
                <CheckSquare className="h-4 w-4 mr-2" />
                {selectedTask.status === "completed"
                  ? "Reopen Task"
                  : "Mark Complete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MaintenanceSchedule;
