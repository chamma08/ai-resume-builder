import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemplateDownloadCost} from "../../redux/features/pointsSlice"
import { Download, AlertCircle, Coins } from 'lucide-react';

export default function DownloadConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  resumeId,
  templateType,
}) {
  const dispatch = useDispatch();
  const { points, templateCosts, loading } = useSelector(
    (state) => state.points
  );
  const [costInfo, setCostInfo] = useState(null);

  useEffect(() => {
    if (isOpen && templateType) {
      dispatch(getTemplateDownloadCost(templateType))
        .unwrap()
        .then((data) => {
          setCostInfo(data);
        })
        .catch((error) => {
          console.error("Failed to fetch template cost:", error);
        });
    }
  }, [isOpen, templateType, dispatch]);

  if (!isOpen) {
    return null;
  }

  const canAfford = costInfo && points >= costInfo.downloadCost;
  const isLocked = costInfo && costInfo.requiresUnlock && !costInfo.isUnlocked;

  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-full shadow-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Download Resume</h3>
            <p className="text-sm text-gray-500">Points will be deducted from your balance</p>
          </div>
        </div>

        {/* Cost Information */}
        {costInfo && (
          <div className="space-y-4 mb-6">
            {/* Template Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Template</span>
                <span className="text-sm font-semibold text-gray-900 capitalize">
                  {costInfo.templateType}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Tier</span>
                <span className={`text-sm font-bold px-2 py-1 rounded ${
                  costInfo.tier === 'FREE' ? 'bg-green-100 text-green-700' :
                  costInfo.tier === 'PREMIUM' ? 'bg-purple-100 text-purple-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {costInfo.tier}
                </span>
              </div>
            </div>

            {/* Locked Warning */}
            {isLocked && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 mb-1">
                      Template Not Unlocked
                    </p>
                    <p className="text-sm text-yellow-700">
                      You need to unlock this template first for {costInfo.unlockCost} points.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-xl p-5 space-y-3 border-2 border-blue-100">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Download Cost</span>
                <div className="flex items-center gap-1.5 bg-red-100 px-3 py-1.5 rounded-full">
                  <Coins className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-700">-{costInfo.downloadCost}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-sm font-medium text-gray-700">Current Balance</span>
                <div className="flex items-center gap-1.5 bg-blue-100 px-3 py-1.5 rounded-full">
                  <Coins className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-blue-700">{points}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                <span className="text-sm font-semibold text-gray-800">Balance After Download</span>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
                  canAfford ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Coins className={`w-4 h-4 ${canAfford ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`font-bold ${canAfford ? 'text-green-700' : 'text-red-700'}`}>
                    {canAfford ? points - costInfo.downloadCost : 0}
                  </span>
                </div>
              </div>

              {/* Info note */}
              <div className="pt-2 mt-2 border-t border-blue-200">
                <p className="text-xs text-gray-600 flex items-start gap-1">
                  <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                  <span>Points will be deducted when you confirm the download</span>
                </p>
              </div>
            </div>

            {/* Insufficient Balance Warning */}
            {!canAfford && !isLocked && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-900 mb-1">
                      Insufficient Points
                    </p>
                    <p className="text-sm text-red-700">
                      You need {costInfo.downloadCost - points} more points to download this resume.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          
          {canAfford && !isLocked ? (
            <button
              onClick={() => onConfirm(costInfo.downloadCost)}
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              {loading ? 'Processing...' : 'Confirm Download'}
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                // Navigate to buy points page
                window.location.href = '/buy-points';
              }}
              className="flex-1 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Coins className="w-4 h-4" />
              Buy Points
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
