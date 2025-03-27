import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdComment } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  category: string;
  imageUrl: string;
}

// Extract plain text from JSON content
const extractPreviewText = (content: string, maxLength: number = 250) => {
  try {
    const parsedContent = JSON.parse(content);
    let text = "";

    for (const node of parsedContent) {
      if (node.type === "paragraph" && node.children) {
        text += node.children.map((child: any) => child.text).join(" ") + " ";
      }
      if (text.length > maxLength) break;
    }

    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  } catch (error) {
    console.error("Invalid JSON content", error);
    return "Content preview unavailable.";
  }
};

export default function BlogsCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
  category,
  imageUrl,
}: BlogCardProps) {
  return (
    <div className="border border-neutral-700 rounded-xl overflow-hidden bg-neutral-800 hover:shadow-lg hover:shadow-neutral-800 transition-all duration-300 w-full flex flex-col sm:flex-row hover:scale-[1.02]">
      {/* Mobile Layout (Image on top, text below) */}
      <div className="relative sm:hidden">
        <Link to={`/blog/${id}`} className="relative block">
          <img
            src={imageUrl}
            alt="Blog"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          />
          {/* Title Overlay (Hint of Text) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h2 className="text-white font-bold text-lg truncate">{title}</h2>
          </div>
        </Link>

        <div className="p-4 pt-2">
          {/* Author & Date */}
          <div className="flex items-center text-neutral-400 text-sm space-x-2 pb-2">
            <span className="font-semibold text-red-500">{authorName}</span>
            <span>•</span>
            <span>{new Date(publishedDate).toDateString()}</span>
          </div>

          {/* Preview Text */}
          <p className="text-neutral-300 text-sm">{extractPreviewText(content, 150)}</p>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              {category}
            </span>

            <div className="flex space-x-4 text-lg">
              <BsBookmarkPlusFill className="text-neutral-400 hover:text-red-500 transition" />
              <MdComment className="text-neutral-400 hover:text-red-500 transition" />
              <SlOptions className="text-neutral-400 hover:text-red-500 transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout (Image on Right, Text on Left) */}
      <div className="hidden sm:grid sm:grid-cols-4 gap-4 p-5 w-full">
        <div className="col-span-3 flex flex-col justify-between">
          {/* Author & Date */}
          <div className="flex items-center text-neutral-400 text-sm space-x-2 pb-2">
            <span className="font-semibold text-red-500">{authorName}</span>
            <span>•</span>
            <span>{new Date(publishedDate).toDateString()}</span>
          </div>

          {/* Title & Preview */}
          <Link to={`/blog/${id}`} className="hover:underline">
            <h2 className="text-white font-bold text-xl pb-1 hover:text-red-500 transition">
              {title}
            </h2>
          </Link>
          <p className="text-neutral-300 text-sm">{extractPreviewText(content)}</p>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
            <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              {category}
            </span>

            <div className="flex space-x-4 text-lg">
              <BsBookmarkPlusFill className="text-neutral-400 hover:text-red-500 transition" />
              <MdComment className="text-neutral-400 hover:text-red-500 transition" />
              <SlOptions className="text-neutral-400 hover:text-red-500 transition" />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <Link to={`/blog/${id}`} className="col-span-1 hidden sm:block">
          <div className="w-full h-full overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt="Blog"
              className="w-[250px] h-[200px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
