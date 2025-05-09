import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300 mt-20 p-4">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {/* Branding & Tagline */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-red-500">
            .<span className="text-white">meBlogs</span>
          </h2>
          <p className="text-md opacity-80">
            Write. Share. Inspire. The modern blogging platform for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-red-500 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/blogs" className="hover:text-red-500 transition">
                Explore Blogs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-red-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-6 mt-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://github.com/Miheergautam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="www.linkedin.com/in/miheer-gautam"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-neutral-700 mt-8 pt-5 text-center text-sm opacity-75">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-red-500">.meBlogs</span>. All rights reserved.
      </div>
    </footer>
  );
}
