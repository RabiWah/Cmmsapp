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
  Clock,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Calendar,
  Building,
  Tag,
  Edit,
  BarChart,
} from "lucide-react";

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

interface AssetDetailsProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (asset: Asset) => void;
  onScheduleMaintenance: (asset: Asset) => void;
  onViewHistory: (asset: Asset) => void;
}

const AssetDetails = ({
  asset,
  open,
  onOpenChange,
  onEdit,
  onScheduleMaintenance,
  onViewHistory,
}: AssetDetailsProps) => {
  if (!asset) return null;

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Asset Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium">{asset.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-gray-500">
                {asset.id}
              </Badge>
              {getStatusBadge(asset.status)}
              {getHealthScoreBadge(asset.healthScore)}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Type</p>
              <p>{asset.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p>{asset.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Manufacturer</p>
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4 text-gray-400" />
                <p>{asset.manufacturer}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Model</p>
              <p>{asset.model}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Serial Number</p>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-gray-400" />
                <p>{asset.serialNumber}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Purchase Date</p>
              <p>{asset.purchaseDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Last Maintenance
              </p>
              <p>{asset.lastMaintenance}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Next Maintenance
              </p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p>{asset.nextMaintenance}</p>
              </div>
            </div>
            {asset.warrantyExpiration && (
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Warranty Expiration
                </p>
                <p>{asset.warrantyExpiration}</p>
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Health Score</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
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
            </div>
          </div>

          {asset.description && (
            <div>
              <p className="text-sm font-medium text-gray-500">Description</p>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                <p className="text-sm">{asset.description}</p>
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
                  <Wrench className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Maintenance Performed</p>
                  <p className="text-xs text-gray-500">
                    {asset.lastMaintenance}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Health Check Completed</p>
                  <p className="text-xs text-gray-500">
                    {
                      new Date(
                        new Date(asset.lastMaintenance).getTime() + 86400000,
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 mt-6">
          <Button variant="outline" onClick={() => onEdit(asset)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => onScheduleMaintenance(asset)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Maintenance
          </Button>
          <Button onClick={() => onViewHistory(asset)}>
            <BarChart className="mr-2 h-4 w-4" />
            View History
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetDetails;
