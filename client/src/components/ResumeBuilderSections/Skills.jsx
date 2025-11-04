import { Plus, Sparkles, X, Trash2, Lightbulb } from "lucide-react";
import React, { useState } from "react";

export default function Skills({ data, onChange }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    onChange(data.filter((_, index) => index !== skillToRemove));
  };

  const removeAllSkills = () => {
    onChange([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="border-l-4 border-blue-600 pl-4">
        <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Skills
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Showcase your technical and soft skills
        </p>
      </div>

      {/* Input Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm hover:border-blue-300 transition-colors">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="e.g., JavaScript, Project Management, Communication..."
              className="w-full px-4 py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              onChange={(e) => setNewSkill(e.target.value)}
              value={newSkill}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 active:scale-95 transition-all duration-200 font-medium shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden xs:inline sm:inline">Add Skill</span>
            <span className="inline xs:hidden sm:hidden">Add</span>
          </button>
        </div>
      </div>

      {/* Skills Display */}
      {data.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No skills added yet
          </h4>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Start adding your skills to make your resume stand out. Include both technical and soft skills relevant to your target role.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Skills Counter & Clear Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white rounded-full font-semibold text-xs">
                {data.length}
              </span>
              <span className="font-medium">
                {data.length === 1 ? "Skill Added" : "Skills Added"}
              </span>
            </div>
            {data.length > 0 && (
              <button
                onClick={removeAllSkills}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            )}
          </div>

          {/* Skills Grid */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {data.map((skill, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-2 bg-blue-50 border-2 border-blue-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200"
                >
                  <span className="text-blue-600 font-bold">#</span>
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(index)}
                    className="ml-1 p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-lg p-4">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-amber-900">
                  Pro Tips:
                </p>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Press <kbd className="px-2 py-0.5 bg-white border border-amber-300 rounded text-xs font-mono">Enter</kbd> to quickly add skills</li>
                  <li>• Include 8-12 relevant skills that match the job description</li>
                  <li>• Mix technical skills with soft skills for a well-rounded profile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
