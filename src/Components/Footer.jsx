import { Twitter, Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
          <img className="w-40" src="/Logo.png" alt="" />
          <p className="text-gray-400">
            Smart task and project management for individuals and teams. Stay
            organized, productive, and focused.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-gray-300 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-indigo-500 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-indigo-500 transition">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-indigo-500 transition">
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-indigo-500 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="font-semibold text-gray-300 mb-3">Connect With Us</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-indigo-500 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Github size={20} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Taskora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
