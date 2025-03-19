import { FaBlogger } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="flex justify-between items-center p-4 bg-neutral-800">
      <div className="flex items-center gap-2">
        <FaBlogger className="text-red-400 text-4xl" />
        <h1 className="text-white text-2xl font-bold">.meBlogs</h1>
      </div>
      <Link to="/signin" className="bg-red-400 text-white px-4 py-2 rounded-md">
        Sign In
      </Link>
    </div>
  );
}
