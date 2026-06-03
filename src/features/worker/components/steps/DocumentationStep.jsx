import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNationalId,
  addCertificate,
  removeCertificate,
} from '../../../../store/slices/onboardingSlice';

export default function DocumentationStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const documentation = useSelector((state) => state.onboarding.documentation);
  const [errors, setErrors] = useState({});
  const nationalIdInputRef = useRef(null);
  const certificatesInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!documentation.nationalId) newErrors.nationalId = 'الهوية الوطنية مطلوبة';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = validateForm();
    onValidationChange(isValid);
  }, [documentation.nationalId]);

  const handleNationalIdChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dispatch(
          setNationalId({
            file: file,
            preview: event.target.result,
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertificateChange = (e) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          dispatch(
            addCertificate({
              file: file,
              preview: event.target.result,
            })
          );
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveCertificate = (index) => {
    dispatch(removeCertificate(index));
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'picture_as_pdf';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return 'image';
    return 'description';
  };

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
          description
        </span>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#191c1d',
        }}>
          رفع الأوراق الرسمية
        </h2>
      </div>

      <p style={{
        fontSize: '1rem',
        color: '#594139',
      }}>
        لضمان الجودة والأمان، نرجو إرفاق المستندات التالية. سيتم مراجعتها بسرية تامة.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
            display: 'flex',
            gap: '0.25rem',
          }}>
            الهوية الوطنية / الإقامة <span style={{ color: '#a83900' }}>*</span>
          </label>
          <div
            onClick={() => nationalIdInputRef.current?.click()}
            style={{
              border: `2px dashed ${errors.nationalId ? '#ba1a1a' : '#e1e3e4'}`,
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f5',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e7e8e9';
              e.currentTarget.style.borderColor = '#a83900';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f5';
              e.currentTarget.style.borderColor = errors.nationalId ? '#ba1a1a' : '#e1e3e4';
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '2rem',
              color: '#594139',
              marginBottom: '0.5rem',
            }}>
              image
            </span>
            <p style={{
              fontSize: '1rem',
              color: '#594139',
              textAlign: 'center',
            }}>
              اسحب وأفلت الملف هنا أو{' '}
              <span style={{ color: '#a83900', fontWeight: 'bold', textDecoration: 'underline' }}>
                تصفح
              </span>
            </p>
          </div>
          <input
            ref={nationalIdInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleNationalIdChange}
            style={{ display: 'none' }}
          />
          {errors.nationalId && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>
              {errors.nationalId}
            </span>
          )}
          {documentation.nationalId && (
            <div style={{
              backgroundColor: '#e7e8e9',
              borderRadius: '0.5rem',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '1px solid #e1e3e4',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="material-symbols-outlined" style={{
                  color: '#a83900',
                  fontSize: '1.5rem',
                }}>
                  {getFileIcon(documentation.nationalId.name)}
                </span>
                <span style={{
                  fontSize: '1rem',
                  color: '#191c1d',
                  maxWidth: '300px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {documentation.nationalId.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setNationalId({ file: null, preview: null }))}
                style={{
                  color: '#594139',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  borderRadius: '50%',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = '#ba1a1a';
                  e.target.style.backgroundColor = '#e1e3e4';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#594139';
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                  close
                </span>
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{
            fontWeight: '500',
            fontSize: '1rem',
            color: '#191c1d',
          }}>
            شهادات الخبرة أو الاعتماد المهني{' '}
            <span style={{ color: '#594139', fontWeight: 'normal' }}>
              (اختياري)
            </span>
          </label>
          <div
            onClick={() => certificatesInputRef.current?.click()}
            style={{
              border: '2px dashed #e1e3e4',
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f5',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e7e8e9';
              e.currentTarget.style.borderColor = '#a83900';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f3f4f5';
              e.currentTarget.style.borderColor = '#e1e3e4';
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: '2rem',
              color: '#594139',
              marginBottom: '0.5rem',
            }}>
              school
            </span>
            <p style={{
              fontSize: '1rem',
              color: '#594139',
              textAlign: 'center',
            }}>
              اسحب وأفلت الملف هنا أو{' '}
              <span style={{ color: '#a83900', fontWeight: 'bold', textDecoration: 'underline' }}>
                تصفح
              </span>
            </p>
          </div>
          <input
            ref={certificatesInputRef}
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleCertificateChange}
            style={{ display: 'none' }}
          />

          {documentation.certificates.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documentation.certificates.map((cert, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#e7e8e9',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border: '1px solid #e1e3e4',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="material-symbols-outlined" style={{
                      color: '#a83900',
                      fontSize: '1.5rem',
                    }}>
                      {getFileIcon(cert.name)}
                    </span>
                    <span style={{
                      fontSize: '1rem',
                      color: '#191c1d',
                      maxWidth: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {cert.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertificate(index)}
                    style={{
                      color: '#594139',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      borderRadius: '50%',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = '#ba1a1a';
                      e.target.style.backgroundColor = '#e1e3e4';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = '#594139';
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>
                      close
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
