import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import pointsReducer from "./features/pointsSlice";
import templatesReducer from "./features/templatesSlice";

// Ensure reducers are properly defined
const validateReducer = (reducer, name) => {
    if (!reducer || typeof reducer !== 'function') {
        console.error(`Invalid reducer: ${name}`, reducer);
        return (state = {}) => state;
    }
    return reducer;
};

export const store = configureStore({
    reducer: {
        auth: validateReducer(authReducer, 'auth'),
        points: validateReducer(pointsReducer, 'points'),
        templates: validateReducer(templatesReducer, 'templates'),
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store;