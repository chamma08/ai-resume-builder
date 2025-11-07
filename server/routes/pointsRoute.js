import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { awardPoints, generateReferralCode, getActivityHistory, getLeaderboard, getUserPoints, recordSocialFollow } from '../controllers/pointsController.js';

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

export default router;