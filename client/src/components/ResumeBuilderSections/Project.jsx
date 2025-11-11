import { Briefcase, Plus, Sparkles, Trash2 } from '../../utils/icons';
import React from "react";

export default function Project({ data, onChange }) {
  const addProject = () => {
    const newProject = {
      title: "",
      type: "",
      description: "",
      technologies: "",
      start_date: "",
      end_date: "",
      link: "",
    };
    onChange([...data, newProject]);
  };
  const removeProject = (index) => {
    const updatedProjects = data.filter((_, i) => i !== index);
    onChange(updatedProjects);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg gap-2 text-gray-900 font-semibold">
            Projects & Portfolio
          </h3>
          <p className="text-sm text-gray-500">
            Add details of your projects and portfolio
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus size={14} />
          Add Project
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
          {data.map((project, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4>Project #{index + 1}</h4>
                <button
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={project.name || ""}
                  onChange={(e) =>
                    updateProject(index, "name", e.target.value)
                  }
                  type="text"
                  placeholder="Project Title"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  value={project.type || ""}
                  onChange={(e) => updateProject(index, "type", e.target.value)}
                  type="text"
                  placeholder="Project Type (e.g., Web App, Mobile App)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                {/* <input
                  value={project.start_date || ""}
                  onChange={(e) =>
                    updateProject(index, "start_date", e.target.value)
                  }
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
                <input
                  value={project.end_date || ""}
                  onChange={(e) =>
                    updateProject(index, "end_date", e.target.value)
                  }
                  type="month"
                  disabled={project.is_current}
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300 disabled:bg-gray-100"
                /> */}
                <input
                  value={project.technologies || ""}
                  onChange={(e) =>
                    updateProject(index, "technologies", e.target.value)
                  }
                  type="text"
                  placeholder="Technologies Used (e.g., React, Node.js)"
                  className="px-3 py-2 text-sm rounded-lg border border-gray-300"
                />
              </div>

              <div className="space-y-2 mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">
                    Project Description
                  </label>
                </div>
                <textarea
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(index, "description", e.target.value)
                  }
                  rows={4}
                  className="w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
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
