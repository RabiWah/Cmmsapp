import React, { Suspense, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { useToast } from "@/components/ui/use-toast";

// Import components
import Home from "./home";
import WorkOrdersList from "./workorders/WorkOrdersList";
import AssetsList from "./assets/AssetsList";
import InventoryList from "./inventory/InventoryList";
import MaintenanceSchedule from "./maintenance/MaintenanceSchedule";
import NotificationCenter from "./notifications/NotificationCenter";
import SettingsPage from "./settings/SettingsPage";
import HelpCenter from "./help/HelpCenter";
import PageLayout from "./layout/PageLayout";
import LoginPage from "./auth/LoginPage";
import UsersManagement from "./users/UsersManagement";
import ProfilePage from "./profile/ProfilePage";

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    const isLoggedIn = !!user;
    setIsAuthenticated(isLoggedIn);

    // Redirect to login if not authenticated and not already on login page
    if (!isLoggedIn && location.pathname !== "/login") {
      navigate("/login");
    }

    // Show welcome toast when user logs in
    if (
      isLoggedIn &&
      location.pathname === "/" &&
      sessionStorage.getItem("justLoggedIn")
    ) {
      const userData = JSON.parse(user || "{}");
      toast({
        title: `Welcome back, ${userData.name || "User"}!`,
        description: "You've successfully logged in to UpKeep.",
      });
      sessionStorage.removeItem("justLoggedIn");
    }
  }, [location.pathname, navigate, toast]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* For the tempo routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/work-orders"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <WorkOrdersList />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/assets"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <AssetsList />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/maintenance"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <MaintenanceSchedule />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <NotificationCenter />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/settings"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <SettingsPage />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <ProfilePage />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/help"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <HelpCenter />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/users"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <UsersManagement />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/inventory"
            element={
              isAuthenticated ? (
                <PageLayout>
                  <InventoryList />
                </PageLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/logout" element={<LogoutRoute />} />

          {/* Add this before the catchall route */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Suspense>
  );
};

// Logout route component
const LogoutRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data and redirect to login
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default AppRoutes;
