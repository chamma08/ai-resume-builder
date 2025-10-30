import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getUserById, signIn, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/get-user", protect, getUserById);

export default router;
