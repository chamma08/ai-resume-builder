import { Home, Eye, EyeOff } from '../utils/icons';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import s1 from '../assets/s2.webp';
import logo from '../assets/job_logo.webp';
import API from "../configs/api";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Clear errors when user starts typing
    if (errors[id]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      email: "",
      password: "",
    };

    // Validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // If there are validation errors, show them
    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      toast.error("Credentials are invalid", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/api/users/sign-in", formData);
      if (data.status === 200 || data.token) {
        toast.success("Login successful! Welcome back! 🎉", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.setItem("token", data.token);
        dispatch(login({ user: data.user, token: data.token }));
        setFormData({ email: "", password: "" });
        setErrors({ email: "", password: "" });
        setTimeout(() => {
          navigate("/app");
        }, 1000);
      }
    } catch (error) {
      console.error("Sign in error:", error);
      const serverMessage = error.response?.data?.message;
      
      // Handle specific error cases
      if (serverMessage === "Invalid credentials") {
        // Set field-specific errors
        setErrors({
          email: "Account not found or incorrect credentials",
          password: "Username or password is incorrect",
        });
        toast.error("❌ Invalid email or password. Please check your credentials.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (serverMessage === "User already exists") {
        setErrors({
          email: "This email is already registered",
          password: "",
        });
        toast.error("This email is already registered. Try signing in instead.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (serverMessage === "All fields are required") {
        toast.error("Please fill in all required fields", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error.response?.status === 404) {
        setErrors({
          email: "Account not found with this email",
          password: "",
        });
        toast.error("❌ Account not found. Please check your email or sign up.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else if (error.response?.status === 401) {
        setErrors({
          email: "",
          password: "Incorrect password",
        });
        toast.error("❌ Incorrect password. Please try again.", {
          position: "top-right",
          autoClose: 4000,
        });
      } else {
        toast.error("Failed to sign in. Please try again later.", {
          position: "top-right",
          autoClose: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  }

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
                value={formData.email}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500 bg-red-50"
                    : "border-gray-300 focus:ring-red-900 focus:border-transparent"
                }`}
                required
              />
              {errors.email && (
                <div className="mt-1.5 flex items-center gap-1.5 text-red-600 text-xs">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{errors.email}</span>
                </div>
              )}
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
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500 bg-red-50"
                      : "border-gray-300 focus:ring-red-900 focus:border-transparent"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="mt-1.5 flex items-center gap-1.5 text-red-600 text-xs">
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{errors.password}</span>
                </div>
              )}
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
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-red-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-red-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Signing In..." : "Sign In"}
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