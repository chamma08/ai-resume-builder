import { Briefcase, Loader2, Plus, Sparkles, Trash2 } from '../../utils/icons';
import { useState } from "react";
import { useSelector } from "react-redux";
import API from "../../configs/api";
import { toast } from "react-toastify";

export default function Experience({ data, onChange }) {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updatedExperience = data.filter((_, i) => i !== index);
    onChange(updatedExperience);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateJobDescription = async (index) => {
    setIsGenerating(index);
    const experience = data[index];
    const prompt = `Generate a detailed job description for the following role:\nCompany: ${experience.company}\nPosition: ${experience.position}\nStart Date: ${experience.start_date}\nEnd Date: ${experience.end_date}\nResponsibilities and Achievements: ${experience.description}\n\nProvide a well-structured job description suitable for a resume.`;
    try {
      const response = await API.post(
        "/api/ai/enhance-job-des",
        { userContent: prompt },
        { headers: { Authorization: token } }
      );
      const enhancedDescription = response.data.enhancedJobDescription;
      if (enhancedDescription) {
        updateExperience(index, "description", enhancedDescription);
        toast.success("Job description enhanced successfully!");
      } else {
        toast.error("No enhanced description received.");
      }
    } catch (error) {
      console.error("Error enhancing job description:", error);
      toast.error("Failed to enhance job description.");
    } finally {
      setIsGenerating(-1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg gap-2 text-gray-900 font-semibold">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add details of your work experience
          </p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus size={14} />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No experience added yet</p>
          <p className="text-sm">Click "Add Experience" to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Experience #{index + 1}</h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={experience.company || ""}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  value={experience.position || ""}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  type="text"
                  placeholder="Job Title/Position"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  value={experience.start_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  value={experience.end_date || ""}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={experience.is_current}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={experience.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      index,
                      "is_current",
                      e.target.checked ? true : false
                    )
                  }
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  {" "}
                  Currently Working Here
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button
                    onClick={() => generateJobDescription(index)}
                    disabled={
                      isGenerating === index ||
                      !experience.description ||
                      !experience.position
                    }
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
                  >
                    {isGenerating === index ? (
                      <Loader2 className="size=4 animate-spin" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  value={experience.description || ""}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Describe your key responsibilities and achievements.."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
