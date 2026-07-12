import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import {toast} from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Login successful!");
        localStorage.setItem("primetradeaitoken", data.token);
        navigate("/dashboard");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4 py-10">

        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>

     
        <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden grid lg:grid-cols-2">

          
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-12">

            <div className = "flex gap-6 justify-center items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                ✓
              </div>

              <h1 className="text-3xl font-bold text-gray-800 leading-relaxed">
                Welcome Back
              </h1>
            </div>

            <p className="mt-5 text-gray-600 text-md leading-8">
              Sign in to access your personal dashboard, manage your daily tasks,
              stay organized, and boost your productivity effortlessly.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
                  📋
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Organize Tasks
                  </h3>

                  
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
                  ⚡
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Stay Productive
                  </h3>

                  
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Secure Login
                  </h3>

                 
                </div>
              </div>

            </div>

          </div>

         
          <div className="flex items-center justify-center p-8 md:p-12">

            <div className="w-full max-w-md">

              <div className="text-center mb-10">

                <h2 className="text-4xl font-bold text-gray-800">
                  Login
                </h2>

                <p className="mt-3 text-gray-500">
                  Welcome back! Please login to continue.
                </p>

              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                
                <div>

                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                    <Mail size={20} className="text-gray-400 mr-3" />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />

                  </div>

                </div>

               
                <div>

                  <label className="block text-sm text-left font-semibold text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                    <Lock size={20} className="text-gray-400 mr-3" />

                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />

                  </div>

                </div>

                <div className="flex items-center justify-between text-sm">

                  <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick = {() => toast.info("Feature Coming Soon!")}
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Login
                  <ArrowRight size={18} />
                </button>

              </form>

              <div className="mt-8 text-center text-gray-600">

                Don't have an account?{" "}

                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Sign Up
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}