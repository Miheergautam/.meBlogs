import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import BlogsPage from "./pages/BlogsPage";
import NewPostPage from "./components/DashboardPage/NewPostPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ProfilePage from "./pages/ProfilePage";
import BlogListPage from "./pages/BlogListPage";
import EditBlogPage from "./pages/EditBlogPage";

// Layouts
import DashboardLayout from "./layout/DashboardLayout";
import BlogLayout from "./layout/BlogLayout";
import ProfileLayout from "./layout/ProfileLayout";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Public Blog Routes */}
        <Route element={<BlogLayout />}>
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
        </Route>

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="newpost" element={<NewPostPage />} />
            <Route path="edit/:id" element={<EditBlogPage />} />
            <Route path="bloglist" element={<BlogListPage />} />

            <Route element={<ProfileLayout />}>
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
