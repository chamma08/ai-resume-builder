import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../configs/api";

// Async thunks for API calls
export const fetchUserPoints = createAsyncThunk(
  "points/fetchUserPoints",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/points/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch points"
      );
    }
  }
);

export const awardPoints = createAsyncThunk(
  "points/awardPoints",
  async ({ activityType, metadata }, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/points/award", {
        activityType,
        metadata,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to award points"
      );
    }
  }
);

export const fetchActivityHistory = createAsyncThunk(
  "points/fetchActivityHistory",
  async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/api/points/activities?page=${page}&limit=${limit}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch activities"
      );
    }
  }
);

export const fetchLeaderboard = createAsyncThunk(
  "points/fetchLeaderboard",
  async ({ limit = 50, period = "all" }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/api/points/leaderboard?limit=${limit}&period=${period}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch leaderboard"
      );
    }
  }
);

export const recordSocialFollow = createAsyncThunk(
  "points/recordSocialFollow",
  async ({ platform }, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/points/follow", { platform });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to record follow"
      );
    }
  }
);

export const generateReferralCode = createAsyncThunk(
  "points/generateReferralCode",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/api/points/referral-code");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to generate code"
      );
    }
  }
);

// NEW: Deduct points
export const deductPoints = createAsyncThunk(
  "points/deductPoints",
  async ({ activityType, amount, metadata }, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/points/deduct", {
        activityType,
        amount,
        metadata,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to deduct points" }
      );
    }
  }
);

// NEW: Check balance
export const checkBalance = createAsyncThunk(
  "points/checkBalance",
  async ({ amount, actionType }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/api/points/check-balance?amount=${amount}&actionType=${actionType}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check balance"
      );
    }
  }
);

// NEW: Get template download cost
export const getTemplateDownloadCost = createAsyncThunk(
  "points/getTemplateDownloadCost",
  async (templateType, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/api/points/template-cost/${templateType}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get template cost"
      );
    }
  }
);

const pointsSlice = createSlice({
  name: "points",
  initialState: {
    points: 0,
    level: "Bronze",
    nextLevelPoints: 100,
    progress: 0,
    badges: [],
    stats: {},
    socialMediaFollows: {},
    referralCode: "",
    activities: [],
    leaderboard: [],
    userRank: null,
    loading: false,
    error: null,
    templateCosts: {},
    balanceCheck: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLocalBalance: (state, action) => {
      state.points = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Points
      .addCase(fetchUserPoints.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.points || 0;
        state.level = action.payload.level || "Bronze";
        state.badges = action.payload.badges || [];
        state.stats = action.payload.stats || {};
        state.socialMediaFollows = action.payload.socialMediaFollows || {};
        state.referralCode = action.payload.referralCode || null;
        state.progress = action.payload.progressToNextLevel || 0;
      })
      .addCase(fetchUserPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Award Points
      .addCase(awardPoints.fulfilled, (state, action) => {
        state.points = action.payload.totalPoints;
        if (action.payload.leveledUp) {
          state.level = action.payload.newLevel;
        }
      })

      // Fetch Activity History
      .addCase(fetchActivityHistory.fulfilled, (state, action) => {
        state.activities = action.payload.activities;
      })

      // Fetch Leaderboard
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.leaderboard = action.payload.leaderboard || [];
        state.userRank = action.payload.userRank;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Record Social Follow
      .addCase(recordSocialFollow.fulfilled, (state, action) => {
        state.points = action.payload.totalPoints;
        if (action.payload.platform) {
          state.socialMediaFollows[action.payload.platform] = true;
        }
      })

      // Generate Referral Code
      .addCase(generateReferralCode.fulfilled, (state, action) => {
        state.referralCode = action.payload.referralCode;
      });

    // Deduct points
    builder
      .addCase(deductPoints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deductPoints.fulfilled, (state, action) => {
        state.loading = false;
        state.points = action.payload.currentBalance;
      })
      .addCase(deductPoints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Check balance
    builder.addCase(checkBalance.fulfilled, (state, action) => {
      state.balanceCheck = action.payload;
    });

    // Get template cost
    builder.addCase(getTemplateDownloadCost.fulfilled, (state, action) => {
      state.templateCosts[action.payload.templateType] = action.payload;
    });
  },
});

export const { clearError, updateLocalBalance } = pointsSlice.actions;
export default pointsSlice.reducer;
