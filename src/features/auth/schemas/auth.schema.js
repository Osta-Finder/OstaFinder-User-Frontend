import {
  validateName,
  validateEmail,
  validatePhone,
  validatePassword,
  validateLoginemail
} from "../../../validations/common.schema";

/**
 * Validates registration form values.
 * @param {Object} values - The form values.
 * @returns {Object} Errors object. If empty, the form is valid.
 */
export const validateRegisterForm = (values) => {
  const errors = {};

  const nameError = validateName(values.name);
  if (nameError) errors.name = nameError;

  const emailError = validateEmail(values.email);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(values.phoneNumber);
  if (phoneError) errors.phoneNumber = phoneError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;
  if (values.confirmPassword && values.confirmPassword !== values.password) errors.confirmPassword = "كلمة المرور غير متطابقة";
  return errors;
};

/**
 * Validates login form values.
 * @param {Object} values - The form values.
 * @returns {Object} Errors object. If empty, the form is valid.
 */
export const validateLoginForm = (values) => {
  const errors = {};

  const emailorPhoneError = validateLoginemail(values.emailorPhone);
  if (emailorPhoneError) errors.emailorPhone = emailorPhoneError;

  const passwordError = validatePassword(values.password);
  if (passwordError) errors.password = passwordError;

  return errors;
};
