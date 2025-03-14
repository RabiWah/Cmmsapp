import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { UserPlus, User } from "lucide-react";

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

interface Technician {
  id: string;
  name: string;
  department: string;
  availability: "available" | "busy" | "unavailable";
  skills: string[];
}

interface AssignWorkOrderModalProps {
  workOrder: WorkOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (workOrderId: string, technicianId: string, notes: string) => void;
}

const AssignWorkOrderModal = ({
  workOrder,
  open,
  onOpenChange,
  onAssign,
}: AssignWorkOrderModalProps) => {
  const [selectedTechnician, setSelectedTechnician] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock technicians data
  const technicians: Technician[] = [
    {
      id: "tech-001",
      name: "John Smith",
      department: "Maintenance",
      availability: "available",
      skills: ["HVAC", "Electrical", "Plumbing"],
    },
    {
      id: "tech-002",
      name: "Maria Rodriguez",
      department: "Operations",
      availability: "available",
      skills: ["Mechanical", "Electrical"],
    },
    {
      id: "tech-003",
      name: "David Chen",
      department: "Maintenance",
      availability: "busy",
      skills: ["Plumbing", "General Repairs"],
    },
    {
      id: "tech-004",
      name: "Sarah Johnson",
      department: "Facilities",
      availability: "available",
      skills: ["HVAC", "Electrical"],
    },
    {
      id: "tech-005",
      name: "Robert Williams",
      department: "Engineering",
      availability: "unavailable",
      skills: ["Mechanical", "Automation"],
    },
  ];

  if (!workOrder) return null;

  const handleSubmit = () => {
    if (!selectedTechnician) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onAssign(workOrder.id, selectedTechnician, notes);
      setIsSubmitting(false);
      setSelectedTechnician("");
      setNotes("");
      onOpenChange(false);
    }, 1000);
  };

  const getAvailabilityBadge = (availability: Technician["availability"]) => {
    switch (availability) {
      case "available":
        return <Badge className="bg-green-500">Available</Badge>;
      case "busy":
        return <Badge className="bg-yellow-500">Busy</Badge>;
      case "unavailable":
        return <Badge className="bg-red-500">Unavailable</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Assign Work Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{workOrder.title}</h3>
            <p className="text-sm text-gray-500">{workOrder.id}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technician">Select Technician</Label>
            <Select
              value={selectedTechnician}
              onValueChange={setSelectedTechnician}
            >
              <SelectTrigger id="technician">
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>
              <SelectContent>
                {technicians.map((tech) => (
                  <SelectItem
                    key={tech.id}
                    value={tech.id}
                    disabled={tech.availability === "unavailable"}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{tech.name}</span>
                      {getAvailabilityBadge(tech.availability)}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTechnician && (
            <div className="p-3 border rounded-md bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">
                    {technicians.find((t) => t.id === selectedTechnician)?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {
                      technicians.find((t) => t.id === selectedTechnician)
                        ?.department
                    }
                  </p>
                </div>
                {getAvailabilityBadge(
                  technicians.find((t) => t.id === selectedTechnician)
                    ?.availability || "available",
                )}
              </div>
              <div className="mt-2">
                <p className="text-xs font-medium text-gray-500">Skills:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {technicians
                    .find((t) => t.id === selectedTechnician)
                    ?.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="notes">Assignment Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any specific instructions or notes for the technician"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedTechnician || isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign Work Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignWorkOrderModal;
