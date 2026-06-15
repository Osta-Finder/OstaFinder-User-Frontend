import { configureStore } from '@reduxjs/toolkit';
import onboardingReducer from './slices/onboardingSlice';
import authReducer from './slices/authSlice';
import chatReducer from './slices/chatSlice';
import { apiSlice } from '../services/apiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    onboarding: onboardingReducer,
    chat: chatReducer,
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
