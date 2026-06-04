import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setCurrentStep,
  updateBasicData,
  updateProfessional,
  setNationalId,
  addCertificate,
  removeCertificate,
  setLoading,
  setError,
  resetOnboarding,
} from '../store/slices/onboardingSlice';

export const useOnboarding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onboarding = useSelector((state) => state.onboarding);

  const goToStep = (step) => {
    if (step >= 1 && step <= 3) {
      dispatch(setCurrentStep(step));
    }
  };

  const nextStep = () => {
    if (onboarding.currentStep < 3) {
      dispatch(setCurrentStep(onboarding.currentStep + 1));
    }
  };

  const previousStep = () => {
    if (onboarding.currentStep > 1) {
      dispatch(setCurrentStep(onboarding.currentStep - 1));
    }
  };

  const updateBasic = (data) => {
    dispatch(updateBasicData(data));
  };

  const updateProfessionalData = (data) => {
    dispatch(updateProfessional(data));
  };

  const uploadNationalId = (file, preview) => {
    dispatch(setNationalId({ file, preview }));
  };

  const uploadCertificate = (file, preview) => {
    dispatch(addCertificate({ file, preview }));
  };

  const deleteCertificate = (index) => {
    dispatch(removeCertificate(index));
  };

  const startLoading = () => {
    dispatch(setLoading(true));
  };

  const stopLoading = () => {
    dispatch(setLoading(false));
  };

  const setErrorMessage = (error) => {
    dispatch(setError(error));
  };

  const clearError = () => {
    dispatch(setError(null));
  };

  const reset = () => {
    dispatch(resetOnboarding());
  };

  const completeOnboarding = () => {
    reset();
    navigate('/onboarding-success');
  };

  return {
    currentStep: onboarding.currentStep,
    basicData: onboarding.basicData,
    professional: onboarding.professional,
    documentation: onboarding.documentation,
    isLoading: onboarding.isLoading,
    error: onboarding.error,
    goToStep,
    nextStep,
    previousStep,
    updateBasic,
    updateProfessionalData,
    uploadNationalId,
    uploadCertificate,
    deleteCertificate,
    startLoading,
    stopLoading,
    setErrorMessage,
    clearError,
    reset,
    completeOnboarding,
  };
};
