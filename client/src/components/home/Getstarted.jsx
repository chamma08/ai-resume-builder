import { Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function GetStarted() {
  return (
    <div className="mt-32 mb-32 max-w-5xl mx-2 md:mx-auto p-px rounded-2xl bg-linear-to-r from-red-600/20 to-pink-500/30">
      <div className="flex flex-col items-center justify-center text-center py-12 md:py-16 rounded-[15px] bg-linear-to-r from-[#F3EAFF] to-[#E1EFFF]">
        <div className="flex items-center justify-center bg-white px-3 py-1.5 shadow gap-1 rounded-full text-xs">
          <Award color="red" className="h-4 w-4" />
          <span className="bg-linear-to-r from-[#871701] to-[#6b0030] bg-clip-text text-transparent font-medium">
            Trusted by Job Seekers - Enhanced by AI
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-medium mt-6">
          Unlock Your Potential with <br />
          <span className="bg-linear-to-r from-[#470000] to-[#a90202] bg-clip-text text-transparent">
            Expert Guidance
          </span>{" "}
          & Proven Results!
        </h2>
        <Link
          to="/app"
          className="mt-6 bg-linear-to-r from-[#FF512F] to-[#DD2476] text-white text-sm px-5 py-2.5 rounded-xl font-medium hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Get Started Today
        </Link>
      </div>
    </div>
  );
}
