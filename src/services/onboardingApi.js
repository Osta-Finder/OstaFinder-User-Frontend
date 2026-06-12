export const submitOnboardingData = async (onboardingData) => {
  try {
    console.log('Submitting onboarding data...');

    // Build FormData with only URL strings (not file objects)
    // nationalId and certificates should already be URL strings from Redux state
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
    
    // Append URLs (strings), not file objects
    if (onboardingData.documentation.nationalId) {
      formData.append('nationalId', onboardingData.documentation.nationalId);
      console.log('✓ National ID URL appended:', onboardingData.documentation.nationalId);
    }
    
    if (onboardingData.documentation.certificates && Array.isArray(onboardingData.documentation.certificates)) {
      onboardingData.documentation.certificates.forEach((certUrl, index) => {
        formData.append('certificates', certUrl);
        console.log(`✓ Certificate ${index + 1} URL appended:`, certUrl);
      });
    }

    console.log('Sending onboarding data to backend...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000);
    
    const response = await fetch('http://localhost:8000/workers/onboarding', {
      method: 'POST',
      credentials: 'include',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    console.log('Response status:', response.status);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit onboarding data');
    }

    const result = await response.json();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Error submitting onboarding:', error);
    throw error;
  }
};
