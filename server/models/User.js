import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    // User Statistics
    stats: {
      resumesCreated: { type: Number, default: 0 },
      resumesDownloaded: { type: Number, default: 0 },
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
    bronze: 100,
    silver: 300,
    gold: 600,
    platinum: 1000,
    diamond: Infinity,
  };
  return levels[this.level] || 0;
});

UserSchema.methods.addPoints = async function (points, activity) {
  this.points += points;

  const oldLevel = this.level;
  if (this.points >= 1000) {
    this.level = "platinum";
  } else if (this.points >= 600) {
    this.level = "gold";
  } else if (this.points >= 300) {
    this.level = "silver";
  } else if (this.points >= 100) {
    this.level = "bronze";
  } else {
    this.level = "bronze";
  }

  if (oldLevel !== this.level) {
    console.log(
      `User ${this._id} leveled up from ${oldLevel} to ${this.level}`
    );
  }

  const leveledUp = oldLevel !== this.level;

  await this.save();

  return { leveledUp, newLevel: this.level, totalPoints: this.points };
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
