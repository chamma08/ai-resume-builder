
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import Title from "./Title";
import API from "../../configs/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Allow empty phone (optional field) or valid phone format
    if (!phone) return true;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Validate all fields
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      setErrors(newErrors);
      setStatus({
        type: "error",
        message: "Please fix the errors in the form",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/api/contact/send", formData);
      
      if (response.data.success) {
        setStatus({
          type: "success",
          message: response.data.message,
        });
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-40" id="contact">
      <div className="flex items-center gap-2 text-sm text-red-800 bg-red-400/10 border border-red-200 rounded-full px-4">
        <span>🚀</span>
        <span>Contact</span>
      </div>
      <Title
        title="Feel free to reach out!"
        description="We're here to help and answer any questions you might have. We look forward to hearing from you"
      />
        <div className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 mt-8">
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                status.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {status.message}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className={`w-full border-2 p-3 rounded-lg transition-all duration-200 outline-none ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className={`w-full border-2 p-3 rounded-lg transition-all duration-200 outline-none ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Phone Number <span className="text-gray-500 text-xs">(Optional)</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full border-2 p-3 rounded-lg transition-all duration-200 outline-none ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Your Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                required
                className={`w-full border-2 p-3 rounded-lg transition-all duration-200 outline-none resize-none ${
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-gray-200 focus:border-red-900 focus:ring-2 focus:ring-red-200"
                }`}
                rows="5"
              />
              {errors.message && (
                <p className="text-xs text-red-600 mt-1">{errors.message}</p>
              )}
            </div>
            <button 
              type="submit"
              disabled={loading}
              className={`bg-red-800 hover:bg-red-900 text-white font-semibold p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 mt-2 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
              <SendHorizontal className="inline-block ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
    </div>
  );
}
