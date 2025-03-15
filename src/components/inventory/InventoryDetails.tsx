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
  Package,
  AlertTriangle,
  CheckCircle,
  Building,
  Calendar,
  MapPin,
  Tag,
  Edit,
  BarChart,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  location: string;
  status: "in-stock" | "low-stock" | "out-of-stock" | "on-order";
  quantity: number;
  minQuantity: number;
  unitPrice: number;
  supplier: string;
  lastOrderDate: string;
  nextOrderDate?: string;
  description?: string;
}

interface InventoryDetailsProps {
  item: InventoryItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (item: InventoryItem) => void;
}

const InventoryDetails = ({
  item,
  open,
  onOpenChange,
  onEdit,
}: InventoryDetailsProps) => {
  if (!item) return null;

  const getStatusBadge = (status: InventoryItem["status"]) => {
    switch (status) {
      case "in-stock":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> In Stock
          </Badge>
        );
      case "low-stock":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            <AlertTriangle className="mr-1 h-3 w-3" /> Low Stock
          </Badge>
        );
      case "out-of-stock":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Out of Stock
          </Badge>
        );
      case "on-order":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Package className="mr-1 h-3 w-3" /> On Order
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <CheckCircle className="mr-1 h-3 w-3" /> In Stock
          </Badge>
        );
    }
  };

  const getStockLevelBadge = (item: InventoryItem) => {
    const ratio = item.quantity / item.minQuantity;
    if (item.quantity === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (ratio <= 0.5) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (ratio <= 1) {
      return <Badge className="bg-orange-500">Low</Badge>;
    } else if (ratio <= 2) {
      return <Badge className="bg-yellow-500">Moderate</Badge>;
    } else {
      return <Badge className="bg-green-500">Healthy</Badge>;
    }
  };

  // Calculate total value
  const totalValue = item.quantity * item.unitPrice;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Inventory Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">{item.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-gray-500">
                {item.id}
              </Badge>
              {getStatusBadge(item.status)}
              {getStockLevelBadge(item)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Category</p>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-400" />
                <p>{item.category}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-400" />
                <p>{item.location}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Supplier</p>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4 text-gray-400" />
                <p>{item.supplier}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Last Order Date
              </p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p>{item.lastOrderDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Unit Price</p>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <p>${item.unitPrice.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-gray-400" />
                <p>${totalValue.toFixed(2)}</p>
              </div>
            </div>
            {item.nextOrderDate && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Next Order Date
                </p>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <p>{item.nextOrderDate}</p>
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Stock Level</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    item.quantity === 0
                      ? "bg-red-500"
                      : item.quantity <= item.minQuantity * 0.5
                        ? "bg-red-500"
                        : item.quantity <= item.minQuantity
                          ? "bg-orange-500"
                          : item.quantity <= item.minQuantity * 2
                            ? "bg-yellow-500"
                            : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min((item.quantity / (item.minQuantity * 2)) * 100, 100)}%`,
                  }}
                ></div>
              </div>
              <span>{item.quantity} units</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <AlertTriangle className="h-4 w-4 mr-1 text-gray-400" />
              <span>Minimum stock level: {item.minQuantity} units</span>
            </div>
          </div>

          {item.description && (
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          )}

          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Inventory Checked</p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                  {item.quantity > item.minQuantity ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {item.quantity > item.minQuantity
                      ? "Stock Level Healthy"
                      : "Stock Level Low"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 mt-6">
          <Button variant="outline" onClick={() => onEdit(item)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              // Handle reorder logic here
              onOpenChange(false);
            }}
          >
            <Package className="mr-2 h-4 w-4" />
            Reorder
          </Button>
          <Button
            onClick={() => {
              // Handle usage history logic here
              onOpenChange(false);
            }}
          >
            <BarChart className="mr-2 h-4 w-4" />
            Usage History
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryDetails;
