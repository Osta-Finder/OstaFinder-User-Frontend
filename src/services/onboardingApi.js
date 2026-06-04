export const submitOnboardingData = async (onboardingData) => {
  try {
    console.log('🚀 Submitting onboarding data...');
    console.log('Data:', onboardingData);

    const formData = new FormData();

    formData.append('firstName', onboardingData.basicData.firstName);
    formData.append('lastName', onboardingData.basicData.lastName);
    formData.append('email', onboardingData.basicData.email);
    formData.append('phone', onboardingData.basicData.phone);
    formData.append('city', onboardingData.basicData.city);
    formData.append('address', onboardingData.basicData.address);

    formData.append('specialization', onboardingData.professional.specialization);
    formData.append('yearsOfExperience', onboardingData.professional.yearsOfExperience);
    formData.append('bio', onboardingData.professional.bio);

    if (onboardingData.documentation.nationalId) {
      formData.append('nationalId', onboardingData.documentation.nationalId);
    }

    onboardingData.documentation.certificates.forEach((cert, index) => {
      formData.append(`certificate_${index}`, cert);
    });

    console.log('📤 Sending request to backend...');
    const response = await fetch('http://localhost:3000/api/worker/onboarding', {
      method: 'POST',
      body: formData,
    });

    console.log('📥 Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit onboarding data');
    }

    const result = await response.json();
    console.log('✅ Success:', result);
    return result;
  } catch (error) {
    console.error('❌ Error submitting onboarding:', error);
    throw error;
  }
};
