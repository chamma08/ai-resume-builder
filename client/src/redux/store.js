import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import pointsReducer from "./features/pointsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        points: pointsReducer,
    },
})