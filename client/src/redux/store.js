import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import pointsReducer from "./features/pointsSlice";
import templatesReducer from "./features/templatesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        points: pointsReducer,
        templates: templatesReducer,
    },
})