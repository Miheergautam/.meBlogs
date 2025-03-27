import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditRichTextEditor from "../components/SlateEditor/EditRichTextEditor";
import { Descendant } from "slate";
import { useGetBlogQuery, useUpdateBlogMutation } from "../redux/services/meBlogsApi";

export default function EditBlogPage() {
  const { id } = useParams();
  const blogId = id ? parseInt(id) : 0;
  const navigate = useNavigate();

  // Fetch the blog details
  const { data: blog, isLoading, isError } = useGetBlogQuery(blogId);

  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState<Descendant[]>([]);

  // Set state when blog data is available
  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setCategory(blog.category);
      setThumbnail(blog.thumbnail);
      setContent(JSON.parse(blog.content));
    }
  }, [blog]);

  const handleUpdate = async () => {
    if (!blogId) {
      alert("Invalid blog ID.");
      return;
    }

    try {
      await updateBlog({
        id: blogId,
        updatedBlog: {
          title,
          category,
          thumbnail,
          content: JSON.stringify(content),
        },
      }).unwrap();

      alert("Blog updated successfully!");
      navigate(`/dashboard/bloglist`);
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog.");
    }
  };

  if (!blogId) return <p>Invalid blog ID.</p>;
  if (isLoading) return <p>Loading blog details...</p>;
  if (isError) return <p>Error loading blog.</p>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 bg-neutral-900 rounded-xl shadow-lg">
      <h1 className="text-4xl font-semibold mb-6 text-center text-white">Edit Blog</h1>

      {/* Title Input */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-400">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400"
          placeholder="Enter blog title"
        />
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-400">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-md bg-neutral-700 text-white"
        >
          <option value="">Select Category</option>
          <option value="Technology">Technology</option>
          <option value="Health">Health</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Business">Business</option>
          <option value="Finance">Finance</option>
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Science">Science</option>
          <option value="Sports">Sports</option>
          <option value="Politics">Politics</option>
          <option value="Art & Design">Art & Design</option>
          <option value="Personal Development">Personal Development</option>
          <option value="Parenting">Parenting</option>
          <option value="Self-Improvement">Self-Improvement</option>
          <option value="History">History</option>
          <option value="Gaming">Gaming</option>
          <option value="DIY & Crafts">DIY & Crafts</option>
          <option value="Music">Music</option>
          <option value="Personal">Personal</option>
          <option value="Books & Literature">Books & Literature</option>
        </select>
      </div>

      {/* Thumbnail Input */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-400">Thumbnail URL</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full p-3 rounded-md bg-neutral-700 text-white placeholder-gray-400"
          placeholder="Enter thumbnail URL"
        />
      </div>

      {/* Rich Text Editor */}
      <div className="mb-4">
        <label className="block mb-2 text-gray-400">Content</label>
        <EditRichTextEditor value={content} onChange={setContent} />
      </div>

      {/* Save Button */}
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`px-6 py-3 rounded-md text-white ${isUpdating ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"}`}
        >
          {isUpdating ? "Updating..." : "Update Blog"}
        </button>
    </div>
  );
}
