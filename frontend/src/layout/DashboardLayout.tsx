import NavBar from "../components/HomePage/NavBar";
import { Outlet } from "react-router-dom";

import SideBar from "../components/DashboardPage/SideBar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col bg-neutral-800">
      <NavBar />
      <div className="grid grid-cols-12 h-screen">
        {/* Sidebar taking 1/4 of the width */}
        <div className="col-span-2 ">
          <SideBar/>
        </div>

        {/* Main content taking remaining space */}
        <div className="col-span-10 px-5 py-4 w-full">
          <Outlet />{" "}
          {/* This dynamically renders child components (like Dashboard) */}
        </div>
      </div>
    </div>
  );
}
