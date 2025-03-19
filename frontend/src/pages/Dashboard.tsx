import NavBar from "../components/HomePage/NavBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="grid grid-cols-12 h-screen">
        {/* Sidebar taking 1/4 of the width */}
        <div className="col-span-2 bg-neutral-800 p-4">Sidebar</div>

        {/* Main content taking remaining space */}
        <div className="col-span-9 p-4">
          <Outlet />{" "}
          {/* This dynamically renders child components (like Dashboard) */}
        </div>
      </div>
    </div>
  );
}
