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
    nationalId: null,
    nationalIdPreview: null,
    certificates: [],
    certificatePreviews: [],
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
      state.documentation.nationalId = action.payload.file;
      state.documentation.nationalIdPreview = action.payload.preview;
    },
    addCertificate: (state, action) => {
      state.documentation.certificates.push(action.payload.file);
      state.documentation.certificatePreviews.push(action.payload.preview);
    },
    removeCertificate: (state, action) => {
      const index = action.payload;
      state.documentation.certificates.splice(index, 1);
      state.documentation.certificatePreviews.splice(index, 1);
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
