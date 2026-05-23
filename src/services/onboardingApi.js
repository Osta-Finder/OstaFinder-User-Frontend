export const submitOnboardingData = async (onboardingData) => {
  try {
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

    const response = await fetch('/api/worker/onboarding', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit onboarding data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting onboarding:', error);
    throw error;
  }
};

export const getOnboardingStatus = async () => {
  try {
    const response = await fetch('/api/worker/onboarding/status');

    if (!response.ok) {
      throw new Error('Failed to fetch onboarding status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    throw error;
  }
};
