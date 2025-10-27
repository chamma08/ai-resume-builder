import { Home, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s1 from '../assets/s2.jpg';
import logo from '../assets/job_logo.png';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-pink-100 via-purple-100 to-blue-100 p-3 sm:p-4 md:p-6 relative">
      {/* Home Icon */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 p-2 sm:p-2.5 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-50"
        aria-label="Go to Home"
      >
        <Home className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
      </button>

      <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-white">
        {/* Left Side - Image/Message */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center p-8 lg:p-10 text-white relative min-h-[300px] md:min-h-0"
          style={{ 
            backgroundImage: `url(${s1})`,
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex h-full flex-col justify-center items-center relative z-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-white drop-shadow-lg">
              Welcome Back
            </h2>
            <p className="text-base lg:text-lg text-white drop-shadow-md max-w-md">
              Sign in to hunting jobs and building resumes seamlessly!
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-600">Sign in to continue</p>
          </div>

          <img src={logo} loading="lazy" alt="Sign In" className="w-20 justify-center mx-auto mb-6" /> 

          <div className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 pt-1">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs sm:text-sm text-gray-600 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-xs sm:text-sm text-black hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-red-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-red-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              Sign In
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="bg-white px-3 text-gray-500">or</span>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-red-900 hover:text-red-700 font-semibold hover:underline transition-colors">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}