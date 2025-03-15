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
import { useToast } from "@/components/ui/use-toast";
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
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  FileText,
  Edit,
  Trash2,
  Package,
  AlertTriangle,
  CheckCircle,
  BarChart,
} from "lucide-react";
import InventoryForm from "./InventoryForm";
import InventoryDetails from "./InventoryDetails";

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

const defaultInventory: InventoryItem[] = [
  {
    id: "INV-001",
    name: "HVAC Filters - Standard",
    category: "Filters",
    location: "Warehouse A - Shelf 3",
    status: "in-stock",
    quantity: 45,
    minQuantity: 20,
    unitPrice: 12.99,
    supplier: "AirPro Supplies",
    lastOrderDate: "2023-05-10",
    nextOrderDate: "2023-08-10",
    description: "Standard HVAC filters for routine maintenance. Size: 16x20x1",
  },
  {
    id: "INV-002",
    name: "Bearing Assembly - Type B",
    category: "Mechanical Parts",
    location: "Warehouse B - Shelf 7",
    status: "low-stock",
    quantity: 8,
    minQuantity: 10,
    unitPrice: 45.5,
    supplier: "MechParts Inc.",
    lastOrderDate: "2023-04-22",
    nextOrderDate: "2023-06-22",
    description: "Bearing assemblies for conveyor systems. Model: BA-200",
  },
  {
    id: "INV-003",
    name: "Motor Oil - Industrial Grade",
    category: "Lubricants",
    location: "Warehouse A - Shelf 12",
    status: "in-stock",
    quantity: 32,
    minQuantity: 15,
    unitPrice: 18.75,
    supplier: "LubeTech Solutions",
    lastOrderDate: "2023-05-05",
    nextOrderDate: "2023-09-05",
    description:
      "5W-30 industrial grade motor oil for heavy machinery. 1 gallon containers.",
  },
  {
    id: "INV-004",
    name: "Circuit Breakers - 20A",
    category: "Electrical",
    location: "Warehouse C - Shelf 2",
    status: "out-of-stock",
    quantity: 0,
    minQuantity: 25,
    unitPrice: 8.99,
    supplier: "ElectroSupply Co.",
    lastOrderDate: "2023-03-15",
    nextOrderDate: "2023-06-18",
    description: "20 Amp circuit breakers for electrical panels. UL Listed.",
  },
  {
    id: "INV-005",
    name: "LED Light Fixtures - 4ft",
    category: "Lighting",
    location: "Warehouse B - Shelf 9",
    status: "in-stock",
    quantity: 28,
    minQuantity: 12,
    unitPrice: 34.5,
    supplier: "BrightLite Industries",
    lastOrderDate: "2023-05-20",
    nextOrderDate: "2023-08-20",
    description:
      "4ft LED light fixtures for office spaces. Energy efficient, 4000K color temperature.",
  },
  {
    id: "INV-006",
    name: "Hydraulic Fluid - Type HLP",
    category: "Lubricants",
    location: "Warehouse A - Shelf 14",
    status: "low-stock",
    quantity: 7,
    minQuantity: 10,
    unitPrice: 22.99,
    supplier: "LubeTech Solutions",
    lastOrderDate: "2023-04-10",
    nextOrderDate: "2023-06-20",
    description:
      "Hydraulic fluid for industrial equipment. ISO VG 46. 5 gallon containers.",
  },
  {
    id: "INV-007",
    name: "Air Compressor Filters",
    category: "Filters",
    location: "Warehouse C - Shelf 5",
    status: "on-order",
    quantity: 5,
    minQuantity: 15,
    unitPrice: 16.75,
    supplier: "AirPro Supplies",
    lastOrderDate: "2023-06-01",
    nextOrderDate: "2023-06-15",
    description:
      "Replacement filters for industrial air compressors. Compatible with models AC-100 through AC-500.",
  },
];

const InventoryList = () => {
  const { toast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>(defaultInventory);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Modal states
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [editMode, setEditMode] = useState(false);

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" ||
      item.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleCreateItem = () => {
    setEditMode(false);
    setSelectedItem(null);
    setShowInventoryForm(true);
  };

  const handleViewDetails = (item: InventoryItem) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setEditMode(true);
    setShowInventoryForm(true);
    setShowDetailsModal(false);
  };

  const handleDeleteItem = (itemId: string) => {
    setInventory(inventory.filter((item) => item.id !== itemId));
    toast({
      title: "Item Deleted",
      description: `Inventory item ${itemId} has been deleted.`,
    });
  };

  const handleInventorySubmit = (data: InventoryFormValues) => {
    if (editMode && selectedItem) {
      // Update existing item
      const updatedInventory = inventory.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              ...data,
            }
          : item,
      );
      setInventory(updatedInventory);
      toast({
        title: "Item Updated",
        description: `Inventory item ${selectedItem.id} has been updated.`,
      });
    } else {
      // Create new item
      const newItem: InventoryItem = {
        id: `INV-${String(inventory.length + 8).padStart(3, "0")}`,
        name: data.name,
        category: data.category,
        location: data.location,
        status: data.status as
          | "in-stock"
          | "low-stock"
          | "out-of-stock"
          | "on-order",
        quantity: data.quantity,
        minQuantity: data.minQuantity,
        unitPrice: data.unitPrice,
        supplier: data.supplier,
        lastOrderDate: new Date().toISOString().split("T")[0],
        description: data.description,
      };
      setInventory([...inventory, newItem]);
      toast({
        title: "Item Created",
        description: `Inventory item ${newItem.id} has been created.`,
      });
    }
    setShowInventoryForm(false);
    setEditMode(false);
    setSelectedItem(null);
  };

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

  const getStockLevel = (item: InventoryItem) => {
    if (item.quantity === 0) return "bg-red-500";
    if (item.quantity <= item.minQuantity) return "bg-yellow-500";
    return "bg-green-500";
  };

  const categories = [
    ...new Set(inventory.map((item) => item.category)),
  ].sort();

  return (
    <div className="h-full">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Inventory</CardTitle>
            <Button
              onClick={handleCreateItem}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Inventory Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search inventory..."
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
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="low-stock">Low Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="on-order">On Order</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Filter size={16} />
                    <SelectValue placeholder="Filter by category" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewDetails(item)}
                    >
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getStockLevel(item)}`}
                              style={{
                                width: `${Math.min((item.quantity / (item.minQuantity * 2)) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                          <span>{item.quantity}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
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
                          <DropdownMenuContent
                            align="end"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDetails(item);
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditItem(item);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle reorder logic here
                                toast({
                                  title: "Reorder Initiated",
                                  description: `Reorder for ${item.name} has been initiated.`,
                                });
                              }}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Reorder
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle usage history logic here
                                toast({
                                  title: "Usage History",
                                  description: `Viewing usage history for ${item.name}.`,
                                });
                              }}
                            >
                              <BarChart className="mr-2 h-4 w-4" />
                              Usage History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteItem(item.id);
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
                      No inventory items found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Form Modal */}
      {showInventoryForm && (
        <InventoryForm
          open={showInventoryForm}
          onOpenChange={setShowInventoryForm}
          onSubmit={handleInventorySubmit}
          defaultValues={
            editMode && selectedItem
              ? {
                  name: selectedItem.name,
                  category: selectedItem.category,
                  location: selectedItem.location,
                  status: selectedItem.status,
                  quantity: selectedItem.quantity,
                  minQuantity: selectedItem.minQuantity,
                  unitPrice: selectedItem.unitPrice,
                  supplier: selectedItem.supplier,
                  description: selectedItem.description || "",
                }
              : undefined
          }
        />
      )}

      {/* Inventory Details Modal */}
      {showDetailsModal && selectedItem && (
        <InventoryDetails
          item={selectedItem}
          open={showDetailsModal}
          onOpenChange={setShowDetailsModal}
          onEdit={handleEditItem}
        />
      )}
    </div>
  );
};

export default InventoryList;
