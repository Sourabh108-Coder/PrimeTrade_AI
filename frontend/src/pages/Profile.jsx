import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {toast} from "sonner";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("primetradeaitoken");

  const navigate = useNavigate();

  useEffect(() => {

    if(!token){

      navigate("/login");
      toast.info("Please login to access your profile.");
      
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
        else toast.error("Failed to fetch profile: " + data.message);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    if(!user.username)
    {
      toast.warning("Please enter a user name to update");
      return;
    }

    if(!user.password)
    {
      toast.warning("Please enter a new password to update");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/user/profile", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...user, password }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
        setPassword("");
        setUser(data.user);
      } else {
        toast.error("Updation failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
    <Navbar />

    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800">
          👤 My Profile
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          View and update your account information.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">

        {/* Profile Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-white shadow-2xl">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400"></div>

          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/20"></div>
          <div className="absolute -bottom-12 -left-12 h-52 w-52 rounded-full bg-white/10"></div>

          <div className="relative flex flex-col items-center text-white p-10">

            <div className="rounded-full bg-white p-2 shadow-xl">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                alt="Profile"
                className="w-36 h-36 rounded-full"
              />
            </div>

            <h2 className="text-4xl font-bold mt-6">
              {user.name}
            </h2>

            <h4 className="text-blue-100 text-2xl mt-2 break-all">
              {user.email}
            </h4>

          </div>

        </div>

        {/* Edit Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl shadow-2xl p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Edit Profile
          </h2>

          <p className="text-gray-500 mb-8">
            Keep your account information up to date.
          </p>

          <form
            onSubmit={handleUpdate}
            className="space-y-6"
          >

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: e.target.value,
                  })
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                New Password
              </label>

              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Update Profile
            </button>

           </form>

          </div>

         </div>

        </div>
      </div>
    );
  };

export default Profile;
