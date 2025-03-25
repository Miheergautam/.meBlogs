import { Blog } from "../../redux/services/meBlogsApi";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Descendant } from "slate";

export default function FullBlog({ blog }: { blog: Blog }) {
  // Function to render JSON content properly
  const renderContent = (content: string | Descendant[]) => {
    let nodes: Descendant[];

    if (typeof content === "string") {
      try {
        nodes = JSON.parse(content);
      } catch (error) {
        console.error("Invalid JSON format", error);
        return <p>Error loading content.</p>;
      }
    } else {
      nodes = content;
    }

    return nodes.map((node: any, index: number) => {
      return (
        <div key={index} className="mb-4">
          {renderNode(node)}
        </div>
      );
    });
  };

  // 🔹 Helper function to handle different block types
  const renderNode = (node: any) => {
    const children = node.children.map((child: any, i: number) =>
      renderLeaf(child, i)
    );

    switch (node.type) {
      case "heading-one":
        return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
      case "heading-two":
        return <h2 className="text-2xl font-semibold mb-3">{children}</h2>;
      case "blockquote":
        return (
          <blockquote className="border-l-4 pl-4 italic text-gray-400">
            {children}
          </blockquote>
        );
      case "bulleted-list":
        return <ul className="list-disc ml-6">{children}</ul>;
      case "numbered-list":
        return <ol className="list-decimal ml-6">{children}</ol>;
      case "list-item":
        return <li>{children}</li>;
      case "code":
        return (
          <pre className="bg-gray-800 p-2 rounded-md">
            <code>{children}</code>
          </pre>
        );
      default:
        return <p>{children}</p>;
    }
  };

  // 🔹 Helper function to apply inline formatting
  const renderLeaf = (leaf: any, key: number) => {
    let textElement = <span key={key}>{leaf.text}</span>;

    if (leaf.bold) textElement = <strong key={key}>{textElement}</strong>;
    if (leaf.italic) textElement = <em key={key}>{textElement}</em>;
    if (leaf.underline) textElement = <u key={key}>{textElement}</u>;
    if (leaf.strikethrough) textElement = <del key={key}>{textElement}</del>;
    if (leaf.code)
      textElement = (
        <code key={key} className="bg-gray-700 p-1 rounded">
          {textElement}
        </code>
      );

    return textElement;
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex justify-center py-10 px-6">
      <div className="w-full max-w-6xl grid grid-cols-4 gap-8">
        {/* Blog Content - 75% */}
        <div className="col-span-3 bg-neutral-900 p-8 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-extrabold mb-4 text-gray-100">
              {blog?.title}
            </h1>
            <p className="text-gray-500 text-sm mb-6 flex justify-between items-center">
              <span>
                By{" "}
                <span className="text-red-400 font-bold">
                  {blog?.author?.name}
                </span>{" "}
                • {new Date(blog?.createdAt).toDateString()}
              </span>
              <span className="text-red-400 font-medium bg-neutral-800 px-3 py-1 rounded-xl border border-neutral-700">
                {blog?.category}
              </span>
            </p>
            <div className="w-full h-80 rounded-lg overflow-hidden mb-6">
              <img
                src={blog?.thumbnail}
                alt="Blog"
                className="w-full h-full object-cover"
              />
            </div>
            <article className="prose prose-invert text-gray-300 leading-relaxed">
              {renderContent(blog?.content)}
            </article>
          </div>
        </div>
        {/* Blog Creator Profile - 25% */}
        <div className="col-span-1 bg-neutral-800 p-6 rounded-xl shadow-lg flex flex-col items-center border border-neutral-700 h-fit">
          <div className="px-4 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 text-gray-200 font-semibold text-sm uppercase rounded-lg mb-4">
            Author
          </div>
          <div className="w-28 h-28 rounded-full overflow-hidden mb-4">
            <img
              src={
                blog?.author?.profileImage
              }
              alt="Author"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-100">
            {blog?.author?.name}
          </h2>
          <p className="text-gray-500 text-sm">
            @{blog?.author?.email.split("@")[0]}
          </p>
          <p className="text-gray-400 text-center mt-4 italic">
            {blog?.author?.bio || "No Bio Available"}
          </p>

          {/* Social Media Links */}
          <div className="flex mt-4 space-x-4">
            <a href={"#"} target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-gray-200 text-xl" />
            </a>
            <a href={"#"} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-gray-400 hover:text-gray-200 text-xl" />
            </a>
            <a href={"#"} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-gray-400 hover:text-gray-200 text-xl" />
            </a>
            <a href={"#"} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-gray-400 hover:text-gray-200 text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
