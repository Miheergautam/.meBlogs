import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdComment } from "react-icons/md";
import { SlOptions } from "react-icons/sl";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  category: string;
  imageUrl: string;
}

export default function BlogsCard({
  authorName,
  title,
  content,
  publishedDate,
  category,
  imageUrl,
}: BlogCardProps) {
  return (
    <div className="flex flex-col border-b border-neutral-600 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-neutral-600 transition-shadow duration-200">
      <div className="grid grid-cols-4 gap-4 p-4">
        {/* Content Section */}
        <div className="col-span-3 flex flex-col space-y-2">
          <div className="flex items-center text-neutral-400 text-sm space-x-2">
            <span className="font-semibold text-red-400">{authorName}</span>
            <span>•</span>
            <span>{publishedDate}</span>
          </div>

          <h2 className="text-white font-bold text-2xl">{title}</h2>
          <p className="text-neutral-300 text-sm">{content.slice(0, 150) + "..."}</p>

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
        <div className="col-span-1">
          <img
            src={imageUrl}
            alt="Blog"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
