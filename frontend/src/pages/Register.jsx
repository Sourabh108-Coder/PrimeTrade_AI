import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("All fields are required");
      return;
    }

    console.log({ username, email, password });

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registration successful!");
        localStorage.setItem("primetradeaitoken", data.token);
        navigate("/dashboard");
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center ">

        {/* Background Blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30"></div>

        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-cyan-200 rounded-full blur-3xl opacity-20"></div>

        {/* Register Card */}
        <div className="relative  w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden grid lg:grid-cols-2">

          {/* Left Side */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-12">

            <div className = "flex justify-center items-center gap-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
               ✓
              </div>
  
              <h1 className="text-3xl font-bold text-gray-800 leading-tight">
                Join Us Today
              </h1>
            </div>

            <p className="mt-5 text-gray-600 text-md leading-8">
              Create your account and start organizing your daily tasks with a
              clean, fast and beautiful Todo experience.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
                  📝
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Create Unlimited Tasks
                  </h3>
                  {/* <p className="text-gray-500 text-sm">
                    Organize everything easily.
                  </p> */}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
                  📅
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Stay Organized
                  </h3>
                  {/* <p className="text-gray-500 text-sm">
                    Plan your day with confidence.
                  </p> */}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-white shadow flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Secure Account
                  </h3>
                  {/* <p className="text-gray-500 text-sm">
                    Your information stays protected.
                  </p> */}
                </div>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8 md:p-12">

            <div className="w-full max-w-md">

              <div className="text-center mb-5">
                <h2 className="text-4xl font-bold text-gray-800">
                  Create Account
                </h2>

                {/* <p className="mt-3 text-gray-500">
                  Let's get you started.
                </p> */}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Username */}
                <div>
                  <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                    <User size={20} className="text-gray-400 mr-3" />

                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />

                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
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

                {/* Password */}
                <div>
                  <label className="block text-left text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>

                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 transition-all duration-300 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

                    <Lock size={20} className="text-gray-400 mr-3" />

                    <input
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />

                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Create Account
                  <ArrowRight size={18} />
                </button>

              </form>

              <div className="mt-8 text-center text-gray-600">
                Already have an account?{" "}

                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default Register;