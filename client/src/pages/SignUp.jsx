import { Home, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, setLoading } from "../redux/features/authSlice";
import s2 from "../assets/s1.jpg";
import logo from "../assets/job_logo.png";
import API from "../configs/api";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prevData) => ({ ...prevData, referralCode: refCode }));
      setShowReferralInput(true); // Automatically show the input if there's a ref code
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/api/users/sign-up", formData);
      // Check for successful response (status 201)
      if (data.status === 201 || data.token) {
        toast.success("Account Created successfully! ", {
          position: "top-right",
          autoClose: 3000,
        });

        toast.success(
          <div>
            <p className="font-bold">Welcome! 🎉</p>
            <p>You've earned 50 bonus points for signing up!</p>
            {formData.referralCode && (
              <p className="text-sm mt-1">Referral bonus applied! 🎁</p>
            )}
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
          }
        );
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        // Update Redux state
        dispatch(login({ user: data.user, token: data.token }));
        // Clear form fields
        setFormData({ name: "", email: "", password: "" });
        // Navigate to dashboard after a short delay
        setTimeout(() => {
          navigate("/app");
        }, 1000);
      }
    } catch (error) {
      console.error("Sign up error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create account. Please try again.";
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

      <div className="flex flex-col md:flex-row w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl bg-white my-8">
        {/* Left Side - Image/Message */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center p-6 text-white relative min-h-[250px] md:min-h-0"
          style={{
            backgroundImage: `url(${s2})`,
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex h-full flex-col justify-center items-center relative z-10 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white drop-shadow-lg">
              Create Your Account
            </h2>
            <p className="text-sm lg:text-base text-white drop-shadow-md max-w-md">
              Sign up to hunting jobs and building resumes seamlessly!
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-7 lg:p-8">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-4">
            <h1 className="text-xl font-bold text-black mb-1">
              Create Account
            </h1>
            <p className="text-xs text-gray-600">Sign up to get started</p>
          </div>

          <img
            src={logo}
            alt="Sign Up"
            className="w-16 justify-center mx-auto mb-4"
          />

          <div className="space-y-3 sm:space-y-3.5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters
              </p>
            </div>

            {/* Referral Code Toggle Button */}
            <div>
              <button
                type="button"
                onClick={() => setShowReferralInput(!showReferralInput)}
                className="text-sm text-red-700 hover:text-red-900 font-medium flex items-center gap-1 transition-colors"
              >
                {showReferralInput ? '🎁 Hide Referral Code' : '🎁 Have a Referral Code?'}
              </button>
            </div>

            {/* Referral Code Input - Conditionally Rendered */}
            {showReferralInput && (
              <div>
                <label
                  htmlFor="referralCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  value={formData.referralCode}
                  onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                  placeholder="Enter referral code"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter your referral code to get started with bonus points! 🎁
                </p>
              </div>
            )}

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-0.5 accent-black cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-600 cursor-pointer"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-black hover:underline font-medium"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-black hover:underline font-medium"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-lg bg-red-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="relative py-1.5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-500">or</span>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-gray-600">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="text-red-900 hover:text-red-700 font-semibold hover:underline transition-colors"
            >
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
