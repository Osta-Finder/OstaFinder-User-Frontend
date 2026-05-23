import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBasicData } from '../../../../store/slices/onboardingSlice';

export default function BasicDataStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const basicData = useSelector((state) => state.onboarding.basicData);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!basicData.firstName.trim()) newErrors.firstName = 'الاسم الأول مطلوب';
    if (!basicData.lastName.trim()) newErrors.lastName = 'الاسم الأخير مطلوب';
    if (!basicData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (basicData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    if (!basicData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب';
    if (!basicData.city.trim()) newErrors.city = 'المدينة مطلوبة';
    if (!basicData.address.trim()) newErrors.address = 'العنوان مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = validateForm();
    onValidationChange(isValid);
  }, [basicData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateBasicData({ [name]: value }));
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
            placeholder="أدخل اسمك الأول"
            style={inputStyle(!!errors.firstName)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlur={(e) => e.target.style.borderColor = errors.firstName ? '#ba1a1a' : '#e1e3e4'}
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
            placeholder="أدخل اسمك الأخير"
            style={inputStyle(!!errors.lastName)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlur={(e) => e.target.style.borderColor = errors.lastName ? '#ba1a1a' : '#e1e3e4'}
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
            placeholder="example@email.com"
            style={inputStyle(!!errors.email)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlur={(e) => e.target.style.borderColor = errors.email ? '#ba1a1a' : '#e1e3e4'}
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
            placeholder="+966 50 0000000"
            style={inputStyle(!!errors.phone)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlur={(e) => e.target.style.borderColor = errors.phone ? '#ba1a1a' : '#e1e3e4'}
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
            placeholder="أدخل مدينتك"
            style={inputStyle(!!errors.city)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlur={(e) => e.target.style.borderColor = errors.city ? '#ba1a1a' : '#e1e3e4'}
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
            placeholder="أدخل عنوانك"
            style={inputStyle(!!errors.address)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
            onBlur={(e) => e.target.style.borderColor = errors.address ? '#ba1a1a' : '#e1e3e4'}
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
