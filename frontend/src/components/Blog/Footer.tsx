import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-8 mt-12 border-t border-neutral-700">
      <div className="max-w-5xl mx-auto px-6">
        {/* Top Section: Branding & Navigation */}
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center space-y-6 md:space-y-0">
          {/* Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-white">MeBlogs</h2>
            <p className="text-sm text-neutral-500">Your space to share thoughts and ideas.</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 text-sm">
            <Link to="/" className="hover:text-red-500 transition">Home</Link>
            <Link to="/about" className="hover:text-red-500 transition">About</Link>
            <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 text-lg">
            <a href="https://facebook.com" target="_blank" className="hover:text-red-500 transition">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-red-500 transition">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-red-500 transition">
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank" className="hover:text-red-500 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-xs text-neutral-500 mt-8">
          &copy; {new Date().getFullYear()} <span className="text-white font-medium">MeBlogs</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
