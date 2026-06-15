import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicData } from '../../../../store/slices/onboardingSlice';

// ── مستقل بره الـ component عشان ميتعملش re-create في كل render ──
const Field = ({ name, label, type = 'text', placeholder, icon, disabled, value, onChange, onBlur, error }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700 flex gap-1">
      {label} <span className="text-[#a83900]">*</span>
    </label>
    <div className="relative">
      {icon && (
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full bg-gray-50 border rounded-xl py-3 text-sm text-gray-900 outline-none transition-all
          ${icon ? 'pr-10 pl-4' : 'px-4'}
          ${error
            ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100'
            : 'border-gray-200 focus:border-[#a83900] focus:ring-2 focus:ring-[#a83900]/10'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-200' : ''}`}
      />
    </div>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">error</span>
        {error}
      </p>
    )}
  </div>
);

export default function BasicDataStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const basicData = useSelector((state) => state.onboarding.basicData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':  return !value.trim() ? 'الاسم الأول مطلوب' : '';
      case 'lastName':   return !value.trim() ? 'الاسم الأخير مطلوب' : '';
      case 'email':
        if (!value.trim()) return 'البريد الإلكتروني مطلوب';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'البريد الإلكتروني غير صحيح';
        return '';
      case 'phone':
        return !value.trim() ? 'رقم الهاتف مطلوب' : '';
      case 'city':
        if (!value.trim()) return 'المدينة مطلوبة';
        if (value.trim().length < 4) return 'المدينة يجب أن تكون 4 أحرف على الأقل';
        return '';
      case 'address':
        if (!value.trim()) return 'العنوان مطلوب';
        if (value.trim().length < 6) return 'العنوان يجب أن يكون 6 أحرف على الأقل';
        return '';
      default: return '';
    }
  };

  const validateForm = () =>
    Object.keys(basicData).every((key) => !validateField(key, basicData[key]));

  useEffect(() => {
    onValidationChange(validateForm());
  }, [basicData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBasicData({ [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-9 h-9 rounded-full bg-[#a83900]/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-[#a83900] text-lg">person</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">البيانات الأساسية</h2>
          <p className="text-xs text-gray-500">معلوماتك الشخصية للتواصل</p>
        </div>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field name="firstName" label="الاسم الأول"       placeholder="أدخل اسمك الأول"        icon="badge"         value={basicData.firstName} onChange={handleChange} onBlur={handleBlur} error={errors.firstName} />
        <Field name="lastName"  label="الاسم الأخير"      placeholder="أدخل اسمك الأخير"       icon="badge"         value={basicData.lastName}  onChange={handleChange} onBlur={handleBlur} error={errors.lastName} />
        <Field name="email"     label="البريد الإلكتروني" placeholder="example@email.com"       icon="mail"  type="email" disabled value={basicData.email}    onChange={handleChange} onBlur={handleBlur} error={errors.email} />
        <Field name="phone"     label="رقم الهاتف"        placeholder="+966 50 0000000"         icon="call"  type="tel"   disabled value={basicData.phone}    onChange={handleChange} onBlur={handleBlur} error={errors.phone} />
        <Field name="city"      label="المدينة"            placeholder="أدخل مدينتك"             icon="location_city" value={basicData.city}      onChange={handleChange} onBlur={handleBlur} error={errors.city} />
        <Field name="address"   label="العنوان"            placeholder="العنوان التفصيلي"        icon="home_pin"      value={basicData.address}   onChange={handleChange} onBlur={handleBlur} error={errors.address} />
      </div>
    </div>
  );
}
