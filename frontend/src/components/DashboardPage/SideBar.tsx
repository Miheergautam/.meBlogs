import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-neutral-800 text-white py-6 px-4 shadow-lg w-64">
      {/* New Post Button */}
      <div className="border-b border-neutral-700 w-full flex justify-center pb-4">
        <button
          className="w-full py-3 bg-red-400 hover:bg-red-500 rounded-lg text-white font-semibold transition duration-300"
          onClick={() => navigate("/dashboard/newpost")}
        >
          + New Post
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-3 mt-6 w-full">
        <a
          href="#"
          className="px-4 py-3 flex items-center gap-2 hover:bg-neutral-700 rounded-lg cursor-pointer transition duration-300"
        >
          📝 Posts
        </a>
        <a
          href="#"
          className="px-4 py-3 flex items-center gap-2 hover:bg-neutral-700 rounded-lg cursor-pointer transition duration-300"
        >
          💬 Comments
        </a>
        <a
          href="#"
          className="px-4 py-3 flex items-center gap-2 hover:bg-neutral-700 rounded-lg cursor-pointer transition duration-300"
        >
          ⚙️ Settings
        </a>
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-neutral-700 w-full flex justify-center py-4 text-sm text-neutral-400 space-x-2">
        © 2025<span className="text-red-400">.meBlogs</span>
      </div>
    </div>
  );
}
