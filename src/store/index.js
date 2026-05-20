import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import approvalReducer from '../features/approval/store/approvalSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    approval: approvalReducer,
  },
})
