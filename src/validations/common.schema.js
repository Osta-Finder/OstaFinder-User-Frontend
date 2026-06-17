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
  // Standard phone format check - egypt phone standard matches mockup: +20 1X XXX XXXX
  // We can be flexible but ensure it's a valid phone (digits, optional +, space, length between 9 and 15)
  const cleanPhone = phone.replace(/[\s\-\(\)]/g, "");
  const phoneRegex = /^01[0125][0-9]{8}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return "رقم الهاتف غير صالح (مثال: +20 1XXXXXXXX)";
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
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/;
  if (!passwordRegex.test(password)) {
    return "كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم ورمز خاص";
  }
  return "";
};
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "تأكيد كلمة المرور مطلوب";
  }
  if (password !== confirmPassword) {
    return "كلمة المرور وتأكيد كلمة المرور لا تتطابق";
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

export const validateLoginPassword = (password) => {
  if (!password) {
    return "كلمة المرور مطلوبة";
  }
  return "";
};
export const validateField = (name, value) => {
  switch (name) {
    case "title":
      if (!value || !value.trim()) {
        return " العنوان مطلوب";
      }
      if (value && value.trim().length > 50) {
        return " العنوان لا يجب أن يتجاوز 50 حرفاً";
      }
      return "";
    case "city":
      if (!value || !value.trim()) return "المدينة مطلوبة";
      if (value.trim().length > 50) return "اسم المدينة لا يجب أن يتجاوز 50 حرفاً";
      return "";
    case "area":
      if (!value || !value.trim()) return "المنطقة مطلوبة";
      if (value.trim().length > 50) return "اسم المنطقة لا يجب أن يتجاوز 50 حرفاً";
      return "";
    case "street":
      if (!value || !value.trim()) return "الشارع مطلوب";
      if (value.trim().length > 100) return "اسم الشارع لا يجب أن يتجاوز 100 حرف";
      return "";
    case "buildingNumber":
      if (!value || !value.trim()) return "رقم المبنى مطلوب";
      if (typeof value === "string" && !/^\d+$/.test(value.trim())) return "رقم المبنى يجب أن يكون رقماً";
      if (value.trim().length > 10) return "رقم المبنى لا يجب أن يتجاوز 10 أحرف";
      return "";
    case "floor":
      if (typeof value === "string" && !/^\d+$/.test(value.trim())) return "الدور يجب أن يكون رقماً";
      if (value && value.trim().length > 10) return "الدور لا يجب أن يتجاوز 10 أحرف";
      return "";
    case "apartment":
      if (value && value.trim().length > 10) return "الشقة لا يجب أن تتجاوز 10 أحرف";
      return "";
    case "address":
      if (!value || !value.trim()) return "العنوان التفصيلي مطلوب";
      if (value.trim().length > 250) return "العنوان التفصيلي لا يجب أن يتجاوز 250 حرفاً";
      return "";
    default:
      return "";
  }
};