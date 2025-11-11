import React from 'react';
import { X, Lock, Eye } from 'lucide-react';
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ElegantTemplate from '../templates/ElegantTemplate';
import MinimalImageTemplate from '../templates/MinimalImageTemplate';
import ATSTemplate from '../templates/ATSTemplate';
import ATSImageTemplate from '../templates/ATSImageTemplate';

// Template metadata
const TEMPLATE_INFO = {
  modern: {
    name: 'Modern',
    tier: 'PREMIUM',
    icon: '✨',
    unlockCost: 100,
    description: 'Sleek design with contemporary fonts and great readability',
  },
  elegant: {
    name: 'Elegant',
    tier: 'PREMIUM',
    icon: '💎',
    unlockCost: 100,
    description: 'Sophisticated design with refined typography',
  },
  'minimal-image': {
    name: 'Minimalist Image',
    tier: 'PREMIUM',
    icon: '🖼️',
    unlockCost: 100,
    description: 'Minimal design with profile image and elegant formatting',
  },
  ats: {
    name: 'Professional Pro',
    tier: 'ELITE',
    icon: '🎯',
    unlockCost: 200,
    description: 'Scanner-friendly format that beats automated systems',
  },
  'ats-image': {
    name: 'Executive Profile',
    tier: 'ELITE',
    icon: '👔',
    unlockCost: 200,
    description: 'Professional photo layout compatible with hiring software',
  },
};

// Template components mapping
const TEMPLATE_COMPONENTS = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  elegant: ElegantTemplate,
  'minimal-image': MinimalImageTemplate,
  ats: ATSTemplate,
  'ats-image': ATSImageTemplate,
};

export default function TemplatePreviewModal({ isOpen, onClose, templateId, resumeData, onUnlock }) {
  if (!isOpen || !templateId) return null;

  const template = TEMPLATE_INFO[templateId];
  if (!template) return null;

  const TemplateComponent = TEMPLATE_COMPONENTS[templateId];
  if (!TemplateComponent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] m-4 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-gray-200 bg-linear-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900">{template.name} Template</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  template.tier === 'PREMIUM' ? 'bg-purple-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {template.tier}
                </span>
              </div>
              <p className="text-xs text-gray-600">{template.description}</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Preview Area - Scrollable */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Watermark overlay */}
            <div className="relative">
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <div className="bg-black/5 backdrop-blur-[1px] border-4 border-red-400/30 rounded-2xl p-8 transform rotate-[-15deg]">
                  <div className="flex items-center gap-3">
                    <Lock className="w-12 h-12 text-red-600/60" />
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-800/60">PREVIEW</p>
                      <p className="text-sm text-red-900/60 font-medium">Unlock to use</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Template Preview with User's Data */}
              <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <TemplateComponent 
                  data={resumeData} 
                  accentColor={resumeData?.accent_color || '#3B82F6'} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>This is a Preview</span>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-colors"
              >
                Close
              </button>
              
              <button
                onClick={onUnlock}
                className="px-6 py-2 bg-black text-white font-medium rounded-lg transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock for {template.unlockCost} points</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
