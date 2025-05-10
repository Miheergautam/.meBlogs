import { useState } from "react";
import BlogCard from "../components/Blog/BlogCard";
import BlogNavBar from "../components/Blog/BlogNavBar";
import { useGetBlogsQuery } from "../redux/services/meBlogsApi";

export default function BlogsPage() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 blogs

  if (isLoading) {
    return (
      <div className="flex flex-col items-center min-h-screen bg-neutral-900 p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-4xl space-y-6">
          {/* Skeleton for Blog Navbar */}
          <div className="h-12 w-full bg-neutral-800 animate-pulse rounded-lg"></div>

          {/* Skeleton for Blog Cards */}
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-4 bg-neutral-800 p-4 sm:p-6 rounded-xl animate-pulse"
            >
              <div className="w-full sm:w-40 h-40 bg-neutral-700 rounded-lg"></div>
              <div className="flex flex-col space-y-3 w-full">
                <div className="h-6 bg-neutral-700 w-2/3 rounded"></div>
                <div className="h-4 bg-neutral-700 w-1/2 rounded"></div>
                <div className="h-16 bg-neutral-700 w-full rounded"></div>
                <div className="flex space-x-4">
                  <div className="h-4 w-16 bg-neutral-700 rounded"></div>
                  <div className="h-4 w-16 bg-neutral-700 rounded"></div>
                  <div className="h-4 w-16 bg-neutral-700 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white text-lg p-4">
        <p className="text-red-500 font-semibold">⚠️ Error loading blogs.</p>
        <p>Please try again later.</p>
      </div>
    );
  }

  // Filter only published blogs
  const publishedBlogs = blogs?.filter((blog) => blog.published) || [];

  return (
    <div className="min-h-screen flex flex-col items-center p-10">
      <div className="w-full max-w-6xl">
        <BlogNavBar />
      </div>
      <div className="bg-neutral-900 p-4 sm:p-6 md:p-10 max-w-6xl">
        <div className="mx-auto space-y-6">
          {publishedBlogs.length > 0 ? (
            <>
              <div className="grid gap-6 sm:gap-8">
                {publishedBlogs.slice(0, visibleCount).map((blog) => (
                  <BlogCard
                    key={blog.id}
                    id={blog.id}
                    authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt}
                    category={blog.category}
                    imageUrl={blog.thumbnail}
                  />
                ))}
              </div>

              {/* Show More Button */}
              {visibleCount < publishedBlogs.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="px-5 sm:px-6 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition duration-300"
                  >
                    Show More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-white text-center text-lg px-4">
              <p className="text-gray-400">No published blogs found.</p>
              <p className="text-gray-500">
                Start writing and share your thoughts with the world!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
