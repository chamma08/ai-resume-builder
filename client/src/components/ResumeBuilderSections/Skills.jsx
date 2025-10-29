import { Plus, StarIcon, Stars } from "lucide-react";
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
    <div className="space-y-4">
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
          Skills
        </h3>
        <p className="text-sm text-gray-500">List your relevant skills</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Enter a skill"
          className="flex-1 px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="flex items-center justify-center text-sm sm:text-base gap-2 px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> <span className="hidden xs:inline sm:inline">Add Skill</span><span className="inline xs:hidden sm:hidden">Add</span>
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Stars className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No skills added yet</p>
          <p className="text-sm">Click "Add Skills" to get started</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                &times;
              </button>
            </div>
          ))}{" "}
          <button
            onClick={() => removeAllSkills()}
            className="text-white hover:text-red-200 transition-colors bg-red-700 px-3 py-1 rounded-full text-sm"
          >
            Clear All
          </button>

          <div className="w-full mt-4 text-sm text-black bg-gray-200 p-3 rounded-lg">
            <p className="font-light">
                Tip: Press "Enter" to quickly add a skill after typing it in the input field.
                Add 8-12 relevant skills that highlight your strengths for the job you're applying for
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
