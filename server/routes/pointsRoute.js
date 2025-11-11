import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { awardPoints, checkBalance, deductPoints, generateReferralCode, getActivityHistory, getLeaderboard, getTemplateDownloadCost, getUserPoints, recordSocialFollow, unlockTemplate } from '../controllers/pointsController.js';

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

// Points spending
router.post('/deduct', deductPoints);
router.get('/check-balance', checkBalance);
router.get('/template-cost/:templateType', getTemplateDownloadCost);

// Template unlock
router.post('/unlock-template', unlockTemplate);

export default router;