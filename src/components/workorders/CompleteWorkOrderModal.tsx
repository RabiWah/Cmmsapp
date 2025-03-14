import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckSquare, Clock, PaperclipIcon } from "lucide-react";

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

interface CompleteWorkOrderModalProps {
  workOrder: WorkOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (workOrderId: string, completionData: CompletionData) => void;
}

interface CompletionData {
  completionNotes: string;
  timeSpent: number;
  partsUsed: string;
  followUpNeeded: boolean;
}

const CompleteWorkOrderModal = ({
  workOrder,
  open,
  onOpenChange,
  onComplete,
}: CompleteWorkOrderModalProps) => {
  const [completionNotes, setCompletionNotes] = useState("");
  const [timeSpent, setTimeSpent] = useState(1);
  const [partsUsed, setPartsUsed] = useState("");
  const [followUpNeeded, setFollowUpNeeded] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!workOrder) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const names = Array.from(files).map((file) => file.name);
      setFileNames(names);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onComplete(workOrder.id, {
        completionNotes,
        timeSpent,
        partsUsed,
        followUpNeeded,
      });
      setIsSubmitting(false);
      resetForm();
      onOpenChange(false);
    }, 1000);
  };

  const resetForm = () => {
    setCompletionNotes("");
    setTimeSpent(1);
    setPartsUsed("");
    setFollowUpNeeded(false);
    setFileNames([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Complete Work Order
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{workOrder.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-gray-500">
                {workOrder.id}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="completionNotes">Completion Notes</Label>
            <Textarea
              id="completionNotes"
              placeholder="Describe the work performed and any issues encountered"
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeSpent" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Time Spent (hours)</span>
              </Label>
              <Input
                id="timeSpent"
                type="number"
                min="0.5"
                step="0.5"
                value={timeSpent}
                onChange={(e) => setTimeSpent(parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partsUsed">Parts Used (if any)</Label>
              <Input
                id="partsUsed"
                placeholder="List parts used"
                value={partsUsed}
                onChange={(e) => setPartsUsed(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="followUpNeeded"
              checked={followUpNeeded}
              onChange={(e) => setFollowUpNeeded(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="followUpNeeded" className="text-sm font-normal">
              Follow-up maintenance needed
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments" className="flex items-center gap-1">
              <PaperclipIcon size={16} />
              <span>Attachments (Optional)</span>
            </Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("attachments")?.click()}
                className="w-full h-20 border-dashed flex flex-col gap-2"
              >
                <PaperclipIcon size={20} />
                <span>Click to upload files</span>
                <span className="text-xs text-muted-foreground">
                  Photos, Documents, Reports
                </span>
              </Button>
              <input
                id="attachments"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {fileNames.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium">Selected files:</p>
                <ul className="text-sm text-muted-foreground">
                  {fileNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              </div>
            )}
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
            disabled={!completionNotes || isSubmitting}
          >
            {isSubmitting ? "Completing..." : "Mark as Complete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteWorkOrderModal;
