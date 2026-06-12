import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  basicData: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  },
  professional: {
    specialization: '',
    yearsOfExperience: '',
    bio: '',
  },
  documentation: {
    nationalId: '', // Store URL string only
    nationalIdPreview: null, // Store preview separately for UI display
    nationalIdFileName: '', // Store file name for display
    certificates: [], // Store URL strings only
    certificatePreviews: [], // Store previews separately for UI display
    certificateFileNames: [], // Store file names for display
  },
  isLoading: false,
  error: null,
};

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    updateBasicData: (state, action) => {
      state.basicData = { ...state.basicData, ...action.payload };
    },
    updateProfessional: (state, action) => {
      state.professional = { ...state.professional, ...action.payload };
    },
    setNationalId: (state, action) => {
      // Store URL string in nationalId, preview for UI, and filename for display
      state.documentation.nationalId = action.payload.url || '';
      state.documentation.nationalIdPreview = action.payload.preview;
      state.documentation.nationalIdFileName = action.payload.fileName || '';
    },
    addCertificate: (state, action) => {
      // Store URL string and metadata separately
      state.documentation.certificates.push(action.payload.url || '');
      state.documentation.certificatePreviews.push(action.payload.preview);
      state.documentation.certificateFileNames.push(action.payload.fileName || '');
    },
    removeCertificate: (state, action) => {
      const index = action.payload;
      state.documentation.certificates.splice(index, 1);
      state.documentation.certificatePreviews.splice(index, 1);
      state.documentation.certificateFileNames.splice(index, 1);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetOnboarding: (state) => {
      return initialState;
    },
  },
});

export const {
  setCurrentStep,
  updateBasicData,
  updateProfessional,
  setNationalId,
  addCertificate,
  removeCertificate,
  setLoading,
  setError,
  resetOnboarding,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
