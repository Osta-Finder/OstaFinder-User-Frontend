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
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit onboarding data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting onboarding:', error);
    throw error;
  }
};

export const getOnboardingStatus = async () => {
  try {
    const response = await fetch('/api/worker/onboarding/status', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch onboarding status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching onboarding status:', error);
    throw error;
  }
};

export const updateOnboardingStep = async (step, data) => {
  try {
    const response = await fetch(`/api/worker/onboarding/step/${step}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update onboarding step');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating onboarding step:', error);
    throw error;
  }
};

export const uploadFile = async (file, fileType) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);

    const response = await fetch('/api/worker/onboarding/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to upload file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
