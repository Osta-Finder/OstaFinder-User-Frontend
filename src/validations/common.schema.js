/**
 * Common validation utilities for OstaFinder forms.
 */

export const validateName = (name) => {
  if (!name || name.trim().length === 0) {
    return "الاسم الكامل مطلوب";
  }
  if (name.trim().length < 3) {
    return "الاسم يجب أن يكون 3 أحرف على الأقل";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!email || email.trim().length === 0) {
    return "البريد الإلكتروني مطلوب";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return "البريد الإلكتروني غير صالح (مثال: example@email.com)";
  }
  return "";
};

export const validatePhone = (phone) => {
  if (!phone || phone.trim().length === 0) {
    return "رقم الهاتف مطلوب";
  }
  // Standard phone format check - Saudi Arabia phone standard matches mockup: +966 5X XXX XXXX
  // We can be flexible but ensure it's a valid phone (digits, optional +, space, length between 9 and 15)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^\+?[0-9]{9,15}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return "رقم الهاتف غير صالح (مثال: +966 5XXXXXXXX)";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "كلمة المرور مطلوبة";
  }
  if (password.length < 8) {
    return "كلمة المرور يجب أن لا تقل عن 8 رموز";
  }
  return "";
};

export const validateLoginemail = (email) => {
  if (!email || email.trim().length === 0) {
    return "البريد الإلكتروني أو رقم الهاتف مطلوب";
  }
  // Check if it looks like an email or a phone
  if (email.includes("@")) {
    return validateEmail(email);
  } else {
    // Treat as phone number or generic
    const cleanPhone = email.replace(/[\s\-\(\)]/g, "");
    if (!/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
      return "يرجى إدخال بريد إلكتروني صالح أو رقم هاتف صحيح";
    }
  }
  return "";
};
