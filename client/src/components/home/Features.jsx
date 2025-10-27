import { useState } from "react";

const Title = ({ title, description }) => (
  <div className="text-center mb-8 md:mb-12 px-4">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 md:mb-4">
      {title}
    </h2>
    <p className="text-sm md:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto">
      {description}
    </p>
  </div>
);

const Features = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div id="features" className="flex flex-col items-center py-12 md:py-16 lg:py-20 px-4">
      <div className="flex items-center gap-2 text-xs md:text-sm text-red-800 bg-red-400/10 border border-red-200 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-6 md:mb-8">
        <span>🚀</span>
        <span>Simple Process</span>
      </div>
      
      <Title 
        title="Build Your Dream Resume" 
        description="Build your professional resume faster powered by smart AI tools and seamless design" 
      />
      
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 xl:gap-0 w-full max-w-7xl">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <img
            className="w-full max-w-md lg:max-w-xl xl:max-w-2xl xl:-mr-16"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/group-image-1.png"
            alt="Features illustration"
          />
        </div>
        
        {/* Features Cards Section */}
        <div
          className="w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 px-4 sm:px-8 lg:px-0"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {/* Feature 1 */}
          <div className="group cursor-pointer">
            <div
              className={`p-4 md:p-6 group-hover:bg-violet-100 border border-transparent group-hover:border-violet-300 flex gap-3 md:gap-4 rounded-xl transition-colors ${
                !isHover ? "border-violet-300 bg-violet-100" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6 stroke-violet-600 shrink-0 mt-0.5"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
              </svg>
              <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-slate-700">
                  Real-Time Insights
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  Get instant insights into your profile with live AI feedback
                  and performance dashboards
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group cursor-pointer">
            <div className="p-4 md:p-6 group-hover:bg-green-100 border border-transparent group-hover:border-green-300 flex gap-3 md:gap-4 rounded-xl transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 md:w-6 md:h-6 stroke-green-600 shrink-0 mt-0.5"
              >
                <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
              </svg>
              <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-slate-700">
                  Secure & Private
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  We prioritize your privacy with enterprise-grade encryption,
                  secure authentication, and strict compliance with data
                  protection regulations
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group cursor-pointer">
            <div className="p-4 md:p-6 group-hover:bg-orange-100 border border-transparent group-hover:border-orange-300 flex gap-3 md:gap-4 rounded-xl transition-colors">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 stroke-orange-600 shrink-0 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
              </svg>
              <div className="space-y-1 md:space-y-2 flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-semibold text-slate-700">
                  Smart, Customizable Reports
                </h3>
                <p className="text-xs md:text-sm text-slate-600">
                  Download beautifully formatted, job-ready resumes designed and
                  refined by AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Features;