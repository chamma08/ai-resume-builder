import React, { useState } from 'react';
import { FaStar, FaTimes, FaHeart } from 'react-icons/fa';
import { SendHorizontal } from 'lucide-react';
import { toast } from 'react-toastify';
import API from '../../configs/api';

const RatingFeedbackModal = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    feedback: '',
  });

  if (!isOpen) return null;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRatingClick = (value) => {
    setRating(value);
    if (errors.rating) {
      setErrors({ ...errors, rating: '' });
    }
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
        [name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    const newErrors = {
      name: '',
      email: '',
      feedback: '',
      rating: '',
    };

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = 'Please share your thoughts';
    } else if (formData.feedback.trim().length < 10) {
      newErrors.feedback = 'Feedback must be at least 10 characters';
    }

    // Check if there are any errors
    if (Object.values(newErrors).some((error) => error !== '')) {
      // Show first error as toast
      const firstError = Object.values(newErrors).find((error) => error !== '');
      toast.error(firstError);
      setLoading(false);
      return;
    }

    try {
      // Send to contact API (same as contact form)
      await API.post('/api/contact/send', {
        fullName: formData.name,
        email: formData.email,
        phone: '',
        message: `⭐ Rating: ${rating}/5 stars\n\nFeedback:\n${formData.feedback}`,
      });

      setSubmitted(true);
      toast.success('Thank you for your feedback! 🎉');

      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        // Reset form
        setTimeout(() => {
          setRating(0);
          setFormData({ name: '', email: '', feedback: '' });
          setSubmitted(false);
          setErrors({});
        }, 300);
      }, 3000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const handleClose = () => {
    if (submitted) {
        onClose();
        setTimeout(() => {
            setRating(0);
            setFormData({ name: '', email: '', feedback: '' });
            setSubmitted(false);
            setErrors({});
        }, 300);
    } else if (rating > 0 || formData.feedback) {
        toast.warning('Are you sure? Your feedback will be lost if you close now.', {
            autoClose: 3000,
        });
        // Still allow closing after warning
        setTimeout(() => {
            onClose();
        }, 500);
    } else {
        onClose();
    }
};

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close"
        >
          <FaTimes size={24} />
        </button>

        {!submitted ? (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                How was your experience?
              </h2>
              <p className="text-gray-600">
                We'd love to hear your thoughts about AI Resume Builder!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Rating Section */}
              <div>
                <p className="text-center text-gray-700 font-medium mb-3">
                  Rate your experience
                </p>
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleRatingClick(value)}
                      onMouseEnter={() => setHoveredRating(value)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <FaStar
                        size={48}
                        className={`transition-colors ${
                          value <= (hoveredRating || rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-center mt-2 text-sm text-gray-600 animate-fadeIn">
                    {rating === 5 && '🎉 Amazing! Thank you!'}
                    {rating === 4 && '😊 Great! We appreciate it!'}
                    {rating === 3 && '👍 Good! Thanks for sharing!'}
                    {rating === 2 && '🤔 We can do better!'}
                    {rating === 1 && "😔 We're sorry to hear that"}
                  </p>
                )}
              </div>

              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Feedback Textarea */}
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Tell us what you liked or how we can improve..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your feedback helps us improve for everyone!
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Feedback
                    <SendHorizontal size={18} />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 mt-2">
                Your feedback will be sent to our team via email
              </p>
            </form>
          </div>
        ) : (
          /* Thank You Screen */
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-green-400 to-green-600 rounded-full mb-6 animate-bounce">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Thank You! 🎉
            </h2>
            <p className="text-gray-600 mb-4">
              Your feedback means the world to us and helps us create a better
              experience for everyone!
            </p>
            <p className="text-sm text-gray-500">
              We really appreciate you taking the time to share your thoughts.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingFeedbackModal;
