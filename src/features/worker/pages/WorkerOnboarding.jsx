import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep } from '../../../store/slices/onboardingSlice';
import { submitOnboardingData } from '../../../services/onboardingApi';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await submitOnboardingData(onboardingData);
      console.log('Onboarding submitted successfully:', response);
      
      // Set flag to indicate onboarding is complete
      localStorage.setItem('onboardingCompleted', 'true');
      
      navigate('/onboarding-success');
    } catch (err) {
      console.error('Error submitting:', err);
      setError(err.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
      alert(err.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f8f9fa',
      color: '#191c1d',
    }}>
      <OnboardingHeader />
      <main style={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2.5rem 1rem',
      }}>
        <div style={{ maxWidth: '42rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#191c1d',
              marginBottom: '0.5rem',
            }}>
              إكمال الملف الشخصي للفني
            </h1>
            <p style={{
              fontSize: '1rem',
              color: '#594139',
            }}>
              خطوة أخيرة للبدء في استقبال الطلبات كخبير معتمد.
            </p>
          </div>

          <ProgressStepper currentStep={currentStep} />

          {error && (
            <div style={{
              backgroundColor: '#ffebee',
              border: '1px solid #ef5350',
              borderRadius: '0.75rem',
              padding: '1rem',
              marginBottom: '1rem',
              color: '#c62828',
            }}>
              {error}
            </div>
          )}

          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e1e3e4',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          }}>
            {renderStep()}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            justifyContent: 'center',
          }}>
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1 || isSubmitting}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: '500',
                fontSize: '1rem',
                border: '2px solid #8d7167',
                color: '#191c1d',
                backgroundColor: 'transparent',
                cursor: currentStep === 1 || isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: currentStep === 1 || isSubmitting ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (currentStep !== 1 && !isSubmitting) {
                  e.target.style.backgroundColor = '#f3f4f5';
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              السابق
            </button>
            <button
              onClick={currentStep === 3 ? handleSubmit : handleNextStep}
              disabled={!canProceed || isSubmitting}
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '9999px',
                fontWeight: '500',
                fontSize: '1rem',
                backgroundColor: '#a83900',
                color: '#ffffff',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(168, 57, 0, 0.39)',
                cursor: !canProceed || isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                opacity: !canProceed || isSubmitting ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              onMouseEnter={(e) => {
                if (canProceed && !isSubmitting) {
                  e.target.style.opacity = '0.9';
                }
              }}
              onMouseLeave={(e) => {
                if (canProceed && !isSubmitting) {
                  e.target.style.opacity = '1';
                }
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                      hourglass_empty
                    </span>
                  </span>
                  جاري الإرسال...
                </>
              ) : (
                <>
                  {currentStep === 3 ? 'إرسال للمراجعة' : 'الخطوة التالية'}
                  <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }} dir="ltr">
                    {currentStep === 3 ? 'send' : 'arrow_back'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      <OnboardingFooter />
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
