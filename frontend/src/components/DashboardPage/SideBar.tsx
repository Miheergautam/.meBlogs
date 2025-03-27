import { useNavigate } from "react-router-dom";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { HiOutlineDocumentText, HiOutlineChat, HiOutlineCog, HiOutlinePlus } from "react-icons/hi";

type SideBarProps = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
};

export default function SideBar({ isCollapsed, toggleSidebar }: SideBarProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`relative h-full bg-neutral-900 text-white py-6 px-3 shadow-lg transition-all duration-300 
      ${isCollapsed ? "w-20" : "w-56"} border-r border-neutral-800`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-neutral-800 text-white p-2 rounded-full shadow-md hover:bg-red-500 transition duration-300"
        onClick={toggleSidebar}
      >
        {isCollapsed ? <IoChevronForward size={22} /> : <IoChevronBack size={22} />}
      </button>

      {/* New Post Button */}
      <button
        className="w-full flex items-center gap-2 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold justify-center transition duration-300"
        onClick={() => navigate("/dashboard/newpost")}
      >
        <HiOutlinePlus size={24} />
        {!isCollapsed && "New Post"}
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 mt-6">
        <NavItem icon={<HiOutlineDocumentText size={22} />} label="Your Blogs" isCollapsed={isCollapsed} to={"bloglist"} />
        <NavItem icon={<HiOutlineChat size={22} />} label="Comments" isCollapsed={isCollapsed} to={"comments"} />
        <NavItem icon={<HiOutlineCog size={22} />} label="Settings" isCollapsed={isCollapsed} to={"settings"} />
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-neutral-500">
          &copy; 2025 <span className="text-red-500">MeBlogs</span>
        </div>
      )}
    </div>
  );
}

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  to: string;
};

function NavItem({ icon, label, isCollapsed, to }: NavItemProps) {
  return (
    <a
      href={`/dashboard/${to}`}
      className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition duration-300 
      hover:bg-neutral-800 text-neutral-300 hover:text-white"
    >
      {icon}
      {!isCollapsed && <span>{label}</span>}
    </a>
  );
}
