import { Sparkle } from "lucide-react";
import React from "react";

export default function ProfessionalSummary({ data, onChange, setResumeData }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg gap-2 text-gray-900 font-semibold">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary of your resume
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
          <Sparkle size={14} />
          AI Enhance
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          rows={7}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a brief summary about your professional background, skills, and career goals."
          className="w-full min-h-[120px] border border-gray-300 rounded-md p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">Tip: Keep it concise (3-4 sentences) and focus on your key achievements and skills</p>
      </div>
    </div>
  );
}
