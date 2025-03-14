import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Badge } from "../ui/badge";
import { cn } from "../../lib/utils";

interface AssetHealthChartProps {
  data?: {
    barData?: Array<{
      name: string;
      healthy: number;
      atrisk: number;
      critical: number;
    }>;
    pieData?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
  title?: string;
}

const defaultBarData = [
  {
    name: "HVAC",
    healthy: 40,
    atrisk: 24,
    critical: 10,
  },
  {
    name: "Electrical",
    healthy: 30,
    atrisk: 13,
    critical: 5,
  },
  {
    name: "Plumbing",
    healthy: 20,
    atrisk: 8,
    critical: 3,
  },
  {
    name: "Machinery",
    healthy: 27,
    atrisk: 18,
    critical: 12,
  },
  {
    name: "IT Equip",
    healthy: 18,
    atrisk: 12,
    critical: 6,
  },
];

const defaultPieData = [
  { name: "Healthy", value: 135, color: "#4ade80" },
  { name: "At Risk", value: 75, color: "#facc15" },
  { name: "Critical", value: 36, color: "#f87171" },
];

const AssetHealthChart = ({
  data = {
    barData: defaultBarData,
    pieData: defaultPieData,
  },
  title = "Asset Health Overview",
}: AssetHealthChartProps) => {
  return (
    <Card className="w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex space-x-2">
            <Badge
              variant="outline"
              className="bg-green-100 text-green-800 hover:bg-green-100"
            >
              Healthy:{" "}
              {data.pieData?.find((item) => item.name === "Healthy")?.value ||
                135}
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            >
              At Risk:{" "}
              {data.pieData?.find((item) => item.name === "At Risk")?.value ||
                75}
            </Badge>
            <Badge
              variant="outline"
              className="bg-red-100 text-red-800 hover:bg-red-100"
            >
              Critical:{" "}
              {data.pieData?.find((item) => item.name === "Critical")?.value ||
                36}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Distribution</TabsTrigger>
          </TabsList>
          <TabsContent value="bar" className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.barData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="healthy" fill="#4ade80" name="Healthy" />
                <Bar dataKey="atrisk" fill="#facc15" name="At Risk" />
                <Bar dataKey="critical" fill="#f87171" name="Critical" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="pie" className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        <div className="mt-2 text-sm text-gray-500">
          <p>
            Total assets monitored:{" "}
            {data.pieData?.reduce((acc, item) => acc + item.value, 0) || 246}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetHealthChart;
