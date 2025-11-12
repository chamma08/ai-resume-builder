import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, FileText, Zap, Award, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeTutorialModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the tutorial before
    const hasSeenTutorial = localStorage.getItem("hasSeenWelcomeTutorial");
    
    // Show modal after 2 seconds if user hasn't seen it
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcomeTutorial", "true");
  };

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenWelcomeTutorial", "true");
    // Link component will handle navigation
  };

  const benefits = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI-Powered Resume Builder",
      description: "Create professional resumes with intelligent AI suggestions and templates"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Premium Templates",
      description: "Access to beautifully designed resume templates tailored for success"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Preview & Download",
      description: "Real-time preview and instant PDF downloads of your resumes"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Points & Rewards System",
      description: "Earn points for activities and unlock exclusive premium templates"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Your Progress",
      description: "Monitor your resume-building journey with detailed activity history"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Referral Program",
      description: "Invite friends and earn bonus points for every successful referral"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <style>
            {`
              .welcome-modal-scroll::-webkit-scrollbar {
                width: 8px;
              }
              
              .welcome-modal-scroll::-webkit-scrollbar-track {
                background: #f3f4f6;
                border-radius: 10px;
                margin: 10px;
              }
              
              .welcome-modal-scroll::-webkit-scrollbar-thumb {
                background: #000000;
                border-radius: 10px;
                transition: all 0.3s ease;
              }
              
              .welcome-modal-scroll::-webkit-scrollbar-thumb:hover {
                background: #333333;
              }
            `}
          </style>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4"
            onClick={handleClose}
          >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="welcome-modal-scroll bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#000000 #f3f4f6'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
              aria-label="Close tutorial"
            >
              <X className="w-5 h-5 text-black" />
            </button>

            {/* Header */}
            <div className="bg-red-900 text-white p-8 rounded-t-2xl">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                {/* <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1]
                    }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    <Sparkles className="w-16 h-16" />
                  </motion.div>
                </div> */}
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                  Welcome to AI Resume Builder!
                </h2>
                <p className="text-lg md:text-xl text-white/90">
                  Create Your Account & Unlock Amazing Features
                </p>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 text-center">
                  🎉 What You Get with Your Free Account
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  Sign up now and start building professional resumes in minutes!
                </p>
              </motion.div>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full bg-red-800 flex items-center justify-center text-white">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Offer Box */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-6"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <h4 className="text-lg font-bold text-gray-800">
                    🎁 Sign Up Bonus
                  </h4>
                </div>
                <p className="text-center text-gray-700">
                  Get <span className="font-bold text-orange-800"> bonus points</span> when you create your account today! Use them to unlock premium templates and features.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/sign-up"
                  onClick={handleGetStarted}
                  className="flex-1 bg-red-900 text-white py-4 px-6 rounded-xl font-semibold text-center hover:bg-red-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                    Create Free Account
                </Link>
                <button
                  onClick={handleClose}
                  className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Maybe Later
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  onClick={handleGetStarted}
                  className="text-red-900 hover:text-red-700 font-semibold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
