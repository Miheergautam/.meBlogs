import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/LandingPage/Footer";

const BlogLayout = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  );
};

export default BlogLayout;
