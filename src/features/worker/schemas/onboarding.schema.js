export const basicDataSchema = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Zأ-ي\s]+$/,
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Zأ-ي\s]+$/,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    required: true,
    minLength: 10,
    pattern: /^[\d\s\-\+]+$/,
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  address: {
    required: true,
    minLength: 5,
    maxLength: 200,
  },
};

export const professionalSchema = {
  specialization: {
    required: true,
  },
  yearsOfExperience: {
    required: true,
    min: 0,
    max: 70,
  },
  bio: {
    maxLength: 200,
  },
};

export const documentationSchema = {
  nationalId: {
    required: true,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxSize: 5242880,
  },
  certificates: {
    maxFiles: 10,
    acceptedFormats: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
    maxSize: 5242880,
  },
};

export const validateField = (fieldName, value, schema) => {
  const rules = schema[fieldName];
  if (!rules) return null;

  if (rules.required && !value) {
    return `${fieldName} is required`;
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `${fieldName} must not exceed ${rules.maxLength} characters`;
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    return `${fieldName} format is invalid`;
  }

  if (rules.min !== undefined && value < rules.min) {
    return `${fieldName} must be at least ${rules.min}`;
  }

  if (rules.max !== undefined && value > rules.max) {
    return `${fieldName} must not exceed ${rules.max}`;
  }

  return null;
};
