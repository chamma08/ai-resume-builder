import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Lock, Unlock, Coins, Check, AlertCircle } from 'lucide-react';
import { unlockTemplate } from '../../redux/features/templatesSlice';
import { fetchUserPoints } from '../../redux/features/pointsSlice';
import { toast } from 'react-toastify';

// Template metadata
const TEMPLATE_INFO = {
  modern: {
    name: 'Modern',
    tier: 'PREMIUM',
    icon: '✨',
    unlockCost: 100,
    downloadCost: 50,
    description: 'Sleek design with contemporary fonts and great readability',
    features: ['Modern design', 'Color accents', 'Professional look'],
  },
  elegant: {
    name: 'Elegant',
    tier: 'PREMIUM',
    icon: '💎',
    unlockCost: 100,
    downloadCost: 50,
    description: 'Sophisticated design with refined typography',
    features: ['Elegant styling', 'Premium fonts', 'Executive look'],
  },
  'minimal-image': {
    name: 'Minimalist Image',
    tier: 'PREMIUM',
    icon: '🖼️',
    unlockCost: 100,
    downloadCost: 50,
    description: 'Minimal design with profile image and elegant formatting',
    features: ['Photo support', 'Clean layout', 'Modern style'],
  },
  ats: {
    name: 'Professional Pro',
    tier: 'ELITE',
    icon: '🎯',
    unlockCost: 200,
    downloadCost: 50,
    description: 'Scanner-friendly format that beats automated systems',
    features: ['ATS-optimized', 'Keyword optimized', 'Scan-friendly'],
  },
  'ats-image': {
    name: 'Executive Profile',
    tier: 'ELITE',
    icon: '👔',
    unlockCost: 200,
    downloadCost: 50,
    description: 'Professional photo layout compatible with hiring software',
    features: ['ATS + Photo', 'Executive style', 'Best of both'],
  },
  corporate: {
    name: 'Corporate',
    tier: 'ELITE',
    icon: '🏢',
    unlockCost: 200,
    downloadCost: 50,
    description: 'Professional corporate styling',
    features: ['Corporate design', 'Premium layout', 'Executive ready'],
  },
};

export default function UnlockTemplateModal({ isOpen, onClose, templateId, onSuccess }) {
  const dispatch = useDispatch();
  const { points } = useSelector((state) => state.points);
  const { loading } = useSelector((state) => state.templates);

  if (!isOpen || !templateId) return null;

  const template = TEMPLATE_INFO[templateId];
  if (!template) return null;

  const canAfford = points >= template.unlockCost;
  const shortfall = template.unlockCost - points;

  const handleUnlock = async () => {
    if (!canAfford) {
      toast.error(`You need ${shortfall} more points!`);
      return;
    }

    try {
      await dispatch(unlockTemplate(templateId)).unwrap();
      await dispatch(fetchUserPoints());
      toast.success(`${template.name} template unlocked successfully!`);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      if (error.error === 'INSUFFICIENT_POINTS') {
        toast.error(`Insufficient points! You need ${error.required} points.`);
      } else {
        toast.error(error.message || 'Failed to unlock template');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-full ${
            canAfford ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            {canAfford ? (
              <Unlock className="w-6 h-6 text-green-600" />
            ) : (
              <Lock className="w-6 h-6 text-yellow-600" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Unlock Template</h3>
            <p className="text-sm text-gray-500">Get permanent access</p>
          </div>
        </div>

        {/* Template Preview */}
        <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-5xl">{template.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold text-gray-900">{template.name}</h4>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  template.tier === 'PREMIUM' ? 'bg-purple-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}>
                  {template.tier}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{template.description}</p>
              
              {/* Features */}
              <div className="space-y-1">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="w-3 h-3 text-green-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-blue-50 rounded-lg p-4 space-y-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Unlock Cost</span>
            <span className="flex items-center gap-1 font-bold text-gray-900">
              <Coins className="w-4 h-4 text-blue-600" />
              {template.unlockCost}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-blue-200">
            <span className="text-sm font-medium text-gray-700">Your Balance</span>
            <span className="flex items-center gap-1 font-bold text-gray-900">
              <Coins className="w-4 h-4 text-blue-600" />
              {points}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-blue-200">
            <span className="text-sm font-medium text-gray-700">After Unlock</span>
            <span className={`flex items-center gap-1 font-bold ${
              canAfford ? 'text-green-600' : 'text-red-600'
            }`}>
              <Coins className="w-4 h-4" />
              {canAfford ? points - template.unlockCost : 0}
            </span>
          </div>
        </div>

        {/* Insufficient Balance Warning */}
        {!canAfford && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <div className="flex gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-900 mb-1">
                  Insufficient Points
                </p>
                <p className="text-sm text-red-700">
                  You need {shortfall} more points to unlock this template.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h5 className="font-semibold text-gray-900 mb-2 text-sm">What you get:</h5>
          <ul className="space-y-1 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Permanent access to this template</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Use it for unlimited resumes</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span>Download at {template.downloadCost} points per resume</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>

          {canAfford ? (
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Unlocking...</span>
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Now</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                toast.info('Points purchase feature coming soon!');
              }}
              className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Coins className="w-4 h-4" />
              <span>Buy Points</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
