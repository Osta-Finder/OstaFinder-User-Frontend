export const submitOnboardingData = async (onboardingData) => {
  try {
    console.log('Submitting onboarding data...');
    console.log('Full onboarding data:', JSON.stringify(onboardingData, null, 2));

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

    // National ID
    if (onboardingData.documentation.nationalId && onboardingData.documentation.nationalId.file) {
      console.log('Appending national ID file:', onboardingData.documentation.nationalId.file.name);
      formData.append('nationalId', onboardingData.documentation.nationalId.file);
    } else {
      console.warn('National ID file not found or invalid');
    }

    // Certificates
    if (onboardingData.documentation.certificates && Array.isArray(onboardingData.documentation.certificates)) {
      console.log('Number of certificates:', onboardingData.documentation.certificates.length);
      onboardingData.documentation.certificates.forEach((cert, index) => {
        if (cert && cert.file) {
          console.log(`Appending certificate ${index}:`, cert.file.name);
          formData.append('certificates', cert.file);
        } else {
          console.warn(`Certificate ${index} is invalid or has no file:`, cert);
        }
      });
    } else {
      console.warn('Certificates array not found or not an array');
    }

    console.log('Sending request to backend...');
    const response = await fetch('http://localhost:8000/workers/onboarding', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

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
