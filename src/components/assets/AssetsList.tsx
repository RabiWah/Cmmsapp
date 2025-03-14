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
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  BarChart,
} from "lucide-react";
import AssetForm from "./AssetForm";
import AssetDetails from "./AssetDetails";
import AssetHistory from "./AssetHistory";
import ScheduleMaintenanceModal from "./ScheduleMaintenanceModal";

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
  description?: string;
  warrantyExpiration?: string;
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

const defaultAssets: Asset[] = [
  {
    id: "AST-001",
    name: "HVAC System #103",
    type: "HVAC",
    location: "Building A - Roof",
    status: "operational",
    healthScore: 92,
    lastMaintenance: "2023-05-15",
    nextMaintenance: "2023-08-15",
    purchaseDate: "2020-03-10",
    manufacturer: "Carrier",
    model: "50TC-16",
    serialNumber: "ABCD123456",
    description:
      "Primary HVAC system serving the main office area on floors 1-3. Installed during the 2020 building renovation project.",
    warrantyExpiration: "2025-03-10",
  },
  {
    id: "AST-002",
    name: "Elevator - Main Lobby",
    type: "Elevator",
    location: "Building A - Main Lobby",
    status: "needs-maintenance",
    healthScore: 78,
    lastMaintenance: "2023-04-20",
    nextMaintenance: "2023-06-20",
    purchaseDate: "2018-07-15",
    manufacturer: "Otis",
    model: "Gen2",
    serialNumber: "ELV789012",
    description:
      "Main lobby elevator serving floors 1-10. Capacity: 2000 lbs / 10 persons.",
    warrantyExpiration: "2023-07-15",
  },
  {
    id: "AST-003",
    name: "Backup Generator #2",
    type: "Generator",
    location: "Building B - Basement",
    status: "operational",
    healthScore: 95,
    lastMaintenance: "2023-05-30",
    nextMaintenance: "2023-08-30",
    purchaseDate: "2021-01-05",
    manufacturer: "Generac",
    model: "SG080",
    serialNumber: "GEN345678",
    description:
      "80kW standby generator providing emergency power to critical systems in Building B.",
    warrantyExpiration: "2026-01-05",
  },
  {
    id: "AST-004",
    name: "Water Pump - Cooling Tower",
    type: "Pump",
    location: "Building A - Mechanical Room",
    status: "under-repair",
    healthScore: 45,
    lastMaintenance: "2023-06-02",
    nextMaintenance: "2023-07-02",
    purchaseDate: "2019-11-20",
    manufacturer: "Grundfos",
    model: "CR 32",
    serialNumber: "PMP901234",
    description:
      "Primary circulation pump for the cooling tower system. Currently under repair due to bearing failure.",
    warrantyExpiration: "2022-11-20",
  },
  {
    id: "AST-005",
    name: "Lighting System - Floor 3",
    type: "Lighting",
    location: "Building A - Floor 3",
    status: "operational",
    healthScore: 88,
    lastMaintenance: "2023-05-10",
    nextMaintenance: "2023-11-10",
    purchaseDate: "2022-02-15",
    manufacturer: "Philips",
    model: "LED Panel",
    serialNumber: "LGT567890",
    description:
      "LED lighting system for the entire 3rd floor. Includes motion sensors and daylight harvesting controls.",
    warrantyExpiration: "2027-02-15",
  },
  {
    id: "AST-006",
    name: "Conveyor #B-12",
    type: "Conveyor",
    location: "Warehouse - Section B",
    status: "needs-maintenance",
    healthScore: 72,
    lastMaintenance: "2023-04-05",
    nextMaintenance: "2023-06-05",
    purchaseDate: "2017-09-30",
    manufacturer: "Dematic",
    model: "Roller Conveyor",
    serialNumber: "CNV123789",
    description:
      "30-meter roller conveyor connecting packing stations to shipping area. Scheduled for belt replacement.",
    warrantyExpiration: "2022-09-30",
  },
  {
    id: "AST-007",
    name: "Main Boiler",
    type: "Boiler",
    location: "Building B - Basement",
    status: "out-of-service",
    healthScore: 30,
    lastMaintenance: "2023-03-15",
    nextMaintenance: "2023-06-15",
    purchaseDate: "2015-12-10",
    manufacturer: "Cleaver-Brooks",
    model: "CB-LE",
    serialNumber: "BLR456123",
    description:
      "Main heating boiler for Building B. Currently out of service due to control system failure. Replacement parts on order.",
    warrantyExpiration: "2020-12-10",
  },
];

const AssetsList = () => {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>(defaultAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Modal states
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [editMode, setEditMode] = useState(false);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || asset.status === statusFilter;
    const matchesType =
      typeFilter === "all" ||
      asset.type.toLowerCase() === typeFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCreateAsset = () => {
    setEditMode(false);
    setSelectedAsset(null);
    setShowAssetForm(true);
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowDetailsModal(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setEditMode(true);
    setShowAssetForm(true);
    setShowDetailsModal(false);
  };

  const handleScheduleMaintenance = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowMaintenanceModal(true);
    setShowDetailsModal(false);
  };

  const handleViewHistory = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowHistoryModal(true);
    setShowDetailsModal(false);
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter((asset) => asset.id !== assetId));
    toast({
      title: "Asset Deleted",
      description: `Asset ${assetId} has been deleted.`,
    });
  };

  const handleAssetSubmit = (data: AssetFormValues) => {
    if (editMode && selectedAsset) {
      // Update existing asset
      const updatedAssets = assets.map((asset) =>
        asset.id === selectedAsset.id
          ? {
              ...asset,
              ...data,
            }
          : asset,
      );
      setAssets(updatedAssets);
      toast({
        title: "Asset Updated",
        description: `Asset ${selectedAsset.id} has been updated.`,
      });
    } else {
      // Create new asset
      const newAsset: Asset = {
        id: `AST-${String(assets.length + 8).padStart(3, "0")}`,
        name: data.name,
        type: data.type,
        location: data.location,
        status: data.status,
        healthScore: 100, // New assets start with perfect health
        lastMaintenance: "N/A",
        nextMaintenance: data.nextMaintenance || "Not scheduled",
        purchaseDate:
          data.purchaseDate || new Date().toISOString().split("T")[0],
        manufacturer: data.manufacturer,
        model: data.model,
        serialNumber: data.serialNumber,
        description: data.description,
        warrantyExpiration: data.warrantyExpiration,
      };
      setAssets([...assets, newAsset]);
      toast({
        title: "Asset Created",
        description: `Asset ${newAsset.id} has been created.`,
      });
    }
    setShowAssetForm(false);
    setEditMode(false);
    setSelectedAsset(null);
  };

  const handleMaintenanceSubmit = (data: MaintenanceFormValues) => {
    if (!selectedAsset) return;

    try {
      // Update the asset's next maintenance date
      const updatedAssets = assets.map((asset) =>
        asset.id === selectedAsset.id
          ? {
              ...asset,
              nextMaintenance: data.scheduledDate.toISOString().split("T")[0],
              status:
                asset.status === "needs-maintenance"
                  ? "operational"
                  : asset.status,
            }
          : asset,
      );
      setAssets(updatedAssets);
      setShowMaintenanceModal(false);

      // Create a maintenance record (in a real app, this would be saved to a database)
      const maintenanceRecord = {
        id: `MT-${new Date().getTime()}`,
        assetId: selectedAsset.id,
        title: data.title,
        type: data.type,
        priority: data.priority,
        scheduledDate: data.scheduledDate.toISOString().split("T")[0],
        estimatedDuration: data.estimatedDuration,
        assignedTo: data.assignedTo,
        description: data.description,
        recurrence: data.recurrence,
        status: "scheduled",
        createdAt: new Date().toISOString(),
        tasks: [
          {
            id: "task-1",
            name: "Inspect for visible damage or wear",
            completed: true,
          },
          {
            id: "task-2",
            name: "Check all connections and fasteners",
            completed: true,
          },
          {
            id: "task-3",
            name: "Test operational performance",
            completed: false,
          },
          {
            id: "task-4",
            name: "Clean components as needed",
            completed: false,
          },
          {
            id: "task-5",
            name: "Replace consumable parts if required",
            completed: false,
          },
          { id: "task-6", name: "Lubricate moving parts", completed: false },
          {
            id: "task-7",
            name: "Calibrate sensors and controls",
            completed: false,
          },
        ],
      };

      console.log("Created maintenance record:", maintenanceRecord);

      toast({
        title: "Maintenance Scheduled",
        description: `Maintenance for ${selectedAsset.name} has been scheduled for ${data.scheduledDate.toLocaleDateString()}.`,
      });
    } catch (error) {
      console.error("Error scheduling maintenance:", error);
      toast({
        title: "Error",
        description:
          "There was an error scheduling maintenance. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: Asset["status"]) => {
    switch (status) {
      case "operational":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            <CheckCircle className="mr-1 h-3 w-3" /> Operational
          </Badge>
        );
      case "needs-maintenance":
        return (
          <Badge
            variant="outline"
            className="border-yellow-500 text-yellow-500"
          >
            <Clock className="mr-1 h-3 w-3" /> Needs Maintenance
          </Badge>
        );
      case "under-repair":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            <Wrench className="mr-1 h-3 w-3" /> Under Repair
          </Badge>
        );
      case "out-of-service":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            <AlertTriangle className="mr-1 h-3 w-3" /> Out of Service
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <CheckCircle className="mr-1 h-3 w-3" /> Operational
          </Badge>
        );
    }
  };

  const getHealthScoreBadge = (score: number) => {
    if (score >= 90) {
      return <Badge className="bg-green-500">Excellent</Badge>;
    } else if (score >= 75) {
      return <Badge className="bg-green-400">Good</Badge>;
    } else if (score >= 60) {
      return <Badge className="bg-yellow-500">Fair</Badge>;
    } else if (score >= 40) {
      return <Badge className="bg-orange-500">Poor</Badge>;
    } else {
      return <Badge variant="destructive">Critical</Badge>;
    }
  };

  const assetTypes = [...new Set(assets.map((asset) => asset.type))].sort();

  return (
    <div className="h-full">
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">Assets</CardTitle>
            <Button
              onClick={handleCreateAsset}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add New Asset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assets..."
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
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="needs-maintenance">
                    Needs Maintenance
                  </SelectItem>
                  <SelectItem value="under-repair">Under Repair</SelectItem>
                  <SelectItem value="out-of-service">Out of Service</SelectItem>
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
                  {assetTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
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
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Health Score</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <TableRow
                      key={asset.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewDetails(asset)}
                    >
                      <TableCell className="font-medium">{asset.id}</TableCell>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.location}</TableCell>
                      <TableCell>{getStatusBadge(asset.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                asset.healthScore >= 90
                                  ? "bg-green-500"
                                  : asset.healthScore >= 75
                                    ? "bg-green-400"
                                    : asset.healthScore >= 60
                                      ? "bg-yellow-500"
                                      : asset.healthScore >= 40
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                              }`}
                              style={{ width: `${asset.healthScore}%` }}
                            ></div>
                          </div>
                          <span>{asset.healthScore}%</span>
                          {getHealthScoreBadge(asset.healthScore)}
                        </div>
                      </TableCell>
                      <TableCell>{asset.nextMaintenance}</TableCell>
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
                                handleViewDetails(asset);
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAsset(asset);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleScheduleMaintenance(asset);
                              }}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Maintenance
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewHistory(asset);
                              }}
                            >
                              <BarChart className="mr-2 h-4 w-4" />
                              View History
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="cursor-pointer text-red-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAsset(asset.id);
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
                      No assets found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Asset Form Modal */}
      <AssetForm
        open={showAssetForm}
        onOpenChange={setShowAssetForm}
        onSubmit={handleAssetSubmit}
        defaultValues={
          editMode && selectedAsset
            ? {
                name: selectedAsset.name,
                type: selectedAsset.type,
                location: selectedAsset.location,
                status: selectedAsset.status,
                manufacturer: selectedAsset.manufacturer,
                model: selectedAsset.model,
                serialNumber: selectedAsset.serialNumber,
                description: selectedAsset.description || "",
                purchaseDate: new Date(selectedAsset.purchaseDate),
                warrantyExpiration: selectedAsset.warrantyExpiration
                  ? new Date(selectedAsset.warrantyExpiration)
                  : undefined,
              }
            : undefined
        }
      />

      {/* Asset Details Modal */}
      <AssetDetails
        asset={selectedAsset}
        open={showDetailsModal}
        onOpenChange={setShowDetailsModal}
        onEdit={handleEditAsset}
        onScheduleMaintenance={handleScheduleMaintenance}
        onViewHistory={handleViewHistory}
      />

      {/* Asset History Modal */}
      <AssetHistory
        asset={selectedAsset}
        open={showHistoryModal}
        onOpenChange={setShowHistoryModal}
        onBack={() => {
          setShowHistoryModal(false);
          setShowDetailsModal(true);
        }}
      />

      {/* Schedule Maintenance Modal */}
      <ScheduleMaintenanceModal
        asset={selectedAsset}
        open={showMaintenanceModal}
        onOpenChange={setShowMaintenanceModal}
        onBack={() => {
          setShowMaintenanceModal(false);
          setShowDetailsModal(true);
        }}
        onSubmit={handleMaintenanceSubmit}
      />
    </div>
  );
};

export default AssetsList;
