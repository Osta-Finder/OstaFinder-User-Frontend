import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  approvalStatus: 'pending',
  reviewState: 'in_review',
  loading: false,
  submitting: false,
  reviewerMessage: 'سيقوم فريقنا بمراجعة أوراقك والرد عليك في أقرب وقت. يرجى متابعة حالة الطلب من خلال التطبيق.',
  error: null,
  lastUpdated: null,
  submittedAt: null,
  reviewedAt: null,
  reviewerId: null,
  estimatedCompletionTime: null,
  requiredDocuments: [],
  completedSteps: 0,
  totalSteps: 3,
}

const approvalSlice = createSlice({
  name: 'approval',
  initialState,
  reducers: {
    setApprovalStatus: (state, action) => {
      state.approvalStatus = action.payload
      state.lastUpdated = new Date().toISOString()
    },
    setReviewState: (state, action) => {
      state.reviewState = action.payload
      state.lastUpdated = new Date().toISOString()
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setSubmitting: (state, action) => {
      state.submitting = action.payload
    },
    setReviewerMessage: (state, action) => {
      state.reviewerMessage = action.payload
      state.lastUpdated = new Date().toISOString()
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    updateProgress: (state, action) => {
      state.completedSteps = action.payload
      state.lastUpdated = new Date().toISOString()
    },
    setEstimatedTime: (state, action) => {
      state.estimatedCompletionTime = action.payload
    },
    resetApprovalState: () => initialState,
    markAsSubmitted: (state) => {
      state.reviewState = 'submitted'
      state.submittedAt = new Date().toISOString()
      state.lastUpdated = new Date().toISOString()
    },
    markAsReviewed: (state, action) => {
      state.reviewState = 'completed'
      state.approvalStatus = action.payload.status
      state.reviewerMessage = action.payload.message
      state.reviewedAt = new Date().toISOString()
      state.lastUpdated = new Date().toISOString()
    },
  },
})

export const {
  setApprovalStatus,
  setReviewState,
  setLoading,
  setSubmitting,
  setReviewerMessage,
  setError,
  clearError,
  updateProgress,
  setEstimatedTime,
  resetApprovalState,
  markAsSubmitted,
  markAsReviewed,
} = approvalSlice.actions

export const selectApprovalStatus = (state) => state.approval.approvalStatus
export const selectReviewState = (state) => state.approval.reviewState
export const selectIsLoading = (state) => state.approval.loading
export const selectIsSubmitting = (state) => state.approval.submitting
export const selectReviewerMessage = (state) => state.approval.reviewerMessage
export const selectError = (state) => state.approval.error
export const selectLastUpdated = (state) => state.approval.lastUpdated
export const selectProgress = (state) => ({
  completed: state.approval.completedSteps,
  total: state.approval.totalSteps,
  percentage: Math.round((state.approval.completedSteps / state.approval.totalSteps) * 100),
})

export const selectApprovalState = (state) => ({
  status: state.approval.approvalStatus,
  reviewState: state.approval.reviewState,
  loading: state.approval.loading,
  submitting: state.approval.submitting,
  message: state.approval.reviewerMessage,
  error: state.approval.error,
  lastUpdated: state.approval.lastUpdated,
  progress: {
    completed: state.approval.completedSteps,
    total: state.approval.totalSteps,
    percentage: Math.round((state.approval.completedSteps / state.approval.totalSteps) * 100),
  },
})

export const selectCanRetry = (state) =>
  !state.approval.loading && !state.approval.submitting && state.approval.error !== null

export const selectIsInProgress = (state) =>
  state.approval.reviewState === 'in_review' || state.approval.reviewState === 'submitted'

export const selectStatusIcon = (state) => {
  const status = state.approval.approvalStatus
  const reviewState = state.approval.reviewState

  if (state.approval.loading || state.approval.submitting) {
    return 'progress_activity'
  }

  switch (status) {
    case 'approved':
      return 'check_circle'
    case 'rejected':
      return 'cancel'
    case 'under_review':
      return 'rate_review'
    case 'pending':
    default:
      return reviewState === 'submitted' ? 'schedule' : 'hourglass_empty'
  }
}

export const selectStatusColor = (state) => {
  const status = state.approval.approvalStatus

  switch (status) {
    case 'approved':
      return 'text-tertiary'
    case 'rejected':
      return 'text-error'
    case 'under_review':
      return 'text-secondary'
    case 'pending':
    default:
      return 'text-primary'
  }
}

export default approvalSlice.reducer
