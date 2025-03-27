import { motion } from "framer-motion";

const blogPosts = [
  {
    date: "April 22",
    title: "Preparation Day - The Panic Begins",
    image:
      "https://images.unsplash.com/photo-1523198667291-3129d92e6551?w=900&auto=format&fit=crop&q=60",
    featured: true,
  },
  {
    date: "April 29",
    title: "Exam Day - Good Luck, Soldier",
    featured: false,
  },
  {
    date: "May 2",
    title: "Summer Vacation - Freedom... For Now",
    featured: false,
  },
];

export default function FloatingCardSection() {
  return (
    <div className="flex flex-col text-white items-center md:items-end w-full px-4">
      {/* Section Title */}
      <h3 className="text-lg font-bold text-red-500 mb-4 text-center md:text-right">
        Latest Releases
      </h3>

      {/* Stacked Cards (Reverse Order) */}
      <div className="relative w-full max-w-md flex flex-col space-y-[-20px]">
        {[...blogPosts].reverse().map((post, index) => {
          const isFeatured = post.featured;
          return (
            <motion.div
              key={index}
              className={`relative w-full p-4 rounded-2xl shadow-lg transition-all ${
                isFeatured
                  ? "bg-white text-black shadow-2xl"
                  : "bg-white/10 backdrop-blur-lg border border-white/10 text-neutral-300"
              }`}
              initial={{
                y: (blogPosts.length - index - 1) * -10, // Reversed stacking effect
                scale: isFeatured ? 1 : 0.95,
                opacity: isFeatured ? 1 : 0.75,
              }}
              animate={{
                y: 0, // Bring it back to normal position
                scale: 1,
                opacity: 1,
              }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, 0], // Small jitter effect
                transition: {
                  duration: 0.5,
                  repeat: 1, // Jitter once on hover
                  repeatType: "reverse",
                },
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              {/* Image for Featured Post */}
              {isFeatured && (
                <img src={post.image} alt={post.title} className="rounded-lg w-full" />
              )}

              {/* Text Content */}
              <p className="text-gray-400 text-sm mt-3">{post.date}</p>
              <h4
                className={`text-lg font-semibold ${
                  isFeatured ? "text-black" : "text-neutral-200"
                }`}
              >
                {post.title}
              </h4>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
