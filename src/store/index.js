import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './slices/onboardingSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    onboarding: onboardingReducer,
    auth: authReducer,
  },
});

export default store;
