import { CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GettingStartedChecklist({ 
  profileCompleted, 
  hasResumes, 
  points,
  onCreateResume 
}) {
  const steps = [
    {
      id: 'signup',
      title: 'Create your account',
      description: 'Welcome! You\'ve earned your first 25 points',
      completed: true,
      points: 25,
      icon: '✓'
    },
    {
      id: 'profile',
      title: 'Complete your profile',
      description: 'Fill in your personal information',
      completed: profileCompleted,
      points: 50,
      action: {
        label: 'Complete Profile',
        onClick: onCreateResume
      }
    },
    {
      id: 'resume',
      title: 'Create your first resume',
      description: 'Build a professional resume with AI assistance',
      completed: hasResumes,
      points: 25,
      action: {
        label: 'Create Resume',
        onClick: onCreateResume
      }
    },
    {
      id: 'download',
      title: 'Download your resume',
      description: 'Export your resume as PDF',
      completed: false,
      points: -50,
      info: 'Costs 50 points'
    }
  ];

  const completedSteps = steps.filter(s => s.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-200 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            🎯 Getting Started
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Complete these steps to unlock the full potential
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">
            {completedSteps}/{steps.length}
          </div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-purple-600 transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
              step.completed
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-gray-50 border-2 border-gray-200 hover:border-purple-300'
            }`}
          >
            {/* Icon */}
            <div
              className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-white border-2 border-gray-300 text-gray-400'
              }`}
            >
              {step.completed ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span className="text-lg">{index + 1}</span>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4
                    className={`font-semibold mb-1 ${
                      step.completed ? 'text-green-800' : 'text-gray-900'
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {step.info && (
                    <p className="text-xs text-gray-500 mt-1 italic">{step.info}</p>
                  )}
                </div>

                {/* Points Badge */}
                <div
                  className={`shrink-0 px-3 py-1 rounded-full text-sm font-bold ${
                    step.points > 0
                      ? 'bg-green-100 text-green-700'
                      : step.points < 0
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {step.points > 0 ? '+' : ''}
                  {step.points} pts
                </div>
              </div>

              {/* Action Button */}
              {!step.completed && step.action && (
                <button
                  onClick={step.action.onClick}
                  className="mt-3 flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700 transition-colors group"
                >
                  {step.action.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {step.completed && (
                <div className="mt-2 flex items-center gap-1.5 text-sm text-green-700 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {completedSteps === steps.length ? (
        <div className="mt-6 p-4 bg-purple-100 rounded-xl border-2 border-purple-300">
          <p className="text-center font-bold text-purple-900">
            🎉 Congratulations! You've completed all the getting started steps!
          </p>
        </div>
      ) : (
        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            💡 <span className="font-semibold">Tip:</span> Complete all steps to maximize your points and unlock premium features!
          </p>
        </div>
      )}
    </div>
  );
}
