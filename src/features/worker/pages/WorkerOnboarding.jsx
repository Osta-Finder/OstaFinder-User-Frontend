import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep } from '../../../store/slices/onboardingSlice';
import { setCredentials } from '../../../store/slices/authSlice';
import { useSubmitOnboardingMutation } from '../../../services/workerApi';
import OnboardingHeader from '../components/OnboardingHeader';
import OnboardingFooter from '../components/OnboardingFooter';
import ProgressStepper from '../components/ProgressStepper';
import BasicDataStep from '../components/steps/BasicDataStep';
import ProfessionalStep from '../components/steps/ProfessionalStep';
import DocumentationStep from '../components/steps/DocumentationStep';

export default function WorkerOnboarding() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.onboarding.currentStep);
  const onboardingData = useSelector((state) => state.onboarding);
  const [canProceed, setCanProceed] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [submitOnboarding, { isLoading: isSubmitting }] = useSubmitOnboardingMutation();

  const handleNextStep = () => {
    if (currentStep < 3) {
      dispatch(setCurrentStep(currentStep + 1));
      setCanProceed(false);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
      setCanProceed(true);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    // Backend uses multer upload.none() — accepts text fields only (no file uploads)
    const formData = new FormData();

    // Basic data
    formData.append('firstName', onboardingData.basicData.firstName);
    formData.append('lastName', onboardingData.basicData.lastName);
    formData.append('email', onboardingData.basicData.email);
    formData.append('phone', onboardingData.basicData.phone);
    formData.append('city', onboardingData.basicData.city);
    formData.append('address', onboardingData.basicData.address);

    // Professional data
    formData.append('specialization', onboardingData.professional.specialization);
    formData.append('yearsOfExperience', String(onboardingData.professional.yearsOfExperience));
    if (onboardingData.professional.bio) {
      formData.append('bio', onboardingData.professional.bio);
    }

    // Documentation — send Supabase URLs (strings) stored in Redux after upload
    // nationalId is the Supabase public URL set by DocumentationStep after upload
    if (onboardingData.documentation.nationalId) {
      formData.append('nationalId', onboardingData.documentation.nationalId);
    }
    // certificates is an array of Supabase public URLs
    onboardingData.documentation.certificates.forEach((url) => {
      formData.append('certificates', url);
    });

    try {
      const result = await submitOnboarding(formData).unwrap();

      // Backend returns { success, message, data: updatedWorker }
      // workerApi.onQueryStarted already dispatches setCredentials with result.data
      // but we also update here as a safety net
      if (result?.data) {
        dispatch(setCredentials({ user: result.data }));
      }

      navigate('/worker/pending-approval', { replace: true });
    } catch (err) {
      console.error('Onboarding submit error:', err);
      const msg =
        err?.data?.message || err?.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.';
      setSubmitError(msg);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicDataStep onValidationChange={setCanProceed} />;
      case 2:
        return <ProfessionalStep onValidationChange={setCanProceed} />;
      case 3:
        return <DocumentationStep onValidationChange={setCanProceed} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa',
        color: '#191c1d',
      }}
    >
      <OnboardingHeader />
      <main
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2.5rem 1rem',
        }}
      >
        <div style={{ maxWidth: '42rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#191c1d',
                marginBottom: '0.5rem',
              }}
            >
              إكمال الملف الشخصي للفني
            </h1>
            <p style={{ fontSize: '1rem', color: '#594139' }}>
              خطوة أخيرة للبدء في استقبال الطلبات كخبير معتمد.
            </p>
          </div>

          <ProgressStepper currentStep={currentStep} />

          {submitError && (
            <div
              style={{
                backgroundColor: '#ffebee',
                border: '1px solid #ef5350',
                borderRadius: '0.75rem',
                padding: '1rem',
                marginBottom: '1rem',
                color: '#c62828',
              }}
            >
              {submitError}
            </div>
          )}

          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e1e3e4',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}
          >
            {renderStep()}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center',
            }}
          >
            {currentStep > 1 && (
              <button
                onClick={handlePreviousStep}
                disabled={isSubmitting}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e1e3e4',
                  backgroundColor: '#fff',
                  color: '#191c1d',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                السابق
              </button>
            )}

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={!canProceed}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: canProceed ? '#a83900' : '#e1e3e4',
                  color: canProceed ? '#fff' : '#999',
                  fontSize: '1rem',
                  cursor: canProceed ? 'pointer' : 'not-allowed',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  transition: 'all 0.2s',
                }}
              >
                التالي
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  backgroundColor: canProceed && !isSubmitting ? '#a83900' : '#e1e3e4',
                  color: canProceed && !isSubmitting ? '#fff' : '#999',
                  fontSize: '1rem',
                  cursor: canProceed && !isSubmitting ? 'pointer' : 'not-allowed',
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                }}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '1.1rem', animation: 'spin 1s linear infinite' }}
                    >
                      autorenew
                    </span>
                    جاري الإرسال...
                  </>
                ) : (
                  'إرسال الطلب'
                )}
              </button>
            )}
          </div>
        </div>
      </main>
      <OnboardingFooter />
    </div>
  );
}
