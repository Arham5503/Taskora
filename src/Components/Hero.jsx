import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
function Hero() {
  const { user, loading } = useAuth();
  return (
    <section
      id="Home"
      className="relative flex flex-col justify-center items-center text-center py-24 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Soft grid & glow background */}
      <div
        className="absolute inset-0 z-0 opacity-90"
        style={{
          backgroundImage: `
         radial-gradient(circle at 20% 20%, rgba(99,102,241,0.25), transparent 70%),
         radial-gradient(circle at 80% 30%, rgba(167,139,250,0.25), transparent 70%),
         linear-gradient(120deg, #F9FAFB 0%, #FFFFFF 40%, #F9FAFB 100%)`,
          backgroundSize: "cover",
        }}
      />
      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight mb-3 font-semibold">
          Take Control of Your Day.
        </p>

        <p className="font-heading text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold text-violet-800 mb-6">
          Taskora Makes Productivity Simple.
        </p>

        <p className="font-body text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Plan smarter, manage tasks with clarity, and stay ahead of deadlines.
          Taskora gives you the tools to stay organized without the overwhelm.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {user ? (
            <Link
              to={"/dashboard"}
              className="px-8 py-3 bg-violet-400 text-black font-semibold rounded-full shadow-md hover:bg-violet-500 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:scale-105 hover:text-white"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to={"/signup"}
              className="px-8 py-3 bg-violet-400 text-black font-semibold rounded-full shadow-md hover:bg-violet-500 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:scale-105 hover:text-white"
            >
              Get Started Free
            </Link>
          )}

          <button className="px-8 py-3 border border-indigo-400 text-indigo-600 font-semibold rounded-full hover:bg-indigo-50 hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer">
            See How It Works
          </button>
        </div>
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      {/* Image will here */}
      {/* Overview preview below */}
      <div className="relative z-10 mt-24 w-full">{/* <Overview /> */}</div>
    </section>
  );
}
export default Hero;
