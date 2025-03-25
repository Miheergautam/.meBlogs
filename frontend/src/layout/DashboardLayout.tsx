import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/DashboardPage/SideBar";

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col bg-neutral-900 min-h-screen">
      <NavBar />
      <div className="flex h-screen">
        {/* Sidebar with responsive width */}
        <div className="w-64  hidden md:block">
          <SideBar />
        </div>

        {/* Main content area */}
        <div className="flex-1 px-6 py-6 w-full overflow-y-auto">
          {location.pathname === "/dashboard" ? (
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold text-red-400">
                Welcome to MeBlogs
              </h1>
              <p className="text-lg text-neutral-400 mt-2">
                Manage your content, track your progress, and explore insights.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
