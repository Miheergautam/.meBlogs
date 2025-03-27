import { FaBlogger } from "react-icons/fa";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-neutral-900 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => navigate("/")}
        >
          <FaBlogger className="text-red-500 text-3xl" />
          <h1 className="text-white text-xl font-bold">meBlogs</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-white text-sm font-medium">
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setDropdownOpen("product")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <span className="hover:text-red-400 transition">Product ▾</span>
            {dropdownOpen === "product" && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-800 shadow-lg p-2 rounded-md">
                <Link to="/features" className="block px-4 py-2 hover:bg-neutral-700">
                  Features
                </Link>
                <Link to="/pricing" className="block px-4 py-2 hover:bg-neutral-700">
                  Pricing
                </Link>
              </div>
            )}
          </div>
          <Link to="/explore" className="hover:text-red-400 transition">
            Explore
          </Link>
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setDropdownOpen("resources")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <span className="hover:text-red-400 transition">Resources ▾</span>
            {dropdownOpen === "resources" && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-800 shadow-lg p-2 rounded-md">
                <Link to="/blog" className="block px-4 py-2 hover:bg-neutral-700">
                  Blog
                </Link>
                <Link to="/docs" className="block px-4 py-2 hover:bg-neutral-700">
                  Documentation
                </Link>
              </div>
            )}
          </div>
          <Link to="/pricing" className="hover:text-red-400 transition">
            About
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4">
          <IoSearch className="text-gray-400 text-lg cursor-pointer hover:text-white" />
          <Link to="/signin" className="text-gray-400 hover:text-white transition text-sm">
            Sign In
          </Link>
          <Link
            to="/get-started"
            className="bg-white text-neutral-900 font-semibold text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-500 hover:text-white transition"
          >
            Get Started — free
          </Link>
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
          <Link to="/explore" className="hover:text-red-400 transition">
            Explore
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(dropdownOpen === "product" ? null : "product")}
          >
            Product ▾
            {dropdownOpen === "product" && (
              <div className="mt-2 bg-neutral-700 shadow-lg p-2 rounded-md">
                <Link to="/features" className="block px-4 py-2 hover:bg-neutral-600">
                  Features
                </Link>
                <Link to="/pricing" className="block px-4 py-2 hover:bg-neutral-600">
                  Pricing
                </Link>
              </div>
            )}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(dropdownOpen === "resources" ? null : "resources")}
          >
            Resources ▾
            {dropdownOpen === "resources" && (
              <div className="mt-2 bg-neutral-700 shadow-lg p-2 rounded-md">
                <Link to="/blog" className="block px-4 py-2 hover:bg-neutral-600">
                  Blog
                </Link>
                <Link to="/docs" className="block px-4 py-2 hover:bg-neutral-600">
                  Documentation
                </Link>
              </div>
            )}
          </div>
          <Link to="/pricing" className="hover:text-red-400 transition">
            About
          </Link>
          <div className="flex gap-4 items-center">
            <IoSearch className="text-gray-400 text-lg cursor-pointer hover:text-white" />
            <Link to="/signin" className="text-gray-400 hover:text-white transition text-sm">
              Sign In
            </Link>
            <Link
              to="/get-started"
              className="bg-white text-neutral-900 font-semibold text-sm px-4 py-2 rounded-md shadow-md hover:bg-red-500 hover:text-white transition"
            >
              Get Started — free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
