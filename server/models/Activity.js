import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "SIGNUP",
        "PROFILE_COMPLETE",
        "RESUME_CREATED",
        "RESUME_DOWNLOADED",
        "SOCIAL_FOLLOW",
        "REFERRAL",
        "DAILY_LOGIN",
        "LEVEL_UP",
        "BADGE_EARNED",
      ],
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      platform: String, // For social shares (twitter, linkedin, facebook)
      resumeId: String, // For resume-related activities
      referredUserId: String, // For referrals
      badgeName: String, // For badges
      oldLevel: String, // For level ups
      newLevel: String,
    },
  },
  {
    timestamps: true,
  }
);

ActivitySchema.index({ user: 1, createdAt: -1 });
ActivitySchema.index({ type: 1 });

const Activity = mongoose.model("Activity", ActivitySchema);

export default Activity;