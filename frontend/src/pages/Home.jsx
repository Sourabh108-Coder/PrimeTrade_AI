import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6">
        
        <img
          src="https://media.tenor.com/s1Y9XfdN08EAAAAi/bot.gif"
          className="h-40 sm:h-52 md:h-64 w-auto mb-6 sm:mb-8"
        />
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 text-gray-800 text-center">
          Welcome to My Scalable App
        </h1>

        
        <p className="text-gray-600 text-center max-w-xs sm:max-w-md md:max-w-lg text-sm sm:text-base md:text-lg">
          This is a modern scalable web app with authentication, dashboard, 
          and CRUD tasks. Login or sign up to get started!
        </p>
      </div>
    </div>
  );
}
