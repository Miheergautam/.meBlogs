import BlogCard from "../components/Blog/BlogCard";
import BlogNavBar from "../components/Blog/BlogNavBar";
import { useGetBlogsQuery } from "../redux/services/meBlogsApi";

export default function BlogsPage() {
  const { data: blogs, isLoading, error } = useGetBlogsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center min-h-full bg-neutral-800 p-10">
        <div className="w-full max-w-4xl space-y-6">
          {/* Skeleton for Blog Navbar */}
          <div className="h-12 w-full bg-neutral-700 animate-pulse rounded-lg"></div>

          {/* Skeleton for Blog Cards (3 placeholders) */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 bg-neutral-700 p-6 rounded-2xl animate-pulse">
              <div className="w-full md:w-32 h-32 bg-neutral-600 rounded-lg"></div>
              <div className="flex flex-col space-y-3 w-full">
                <div className="h-6 bg-neutral-600 w-1/2 rounded"></div>
                <div className="h-4 bg-neutral-600 w-1/3 rounded"></div>
                <div className="h-16 bg-neutral-600 w-full rounded"></div>
                <div className="flex space-x-4">
                  <div className="h-4 w-16 bg-neutral-600 rounded"></div>
                  <div className="h-4 w-16 bg-neutral-600 rounded"></div>
                  <div className="h-4 w-16 bg-neutral-600 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-center text-lg">Error loading blogs.</div>;
  }

  // Filter only published blogs
  const publishedBlogs = blogs?.filter((blog) => blog.published) || [];

  return (
    <div className="bg-neutral-900 min-h-screen p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <BlogNavBar />
        {publishedBlogs.length > 0 ? (
          publishedBlogs.map((blog) => (
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
          ))
        ) : (
          <div className="text-white text-center text-lg">No published blogs found.</div>
        )}
      </div>
    </div>
  );
}
