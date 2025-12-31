import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "" });
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("primetradeaitoken");

  const navigate = useNavigate();

  useEffect(() => {

    if(!token){

      navigate("/login");
      alert("Please login to access your profile.");
      
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setUser(data.user);
        else alert("Failed to fetch profile: " + data.message);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);


  const handleUpdate = async (e) => {
    e.preventDefault();
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
        alert("Profile updated successfully!");
        setPassword("");
        setUser(data.user);
      } else {
        alert("Update failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        
        
        <div className="bg-white rounded shadow-md p-6 w-full max-w-md mb-6 flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="Profile"
            className="h-24 w-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded shadow-md w-full max-w-md flex flex-col space-y-4"
        >
          <h2 className="text-xl font-bold mb-2 text-center">Edit Profile</h2>

          <input
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-2 border rounded"
          />
          {/* <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border rounded"
          /> */}
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
