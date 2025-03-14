import React, { useState } from "react";
import TopNavbar from "./layout/TopNavbar";
import MetricsOverview from "./dashboard/MetricsOverview";
import PendingWorkOrders from "./dashboard/PendingWorkOrders";
import AssetHealthChart from "./dashboard/AssetHealthChart";
import MaintenanceCalendar from "./dashboard/MaintenanceCalendar";
import RecentNotifications from "./dashboard/RecentNotifications";
import WorkOrderForm from "./workorders/WorkOrderForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeProps {
  username?: string;
  notificationCount?: number;
}

const Home = ({ username = "John Doe", notificationCount = 3 }: HomeProps) => {
  const [showWorkOrderForm, setShowWorkOrderForm] = useState(false);

  const handleCreateWorkOrder = () => {
    setShowWorkOrderForm(true);
  };

  const handleWorkOrderSubmit = (data: any) => {
    console.log("Work order submitted:", data);
    setShowWorkOrderForm(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <TopNavbar username={username} notificationCount={notificationCount} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Dashboard Content */}
        <main className="h-full overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Quick Action Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleCreateWorkOrder}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Create Work Order
              </Button>
            </div>

            {/* Metrics Overview */}
            <MetricsOverview />

            {/* Main Dashboard Widgets - 2 columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <PendingWorkOrders />
              <AssetHealthChart />
            </div>

            {/* Secondary Dashboard Widgets - 2 columns on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <MaintenanceCalendar onAddTask={handleCreateWorkOrder} />
              <RecentNotifications />
            </div>
          </div>
        </main>
      </div>

      {/* Work Order Form Modal */}
      <WorkOrderForm
        open={showWorkOrderForm}
        onOpenChange={setShowWorkOrderForm}
        onSubmit={handleWorkOrderSubmit}
      />
    </div>
  );
};

export default Home;
