import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Sparkles, Trophy, FileText, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingModal({ isOpen, onClose, userName }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to AI Resume Builder! 🎉",
      description: "Let's take a quick tour to help you get started",
      content: (
        <div className="text-center space-y-4">
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-32 h-32 mx-auto bg-blue-600 rounded-full flex items-center justify-center shadow-2xl"
            >
              <Sparkles className="w-16 h-16 text-white" />
            </motion.div>
          </div>
          <p className="text-gray-600 text-lg">
            Hi <span className="font-bold text-blue-600">{userName}</span>! 👋
          </p>
          <p className="text-gray-600">
            You're about to create professional resumes with AI-powered assistance and earn points along the way!
          </p>
        </div>
      ),
      icon: Sparkles,
      color: "bg-blue-600"
    },
    {
      title: "Earn Points & Level Up 💰",
      description: "Complete activities to earn points and unlock premium features",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
            <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              How to Earn Points:
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                <div>
                  <span className="font-semibold">Sign up:</span>
                  <span className="text-green-700 ml-2">+25 points (Done!)</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">★</span>
                <div>
                  <span className="font-semibold">Complete your profile:</span>
                  <span className="text-blue-700 ml-2">+50 points</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">📄</span>
                <div>
                  <span className="font-semibold">Create a resume:</span>
                  <span className="text-purple-700 ml-2">+25 points</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold">❤️</span>
                <div>
                  <span className="font-semibold">Follow us on social media:</span>
                  <span className="text-pink-700 ml-2">+10 points each</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">🎁</span>
                <div>
                  <span className="font-semibold">Refer a friend:</span>
                  <span className="text-yellow-700 ml-2">+200 points</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
            <h4 className="font-bold text-red-800 mb-3">💸 Spending Points:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Download resume: <span className="font-semibold text-red-600">50 points</span></li>
              <li>• Unlock Premium template: <span className="font-semibold text-red-600">100 points</span></li>
              <li>• Unlock Elite template: <span className="font-semibold text-red-600">200 points</span></li>
            </ul>
          </div>
        </div>
      ),
      icon: Trophy,
      color: "bg-green-600"
    },
    {
      title: "Build Your Resume",
      description: "Follow our step-by-step process to create a professional resume",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
            <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Quick Start Guide:
            </h4>
            <ol className="space-y-3">
              <li className="flex gap-3">
                <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <p className="font-semibold text-gray-800">Complete Your Profile</p>
                  <p className="text-sm text-gray-600">Fill in your personal information to earn <span className="font-bold text-blue-600">50 bonus points</span></p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <p className="font-semibold text-gray-800">Create Your First Resume</p>
                  <p className="text-sm text-gray-600">Use our resume builder with AI-powered suggestions</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <p className="font-semibold text-gray-800">Choose a Template</p>
                  <p className="text-sm text-gray-600">Select from 8 professional templates (Free & Premium)</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <p className="font-semibold text-gray-800">Download & Share</p>
                  <p className="text-sm text-gray-600">Export as PDF and start applying for jobs!</p>
                </div>
              </li>
            </ol>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-800">
              💡 <span className="font-semibold">Pro Tip:</span> Complete your profile first to maximize your points and unlock more features!
            </p>
          </div>
        </div>
      ),
      icon: FileText,
      color: "bg-blue-600"
    },
    {
      title: "Ready to Get Started!",
      description: "You're all set to create your perfect resume",
      content: (
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="w-32 h-32 mx-auto bg-green-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Gift className="w-16 h-16 text-white" />
          </motion.div>
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h4 className="text-2xl font-bold text-green-800 mb-2">
              🎉 Welcome Bonus!
            </h4>
            <p className="text-green-700 text-lg mb-4">
              You already have <span className="font-bold text-2xl text-green-600">25 points</span>
            </p>
            <div className="bg-white rounded-lg p-4 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Next steps to boost your points:</span>
              </p>
              <ul className="text-sm text-left space-y-1 text-gray-700">
                <li>✅ Complete profile → Earn <span className="font-bold text-green-600">50 more points</span></li>
                <li>✅ Create first resume → Earn <span className="font-bold text-green-600">25 more points</span></li>
                <li>✅ Total: <span className="font-bold text-green-600">100 points</span> = 2 Free Downloads!</li>
              </ul>
            </div>
          </div>
          <p className="text-gray-600">
            Click <span className="font-bold">"Get Started"</span> to begin your journey!
          </p>
        </div>
      ),
      icon: Gift,
      color: "bg-green-600"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 transition-all shadow-lg hover:shadow-xl"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Progress indicators */}
            <div className="flex gap-2 px-8 pt-6 pb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? steps[index].color
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="px-8 pb-8 overflow-y-auto max-h-[calc(90vh-180px)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Header */}
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className={`inline-flex p-4 rounded-2xl ${currentStepData.color} mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {currentStepData.title}
                    </h2>
                    <p className="text-gray-600">
                      {currentStepData.description}
                    </p>
                  </div>

                  {/* Step content */}
                  <div className="mt-6">
                    {currentStepData.content}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer with navigation */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between gap-4">
                {/* Back button */}
                {currentStep > 0 ? (
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                  >
                    Skip Tutorial
                  </button>
                )}

                {/* Step indicator */}
                <div className="text-sm font-medium text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </div>

                {/* Next/Finish button */}
                <button
                  onClick={handleNext}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all shadow-lg hover:shadow-xl ${currentStepData.color} hover:scale-105`}
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Get Started
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
