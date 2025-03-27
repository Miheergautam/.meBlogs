import { useState } from "react";
import { FaBlogger, FaEdit } from "react-icons/fa";
import { IoHelpCircle, IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { useNavigate, useLocation } from "react-router-dom";
import ProfilePopup from "./Profile/ProfilePopup";
import { useGetUserQuery } from "../redux/services/meBlogsApi";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: user } = useGetUserQuery();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-neutral-900 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/blogs")}
        >
          <FaBlogger className="text-red-500 text-3xl" />
          <h1 className="text-white text-xl font-bold">meBlogs</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
          {!location.pathname.startsWith("/dashboard") && (
            <button
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
              onClick={() => navigate("/dashboard")}
            >
              <FaEdit className="text-lg" />
              Write
            </button>
          )}
          <IoSearch className="text-gray-400 text-lg cursor-pointer hover:text-white transition" />
          <button className="p-2 rounded-full hover:bg-red-500 transition duration-200">
            <IoHelpCircle className="text-2xl text-white" />
          </button>
          <button className="p-2 rounded-full hover:bg-red-500 transition duration-200">
            <CgMenuGridO className="text-2xl text-white" />
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
            {isProfileOpen && <ProfilePopup onClose={() => setIsProfileOpen(false)} />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col bg-neutral-800 text-white px-6 py-4 space-y-3">
          <button
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
            onClick={() => navigate("/dashboard")}
          >
            <FaEdit className="text-lg" />
            Write
          </button>
          <button className="p-2 rounded-full hover:bg-red-500 transition duration-200">
            <IoHelpCircle className="text-2xl text-white" />
          </button>
          <button className="p-2 rounded-full hover:bg-red-500 transition duration-200">
            <CgMenuGridO className="text-2xl text-white" />
          </button>
        </div>
      )}
    </nav>
  );
}
