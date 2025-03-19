import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";

import Layout from "./layout/Layout";
import DashboardLayout from "./layout/DashboardLayout";
import NewPostPage from "./components/DashboardPage/NewPostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Public Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard/newpost" element={<NewPostPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;