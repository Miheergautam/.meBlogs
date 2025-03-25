import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  HiOutlineDocumentText,
  HiOutlineChat,
  HiOutlineCog,
  HiOutlinePlus,
} from "react-icons/hi";

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  to: string;
};

export default function SideBar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`relative h-full bg-neutral-900 text-white py-6 px-3 shadow-lg transition-all duration-300 ${isCollapsed ? "w-20" : "w-56"
        } border-r border-neutral-700`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-red-400 text-white p-2 rounded-full shadow-md hover:bg-red-500 transition duration-300"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <IoChevronForward size={22} />
        ) : (
          <IoChevronBack size={22} />
        )}
      </button>

      {/* New Post Button */}
      <button
        className="w-full flex items-center gap-2 py-3 bg-red-400 hover:bg-red-500 rounded-lg text-white font-semibold justify-center transition duration-300"
        onClick={() => navigate("/dashboard/newpost")}
      >
        <HiOutlinePlus size={24} />
        {!isCollapsed && "New Post"}
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3 mt-6">
        <NavItem
          icon={<HiOutlineDocumentText size={24} />}
          label="Your Blogs"
          isCollapsed={isCollapsed}
          to={"bloglist"}
        />
        <NavItem
          icon={<HiOutlineChat size={24} />}
          label="Comments"
          isCollapsed={isCollapsed}
          to={"comments"}
        />
        <NavItem
          icon={<HiOutlineCog size={24} />}
          label="Settings"
          isCollapsed={isCollapsed}
          to={"settings"}
        />
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-neutral-500">
          © 2025 <span className="text-red-400">.meBlogs</span>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, isCollapsed, to }: NavItemProps) {
  return (
    <a
      href={`http://localhost:5173/dashboard/${to}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-700 rounded-lg cursor-pointer transition duration-300"
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </a>
  );
}
