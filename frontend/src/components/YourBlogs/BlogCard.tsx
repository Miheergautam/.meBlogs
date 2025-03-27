import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLink,
  FaEdit,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { Blog } from "../../redux/services/meBlogsApi";

interface BlogCardProps {
  blog: Blog;
  onTogglePublish: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
}

export default function BlogCard({
  blog,
  onTogglePublish,
  onDelete,
}: BlogCardProps) {
  const [isPublished, setIsPublished] = useState(blog.published);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(false);

  const handleToggleClick = () => {
    setPendingStatus(!isPublished);
    setShowConfirm(true);
  };

  const confirmTogglePublish = () => {
    setIsPublished(!isPublished);
    onTogglePublish(blog.id, !isPublished);
    setShowConfirm(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 bg-neutral-800 p-4 rounded-lg shadow-md w-full mb-4 items-center relative">
      <div className="flex items-center space-x-4 col-span-1">
        <img
          src={blog.thumbnail}
          alt={`Thumbnail for blog: ${blog.title}`}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="truncate">
          <h2 className="text-lg font-semibold text-white truncate w-48">
            {blog.title}
          </h2>
          <p className="text-sm text-neutral-400">
            by <span className="text-red-400">{blog.author.name}</span>
          </p>
          <p className="text-xs text-neutral-500">
            Created: {new Date(blog.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="text-center">
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            isPublished ? "bg-green-600 text-white" : "bg-yellow-500 text-black"
          }`}
        >
          {isPublished ? "Published" : "Not Published"}
        </span>
      </div>

      {/* Date */}
      <div className="text-center text-neutral-400 text-sm">
        {new Date(blog.createdAt).toLocaleDateString()}
      </div>

      {/* Action Icons */}
      <div className="flex items-center justify-end space-x-3 text-gray-400">
        <Link to={`/blog/${blog.id}`} className="hover:text-blue-300">
          <FaLink size={20} />
        </Link>

        <button
          onClick={handleToggleClick}
          className="hover:text-gray-300 transition"
        >
          {isPublished ? <FaToggleOn size={20} /> : <FaToggleOff size={20} />}
        </button>

        <Link to={`/dashboard/edit/${blog.id}`} className="hover:text-gray-300">
          <FaEdit size={20} />
        </Link>

        <button
          onClick={() => onDelete(blog.id)}
          className="hover:text-red-500 transition"
        >
          <FaTrash size={20} />
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-neutral-800 p-6 rounded-xl shadow-2xl w-80 text-center border border-neutral-700 animate-fade-in">
            <p className="text-white text-lg font-semibold mb-4">
              {pendingStatus
                ? "Are you sure you want to publish this blog?"
                : "Are you sure you want to unpublish this blog?"}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmTogglePublish}
                className="bg-green-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-green-700 transition duration-300"
              >
                {pendingStatus ? "Publish" : "Unpublish"}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-600 px-5 py-2.5 rounded-lg text-white font-medium hover:bg-red-700 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
