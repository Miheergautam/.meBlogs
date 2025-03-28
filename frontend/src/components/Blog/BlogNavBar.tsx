import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

export default function BlogNavBar() {
  const [activeTab, setActiveTab] = useState("For you");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="px-4 sm:px-6 py-4 border-b border-neutral-700 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center relative">
      {/* Top Row (Logo + Menu Button for Mobile) */}
      <div className="w-full flex justify-between items-center sm:hidden">
        <h1 className="text-white text-lg font-bold">MeBlogs</h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-neutral-700 p-2 rounded-full relative"
        >
          <HiMenu className="text-white text-xl" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-1/2 flex items-center bg-neutral-700 px-4 py-2 rounded-full">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search blogs..."
          className="w-full bg-transparent text-white outline-none placeholder-gray-400"
        />
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex gap-4 text-sm sm:text-base font-medium">
        {["For you", "Following", "Trending"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full transition font-semibold ${
              activeTab === tab
                ? "bg-red-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-neutral-700 hover:text-white transition"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Small Popup Menu (Positioned Near Menu Button) */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-14 right-4 bg-neutral-900 border border-neutral-700 p-3 rounded-lg shadow-lg transition-transform duration-300 w-40"
        >
          {["For you", "Following", "Trending"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "text-gray-400 hover:bg-neutral-700 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
