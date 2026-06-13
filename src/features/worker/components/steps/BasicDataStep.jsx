import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicData } from '../../../../store/slices/onboardingSlice';
import { useGetMeQuery } from '../../../../services/authApi';

export default function BasicDataStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const basicData = useSelector((state) => state.onboarding.basicData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Always fetch fresh from backend — skip cache with refetchOnMountOrArgChange
  const { data: meData, isLoading: isFetchingUser } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // meData IS the user object directly (backend returns flat user, not { user: ... })
  useEffect(() => {
    if (!meData) return;

    const nameParts = (meData.name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    dispatch(
      updateBasicData({
        firstName,
        lastName,
        email: meData.email || '',
        phone: meData.phoneNumber || '',
        // city and address not in backend — keep existing or empty
      })
    );
  }, [meData]);

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        return !value.trim() ? 'الاسم الأول مطلوب' : '';
      case 'lastName':
        return !value.trim() ? 'الاسم الأخير مطلوب' : '';
      case 'email':
        if (!value.trim()) return 'البريد الإلكتروني مطلوب';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'البريد الإلكتروني غير صحيح';
        return '';
      case 'phone':
        return !value.trim() ? 'رقم الهاتف مطلوب' : '';
      case 'city':
        return !value.trim() ? 'المدينة مطلوبة' : '';
      case 'address':
        return !value.trim() ? 'العنوان مطلوب' : '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(basicData).forEach((key) => {
      const error = validateField(key, basicData[key]);
      if (error) newErrors[key] = error;
    });
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = validateForm();
    onValidationChange(isValid);
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

  const inputStyle = (hasError) => ({
    width: '100%',
    backgroundColor: '#f8f9fa',
    border: `1px solid ${hasError ? '#ba1a1a' : '#e1e3e4'}`,
    borderRadius: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    color: '#191c1d',
    fontFamily: "'Be Vietnam Pro', sans-serif",
    transition: 'all 0.3s',
    outline: 'none',
  });

  const renderField = (name, label, type = 'text', placeholder = '') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ fontWeight: '500', fontSize: '1rem', color: '#191c1d', display: 'flex', gap: '0.25rem' }}>
        {label} <span style={{ color: '#a83900' }}>*</span>
      </label>
      <input
        type={type}
        name={name}
        value={basicData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={isFetchingUser ? 'جاري التحميل...' : placeholder}
        disabled={isFetchingUser}
        style={{
          ...inputStyle(!!errors[name]),
          opacity: isFetchingUser ? 0.6 : 1,
        }}
        onFocus={(e) => (e.target.style.borderColor = '#a83900')}
        onBlurCapture={(e) =>
          (e.target.style.borderColor = errors[name] ? '#ba1a1a' : '#e1e3e4')
        }
      />
      {errors[name] && (
        <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors[name]}</span>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #e1e3e4', paddingBottom: '1rem' }}>
        <span className="material-symbols-outlined" style={{ color: '#a83900', fontSize: '1.5rem' }}>person</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#191c1d' }}>البيانات الأساسية</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {renderField('firstName', 'الاسم الأول', 'text', 'أدخل اسمك الأول')}
        {renderField('lastName', 'الاسم الأخير', 'text', 'أدخل اسمك الأخير')}
        {renderField('email', 'البريد الإلكتروني', 'email', 'example@email.com')}
        {renderField('phone', 'رقم الهاتف', 'tel', '+966 50 0000000')}

        {/* City — not returned by backend, user fills manually */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', fontSize: '1rem', color: '#191c1d', display: 'flex', gap: '0.25rem' }}>
            المدينة <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="text"
            name="city"
            value={basicData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="أدخل مدينتك"
            style={inputStyle(!!errors.city)}
            onFocus={(e) => (e.target.style.borderColor = '#a83900')}
            onBlurCapture={(e) => (e.target.style.borderColor = errors.city ? '#ba1a1a' : '#e1e3e4')}
          />
          {errors.city && <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors.city}</span>}
        </div>

        {/* Address — not returned by backend, user fills manually */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', fontSize: '1rem', color: '#191c1d', display: 'flex', gap: '0.25rem' }}>
            العنوان <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="text"
            name="address"
            value={basicData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="أدخل عنوانك التفصيلي"
            style={inputStyle(!!errors.address)}
            onFocus={(e) => (e.target.style.borderColor = '#a83900')}
            onBlurCapture={(e) => (e.target.style.borderColor = errors.address ? '#ba1a1a' : '#e1e3e4')}
          />
          {errors.address && <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors.address}</span>}
        </div>
      </div>
    </div>
  );
}
