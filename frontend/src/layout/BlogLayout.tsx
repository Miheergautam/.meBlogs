import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const BlogLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default BlogLayout;
