import reactLogo from "../assets/react.svg";
import desk from "../assets/desk.jpg";
import { LayoutTemplate, Users, CircleDollarSign, Lock } from "lucide-react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <main className="h-screen flex flex-col bg-white font-sans">
      {/* Navbar */}
      <header className="w-[90%] mx-auto py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={reactLogo} alt="logo" className="w-8 h-8" />
          <h1 className="font-semibold text-lg">planit</h1>
        </div>
        {/* <nav className="flex items-center gap-8 text-gray-700 font-medium">
          <a href="#" className="flex items-center gap-1 hover:text-[#105EF5]">
            <LayoutTemplate size={18} /> Templates
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-[#105EF5]">
            <Users size={18} /> For teams
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-[#105EF5]">
            <CircleDollarSign size={18} /> Pricing
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-[#105EF5]">
            <Lock size={18} /> Log in
          </a>
        </nav> */}
        <Link to={"/login"}>
          <button className="bg-[#105EF5] text-white px-5 py-2 rounded-lg hover:bg-[#0d4ed1]">
            Sign in
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <section className="flex flex-1 py-4">
        {/* Left Side - Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-white px-16">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-1">Welcome to Taskora</h2>
            <p className="text-gray-600 mb-6">Sign up to continue</p>

            <div className="space-y-3 mb-6">
              <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>
              <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img
                  src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                  alt="Facebook"
                  className="w-5 h-5"
                />
                Continue with Facebook
              </button>
              <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
                <img
                  src="https://www.svgrepo.com/show/511330/apple-173.svg"
                  alt="Apple"
                  className="w-5 h-5"
                />
                Continue with Apple
              </button>
            </div>

            <div className="border-t border-gray-200 my-6" />

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#105EF5] outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#105EF5] outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#105EF5] outline-none"
              />
              <input
                type="password"
                placeholder="Re-enter Password"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#105EF5] outline-none"
              />
              <button
                type="submit"
                className="w-full bg-[#105EF5] text-white py-2 rounded-md font-semibold hover:bg-[#0d4ed1]"
              >
                Sign up
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              By continuing with Google, Facebook, Apple or Email, you agree to{" "}
              <a href="#" className="text-[#105EF5] underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#105EF5] underline">
                Privacy Policy
              </a>
              .
            </p>

            <p className="mt-6 text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/signup" className="text-[#105EF5] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        <div className="w-1/2 h-full overflow-hidden rounded-l-3xl">
          <img
            src={desk}
            alt="Laptop desk"
            className="object-cover h-full w-full"
          />
        </div>
      </section>
    </main>
  );
}

export default Login;
