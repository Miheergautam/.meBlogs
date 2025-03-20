import { GoPlus } from "react-icons/go";

export default function BlogNavBar() {
  return (
    <nav className="px-4 py-3 flex items-center text-white gap-6 border-b border-neutral-700 rounded-lg">
      {/* Add Blog Icon */}
      <button className="p-2 bg-neutral-700 rounded-full hover:bg-neutral-600 transition">
        <GoPlus className="text-3xl" />
      </button>

      {/* Navigation Tabs */}
      <div className="flex gap-6 text-lg font-medium">
        {["For you", "Following"].map((tab) => (
          <span
            key={tab}
            className="p-2 px-4 rounded-2xl cursor-pointer transition hover:bg-neutral-700"
          >
            {tab}
          </span>
        ))}
      </div>
    </nav>
  );
}
