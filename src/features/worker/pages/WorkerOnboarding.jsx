import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentStep } from '../../../store/slices/onboardingSlice';
import { setCredentials } from '../../../store/slices/authSlice';
import { useSubmitOnboardingMutation } from '../../../services/workerApi';
import { useGetMeQuery } from '../../../services/authApi';
import { updateBasicData } from '../../../store/slices/onboardingSlice';
import Navbar from '../../../components/layout/Navbar';
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

  // Fetch user data and pre-fill basic data fields on every page load
  const { data: meData } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (!meData) return;
    const nameParts = (meData.name || '').trim().split(' ');
    dispatch(updateBasicData({
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      email: meData.email || '',
      phone: meData.phoneNumber || '',
    }));
  }, [meData]);

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
    <div className="min-h-screen flex flex-col bg-gray-50" dir="rtl">
      <Navbar />

      <main className="flex-1 flex flex-col items-center px-4 pt-24 pb-16">
        <div className="w-full max-w-xl">

          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#a83900]/10 mb-4">
              <span className="material-symbols-outlined text-[#a83900] text-3xl">engineering</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              إكمال الملف الشخصي
            </h1>
            <p className="text-sm text-gray-500">
              خطوة أخيرة للبدء في استقبال الطلبات كخبير معتمد
            </p>
          </div>

          <ProgressStepper currentStep={currentStep} />

          {submitError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-5 text-sm text-red-700">
              <span className="material-symbols-outlined text-base mt-0.5">error</span>
              {submitError}
            </div>
          )}

          {/* Step card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 justify-between">
            {currentStep > 1 ? (
              <button
                onClick={handlePreviousStep}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-base">arrow_forward</span>
                السابق
              </button>
            ) : (
              <div />
            )}

            {/* Step indicator */}
            <span className="text-xs text-gray-400">الخطوة {currentStep} من 3</span>

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={!canProceed}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${canProceed
                    ? 'bg-[#a83900] text-white hover:bg-[#8f2f00] shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                التالي
                <span className="material-symbols-outlined text-base">arrow_back</span>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed || isSubmitting}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${canProceed && !isSubmitting
                    ? 'bg-[#a83900] text-white hover:bg-[#8f2f00] shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    إرسال الطلب
                    <span className="material-symbols-outlined text-base">send</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      </main>

      <footer className="py-5 text-center text-xs text-gray-400 border-t border-gray-100">
        © {new Date().getFullYear()} Osta Finder — جميع الحقوق محفوظة
      </footer>
    </div>
  );
}
