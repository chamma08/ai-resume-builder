import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 30,
      match: /^[a-zA-Z0-9_]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordOTP: {
      type: String,
      default: null,
    },
    resetPasswordExpires: {
      type: Date,
      default: null,
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
    level: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum", "Diamond"],
      default: "Bronze",
    },
    badges: [
      {
        name: String,
        icon: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    referralCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    referrals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Social Media Follow Status (one-time points per platform)
    socialMediaFollows: {
      twitter: { type: Boolean, default: false },
      linkedin: { type: Boolean, default: false },
      facebook: { type: Boolean, default: false },
      instagram: { type: Boolean, default: false },
      youtube: { type: Boolean, default: false },
    },

    unlockedTemplates: [
      {
        templateId: String,
        unlockedAt: Date,
        cost: Number,
      },
    ],

    downloads: [
      {
        resumeId: mongoose.Schema.Types.ObjectId,
        templateType: String,
        downloadedAt: Date,
        cost: Number,
      },
    ],

    // User Statistics
    stats: {
      resumesCreated: { type: Number, default: 0 },
      resumesDownloaded: { type: Number, default: 0 },
      totalPointsEarned: { type: Number, default: 0 }, // NEW
      totalPointsSpent: { type: Number, default: 0 }, // NEW
      totalPointsPurchased: { type: Number, default: 0 }, // NEW
      profileCompleted: { type: Boolean, default: false },
      firstResumeBonus: { type: Boolean, default: false },
      dailyLoginStreak: { type: Number, default: 0 },
      lastLoginDate: Date,
    },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.virtual("nextLevelPoints").get(function () {
  const levels = {
    Bronze: 100,
    Silver: 300,
    Gold: 600,
    Platinum: 1000,
    Diamond: Infinity,
  };
  return levels[this.level] || 0;
});

// NEW: Method to check if user has enough points
UserSchema.methods.hasEnoughPoints = function (amount) {
  return this.points >= amount;
};

// NEW: Method to deduct points (with validation)
UserSchema.methods.deductPoints = async function (
  amount,
  transactionType,
  metadata = {}
) {
  if (!this.hasEnoughPoints(amount)) {
    throw new Error(
      `Insufficient points. You have ${this.points} points but need ${amount}.`
    );
  }

  const balanceBefore = this.points;
  this.points -= amount;
  const balanceAfter = this.points;

  // Update stats
  this.stats.totalPointsSpent += amount;

  await this.save();

  return {
    success: true,
    balanceBefore,
    balanceAfter,
    amountDeducted: amount,
    currentBalance: this.points,
  };
};

UserSchema.methods.addPoints = async function (
  amount,
  transactionType,
  metadata = {}
) {
  const balanceBefore = this.points;
  this.points += amount;
  const balanceAfter = this.points;

  // Update stats
  this.stats.totalPointsEarned += amount;

  // Check for level up
  const oldLevel = this.level;
  if (this.points >= 1000) {
    this.level = "Diamond";
  } else if (this.points >= 600) {
    this.level = "Platinum";
  } else if (this.points >= 300) {
    this.level = "Gold";
  } else if (this.points >= 100) {
    this.level = "Silver";
  } else {
    this.level = "Bronze";
  }

  const leveledUp = oldLevel !== this.level;
  await this.save();

  return {
    success: true,
    balanceBefore,
    balanceAfter,
    leveledUp,
    newLevel: this.level,
    currentBalance: this.points,
  };
};

// NEW: Method to check if template is unlocked
UserSchema.methods.hasTemplateUnlocked = function (templateId) {
  return this.unlockedTemplates.some((t) => t.templateId === templateId);
};

// NEW: Method to unlock template
UserSchema.methods.unlockTemplate = async function (templateId, cost) {
  if (this.hasTemplateUnlocked(templateId)) {
    throw new Error("Template already unlocked");
  }

  this.unlockedTemplates.push({
    templateId,
    unlockedAt: new Date(),
    cost,
  });

  await this.save();
  return true;
};

UserSchema.methods.generateReferralCode = function () {
  const code =
    this.name.substring(0, 3).toUpperCase() +
    Math.random().toString(36).substring(2, 8).toUpperCase();
  this.referralCode = code;
  return code;
};

const User = mongoose.model("User", UserSchema);

export default User;
