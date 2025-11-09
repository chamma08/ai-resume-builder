import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const TEMPLATE_TIERS = {
  classic: { tier: "FREE", downloadCost: 50, unlockCost: 0 },
  minimal: { tier: "FREE", downloadCost: 50, unlockCost: 0 },
  modern: { tier: "PREMIUM", downloadCost: 50, unlockCost: 100 },
  elegant: { tier: "PREMIUM", downloadCost: 50, unlockCost: 100 },
  "minimal-image": { tier: "PREMIUM", downloadCost: 50, unlockCost: 100 },
  ats: { tier: "ELITE", downloadCost: 50, unlockCost: 200 },
  "ats-image": { tier: "ELITE", downloadCost: 50, unlockCost: 200 },
  corporate: { tier: "ELITE", downloadCost: 50, unlockCost: 200 },
};

export const POINT_COSTS = {
  CV_DOWNLOAD_FREE: 50,
  CV_DOWNLOAD_PREMIUM: 50,
  CV_DOWNLOAD_ELITE: 50,
  AI_SUGGESTION_BASIC: 5,
  AI_SUGGESTION_ADVANCED: 15,
  TEMPLATE_UNLOCK_PREMIUM: 100,
  TEMPLATE_UNLOCK_ELITE: 200,
};

export const getDownloadCost = (templateType) => {
  const templateConfig = TEMPLATE_TIERS[templateType];
  if (!templateConfig) {
    return POINT_COSTS.CV_DOWNLOAD_FREE; 
  }
  return templateConfig.downloadCost;
};

export const getUnlockCost = (templateType) => {
  const templateConfig = TEMPLATE_TIERS[templateType];
  if (!templateConfig) {
    return 0;
  }
  return templateConfig.unlockCost;
};

// Helper: Check if template needs to be unlocked
export const needsUnlock = (templateType) => {
  const templateConfig = TEMPLATE_TIERS[templateType];
  if (!templateConfig) return false;
  return templateConfig.tier !== "FREE";
};


// Main function: Deduct points with transaction logging
export const deductPointsWithTransaction = async (userId, amount, type, description, metadata = {}) => {
  // Start a session for transaction
  const session = await Transaction.startSession();
  session.startTransaction();
  
  try {
    // Get user
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    
    // Check balance
    if (!user.hasEnoughPoints(amount)) {
      throw new Error(`Insufficient points. You have ${user.points} but need ${amount}.`);
    }
    
    const balanceBefore = user.points;
    
    // Deduct points
    const result = await user.deductPoints(amount, type, metadata);
    
    // Create transaction record
    const transaction = await Transaction.create([{
      user: userId,
      type,
      amount: -amount, // Negative for spending
      balance_before: balanceBefore,
      balance_after: result.balanceAfter,
      status: "completed",
      description,
      metadata,
    }], { session });
    
    // Commit transaction
    await session.commitTransaction();
    
    return {
      success: true,
      transaction: transaction[0],
      balanceBefore,
      balanceAfter: result.balanceAfter,
      currentBalance: result.currentBalance,
    };
    
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

// Main function: Add points with transaction logging
export const addPointsWithTransaction = async (userId, amount, type, description, metadata = {}) => {
  const session = await Transaction.startSession();
  session.startTransaction();
  
  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new Error("User not found");
    }
    
    const balanceBefore = user.points;
    
    // Add points
    const result = await user.addPoints(amount, type, metadata);
    
    // Create transaction record
    const transaction = await Transaction.create([{
      user: userId,
      type,
      amount: amount, // Positive for earning
      balance_before: balanceBefore,
      balance_after: result.balanceAfter,
      status: "completed",
      description,
      metadata,
    }], { session });
    
    await session.commitTransaction();
    
    return {
      success: true,
      transaction: transaction[0],
      balanceBefore,
      balanceAfter: result.balanceAfter,
      currentBalance: result.currentBalance,
      leveledUp: result.leveledUp,
      newLevel: result.newLevel,
    };
    
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export default {
  deductPointsWithTransaction,
  addPointsWithTransaction,
  getDownloadCost,
  getUnlockCost,
  needsUnlock,
  TEMPLATE_TIERS,
  POINT_COSTS,
};