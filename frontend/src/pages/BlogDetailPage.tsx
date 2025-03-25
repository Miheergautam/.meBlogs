import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "../redux/services/meBlogsApi";
import FullBlog from "../components/Blog/FullBlog";

export default function BlogDetailPage() {
  const { id } = useParams();
  const blogId = id ? parseInt(id) : 0;
  const { data:blog, isLoading, error } = useGetBlogQuery(blogId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-800 text-white flex justify-center py-10 px-6">
        <div className="w-full max-w-6xl grid grid-cols-4 gap-8 animate-pulse">
          <div className="col-span-3 bg-neutral-700 p-6 rounded-xl shadow-lg">
            <div className="h-10 bg-neutral-600 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-neutral-600 rounded w-1/2 mb-4"></div>
            <div className="w-full h-60 bg-neutral-600 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-600 rounded w-full"></div>
              <div className="h-4 bg-neutral-600 rounded w-5/6"></div>
              <div className="h-4 bg-neutral-600 rounded w-2/3"></div>
            </div>
          </div>
          <div className="col-span-1 bg-neutral-700 p-6 rounded-xl shadow-lg flex flex-col items-center">
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

  if (error || !blog) {
    return <div className="min-h-screen bg-neutral-800 text-white flex justify-center">Blog not found</div>;
  }

  return <FullBlog blog={blog} />;
}
