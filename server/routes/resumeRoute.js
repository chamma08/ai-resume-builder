import express from "express";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controllers/resumeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";

const router = express.Router();

router.post("/create-resume", protect, createResume);
router.put("/update-resume", upload.single("image"), protect, updateResume);
router.delete("/delete-resume/:resumeId", protect, deleteResume);
router.post("/get-resume/:resumeId", protect, getResumeById);
router.get("/get-public-resume/:resumeId", getPublicResumeById);

export default router;
