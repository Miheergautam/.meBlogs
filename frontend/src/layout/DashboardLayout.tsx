import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/DashboardPage/SideBar";
import { IoMenu } from "react-icons/io5";
import DashboardHome from "../components/DashboardPage/DashboardHome";

export default function DashboardLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col bg-neutral-900 min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      <div className="flex flex-1">
        {/* Sidebar Toggle Button (Mobile) */}
        <button
          className="md:hidden fixed top-16 left-4 z-50 bg-neutral-800 text-white p-2 rounded-lg shadow-md hover:bg-red-500 transition duration-300"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <IoMenu size={26} />
        </button>

        {/* Sidebar */}
        <div
          className={`transition-all duration-300 ${
            isSidebarOpen ? "w-64" : "w-0"
          } hidden md:block`}
        >
          <SideBar
            isCollapsed={!isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-6 py-6 w-full overflow-y-auto">
          {location.pathname === "/dashboard" ? (
            <DashboardHome />
          ) : (
            <Outlet />
          )}
        </div>

      </div>
    </div>
  );
}
