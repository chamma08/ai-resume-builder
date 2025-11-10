import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../configs/api";

// Unlock template with points
export const unlockTemplate = createAsyncThunk(
  "templates/unlock",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await API.post("/api/points/unlock-template", { templateId });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to unlock template" }
      );
    }
  }
);

const templatesSlice = createSlice({
  name: "templates",
  initialState: {
    unlockedTemplates: [],
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
      .addCase(unlockTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unlockTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.unlockedTemplates.push(action.payload.templateId);
      })
      .addCase(unlockTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = templatesSlice.actions;
export default templatesSlice.reducer;
