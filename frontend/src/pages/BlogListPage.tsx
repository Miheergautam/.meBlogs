import { useUser } from "../hooks";
import { useGetBlogsQuery } from "../redux/services/meBlogsApi";
import BlogCard from "../components/YourBlogs/BlogCard";
import { FaInfoCircle, FaCalendarAlt, FaEllipsisH } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogListPage() {
  const { user } = useUser();
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
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center p-4 gap-4">
      <div className="w-full border-b border-neutral-700 pb-4">
        <h1 className="text-2xl font-semibold">Your Blogs</h1>
      </div>

      <div className="grid grid-cols-4 w-full px-4 bg-neutral-800 py-3 items-center rounded-lg">
        <div className="text-left font-semibold flex items-center space-x-2">
          <span>Title</span>
        </div>
        <div className="text-center font-semibold flex items-center justify-center space-x-2">
          <FaInfoCircle size={16} /> <span>Status</span>
        </div>
        <div className="text-center font-semibold flex items-center justify-center space-x-2">
          <FaCalendarAlt size={16} /> <span>Published At</span>
        </div>
        <div className="text-right font-semibold flex items-center justify-end space-x-2">
          <FaEllipsisH size={16} />
        </div>
      </div>

      <div className="w-full">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-neutral-800 p-4 rounded-lg shadow-md w-full mb-4 animate-pulse"
              >
                <div className="h-4 bg-gray-700 rounded w-48"></div>
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
  );
}
