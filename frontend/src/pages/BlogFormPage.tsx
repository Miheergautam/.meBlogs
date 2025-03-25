import { useState } from "react";
import RichTextEditor from "../components/SlateEditor/RichTextEditor";
import { Descendant } from "slate";

import axios from "axios";

export default function BlogForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState<Descendant[]>([]);

  const handleSave = async () => {
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
    }
  };

  return (
    <div className="py-4 px-8 text-white w-full rounded-xl">
      <h1 className="text-3xl font-bold mb-6 border-b border-neutral-600 pb-2">Create a New Blog</h1>

      {/* Title Input */}
      <label className="block mb-2 text-gray-400">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded-md bg-neutral-700 text-white mb-4"
        placeholder="Enter blog title..."
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
        placeholder="Enter thumbnail URL..."
      />

      {/* Rich Text Editor */}
      <label className="block mb-2 text-gray-400">Content</label>
      <RichTextEditor onChange={setContent} />

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-red-400 rounded-md hover:bg-red-500"
      >
        Save Blog
      </button>
    </div>
  );
}
