import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  ArrowLeft,
  Clock,
  Wrench,
  User,
  Plus,
} from "lucide-react";
import { format } from "date-fns";

interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status:
    | "operational"
    | "needs-maintenance"
    | "out-of-service"
    | "under-repair";
  healthScore: number;
  lastMaintenance: string;
  nextMaintenance: string;
  purchaseDate: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
}

interface ScheduleMaintenanceModalProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onSubmit: (data: MaintenanceFormValues) => void;
}

interface MaintenanceFormValues {
  title: string;
  type: string;
  priority: string;
  scheduledDate: Date;
  estimatedDuration: number;
  assignedTo: string;
  description: string;
  recurrence?: string;
}

const ScheduleMaintenanceModal = ({
  asset,
  open,
  onOpenChange,
  onBack,
  onSubmit,
}: ScheduleMaintenanceModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<MaintenanceFormValues>({
    defaultValues: {
      title: asset ? `Maintenance - ${asset.name}` : "",
      type: "preventive",
      priority: "medium",
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 7)),
      estimatedDuration: 2,
      assignedTo: "",
      description: "",
      recurrence: "none",
    },
  });

  // Reset form when asset changes
  React.useEffect(() => {
    if (asset) {
      form.reset({
        title: `Maintenance - ${asset.name}`,
        type: "preventive",
        priority: "medium",
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        estimatedDuration: 2,
        assignedTo: "",
        description: "",
        recurrence: "none",
      });
    }
  }, [asset, form]);

  if (!asset) return null;

  const handleSubmit = (values: MaintenanceFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    try {
      setTimeout(() => {
        setIsSubmitting(false);
        onSubmit(values);
        onOpenChange(false);
      }, 1000);
    } catch (error) {
      console.error("Error scheduling maintenance:", error);
      setIsSubmitting(false);
    }
  };

  // Mock technicians data
  const technicians = [
    { id: "tech-001", name: "John Smith", department: "Maintenance" },
    { id: "tech-002", name: "Maria Rodriguez", department: "Operations" },
    { id: "tech-003", name: "David Chen", department: "Maintenance" },
    { id: "tech-004", name: "Sarah Johnson", department: "Facilities" },
    { id: "tech-005", name: "Robert Williams", department: "Engineering" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle className="text-xl font-bold">
              Schedule Maintenance for {asset.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter maintenance title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <Wrench size={16} />
                        <span>Maintenance Type</span>
                      </div>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="preventive">Preventive</SelectItem>
                        <SelectItem value="corrective">Corrective</SelectItem>
                        <SelectItem value="predictive">Predictive</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduledDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <CalendarIcon size={16} />
                        <span>Scheduled Date</span>
                      </div>
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={"w-full pl-3 text-left font-normal"}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>Estimated Duration (hours)</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0.5"
                        step="0.5"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      <span>Assign Technician</span>
                    </div>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select technician" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="">Unassigned</SelectItem>
                      {technicians.map((tech) => (
                        <SelectItem key={tech.id} value={tech.id}>
                          {tech.name} ({tech.department})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recurrence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurrence Pattern</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recurrence pattern" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">One-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set up a recurring maintenance schedule
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed maintenance instructions and requirements"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Maintenance Tasks Checklist</FormLabel>
              <div className="space-y-2 border rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-1" defaultChecked />
                  <Label htmlFor="task-1">
                    Inspect for visible damage or wear
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-2" defaultChecked />
                  <Label htmlFor="task-2">
                    Check all connections and fasteners
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-3" />
                  <Label htmlFor="task-3">Test operational performance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-4" />
                  <Label htmlFor="task-4">Clean components as needed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-5" />
                  <Label htmlFor="task-5">
                    Replace consumable parts if required
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-6" />
                  <Label htmlFor="task-6">Lubricate moving parts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="task-7" />
                  <Label htmlFor="task-7">Calibrate sensors and controls</Label>
                </div>
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Custom Task
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Schedule Maintenance"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMaintenanceModal;
