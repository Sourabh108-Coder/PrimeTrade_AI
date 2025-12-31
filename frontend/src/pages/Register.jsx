import React from 'react'
import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom"; 


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

     const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !email || !password){
            alert("All fields are required");
            return;
        }

        console.log({username, email, password});

        
        try
        {
          const res = await fetch("http://localhost:5000/api/auth/register", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ username, email, password }),});

          const data = await res.json();

          if(data.success){
            alert("Registration successful!");
            localStorage.setItem("primetradeaitoken", data.token);
             navigate("/dashboard"); 
            
          } else {
            alert("Registration failed: " + data.message);
          }
        }

        catch(err){
          console.error("Error during registration:", err);
          alert("An error occurred. Please try again later.");
        }
    }
  return (
    <div>
    
            <Navbar/>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-96"
          >
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
              type="text"
              placeholder="Username"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) => setUserName(e.target.value)}
            />
    
            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) => setEmail(e.target.value)}
            />
    
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
    
            <button className="w-full bg-blue-600 text-white p-2 rounded">
              Create Account!
            </button>
          </form>
        </div>
        </div>
  )
}

export default Register
