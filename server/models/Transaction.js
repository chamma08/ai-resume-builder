import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
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
        // Point Earnings
        "EARN_SIGNUP",
        "EARN_PROFILE_COMPLETE",
        "EARN_RESUME_CREATED",
        "EARN_SOCIAL_FOLLOW",
        "EARN_REFERRAL",
        "EARN_DAILY_LOGIN",
        "EARN_LEVEL_UP",
        
        // Point Spending
        "SPEND_CV_DOWNLOAD",
        "SPEND_AI_SUGGESTION",
        "SPEND_TEMPLATE_UNLOCK",
        
        // Point Purchases
        "PURCHASE_POINTS",
        "REFUND_POINTS",
        
        // Adjustments
        "ADMIN_ADJUSTMENT",
        "BONUS",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      // Positive for earnings, negative for spending
    },
    balance_before: {
      type: Number,
      required: true,
    },
    balance_after: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "completed",
    },
    description: {
      type: String,
      required: true,
    },
    metadata: {
      // For CV downloads
      resumeId: String,
      templateType: String,
      templateTier: String,
      
      // For payments
      paymentId: String,
      paymentProvider: String,
      packageType: String,
      
      // For unlocks
      templateId: String,
      
      // General
      ipAddress: String,
      userAgent: String,
      referenceId: String,
    },
    // For refunds and failures
    relatedTransaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient queries
TransactionSchema.index({ user: 1, createdAt: -1 });
TransactionSchema.index({ type: 1, status: 1 });
TransactionSchema.index({ "metadata.paymentId": 1 });

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;