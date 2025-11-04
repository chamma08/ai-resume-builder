import { Check, Layout, Sparkles } from "lucide-react";
import React, { useState } from "react";

export default function TemplateSelector({ selectedTemplate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      icon: "📄",
      preview: "Clean, traditional layout with professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      icon: "✨",
      preview: "Sleek design with contemporary fonts and great readability",
    },
    {
      id: "minimal-image",
      name: "Minimalist Image",
      icon: "🖼️",
      preview: "Minimal design with profile image and elegant formatting",
    },
    {
      id: "minimal",
      name: "Minimalist",
      icon: "⚪",
      preview: "Very clean layout with plenty of white space",
    },
    {
      id: "elegant",
      name: "Elegant",
      icon: "💎",
      preview: "Sophisticated design with refined typography",
    },
    {
      id: "ats",
      name: "Professional Pro",
      icon: "🎯",
      preview: "Scanner-friendly format that beats automated systems",
    },
    {
      id: "ats-image",
      name: "Executive Profile",
      icon: "👔",
      preview: "Professional photo layout compatible with hiring software",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
      >
        <Layout size={16} strokeWidth={2.5} />
        <span className="max-sm:hidden">Template</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 w-96 max-w-[calc(100vw-2rem)] mt-2 z-20 bg-white rounded-xl border-2 border-gray-200 shadow-2xl max-h-[70vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-white border-b-2 border-gray-100 px-4 py-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                Select Template
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Choose a design that fits your style
              </p>
            </div>

            {/* Templates Grid - Scrollable */}
            <div className="overflow-y-auto p-3 space-y-2">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`relative p-3 border-2 transition-all duration-200 rounded-lg cursor-pointer group ${
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm"
                  }`}
                  onClick={() => {
                    onChange(template.id);
                    setIsOpen(false);
                  }}
                >
                  {/* Selected Badge */}
                  {selectedTemplate === template.id && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="size-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`shrink-0 text-2xl ${
                        selectedTemplate === template.id
                          ? "scale-110"
                          : "group-hover:scale-110"
                      } transition-transform duration-200`}
                    >
                      {template.icon}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold text-sm mb-1 ${
                          selectedTemplate === template.id
                            ? "text-blue-700"
                            : "text-gray-800 group-hover:text-blue-600"
                        }`}
                      >
                        {template.name}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {template.preview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t-2 border-gray-100 px-4 py-2">
              <p className="text-xs text-gray-500 text-center">
                💡 You can change template anytime
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
