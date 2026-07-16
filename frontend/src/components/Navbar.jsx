import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, CheckCircle } from "lucide-react";
import {toast} from "sonner";
 
export default function Navbar() {
  const navigate = useNavigate();

  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("primetradeaitoken");
    setUserLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("primetradeaitoken");
    navigate("/login");
    toast.success("Logged Out Successfully");
  };


  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 px-5 sm:px-8 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">


        {/* Logo */}

        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >

          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <CheckCircle className="text-white w-6 h-6" />
          </div>


          <h1 className="text-2xl font-bold text-gray-900">
            Taskora
          </h1>

        </div>



        {/* Desktop Buttons */}

        <div className="hidden sm:flex items-center gap-3">

          {!userLoggedIn ? (
            <>

              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-xl text-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                Login
              </button>


              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 transition"
              >
                Sign Up
              </button>

            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
              >

                <img
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />

              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 transition"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-md shadow-blue-200 transition"
              >
                Logout
              </button>

            </>
          )}

        </div>




        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>


      </div>




      {/* Mobile Menu */}

      {isMobileMenuOpen && (

        <div className="sm:hidden mt-4 border-t border-gray-100 pt-4 flex flex-col gap-3">


          {!userLoggedIn ? (
            <>

              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl text-blue-600 font-semibold bg-blue-50"
              >
                Login
              </button>


              <button
                onClick={() => {
                  navigate("/register");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Sign Up
              </button>

            </>
          ) : (
            <>


              <button
                onClick={() => {
                  navigate("/dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Dashboard
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold"
              >
                Logout
              </button>


              <button
                onClick={() => {
                  navigate("/profile");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-gray-100 font-semibold text-gray-700"
              >
                Profile
              </button>


            </>
          )}


        </div>

      )}


    </nav>
  );
}