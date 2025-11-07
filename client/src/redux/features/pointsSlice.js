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
    referralCode: null,
    activities: [],
    leaderboard: [],
    userRank: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
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
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload.leaderboard;
        state.userRank = action.payload.userRank;
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
  },
});

export const { clearError } = pointsSlice.actions;
export default pointsSlice.reducer;
