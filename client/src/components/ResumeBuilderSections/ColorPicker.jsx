import { Check, Palette, Sparkles } from "lucide-react";
import React, { useState } from "react";

export default function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: "Blue", value: "#3B82F6", emoji: "💙" },
    { name: "Indigo", value: "#6366F1", emoji: "💜" },
    { name: "Purple", value: "#8B5CF6", emoji: "🟣" },
    { name: "Green", value: "#10B981", emoji: "💚" },
    { name: "Red", value: "#EF4444", emoji: "❤️" },
    { name: "Orange", value: "#F97316", emoji: "🧡" },
    { name: "Teal", value: "#14B8A6", emoji: "🩵" },
    { name: "Pink", value: "#EC4899", emoji: "💗" },
    { name: "Gray", value: "#687280", emoji: "🩶" },
    { name: "Black", value: "#1F2937", emoji: "🖤" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
      >
        <Palette size={16} strokeWidth={2.5} />
        <span className="max-sm:hidden">Color</span>
      </button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 w-72 max-w-[calc(100vw-2rem)] mt-2 z-20 bg-white rounded-xl border-2 border-gray-200 shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b-2 border-gray-100 px-4 py-3">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                Choose Accent Color
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Pick a color for your resume theme
              </p>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-5 gap-3 p-4">
              {colors.map((color) => (
                <div
                  key={color.name}
                  onClick={() => {
                    onChange(color.value);
                    setIsOpen(false);
                  }}
                  className="relative flex flex-col items-center cursor-pointer group"
                  title={color.name}
                >
                  <div
                    className={`w-12 h-12 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === color.value
                        ? "border-blue-500 scale-110 shadow-lg"
                        : "border-gray-300 hover:border-gray-400 hover:scale-105"
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                  {selectedColor === color.value && (
                    <div className="absolute -top-1 -right-1">
                      <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 mt-2 text-center font-medium">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t-2 border-gray-100 px-4 py-2">
              <p className="text-xs text-gray-500 text-center">
                🎨 Color applies to headings and accents
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
