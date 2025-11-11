import mongoose from "mongoose";

const TemplateUnlockSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    templateId: {
      type: String,
      required: true,
      index: true,
    },
    templateName: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      enum: ["FREE", "PREMIUM", "ELITE"],
      required: true,
    },
    unlockMethod: {
      type: String,
      enum: ["points", "payment", "admin"],
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

TemplateUnlockSchema.index({ user: 1, templateId: 1 }, { unique: true });

const TemplateUnlock = mongoose.model("TemplateUnlock", TemplateUnlockSchema);

export default TemplateUnlock;