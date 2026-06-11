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
    console.log('National ID in Redux state:', onboardingData.documentation.nationalId);
    if (onboardingData.documentation.nationalId && onboardingData.documentation.nationalId.file) {
      console.log('✓ Appending national ID file:', onboardingData.documentation.nationalId.file.name, `Size: ${onboardingData.documentation.nationalId.file.size} bytes`);
      formData.append('nationalId', onboardingData.documentation.nationalId.file);
    } else {
      console.warn('✗ National ID file not found or invalid');
      console.warn('National ID object:', onboardingData.documentation.nationalId);
    }

    // Certificates
    console.log('Certificates in Redux state:', onboardingData.documentation.certificates);
    if (onboardingData.documentation.certificates && Array.isArray(onboardingData.documentation.certificates)) {
      console.log('Number of certificates to send:', onboardingData.documentation.certificates.length);
      onboardingData.documentation.certificates.forEach((cert, index) => {
        console.log(`Certificate ${index}:`, cert);
        if (cert && cert.file) {
          console.log(`✓ Appending certificate ${index}:`, cert.file.name, `Size: ${cert.file.size} bytes`);
          formData.append('certificates', cert.file);
        } else {
          console.warn(`✗ Certificate ${index} is invalid or has no file:`, cert);
        }
      });
      console.log('✓ All certificates appended to FormData');
    } else {
      console.warn('✗ Certificates array not found or not an array');
    }

    // Log FormData contents
    console.log('FormData contents:');
    let certificateCount = 0;
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
        if (key === 'certificates') certificateCount++;
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    console.log(`✓ Total certificates in FormData: ${certificateCount}`);

    console.log('Sending request to backend...');
    
    // Create AbortController for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutes timeout
    
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
