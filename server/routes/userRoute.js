import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserById, getUserResumes, signIn, signUp, forgotPassword, verifyOTP, resetPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.get("/get-user", protect, getUserById);
router.get("/me", protect, getUserById); // Add /me route for consistency

router.get("/get-resumes", protect, getUserResumes);

export default router;
