import { Home, Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../assets/job_logo.webp';
import API from "../configs/api";
import r2 from '../assets/r2.jpg';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [formData, setFormData] = useState({
    email: emailFromState,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!emailFromState) {
      toast.error("Please start from forgot password page", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/forgot-password");
    }
  }, [emailFromState, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleVerifyOTP = async () => {
    if (!formData.otp) {
      toast.error("Please enter the OTP", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.otp.length !== 6) {
      toast.error("OTP must be 6 digits", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setVerifying(true);
    try {
      const { data } = await API.post("/api/users/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      
      if (data.success) {
        setOtpVerified(true);
        toast.success("OTP verified successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      const errorMessage =
        error.response?.data?.message || "Invalid or expired OTP";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!otpVerified) {
      toast.error("Please verify OTP first", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post("/api/users/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      });

      if (data.success) {
        toast.success("Password reset successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 1500);
      }
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to reset password. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const { data } = await API.post("/api/users/forgot-password", { email: formData.email });
      if (data.success) {
        toast.success("New OTP sent to your email!", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({ ...formData, otp: "" });
        setOtpVerified(false);
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Failed to resend OTP", {
        position: "top-right",
        autoClose: 3000,
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
            backgroundImage: `url(${r2})`,
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="flex h-full flex-col justify-center items-center relative z-10 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 text-white drop-shadow-lg">
              Create New Password
            </h2>
            <p className="text-base lg:text-lg text-white drop-shadow-md max-w-md">
              Your new password must be different from previously used passwords
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Mobile Header */}
          <div className="md:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-black mb-2">Reset Password</h1>
            <p className="text-sm text-gray-600">Enter OTP and new password</p>
          </div>

          <img src={logo} loading="lazy" alt="Reset Password" className="w-20 justify-center mx-auto mb-6" /> 

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Display */}
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Reset password for:</p>
              <p className="text-sm font-medium text-gray-700">{formData.email}</p>
            </div>

            {/* OTP Input */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1.5">
                Enter OTP
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    id="otp"
                    value={formData.otp}
                    onChange={handleChange}
                    maxLength={6}
                    disabled={otpVerified}
                    className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all disabled:bg-gray-100"
                    required
                  />
                  {otpVerified ? (
                    <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  ) : (
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  )}
                </div>
                {!otpVerified && (
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={verifying}
                    className="px-4 py-2.5 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-all disabled:opacity-50 text-sm sm:text-base whitespace-nowrap"
                  >
                    {verifying ? "Verifying..." : "Verify"}
                  </button>
                )}
              </div>
              {otpVerified && (
                <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  OTP verified successfully
                </p>
              )}
              {!otpVerified && (
                <p className="mt-2 text-xs text-gray-500">
                  Check your email for the OTP code.{" "}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-red-900 hover:underline font-medium"
                  >
                    Resend OTP
                  </button>
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  disabled={!otpVerified}
                  className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all disabled:bg-gray-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={!otpVerified}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={!otpVerified}
                  className="w-full rounded-lg border border-gray-300 px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-900 focus:border-transparent transition-all disabled:bg-gray-100"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={!otpVerified}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !otpVerified}
              className="w-full rounded-lg bg-red-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white transition-all hover:bg-red-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
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
        </div>
      </div>
    </div>
  );
}
