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
    <div className="py-4 px-8 text-white w-full rounded-xl">
      <h1 className="text-3xl font-bold mb-6 border-b border-neutral-600 pb-2">
        Edit Blog
      </h1>

      {/* Title Input */}
      <label className="block mb-2 text-gray-400">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded-md bg-neutral-700 text-white mb-4"
      />

      {/* Category Dropdown */}
      <label className="block mb-2 text-gray-400">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded-md bg-neutral-700 text-white mb-4"
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

      {/* Thumbnail Input */}
      <label className="block mb-2 text-gray-400">Thumbnail URL</label>
      <input
        type="text"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        className="w-full p-2 rounded-md bg-neutral-700 text-white mb-4"
      />

      {/* Rich Text Editor */}
      <label className="block mb-2 text-gray-400">Content</label>
      <EditRichTextEditor value={content} onChange={setContent} />

      {/* Save Button */}
      <button
        onClick={handleUpdate}
        disabled={isUpdating}
        className={`mt-6 px-4 py-2 rounded-md ${isUpdating ? "bg-gray-500" : "bg-red-400 hover:bg-red-500"}`}
      >
        {isUpdating ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
}
