import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full mt-15 bg-neutral-900 text-white py-5 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-3xl font-bold text-red-500 mb-2">
            .<span className="text-white">meBlogs</span>
          </h2>
          <p className="text-sm text-neutral-400">
            Write. Share. Inspire. The modern blogging platform for everyone.
          </p>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-5">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-red-500 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://github.com/Miheergautam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-red-500 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/miheer-gautam"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-red-500 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li>
              <a href="/about" className="hover:text-red-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-red-500 transition">
                Blogs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Partners */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Partners</h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li>
              <a href="/about" className="hover:text-red-500 transition">
                mePortfolio
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-red-500 transition">
                meBlogs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-5 border-t border-neutral-700 pt-4 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-red-500 font-medium">.meBlogs</span>. All rights
        reserved.
      </div>
    </footer>
  );
}
