import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfessional } from '../../../../store/slices/onboardingSlice';

export default function ProfessionalStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const professional = useSelector((state) => state.onboarding.professional);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [charCount, setCharCount] = useState(professional.bio.length);

  const specializations = [
    'سباكة',
    'كهرباء',
    'نجارة',
    'تكييف وتبريد',
    'صيانة عامة',
    'دهان',
    'تركيب أبواب وشبابيك',
    'تمديدات غاز',
  ];

  const isFormValid = () => {
    if (!professional.specialization) return false;
    if (!professional.yearsOfExperience) return false;
    if (professional.yearsOfExperience < 0) return false;
    return true;
  };

  const validateField = (name, value) => {
    if (name === 'specialization') return !value ? 'التخصص مطلوب' : '';
    if (name === 'yearsOfExperience') {
      if (!value && value !== 0) return 'سنوات الخبرة مطلوبة';
      if (value < 0) return 'يجب أن تكون سنوات الخبرة موجبة';
    }
    return '';
  };

  // Only update canProceed — never show errors on initial render
  useEffect(() => {
    onValidationChange(isFormValid());
  }, [professional]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bio' && value.length <= 200) {
      setCharCount(value.length);
      dispatch(updateProfessional({ [name]: value }));
    } else if (name !== 'bio') {
      dispatch(updateProfessional({ [name]: value }));
    }
    // Show error only if field was already touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const generateBio = () => {
    const bioTemplate = `أنا متخصص في ${professional.specialization} بخبرة تزيد عن ${professional.yearsOfExperience} سنوات. أقدم خدمات احترافية وعالية الجودة مع الالتزام بالمواعيد والأسعار المنافسة.`;
    dispatch(updateProfessional({ bio: bioTemplate }));
    setCharCount(bioTemplate.length);
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
          work
        </span>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#191c1d',
        }}>
          التفاصيل المهنية
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
            التخصص <span style={{ color: '#a83900' }}>*</span>
          </label>
          <select
            name="specialization"
            value={professional.specialization}
            onChange={handleChange}
            onBlur={handleBlur}
            style={inputStyle(!!errors.specialization)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
          >
            <option value="">اختر تخصصك الأساسي</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {errors.specialization && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.specialization}
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
            سنوات الخبرة <span style={{ color: '#a83900' }}>*</span>
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            value={professional.yearsOfExperience}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="مثال: 5"
            min="0"
            style={inputStyle(!!errors.yearsOfExperience)}
            onFocus={(e) => e.target.style.borderColor = '#a83900'}
          />
          {errors.yearsOfExperience && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.yearsOfExperience}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
          }}>
            نبذة عنك{' '}
            <span style={{ color: '#594139', fontWeight: 'normal' }}>
              (اختياري ولكن يفضل)
            </span>
          </label>
          <span style={{ fontSize: '0.875rem', color: '#594139' }}>
            {charCount}/200
          </span>
        </div>
        <div style={{
          border: '1px solid #e1e3e4',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          transition: 'all 0.3s',
        }}>
          <textarea
            name="bio"
            value={professional.bio}
            onChange={handleChange}
            placeholder="اكتب نبذة مختصرة عن مهاراتك وما يميزك في عملك لجذب العملاء..."
            rows="4"
            style={{
              width: '100%',
              border: 'none',
              backgroundColor: '#f8f9fa',
              padding: '1rem',
              fontSize: '1rem',
              color: '#191c1d',
              fontFamily: "'Be Vietnam Pro', sans-serif",
              resize: 'none',
              outline: 'none',
            }}
            onFocus={(e) => {
              e.target.parentElement.style.borderColor = '#a83900';
              e.target.parentElement.style.boxShadow = '0 0 0 2px rgba(168, 57, 0, 0.1)';
            }}
            onBlur={(e) => {
              e.target.parentElement.style.borderColor = '#e1e3e4';
              e.target.parentElement.style.boxShadow = 'none';
            }}
          />
          <div style={{
            backgroundColor: '#f3f4f5',
            borderTop: '1px solid #e1e3e4',
            padding: '0.75rem 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.875rem', color: '#594139' }}>
              دع الذكاء الاصطناعي يكتب نبذتك بناءً على تخصصك وخبرتك.
            </span>
            <button
              type="button"
              onClick={generateBio}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                color: '#a83900',
                fontWeight: '500',
                fontSize: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.3s',
              }}
              onMouseEnter={(e) => e.target.style.color = '#ff6b2c'}
              onMouseLeave={(e) => e.target.style.color = '#a83900'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
                auto_awesome
              </span>
              إنشاء تلقائي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
