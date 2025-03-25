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

// Function to extract plain text from JSON content
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
    <div className="flex flex-col border-b border-neutral-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-neutral-600 transition-shadow duration-200 bg-neutral-800">
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Content Section */}
        <div className="col-span-3 flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex items-center text-neutral-400 text-sm space-x-2 pb-2">
              <span className="font-semibold text-red-400">{authorName}</span>
              <span>•</span>
              <span>{new Date(publishedDate).toDateString()}</span>
            </div>

            <h2 className="text-white font-bold text-2xl pb-1">{title}</h2>
            <p className="text-neutral-300 text-sm">
              {extractPreviewText(content)}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
            <span className="bg-red-400 text-white text-xs px-3 py-1 rounded-lg">
              {category}
            </span>

            <div className="flex space-x-3 text-xl">
              <BsBookmarkPlusFill className="text-white hover:text-red-400 transition" />
              <MdComment className="text-white hover:text-red-400 transition" />
              <SlOptions className="text-white hover:text-red-400 transition" />
            </div>
          </div>
        </div>

        {/* Image Section */}
        <Link to={`/blog/${id}`}>
          <div className="col-span-1">
            <img
              src={imageUrl}
              alt="Blog"
              className="w-50 h-50 object-cover rounded-lg"
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
