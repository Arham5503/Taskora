import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollTo = (e) => {
    return document.getElementById(e).scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 w-full backdrop-blur-md bg-white/60 border-b border-white/30 transition-all duration-300 z-50 ${
          isScrolled ? "shadow-lg shadow-indigo-200/40" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="PlanOra Logo" className="w-40" />
          </div>

          {/* Nav Links */}
          <ul className="hidden md:flex gap-8 font-medium text-gray-700 [&>li]:hover:text-indigo-500 [&>li]:transition [&>li]:cursor-pointer">
            <li
              onClick={() => {
                scrollTo("Home");
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                scrollTo("features");
              }}
            >
              Features
            </li>
            <li
              onClick={() => {
                scrollTo("faq");
              }}
            >
              FAQ's
            </li>
            <li
              onClick={() => {
                scrollTo("contact");
              }}
            >
              Contact
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {/* Secondary Button */}
            <Link
              to="/login"
              className="px-5 py-2 font-semibold border border-indigo-400 text-indigo-600 rounded-full hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-300"
            >
              Login
            </Link>

            {/* Primary Button */}
            <Link
              to="/register"
              className="px-6 py-2.5 bg-indigo-500 text-white rounded-full font-semibold shadow-md hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navbar;
