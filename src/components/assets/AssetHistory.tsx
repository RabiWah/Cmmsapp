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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart as BarChartIcon,
  Calendar,
  Wrench,
  CheckCircle,
  AlertTriangle,
  FileText,
  User,
  ArrowLeft,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

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

interface MaintenanceRecord {
  id: string;
  date: string;
  type: "preventive" | "corrective" | "inspection";
  description: string;
  technician: string;
  cost: number;
  parts: string[];
  duration: number;
}

interface HealthRecord {
  date: string;
  score: number;
  issues?: string[];
}

interface AssetHistoryProps {
  asset: Asset | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
}

const AssetHistory = ({
  asset,
  open,
  onOpenChange,
  onBack,
}: AssetHistoryProps) => {
  if (!asset) return null;

  // Mock maintenance history data
  const maintenanceHistory: MaintenanceRecord[] = [
    {
      id: "M-001",
      date: "2023-05-15",
      type: "preventive",
      description:
        "Regular scheduled maintenance. Replaced filters and performed system check.",
      technician: "John Smith",
      cost: 350,
      parts: ["Air filter", "Oil filter"],
      duration: 2.5,
    },
    {
      id: "M-002",
      date: "2023-03-10",
      type: "corrective",
      description: "Repaired leak in cooling system. Replaced damaged gasket.",
      technician: "Maria Rodriguez",
      cost: 520,
      parts: ["Gasket", "Coolant"],
      duration: 4,
    },
    {
      id: "M-003",
      date: "2023-01-22",
      type: "inspection",
      description:
        "Quarterly inspection. All systems functioning within normal parameters.",
      technician: "David Chen",
      cost: 150,
      parts: [],
      duration: 1.5,
    },
    {
      id: "M-004",
      date: "2022-11-05",
      type: "preventive",
      description:
        "Annual maintenance. Replaced worn components and updated firmware.",
      technician: "Sarah Johnson",
      cost: 780,
      parts: ["Control board", "Sensors", "Lubricant"],
      duration: 6,
    },
    {
      id: "M-005",
      date: "2022-08-17",
      type: "corrective",
      description:
        "Emergency repair after power surge. Replaced damaged electronics.",
      technician: "John Smith",
      cost: 1200,
      parts: ["Power supply", "Circuit breaker"],
      duration: 8,
    },
  ];

  // Mock health history data
  const healthHistory: HealthRecord[] = [
    { date: "2023-05-15", score: asset.healthScore },
    { date: "2023-03-10", score: asset.healthScore - 5 },
    { date: "2023-01-22", score: asset.healthScore - 8 },
    { date: "2022-11-05", score: asset.healthScore - 12 },
    { date: "2022-08-17", score: asset.healthScore - 25 },
    { date: "2022-06-03", score: asset.healthScore - 18 },
    { date: "2022-04-12", score: asset.healthScore - 15 },
    { date: "2022-02-28", score: asset.healthScore - 10 },
    { date: "2022-01-15", score: asset.healthScore - 5 },
    { date: "2021-12-01", score: asset.healthScore - 2 },
  ];

  // Chart data
  const healthChartData = healthHistory
    .map((record) => ({
      date: record.date,
      score: record.score,
    }))
    .reverse();

  const maintenanceCostData = maintenanceHistory
    .map((record) => ({
      date: record.date,
      cost: record.cost,
      type: record.type,
    }))
    .reverse();

  const getMaintenanceTypeBadge = (type: MaintenanceRecord["type"]) => {
    switch (type) {
      case "preventive":
        return <Badge className="bg-blue-500">Preventive</Badge>;
      case "corrective":
        return <Badge className="bg-orange-500">Corrective</Badge>;
      case "inspection":
        return <Badge className="bg-green-500">Inspection</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <BarChartIcon className="h-5 w-5" />
              Asset History: {asset.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="maintenance" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
            <TabsTrigger value="health">Health Trends</TabsTrigger>
            <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceHistory.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        {getMaintenanceTypeBadge(record.type)}
                      </TableCell>
                      <TableCell
                        className="max-w-[200px] truncate"
                        title={record.description}
                      >
                        {record.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-3 w-3 text-gray-500" />
                          </div>
                          <span>{record.technician}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.duration} hrs</TableCell>
                      <TableCell>${record.cost}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium mb-2">Maintenance Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-white rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Wrench className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Maintenance</p>
                      <p className="text-xl font-bold">
                        {maintenanceHistory.length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Maintenance</p>
                      <p className="text-xl font-bold">
                        {maintenanceHistory[0].date}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-white rounded-md border">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Cost</p>
                      <p className="text-xl font-bold">
                        $
                        {maintenanceHistory.reduce(
                          (sum, record) => sum + record.cost,
                          0,
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="health" className="space-y-4">
            <div className="h-[300px] border rounded-md p-4">
              <h3 className="font-medium mb-2">Health Score Trend</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={healthChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#4ade80"
                    activeDot={{ r: 8 }}
                    name="Health Score"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Health Score Breakdown</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Mechanical Condition</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Electrical Systems</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Control Systems</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Structural Integrity</span>
                      <span className="text-sm font-medium">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Recent Observations</h3>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    <p className="font-medium">2023-05-15</p>
                    <p>All systems operating within normal parameters.</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded border text-sm">
                    <p className="font-medium">2023-03-10</p>
                    <p>Minor wear detected on cooling system components.</p>
                  </div>
                  <div className="p-2 bg-red-50 rounded border text-sm">
                    <p className="font-medium">2022-08-17</p>
                    <p>
                      Significant damage from power surge required emergency
                      repair.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <div className="h-[300px] border rounded-md p-4">
              <h3 className="font-medium mb-2">Maintenance Costs Over Time</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={maintenanceCostData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="cost"
                    fill="#3b82f6"
                    name="Maintenance Cost ($)"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Cost Breakdown by Type</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Preventive Maintenance</span>
                      <span className="text-sm font-medium">
                        $
                        {maintenanceHistory
                          .filter((r) => r.type === "preventive")
                          .reduce((sum, r) => sum + r.cost, 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${(
                            (maintenanceHistory
                              .filter((r) => r.type === "preventive")
                              .reduce((sum, r) => sum + r.cost, 0) /
                              maintenanceHistory.reduce(
                                (sum, r) => sum + r.cost,
                                0,
                              )) *
                            100
                          ).toFixed(0)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Corrective Maintenance</span>
                      <span className="text-sm font-medium">
                        $
                        {maintenanceHistory
                          .filter((r) => r.type === "corrective")
                          .reduce((sum, r) => sum + r.cost, 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{
                          width: `${(
                            (maintenanceHistory
                              .filter((r) => r.type === "corrective")
                              .reduce((sum, r) => sum + r.cost, 0) /
                              maintenanceHistory.reduce(
                                (sum, r) => sum + r.cost,
                                0,
                              )) *
                            100
                          ).toFixed(0)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Inspections</span>
                      <span className="text-sm font-medium">
                        $
                        {maintenanceHistory
                          .filter((r) => r.type === "inspection")
                          .reduce((sum, r) => sum + r.cost, 0)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(
                            (maintenanceHistory
                              .filter((r) => r.type === "inspection")
                              .reduce((sum, r) => sum + r.cost, 0) /
                              maintenanceHistory.reduce(
                                (sum, r) => sum + r.cost,
                                0,
                              )) *
                            100
                          ).toFixed(0)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Cost Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Lifetime Cost:</span>
                    <span className="font-bold">
                      ${maintenanceHistory.reduce((sum, r) => sum + r.cost, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Cost per Maintenance:</span>
                    <span className="font-bold">
                      $
                      {(
                        maintenanceHistory.reduce((sum, r) => sum + r.cost, 0) /
                        maintenanceHistory.length
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Highest Single Cost:</span>
                    <span className="font-bold">
                      ${Math.max(...maintenanceHistory.map((r) => r.cost))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Maintenance Cost (est.):</span>
                    <span className="font-bold">$1,800</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Export Cost Report
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2 mt-6">
          <Button variant="outline" onClick={onBack}>
            Back to Details
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetHistory;
