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
  const [uploading, setUploading] = useState(false);
  const nationalIdInputRef = useRef(null);
  const certificatesInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    if (!documentation.nationalId) {
      newErrors.nationalId = 'الهوية الوطنية مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const isValid = validateForm();
    onValidationChange(isValid);
  }, [documentation.nationalId]);

  const uploadFileToServer = async (file) => {
    try {
      const fileFormData = new FormData();
      fileFormData.append('file', file);

      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        credentials: 'include',
        body: fileFormData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.data.url; // Return the URL string
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    }
  };

  const handleNationalIdChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        console.log('National ID file selected:', file.name);

        // First, upload file to server
        const uploadedUrl = await uploadFileToServer(file);
        console.log('✓ National ID uploaded, URL:', uploadedUrl);

        // Then, create preview for UI
        const reader = new FileReader();
        reader.onload = (event) => {
          console.log('National ID preview loaded');
          // Dispatch URL string to Redux, not file object
          dispatch(
            setNationalId({
              url: uploadedUrl,
              preview: event.target.result,
              fileName: file.name,
            })
          );
        };
        reader.readAsDataURL(file);
      } catch (err) {
        console.error('Error handling national ID:', err);
        setErrors({
          nationalId: `خطأ في رفع الملف: ${err.message}`,
        });
      } finally {
        setUploading(false);
      }
    }
  };

  const handleCertificateChange = async (e) => {
    const files = e.target.files;
    if (files) {
      try {
        setUploading(true);
        console.log('Adding certificates:', files.length);

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          console.log(`Processing certificate ${i}:`, file.name);

          try {
            // Upload file to server
            const uploadedUrl = await uploadFileToServer(file);
            console.log(`✓ Certificate ${i + 1} uploaded, URL:`, uploadedUrl);

            // Create preview for UI
            const reader = new FileReader();
            reader.onload = (event) => {
              console.log(`Certificate ${i} preview loaded`);
              // Dispatch URL string to Redux, not file object
              dispatch(
                addCertificate({
                  url: uploadedUrl,
                  preview: event.target.result,
                  fileName: file.name,
                })
              );
            };
            reader.readAsDataURL(file);
          } catch (err) {
            console.error(`Error uploading certificate ${i}:`, err);
            setErrors((prev) => ({
              ...prev,
              [`certificate_${i}`]: `خطأ في رفع الشهادة: ${err.message}`,
            }));
          }
        }
      } finally {
        setUploading(false);
      }
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

  const isImageFile = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
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
            onClick={() => !uploading && nationalIdInputRef.current?.click()}
            style={{
              border: `2px dashed ${errors.nationalId ? '#ba1a1a' : '#e1e3e4'}`,
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f5',
              cursor: uploading ? 'wait' : 'pointer',
              transition: 'all 0.3s',
              opacity: uploading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                e.currentTarget.style.backgroundColor = '#e7e8e9';
                e.currentTarget.style.borderColor = '#a83900';
              }
            }}
            onMouseLeave={(e) => {
              if (!uploading) {
                e.currentTarget.style.backgroundColor = '#f3f4f5';
                e.currentTarget.style.borderColor = errors.nationalId ? '#ba1a1a' : '#e1e3e4';
              }
            }}
          >
            {uploading ? (
              <>
                <span className="material-symbols-outlined" style={{
                  fontSize: '2rem',
                  color: '#594139',
                  marginBottom: '0.5rem',
                  animation: 'spin 1s linear infinite',
                }}>
                  hourglass_empty
                </span>
                <p style={{
                  fontSize: '1rem',
                  color: '#594139',
                  textAlign: 'center',
                }}>
                  جاري رفع الملف...
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <input
            ref={nationalIdInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleNationalIdChange}
            disabled={uploading}
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
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid #e1e3e4',
            }}>
              {documentation.nationalIdPreview && isImageFile(documentation.nationalIdFileName) && (
                <div style={{
                  width: '100%',
                  maxHeight: '200px',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  border: '1px solid #d1d3d4',
                }}>
                  <img
                    src={documentation.nationalIdPreview}
                    alt="معاينة الهوية"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="material-symbols-outlined" style={{
                    color: '#a83900',
                    fontSize: '1.5rem',
                  }}>
                    {getFileIcon(documentation.nationalIdFileName)}
                  </span>
                  <span style={{
                    fontSize: '1rem',
                    color: '#191c1d',
                    maxWidth: '300px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {documentation.nationalIdFileName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setNationalId({ url: '', preview: null, fileName: '' }))}
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
              (اختياري - يمكنك اختيار عدة شهادات)
            </span>
          </label>
          <p style={{
            fontSize: '0.875rem',
            color: '#8d7167',
            backgroundColor: '#f5f3f0',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid #e1d5ce',
          }}>
            💡 لاختيار عدة شهادات: اضغط Ctrl (أو Cmd على Mac) واختر أكثر من ملف
          </p>
          <div
            onClick={() => !uploading && certificatesInputRef.current?.click()}
            style={{
              border: '2px dashed #e1e3e4',
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f5',
              cursor: uploading ? 'wait' : 'pointer',
              transition: 'all 0.3s',
              opacity: uploading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!uploading) {
                e.currentTarget.style.backgroundColor = '#e7e8e9';
                e.currentTarget.style.borderColor = '#a83900';
              }
            }}
            onMouseLeave={(e) => {
              if (!uploading) {
                e.currentTarget.style.backgroundColor = '#f3f4f5';
                e.currentTarget.style.borderColor = '#e1e3e4';
              }
            }}
          >
            {uploading ? (
              <>
                <span className="material-symbols-outlined" style={{
                  fontSize: '2rem',
                  color: '#594139',
                  marginBottom: '0.5rem',
                  animation: 'spin 1s linear infinite',
                }}>
                  hourglass_empty
                </span>
                <p style={{
                  fontSize: '1rem',
                  color: '#594139',
                  textAlign: 'center',
                }}>
                  جاري رفع الملفات...
                </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <input
            ref={certificatesInputRef}
            type="file"
            accept="image/*,.pdf"
            multiple
            onChange={handleCertificateChange}
            disabled={uploading}
            style={{ display: 'none' }}
          />

          {documentation.certificates.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documentation.certificates.map((certUrl, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#e7e8e9',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    border: '1px solid #e1e3e4',
                  }}
                >
                  {documentation.certificatePreviews[index] && isImageFile(documentation.certificateFileNames[index]) && (
                    <div style={{
                      width: '100%',
                      maxHeight: '200px',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      border: '1px solid #d1d3d4',
                    }}>
                      <img
                        src={documentation.certificatePreviews[index]}
                        alt={`معاينة شهادة ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="material-symbols-outlined" style={{
                        color: '#a83900',
                        fontSize: '1.5rem',
                      }}>
                        {getFileIcon(documentation.certificateFileNames[index])}
                      </span>
                      <span style={{
                        fontSize: '1rem',
                        color: '#191c1d',
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {documentation.certificateFileNames[index]}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
