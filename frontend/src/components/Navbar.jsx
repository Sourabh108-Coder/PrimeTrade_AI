import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("primetradeaitoken");
    setUserLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
      
      <div className="w-full flex items-center justify-between sm:justify-center">
        <div
          className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 cursor-pointer text-center"
          onClick={() => navigate("/")}
        >
          PrimeTrade Ai
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      
      <div
        className={`w-full sm:w-auto flex flex-row items-center justify-center sm:justify-end mt-4 sm:mt-0 space-x-2 sm:space-x-4 ${
          isMobileMenuOpen ? "flex" : "hidden sm:flex"
        }`}
      >
        {!userLoggedIn ? (
          <>
            <button
              onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1 sm:flex-none"
            >
              Login
            </button>
            <button
              onClick={() => { navigate("/register"); setIsMobileMenuOpen(false); }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex-1 sm:flex-none"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => { navigate("/dashboard"); setIsMobileMenuOpen(false); }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex-1 sm:flex-none"
            >
              Dashboard
            </button>

            <button
              onClick={() => { navigate("/profile"); setIsMobileMenuOpen(false); }}
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition flex-1 sm:flex-none flex items-center justify-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              /> 
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
