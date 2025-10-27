// LoadingScreen.jsx
import logo from "../assets/job_logo.png";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Rotating Logo - Horizontal Flip */}
        <div className="mb-6">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-24 h-24 mx-auto animate-spin"
            style={{ 
              animationDuration: '2s',
              transformStyle: 'preserve-3d',
              animation: 'flipHorizontal 2s infinite linear'
            }}
          />
        </div>
        
        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
        <p className="text-gray-600">Please wait while we set things up</p>
        
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-red-900 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-red-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-red-900 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      
      {/* Add custom CSS for horizontal flip animation */}
      <style>{`
        @keyframes flipHorizontal {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}