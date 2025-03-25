import { useState } from "react";
import { FaBlogger, FaEdit } from "react-icons/fa";
import { IoHelpCircle } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import ProfilePopup from "./Profile/ProfilePopup";
import { useGetUserQuery } from "../redux/services/meBlogsApi";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="relative flex justify-between items-center px-4 py-3 border-b border-neutral-700 bg-neutral-900">
      {/* Logo */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/blogs")}
      >
        <FaBlogger className="text-red-400 text-5xl" />
        <h1 className="text-white text-2xl font-semibold">.meBlogs</h1>
      </div>

      {/* Navigation Icons */}
      <div className="flex items-center space-x-6">
        {!location.pathname.startsWith("/dashboard") && (
          <button
            className="flex items-center gap-2 bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
            onClick={() => navigate("/dashboard")}
          >
            <FaEdit className="text-xl" />
            Write
          </button>
        )}

        <button className="p-2 rounded-full hover:bg-red-400 transition duration-200">
          <IoHelpCircle className="text-3xl text-white" />
        </button>

        <button className="p-2 rounded-full hover:bg-red-400 transition duration-200">
          <CgMenuGridO className="text-3xl text-white" />
        </button>

        {/* Profile Image - Opens Popup */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-neutral-500 overflow-hidden"
          >
            <img
              src={user?.profileImage}
              alt="ProfileImage"
              className="w-full h-full object-cover"
            />
          </button>

          {/* Profile Popup */}
          {isProfileOpen && (
            <ProfilePopup onClose={() => setIsProfileOpen(false)} />
          )}
        </div>
      </div>
    </nav>
  );
}
