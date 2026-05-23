import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicData } from '../../../../store/slices/onboardingSlice';

export default function BasicDataStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const basicData = useSelector((state) => state.onboarding.basicData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
  }, [basicData, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBasicData({ [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: '1px solid #e1e3e4',
        paddingBottom: '1rem',
      }}>
        <span className="material-symbols-outlined" style={{
          color: '#a83900',
          fontSize: '1.5rem',
        }}>
          person
        </span>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#191c1d',
        }}>
          البيانات الأساسية
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
            الاسم الأول <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={basicData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="أدخل اسمك الأول"
            style={inputStyle(!!errors.firstName)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlurCapture={(e) => e.target.style.borderColor = errors.firstName ? '#ba1a1a' : '#e1e3e4'}
          />
          {errors.firstName && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.firstName}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
            الاسم الأخير <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={basicData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="أدخل اسمك الأخير"
            style={inputStyle(!!errors.lastName)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlurCapture={(e) => e.target.style.borderColor = errors.lastName ? '#ba1a1a' : '#e1e3e4'}
          />
          {errors.lastName && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.lastName}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
            البريد الإلكتروني <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={basicData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="example@email.com"
            style={inputStyle(!!errors.email)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlurCapture={(e) => e.target.style.borderColor = errors.email ? '#ba1a1a' : '#e1e3e4'}
          />
          {errors.email && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.email}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
            رقم الهاتف <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={basicData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+966 50 0000000"
            style={inputStyle(!!errors.phone)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlurCapture={(e) => e.target.style.borderColor = errors.phone ? '#ba1a1a' : '#e1e3e4'}
          />
          {errors.phone && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.phone}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
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
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlurCapture={(e) => e.target.style.borderColor = errors.city ? '#ba1a1a' : '#e1e3e4'}
          />
          {errors.city && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.city}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
            العنوان <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="text"
            name="address"
            value={basicData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="أدخل عنوانك"
            style={inputStyle(!!errors.address)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlurCapture={(e) => e.target.style.borderColor = errors.address ? '#ba1a1a' : '#e1e3e4'}
          />
          {errors.address && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.address}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
