import { Outlet } from "react-router-dom";
import NavBar from "../components/HomePage/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* This renders the child route component */}
    </div>
  );
};

export default Layout;
