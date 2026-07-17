import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      <Navbar />

      {/* Background Blur */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 h-80 w-80 rounded-full bg-violet-400/20 blur-3xl"></div>

      <section className="relative flex min-h-[90vh] items-center justify-center px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="text-center lg:text-left">

            <p className="inline-block rounded-full mt-5 sm:mt-0 bg-blue-100 px-5 py-2 text-blue-700 font-semibold mb-6">
              🚀 Welcome to the Future
            </p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Manage Your
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tasks Smarter
              </span>
            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-8 max-w-xl mx-auto lg:mx-0">
              Organize your work with a clean dashboard, secure authentication,
              and powerful task management. Stay productive with a fast,
              responsive, and modern experience.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-5 mt-10">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                ⚡ Fast
              </div>

              <div className="flex items-center gap-2 text-gray-700 font-medium">
                🔒 Secure
              </div>

              <div className="flex items-center gap-2 text-gray-700 font-medium">
                📱 Responsive
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex flex-col justify-center relative">

            <div className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 blur-3xl"></div>

            <img
              src="https://media.tenor.com/s1Y9XfdN08EAAAAi/bot.gif"
              alt="Robot"
              className="relative h-72 sm:h-80 lg:h-[450px] w-auto animate-bounce pointer-events-none"
            />
             <button
               onClick={() => navigate("/dashboard")}
               className="relative z-20 mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 p-4 text-lg font-semibold text-white"
             >
                Go to Your Dashboard
             </button>
          </div>
         
        </div>
      </section>
      
    </div>
  );
}