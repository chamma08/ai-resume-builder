import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { awardPoints, checkBalance, deductPoints, generateReferralCode, getActivityHistory, getLeaderboard, getTemplateDownloadCost, getUserPoints, recordSocialFollow } from '../controllers/pointsController.js';

const router = express.Router();

router.use(protect);

// Get user's points and level
router.get('/me', getUserPoints);

// Award points for an activity
router.post('/award', awardPoints);

// Get activity history
router.get('/activities', getActivityHistory);

// Get leaderboard
router.get('/leaderboard', getLeaderboard);

// Record social media follow (one-time per platform)
router.post('/follow', recordSocialFollow);

// Generate/get referral code
router.get('/referral-code', generateReferralCode);

router.post('/deduct', deductPoints);
router.get('/check-balance', checkBalance);
router.get('/template-cost/:templateType', getTemplateDownloadCost);

export default router;