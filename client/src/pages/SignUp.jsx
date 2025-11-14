import { Home, Eye, EyeOff } from '../utils/icons';
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login, setLoading } from "../redux/features/authSlice";
import s2 from "../assets/s1.webp";
import logo from "../assets/job_logo.webp";
import API from "../configs/api";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showReferralInput, setShowReferralInput] = useState(false);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number (0-9)");
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character (!@#$%^&*, etc.)");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // Validate password in real-time
    if (id === "password") {
      if (!passwordTouched && value.length > 0) {
        setPasswordTouched(true);
      }
      const errors = validatePassword(value);
      setPasswordErrors(errors);
    }
  };

  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      setFormData((prevData) => ({ ...prevData, referralCode: refCode }));
      setShowReferralInput(true); 
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(formData.username)) {
      toast.error("Username can only contain letters, numbers, and underscores", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.username.length < 3 || formData.username.length > 30) {
      toast.error("Username must be between 3 and 30 characters", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Comprehensive password validation
    const passwordValidationErrors = validatePassword(formData.password);
    if (passwordValidationErrors.length > 0) {
      setPasswordTouched(true);
      setPasswordErrors(passwordValidationErrors);
      toast.error("Password does not meet security requirements", {
        position: "top-right",
        autoClose: 4000,
      });
      return;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
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
            <p>You've earned 25 bonus points for signing up!</p>
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
        setFormData({ name: "", username: "", email: "", password: "", confirmPassword: "", referralCode: "" });
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
        <div className="w-full md:w-1/2 bg-white p-4 sm:p-6 md:p-7 lg:p-8 overflow-y-auto max-h-screen md:max-h-[90vh] signup-scrollbar">
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Only letters, numbers, and underscores (3-30 characters)
              </p>
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
                  placeholder="Create a strong password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => setPasswordTouched(true)}
                  className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm outline-none focus:ring-2 transition-all ${
                    passwordTouched && passwordErrors.length > 0
                      ? "border-red-500 focus:ring-red-500"
                      : passwordTouched && passwordErrors.length === 0 && formData.password
                      ? "border-green-500 focus:ring-green-500"
                      : "border-gray-300 focus:ring-red-900"
                  }`}
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
              
              {/* Password Requirements - Compact Version */}
              {(!passwordTouched || !formData.password) && (
                <p className="mt-1 text-xs text-gray-500">
                  Must include: 8+ chars, uppercase, lowercase, number, special char
                </p>
              )}
              
              {/* Password Validation Feedback */}
              {passwordTouched && formData.password && (
                <div className="mt-2">
                  {passwordErrors.length === 0 ? (
                    <div className="flex items-center gap-2 text-green-600 text-xs">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Strong password! ✓</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-red-600 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Missing requirements:
                      </p>
                      <ul className="space-y-0.5 ml-5">
                        {passwordErrors.map((error, index) => (
                          <li key={index} className="text-xs text-red-600 list-disc">
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Field - Shows when password is valid */}
            {passwordTouched && formData.password && passwordErrors.length === 0 && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm outline-none focus:ring-2 transition-all ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? "border-red-500 focus:ring-red-500"
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? "border-green-500 focus:ring-green-500"
                        : "border-gray-300 focus:ring-red-900"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-1">
                    {formData.password === formData.confirmPassword ? (
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Passwords match ✓
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

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
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
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
              disabled={loading || !termsAccepted}
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
