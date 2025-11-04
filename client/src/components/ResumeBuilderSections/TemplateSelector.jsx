import { Check, Layout } from "lucide-react";
import React, { useState } from "react";

export default function TemplateSelector({ selectedTemplate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean, traditional resume layout with clear sections and professional typography",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek design with contemporary fonts and a focus on readability",
    },
    {
      id: "minimal-image",
      name: "Minimalist Image",
      preview:
        "Minimal design featuring a profile image and simple, elegant formatting",
    },
    {
      id: "minimal",
      name: "Minimalist",
      preview:
        "A very clean and simple layout with plenty of white space and minimal design elements",
    },        
    {
      id: "elegant",
      name: "Elegant",
      preview:
        "Sophisticated design with refined typography and subtle color accents",
    },
    {
      id: "ats",
      name: "Professional Pro",
      preview:
        "Stand out to recruiters with this clean, scanner-friendly format that beats automated systems while maintaining visual appeal",
    },
    {
      id: "ats-image",
      name: "Executive Profile",
      preview:
        "Make a lasting impression with your photo while ensuring perfect compatibility with hiring software and tracking systems",
    }
    
  ];
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg"
      >
        <Layout size={14} /> <span className="max-sm:hidden">Template</span>
      </button>
      {isOpen && (
        <div className="absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md border border-gray-200 shadow-sm">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative p-3 border transition-all rounded-md cursor-pointer hover:bg-gray-100 ${
                selectedTemplate === template.id
                  ? "border-blue-400 bg-blue-100"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
              }`}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
            >
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2">
                  <div className="size-5 bg-blue-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">{template.name}</h4>
                <div className="mt-2 p-2  bg-blue-50 rounded text-xs text-gray-500 italic">
                  {template.preview}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
