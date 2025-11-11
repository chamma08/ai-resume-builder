import { Home, Mail } from '../utils/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import s1 from '../assets/s2.jpg';
import logo from '../assets/job_logo.webp';
import API from "../configs/api";
import r1 from '../assets/r1.jpg';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/api/users/forgot-password", { email });
      if (data.success) {
        toast.success("OTP sent to your email!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Navigate to reset password page with email
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1000);
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

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
            backgroundImage: `url(${r1})`,
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex h-full flex-col justify-center items-center relative z-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-white drop-shadow-lg">
              Reset Password
            </h2>
            <p className="text-base lg:text-lg text-white drop-shadow-md max-w-md">
              Enter your email and we'll send you an OTP to reset your password
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">Forgot Password</h1>
            <p className="text-sm text-gray-600">We'll send you an OTP</p>
          </div>

          <img src={logo} loading="lazy" alt="Forgot Password" className="w-20 justify-center mx-auto mb-6" /> 

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                  required
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                We'll send a 6-digit OTP to this email address
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-red-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-red-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/sign-in")}
              className="text-sm text-gray-600 hover:text-black transition-colors"
            >
              ← Back to Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-xs sm:text-sm text-gray-600">
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
