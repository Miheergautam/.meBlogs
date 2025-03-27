import { useState } from "react";
import RichTextEditor from "../components/SlateEditor/RichTextEditor";
import { Descendant } from "slate";
import axios from "axios";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState<Descendant[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title || !category || !thumbnail || !content.length) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    const blogData = {
      title,
      category,
      thumbnail,
      content: JSON.stringify(content),
    };

    try {
      const response = await axios.post(
        "https://backend.miheergautam04.workers.dev/api/v1/blogs",
        blogData,
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Blog saved successfully:", response.data);
      alert("Blog saved successfully!");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 px-10 bg-neutral-900 text-white rounded-xl shadow-lg w-full max-w-5xl mx-auto mt-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-100">Create a New Blog</h1>

      {/* Title Input */}
      <label className="block mb-3 text-sm text-gray-300">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-4 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
        placeholder="Enter blog title..."
      />

      {/* Category Dropdown */}
      <label className="block mb-3 text-sm text-gray-300">Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-4 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
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
      <label className="block mb-3 text-sm text-gray-300">Thumbnail URL</label>
      <input
        type="text"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
        className="w-full p-4 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-red-400 mb-6"
        placeholder="Enter thumbnail URL..."
      />

      {/* Rich Text Editor */}
      <label className="block mb-3 text-sm text-gray-300">Content</label>
      <RichTextEditor onChange={setContent} />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`px-6 py-3 mt-6 text-lg font-semibold rounded-lg transition-all duration-300 ${
          loading ? "bg-gray-500" : "bg-red-500 hover:bg-red-600"
        }`}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Blog"}
      </button>
    </div>
  );
}
