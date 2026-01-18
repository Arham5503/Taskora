import desk from "../assets/desk.jpg";
import { LayoutTemplate, Users, CircleDollarSign, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:2004/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        // toast.success("Logged In Successfully!");
        setUser(data.user);
        return navigate("/dashboard");
      } else {
        toast.error(data.message || " hello world");
      }
      // else {
      //   toast.error(data.message || "Login failed. Please check credentials.");
      // }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Something went wrong. Try again later.");
    }
  };
  return (
    <main className="h-screen flex flex-col bg-white font-sans">
      {/* Navbar */}
      <header className="w-[90%] mx-auto py-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="Logo.png" alt="PlanOra Logo" className="w-40" />
        </div>
        <Link to="/signup">
          <button className="bg-[#105EF5] text-white px-5 py-2 rounded-lg hover:bg-[#0d4ed1]">
            Sign Up
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <section className="flex flex-1 py-4">
        {/* Left Side - Login Form */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-white px-16">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
            <p className="text-gray-600 mb-6">Sign in to continue</p>

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

            <form className="space-y-4" method="post" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#105EF5] outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#105EF5] outline-none"
              />
              <button
                type="submit"
                className="w-full cursor-pointer bg-[#105EF5] text-white py-2 rounded-md font-semibold hover:bg-[#0d4ed1]"
              >
                Sign in
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
              Create an account{" "}
              <Link to="/signup" className="text-[#105EF5] font-medium">
                Signup
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
