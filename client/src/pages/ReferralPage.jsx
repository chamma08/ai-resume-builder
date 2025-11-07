import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateReferralCode, fetchUserPoints } from '../redux/features/pointsSlice';
import { Gift, Copy, Users, TrendingUp, Share2, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ReferralPage() {
  const dispatch = useDispatch();
  const { referralCode, loading } = useSelector((state) => state.points);
  const { user } = useSelector((state) => state.auth);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    dispatch(fetchUserPoints());
  }, [dispatch]);

  const handleGenerateCode = async () => {
    try {
      await dispatch(generateReferralCode()).unwrap();
      toast.success('Referral code generated successfully!');
    } catch (error) {
      toast.error('Failed to generate referral code');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success('Referral code copied to clipboard!');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCopyLink = () => {
    const referralLink = `${window.location.origin}/sign-up?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  const shareOnSocial = (platform) => {
    const referralLink = `${window.location.origin}/sign-up?ref=${referralCode}`;
    const message = `Join me on AI Resume Builder and get started with your professional resume! Use my referral code: ${referralCode}`;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(message)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(message + ' ' + referralLink)}`
    };

    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Gift className="text-green-500" size={40} />
        Referral Program
      </h1>

      {/* Hero Section */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 text-gray-800 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Invite Friends, Earn Rewards! 🎉</h2>
        <p className="text-lg mb-4">
          Share your unique referral code with friends. When they sign up using your code, 
          you'll earn <span className="font-bold text-red-700">200 points</span> for each successful referral!
        </p>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>Unlimited referrals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>Instant points</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-green-600" />
            <span>Track your progress</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Referral Code Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Copy className="text-blue-500" />
            Your Referral Code
          </h3>

          {referralCode ? (
            <div className="space-y-4">
              <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Your Code:</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 text-3xl font-bold text-blue-600 font-mono">
                    {referralCode}
                  </code>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Referral Link:</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={`${window.location.origin}/sign-up?ref=${referralCode}`}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border rounded text-sm"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Share on Social Media */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Share on Social Media:</p>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    onClick={() => shareOnSocial('twitter')}
                    className="bg-black text-white p-3 rounded-lg hover:opacity-80 transition-opacity text-center"
                  >
                    <span className="text-xl">𝕏</span>
                    <p className="text-xs mt-1">Twitter</p>
                  </button>
                  <button
                    onClick={() => shareOnSocial('facebook')}
                    className="bg-blue-600 text-white p-3 rounded-lg hover:opacity-80 transition-opacity text-center"
                  >
                    <span className="text-xl">f</span>
                    <p className="text-xs mt-1">Facebook</p>
                  </button>
                  <button
                    onClick={() => shareOnSocial('linkedin')}
                    className="bg-blue-700 text-white p-3 rounded-lg hover:opacity-80 transition-opacity text-center"
                  >
                    <span className="text-xl">in</span>
                    <p className="text-xs mt-1">LinkedIn</p>
                  </button>
                  <button
                    onClick={() => shareOnSocial('whatsapp')}
                    className="bg-green-500 text-white p-3 rounded-lg hover:opacity-80 transition-opacity text-center"
                  >
                    <span className="text-xl">💬</span>
                    <p className="text-xs mt-1">WhatsApp</p>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Gift size={64} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 mb-4">You don't have a referral code yet.</p>
              <button
                onClick={handleGenerateCode}
                disabled={loading}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300"
              >
                {loading ? 'Generating...' : 'Generate Referral Code'}
              </button>
            </div>
          )}
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="text-purple-500" />
            Your Referral Stats
          </h3>

          <div className="space-y-4">
            <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Referrals</p>
                  <p className="text-4xl font-bold text-purple-600">
                    {user?.referrals?.length || 0}
                  </p>
                </div>
                <Users size={48} className="text-purple-300" />
              </div>
              <div className="bg-white/50 rounded p-3">
                <p className="text-sm text-gray-600">Points Earned from Referrals</p>
                <p className="text-2xl font-bold text-green-600">
                  {(user?.referrals?.length || 0) * 200} pts
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <TrendingUp size={18} />
                Unlock More Rewards!
              </h4>
              <ul className="space-y-2 text-sm text-yellow-900">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Refer 3 friends to earn the "Influencer" badge 🌟</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Refer 10 friends to unlock exclusive features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>Top referrers get monthly bonus points!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-2xl font-bold mb-6">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">1️⃣</span>
            </div>
            <h4 className="font-bold mb-2">Generate Your Code</h4>
            <p className="text-sm text-gray-600">
              Click the button above to generate your unique referral code.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">2️⃣</span>
            </div>
            <h4 className="font-bold mb-2">Share With Friends</h4>
            <p className="text-sm text-gray-600">
              Send your code or link to friends via social media, email, or messaging apps.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">3️⃣</span>
            </div>
            <h4 className="font-bold mb-2">Earn Rewards</h4>
            <p className="text-sm text-gray-600">
              Get 200 points instantly when your friend signs up using your code!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}