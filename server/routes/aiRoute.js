import express from "express";
import { enhanceJobDescription, enhanceProfessionalSummary, uploadResume } from "../controllers/aiController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/enhance-pro-summary", protect, enhanceProfessionalSummary);
router.post("/enhance-job-des", protect, enhanceJobDescription);
router.post("/upload-resume", protect, uploadResume);

export default router;