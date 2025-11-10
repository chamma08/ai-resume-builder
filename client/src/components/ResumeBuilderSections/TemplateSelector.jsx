import { Check, Layout, Lock, Crown, Eye } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPoints } from "../../redux/features/pointsSlice";
import UnlockTemplateModal from "../modals/UnlockTemplateModal";
import TemplatePreviewModal from "../modals/TemplatePreviewModal";
import API from "../../configs/api";

export default function TemplateSelector({ selectedTemplate, onChange, resumeData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [unlockModalOpen, setUnlockModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedToUnlock, setSelectedToUnlock] = useState(null);
  const [selectedToPreview, setSelectedToPreview] = useState(null);
  const [unlockedTemplates, setUnlockedTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      icon: "📄",
      preview: "Clean, traditional layout with professional typography",
      tier: "FREE",
      unlockCost: 0,
    },
    {
      id: "minimal",
      name: "Minimalist",
      icon: "⚪",
      preview: "Very clean layout with plenty of white space",
      tier: "FREE",
      unlockCost: 0,
    },
    {
      id: "modern",
      name: "Modern",
      icon: "✨",
      preview: "Sleek design with contemporary fonts and great readability",
      tier: "PREMIUM",
      unlockCost: 100,
    },
    {
      id: "elegant",
      name: "Elegant",
      icon: "💎",
      preview: "Sophisticated design with refined typography",
      tier: "PREMIUM",
      unlockCost: 100,
    },
    {
      id: "minimal-image",
      name: "Minimalist Image",
      icon: "�️",
      preview: "Minimal design with profile image and elegant formatting",
      tier: "PREMIUM",
      unlockCost: 100,
    },
    {
      id: "ats",
      name: "Professional Pro",
      icon: "🎯",
      preview: "Scanner-friendly format that beats automated systems",
      tier: "ELITE",
      unlockCost: 200,
    },
    {
      id: "ats-image",
      name: "Executive Profile",
      icon: "👔",
      preview: "Professional photo layout compatible with hiring software",
      tier: "ELITE",
      unlockCost: 200,
    },
  ];

  // Fetch user's unlocked templates on mount
  useEffect(() => {
    const fetchUnlockedTemplates = async () => {
      if (!token) return;
      
      try {
        setLoading(true);
        const { data } = await API.get('/api/users/me', {
          headers: { Authorization: token }
        });
        
        // Extract unlocked template IDs from user data
        const unlocked = data.user?.unlockedTemplates?.map(t => t.templateId) || [];
        setUnlockedTemplates(unlocked);
      } catch (error) {
        console.error('Failed to fetch unlocked templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnlockedTemplates();
  }, [token]);

  const handleTemplateClick = (template) => {
    const isLocked = template.tier !== 'FREE' && !unlockedTemplates.includes(template.id);
    
    if (isLocked) {
      setSelectedToUnlock(template.id);
      setUnlockModalOpen(true);
    } else {
      onChange(template.id);
      setIsOpen(false);
    }
  };

  const handlePreviewClick = (e, templateId) => {
    e.stopPropagation(); // Prevent triggering handleTemplateClick
    setSelectedToPreview(templateId);
    setPreviewModalOpen(true);
  };

  const handleUnlockSuccess = () => {
    // Refresh unlocked templates
    setUnlockedTemplates([...unlockedTemplates, selectedToUnlock]);
    // Select the newly unlocked template
    onChange(selectedToUnlock);
    setIsOpen(false);
  };

  const getTierBadge = (tier) => {
    const badges = {
      FREE: { color: "bg-green-500", text: "FREE" },
      PREMIUM: { color: "bg-purple-500", text: "PREMIUM" },
      ELITE: { color: "bg-yellow-500", text: "ELITE" },
    };
    return badges[tier] || badges.FREE;
  };

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
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading templates...</p>
                </div>
              ) : (
                templates.map((template) => {
                  const tierBadge = getTierBadge(template.tier);
                  const isLocked = template.tier !== 'FREE' && !unlockedTemplates.includes(template.id);
                  const isSelected = selectedTemplate === template.id;

                  return (
                    <div
                      key={template.id}
                      className={`relative p-3 border-2 transition-all duration-200 rounded-lg cursor-pointer group ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : isLocked
                          ? "border-gray-300 bg-gray-50 hover:border-gray-400"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-sm"
                      }`}
                      onClick={() => handleTemplateClick(template)}
                    >
                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <div className="size-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                          </div>
                        </div>
                      )}

                      {/* Locked Overlay */}
                      {isLocked && (
                        <div className="absolute inset-0 bg-gray-900/10 rounded-lg flex items-center justify-center z-5 pointer-events-none">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                            <Lock className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                            isSelected
                              ? "bg-blue-100"
                              : isLocked
                              ? "bg-gray-200"
                              : "bg-gray-100 group-hover:bg-gray-200"
                          }`}
                        >
                          {template.icon}
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4
                              className={`font-semibold text-sm ${
                                isSelected
                                  ? "text-blue-700"
                                  : isLocked
                                  ? "text-gray-500"
                                  : "text-gray-800 group-hover:text-blue-600"
                              }`}
                            >
                              {template.name}
                            </h4>

                            {/* Tier Badge */}
                            <span
                              className={`${tierBadge.color} text-white text-xs font-bold px-2 py-0.5 rounded shrink-0`}
                            >
                              {tierBadge.text}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 leading-relaxed mb-2">
                            {template.preview}
                          </p>

                          {/* Lock/Unlock Status */}
                          {isLocked && (
                            <div className="flex items-center gap-2 text-xs flex-wrap">
                              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-semibold">
                                🔓 {template.unlockCost} points to unlock
                              </span>
                              <button
                                onClick={(e) => handlePreviewClick(e, template.id)}
                                className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded font-medium transition-colors"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Preview</span>
                              </button>
                            </div>
                          )}

                          {!isLocked && template.tier !== 'FREE' && (
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                              <Check className="w-3 h-3" />
                              <span>Unlocked</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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

      {/* Unlock Modal */}
      <UnlockTemplateModal
        isOpen={unlockModalOpen}
        onClose={() => {
          setUnlockModalOpen(false);
          setSelectedToUnlock(null);
        }}
        templateId={selectedToUnlock}
        onSuccess={handleUnlockSuccess}
      />

      {/* Preview Modal */}
      <TemplatePreviewModal
        isOpen={previewModalOpen}
        onClose={() => {
          setPreviewModalOpen(false);
          setSelectedToPreview(null);
        }}
        templateId={selectedToPreview}
        resumeData={resumeData}
        onUnlock={() => {
          setPreviewModalOpen(false);
          setSelectedToUnlock(selectedToPreview);
          setUnlockModalOpen(true);
        }}
      />
    </div>
  );
}
