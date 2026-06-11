import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './slices/onboardingSlice';
import authReducer from './slices/authSlice';
import approvalReducer from '../features/approval/store/approvalSlice';
import { apiSlice } from '../services/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    approval: approvalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'onboarding/setNationalId',
          'onboarding/addCertificate',
        ],
        ignoredPaths: [
          'onboarding.documentation.nationalId',
          'onboarding.documentation.certificates',
        ],
      },
    }).concat(apiSlice.middleware),
});

export default store;
