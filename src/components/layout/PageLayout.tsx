import React, { ReactNode } from "react";
import TopNavbar from "./TopNavbar";

interface PageLayoutProps {
  children: ReactNode;
  username?: string;
  notificationCount?: number;
}

const PageLayout = ({
  children,
  username = "John Doe",
  notificationCount = 3,
}: PageLayoutProps) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation */}
      <TopNavbar username={username} notificationCount={notificationCount} />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto p-2 sm:p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
