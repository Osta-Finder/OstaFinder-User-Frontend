import { useState, useCallback } from 'react';

export const useFormValidation = (initialValues, onSubmit, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (validate) {
      const fieldErrors = validate({ ...values, [name]: e.target.value });
      setErrors(fieldErrors);
    }
  }, [values, validate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (validate) {
        const fieldErrors = validate(values);
        setErrors(fieldErrors);

        if (Object.keys(fieldErrors).length === 0) {
          await onSubmit(values);
        }
      } else {
        await onSubmit(values);
      }

      setIsSubmitting(false);
    },
    [values, validate, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};
