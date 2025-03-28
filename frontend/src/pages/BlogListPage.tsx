import { useGetBlogsQuery, useGetUserQuery } from "../redux/services/meBlogsApi";
import BlogCard from "../components/YourBlogs/BlogCard";
import { FaInfoCircle, FaCalendarAlt, FaEllipsisH } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogListPage() {
  const { data: user} = useGetUserQuery(); 
  const { data, isLoading, refetch } = useGetBlogsQuery(); // Add refetch to get latest data
  const [userBlogs, setUserBlogs] = useState(data ?? []);

  useEffect(() => {
    setUserBlogs(data?.filter((blog) => blog.author?.id === user?.id) ?? []);
  }, [data, user]);

  // Toggle publish status
  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      const blog = userBlogs.find((b) => b.id === id);
      if (!blog) return;

      const updatePayload = {
        ...blog,
        published: currentStatus,
      };

      await axios.put(
        `https://backend.miheergautam04.workers.dev/api/v1/blogs/${id}`,
        updatePayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Blog publish status updated.");
      refetch(); // Refetch blogs after update
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  // Delete blog
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(
        `https://backend.miheergautam04.workers.dev/api/v1/blogs/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Blog deleted successfully.");
      refetch(); // Refetch blogs after delete
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="bg-neutral-900 text-white flex flex-col items-center p-4 gap-4 max-w-full md:max-w-6xl">
        {/* Header Section */}
        <div className="w-full border-b border-neutral-700 pb-4">
          <h1 className="text-2xl font-semibold">Your Blogs</h1>
        </div>

        {/* Table-like Header for Blog Information */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full px-4 bg-neutral-800 py-3 items-center rounded-lg mb-4">
          <div className="flex items-center space-x-2 text-left font-semibold">
            <span>Title</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-center font-semibold">
            <FaInfoCircle size={16} />
            <span>Status</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-center font-semibold">
            <FaCalendarAlt size={16} />
            <span>Published At</span>
          </div>
          <div className="flex items-center justify-end space-x-2 text-right font-semibold">
            <FaEllipsisH size={16} />
          </div>
        </div>

        {/* Blog Cards or Skeleton Loader */}
        <div className="w-full">
          {isLoading
            ? [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-neutral-800 p-4 rounded-lg shadow-md w-full mb-4 animate-pulse"
                >
                  {/* Placeholder for title */}
                  <div className="flex items-center space-x-4 col-span-1">
                    <div className="h-16 w-16 bg-gray-700 rounded-lg"></div>
                    <div className="space-y-2 w-full">
                      <div className="h-4 bg-gray-700 rounded w-48"></div>
                      <div className="h-4 bg-gray-700 rounded w-32"></div>
                      <div className="h-4 bg-gray-700 rounded w-24"></div>
                    </div>
                  </div>

                  {/* Placeholder for status */}
                  <div className="text-center">
                    <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
                  </div>

                  {/* Placeholder for date */}
                  <div className="text-center">
                    <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
                  </div>

                  {/* Placeholder for actions */}
                  <div className="flex items-center justify-end space-x-3 text-gray-400">
                    <div className="h-6 w-6 bg-gray-700 rounded"></div>
                    <div className="h-6 w-6 bg-gray-700 rounded"></div>
                    <div className="h-6 w-6 bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))
            : userBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onTogglePublish={handleTogglePublish}
                  onDelete={handleDelete}
                />
              ))}
        </div>
      </div>
    </div>
  );
}