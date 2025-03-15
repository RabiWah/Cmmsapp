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
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  MapPin,
  Tag,
  Building,
  DollarSign,
  Hash,
  AlertTriangle,
} from "lucide-react";

interface InventoryFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: InventoryFormValues) => void;
  defaultValues?: Partial<InventoryFormValues>;
}

interface InventoryFormValues {
  name: string;
  category: string;
  location: string;
  status: string;
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  supplier: string;
  description: string;
}

const inventoryCategories = [
  "Filters",
  "Mechanical Parts",
  "Electrical",
  "Lubricants",
  "Lighting",
  "Tools",
  "Safety Equipment",
  "Cleaning Supplies",
  "Plumbing",
  "HVAC Components",
  "Other",
];

const inventoryStatuses = [
  { value: "in-stock", label: "In Stock" },
  { value: "low-stock", label: "Low Stock" },
  { value: "out-of-stock", label: "Out of Stock" },
  { value: "on-order", label: "On Order" },
];

const InventoryForm = ({
  open = true,
  onOpenChange,
  onSubmit,
  defaultValues,
}: InventoryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InventoryFormValues>({
    defaultValues: defaultValues || {
      name: "",
      category: "",
      location: "",
      status: "in-stock",
      quantity: 0,
      minQuantity: 10,
      unitPrice: 0,
      supplier: "",
      description: "",
    },
  });

  const handleSubmit = (values: InventoryFormValues) => {
    setIsSubmitting(true);
    // Validate form data
    if (!values.name.trim()) {
      form.setError("name", {
        type: "required",
        message: "Item name is required",
      });
      setIsSubmitting(false);
      return;
    }
    if (!values.category) {
      form.setError("category", {
        type: "required",
        message: "Category is required",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit(values);
      }
      if (onOpenChange) {
        onOpenChange(false);
      }
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {defaultValues ? "Edit Inventory Item" : "Add New Inventory Item"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <Tag size={16} />
                        <span>Category</span>
                      </div>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inventoryCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inventoryStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>Storage Location</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Warehouse A - Shelf 3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <Package size={16} />
                        <span>Quantity</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <AlertTriangle size={16} />
                        <span>Minimum Quantity</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Alert when stock falls below this level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        <span>Unit Price</span>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
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
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-1">
                      <Building size={16} />
                      <span>Supplier</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter item description, specifications, or notes"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange && onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Saving..."
                  : defaultValues
                    ? "Update Item"
                    : "Save Item"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;
