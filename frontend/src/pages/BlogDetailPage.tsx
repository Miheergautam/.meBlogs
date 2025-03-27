import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "../redux/services/meBlogsApi";
import FullBlog from "../components/Blog/FullBlog";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

export default function BlogDetailPage() {
  const { id } = useParams();
  const blogId = id ? parseInt(id) : 0;
  const { data: blog, isLoading, error } = useGetBlogQuery(blogId);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex justify-center py-10 px-6">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
          {/* Main Content Placeholder */}
          <div className="col-span-2 bg-neutral-700 p-8 rounded-xl shadow-xl space-y-6">
            <div className="h-12 bg-neutral-600 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-neutral-600 rounded w-1/2 mb-6"></div>
            <div className="h-60 bg-neutral-600 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-600 rounded w-full"></div>
              <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
              <div className="h-4 bg-neutral-600 rounded w-2/3"></div>
            </div>
          </div>

          {/* Sidebar Placeholder */}
          <div className="bg-neutral-700 p-8 rounded-xl shadow-xl flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-neutral-600 rounded-full mb-4"></div>
            <div className="h-4 bg-neutral-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-neutral-600 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-neutral-600 rounded w-full"></div>
            <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex justify-center items-center">
        <div className="text-xl font-semibold">Blog not found</div>
      </div>
    );
  }

  // Blog Content
  return (
    <div>
      <FullBlog blog={blog} />

      {/* Footer */}
      <footer className="bg-neutral-800 text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">About</h3>
            <p className="text-sm">
              MeBlogs is a platform to share knowledge, thoughts, and ideas through blogs. Join us and contribute to a growing community of writers.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-100">Home</a></li>
              <li><a href="/about" className="hover:text-gray-100">About Us</a></li>
              <li><a href="/contact" className="hover:text-gray-100">Contact</a></li>
              <li><a href="/terms" className="hover:text-gray-100">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-400 hover:text-gray-200 text-2xl" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-400 hover:text-gray-200 text-2xl" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-400 hover:text-gray-200 text-2xl" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-gray-400 hover:text-gray-200 text-2xl" />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} MeBlogs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
