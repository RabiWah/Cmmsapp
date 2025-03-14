import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowUp,
  ArrowDown,
  Clock,
  Wrench,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  icon = <Wrench size={20} />,
  trend,
  bgColor = "bg-white",
}: MetricCardProps) => {
  return (
    <Card className={`${bgColor} h-full`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && (
              <div className="flex items-center mt-1">
                {trend.isPositive ? (
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span
                  className={`text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
                >
                  {trend.value}%
                </span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsOverviewProps {
  metrics?: {
    totalWorkOrders: number;
    pendingTasks: number;
    criticalAlerts: number;
    completedTasks: number;
  };
}

const MetricsOverview = ({
  metrics = {
    totalWorkOrders: 248,
    pendingTasks: 42,
    criticalAlerts: 8,
    completedTasks: 186,
  },
}: MetricsOverviewProps) => {
  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Metrics Overview</h2>
        <p className="text-sm text-muted-foreground">
          Summary of maintenance activities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Work Orders"
          value={metrics.totalWorkOrders}
          icon={<Wrench className="h-5 w-5 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />

        <MetricCard
          title="Pending Tasks"
          value={metrics.pendingTasks}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          trend={{ value: 8, isPositive: false }}
          bgColor="bg-amber-50"
        />

        <MetricCard
          title="Critical Alerts"
          value={metrics.criticalAlerts}
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          trend={{ value: 5, isPositive: false }}
          bgColor="bg-red-50"
        />

        <MetricCard
          title="Completed Tasks"
          value={metrics.completedTasks}
          icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          trend={{ value: 15, isPositive: true }}
          bgColor="bg-green-50"
        />
      </div>
    </div>
  );
};

export default MetricsOverview;
