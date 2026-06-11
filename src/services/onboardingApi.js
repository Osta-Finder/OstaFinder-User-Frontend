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

    // Upload files separately using the upload endpoint
    const uploadedFiles = {};

    // Upload National ID
    console.log('Uploading national ID...');
    if (onboardingData.documentation.nationalId && onboardingData.documentation.nationalId.file) {
      const nationalIdFormData = new FormData();
      nationalIdFormData.append('file', onboardingData.documentation.nationalId.file);
      
      try {
        const nationalIdResponse = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          credentials: 'include',
          body: nationalIdFormData,
        });

        if (!nationalIdResponse.ok) {
          throw new Error('Failed to upload national ID');
        }

        const nationalIdData = await nationalIdResponse.json();
        uploadedFiles.nationalId = nationalIdData.data.url;
        console.log('✓ National ID uploaded:', uploadedFiles.nationalId);
        formData.append('nationalId', uploadedFiles.nationalId);
      } catch (err) {
        console.error('Error uploading national ID:', err);
        throw err;
      }
    }

    // Upload Certificates
    console.log('Uploading certificates...');
    if (onboardingData.documentation.certificates && Array.isArray(onboardingData.documentation.certificates)) {
      console.log('Number of certificates to upload:', onboardingData.documentation.certificates.length);
      uploadedFiles.certificates = [];

      for (let i = 0; i < onboardingData.documentation.certificates.length; i++) {
        const cert = onboardingData.documentation.certificates[i];
        if (cert && cert.file) {
          const certificateFormData = new FormData();
          certificateFormData.append('file', cert.file);

          try {
            console.log(`Uploading certificate ${i + 1}/${onboardingData.documentation.certificates.length}...`);
            const certificateResponse = await fetch('http://localhost:8000/upload', {
              method: 'POST',
              credentials: 'include',
              body: certificateFormData,
            });

            if (!certificateResponse.ok) {
              throw new Error(`Failed to upload certificate ${i + 1}`);
            }

            const certificateData = await certificateResponse.json();
            uploadedFiles.certificates.push(certificateData.data.url);
            console.log(`✓ Certificate ${i + 1} uploaded:`, certificateData.data.url);
            formData.append('certificates', certificateData.data.url);
          } catch (err) {
            console.error(`Error uploading certificate ${i + 1}:`, err);
            throw err;
          }
        }
      }
    }

    console.log('All files uploaded successfully');
    console.log('Sending request to onboarding endpoint...');
    
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
