import { Loader2, Sparkle } from '../../utils/icons';
import React, { useState } from "react";
import { useSelector } from "react-redux";
import API from "../../configs/api";
import { toast } from "react-toastify";

export default function ProfessionalSummary({ data, onChange, setResumeData }) {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Enhance my professional summary for my resume: ${data}`;
      const response = await API.post(
        "/api/ai/enhance-pro-summary",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhancedSummary,
      }));
      toast.success("Professional summary enhanced successfully!");
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating professional summary:", error);
      toast.error(error?.response?.data?.message || "Failed to generate professional summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg gap-2 text-gray-900 font-semibold">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">Add summary of your resume</p>
        </div>
        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size=4 animate-spin" />
          ) : (
            <Sparkle size={14} />
          )}
          {isGenerating ? "Generating..." : "AI Enhance"}
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
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focus on your key
          achievements and skills
        </p>
      </div>
    </div>
  );
}
