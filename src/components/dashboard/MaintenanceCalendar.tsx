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
import { CalendarClock, ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface MaintenanceTask {
  id: string;
  title: string;
  date: Date;
  priority: "low" | "medium" | "high";
  asset: string;
  technician?: string;
}

interface MaintenanceCalendarProps {
  tasks?: MaintenanceTask[];
  onTaskClick?: (task: MaintenanceTask) => void;
  onAddTask?: () => void;
}

const MaintenanceCalendar = ({
  tasks = [
    {
      id: "1",
      title: "HVAC Filter Replacement",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      priority: "medium",
      asset: "Building A HVAC System",
    },
    {
      id: "2",
      title: "Generator Inspection",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      priority: "high",
      asset: "Backup Generator #2",
      technician: "John Smith",
    },
    {
      id: "3",
      title: "Conveyor Belt Lubrication",
      date: new Date(),
      priority: "low",
      asset: "Production Line 3",
      technician: "Maria Rodriguez",
    },
    {
      id: "4",
      title: "Safety Sensor Calibration",
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      priority: "medium",
      asset: "Packaging Machine 2",
    },
  ],
  onTaskClick = () => {},
  onAddTask = () => {},
}: MaintenanceCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

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

  // Get priority badge color
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

  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium flex items-center">
          <CalendarClock className="mr-2 h-5 w-5" />
          Maintenance Calendar
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button size="sm" onClick={onAddTask}>
            <Plus className="h-4 w-4 mr-1" /> Add Task
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
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
          <div className="space-y-2">
            <h3 className="font-medium text-sm">
              {selectedDate ? (
                <>Tasks for {selectedDate.toLocaleDateString()}</>
              ) : (
                "Select a date to view tasks"
              )}
            </h3>
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
              {getTasksForSelectedDate().length > 0 ? (
                getTasksForSelectedDate().map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                    onClick={() => onTaskClick(task)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.asset}</p>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>
                    {task.technician && (
                      <p className="text-xs text-gray-500 mt-1">
                        Assigned to: {task.technician}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {selectedDate
                    ? "No tasks scheduled for this date"
                    : "Select a date to view tasks"}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex justify-between w-full text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="h-2 w-2 p-0 rounded-full" />
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
  );
};

export default MaintenanceCalendar;
