import { FaBlogger } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center p-4 bg-neutral-900 border-b border-neutral-800">
      {/* Logo Section */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        role="button"
        tabIndex={0}
        onClick={() => navigate("/")}
      >
        <FaBlogger className="text-red-400 text-4xl" />
        <h1 className="text-white text-2xl font-bold">.meBlogs</h1>
      </div>

      {/* Sign In Button */}
      <Link
        to="/signin"
        className="bg-red-400 text-white px-4 py-2 rounded-md transition hover:bg-red-500"
      >
        Sign In
      </Link>
    </div>
  );
}
