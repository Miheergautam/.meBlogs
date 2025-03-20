import BlogCard from "../components/Blog/BlogCard";
import BlogNavBar from "../components/Blog/BlogNavBar";

export default function BlogsPage() {
  return (
    <div className="bg-neutral-800 min-h-screen p-8 md:p-20">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Latest Blogs
        </h1>

        <BlogNavBar />

        <BlogCard
          authorName="Nick Jr"
          title="100 Days Challenge"
          content="This is the 100 days challenge for full-stack web developers where we will be doing quizzes, hackathons, and contests to learn, develop, and carry forward our skills to the world."
          publishedDate="March 19, 2025"
          category="Coding"
          imageUrl="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2969&auto=format&fit=crop"
        />

        <BlogCard
          authorName="Jane Doe"
          title="Mastering UI/UX Design"
          content="A comprehensive guide to UI/UX design principles, best practices, and tools to create stunning and user-friendly interfaces."
          publishedDate="February 28, 2025"
          category="Design"
          imageUrl="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dWklMjB1eHxlbnwwfHwwfHx8MA%3D%3Dv"
        />

        <BlogCard
          authorName="John Smith"
          title="The Future of AI in Healthcare"
          content="AI is revolutionizing healthcare by improving diagnostics, personalizing treatment, and making medical services more efficient and accessible."
          publishedDate="March 5, 2025"
          category="AI & Healthcare"
          imageUrl="https://plus.unsplash.com/premium_photo-1699387204264-0645255b7d69?q=80&w=3178&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <BlogCard
          authorName="Sarah Lee"
          title="How to Build Scalable Web Apps"
          content="A deep dive into best practices for building scalable web applications using modern frameworks and cloud technologies."
          publishedDate="March 15, 2025"
          category="Web Development"
          imageUrl="https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNjcmFwcGxpbmclMjB3ZWIlMjBhcHBzfGVufDB8fDB8fHww"
        />
      </div>
    </div>
  );
}
