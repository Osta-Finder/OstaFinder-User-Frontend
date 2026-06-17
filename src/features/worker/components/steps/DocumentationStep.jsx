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
  const [submitted, setSubmitted] = useState(false);
  const nationalIdInputRef = useRef(null);
  const certificatesInputRef = useRef(null);

  // Valid if a file is selected (File object stored)
  const isValid = !!(documentation.nationalIdFile || documentation.nationalIdPreview);

  useEffect(() => {
    onValidationChange(isValid);
    if (submitted && !isValid) {
      setErrors({ nationalId: 'الهوية الوطنية مطلوبة' });
    } else if (isValid) {
      setErrors({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentation.nationalIdFile, documentation.nationalIdPreview, submitted]);

  const handleNationalIdChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      // Store the actual File object + local preview — NO upload here
      dispatch(setNationalId({ file, preview: event.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleCertificateChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        // Store File object + local preview — NO upload here
        dispatch(addCertificate({ file, preview: ev.target.result }));
      };
      reader.readAsDataURL(file);
    });

    // Reset input so same file can be re-selected if removed
    e.target.value = '';
  };

  const handleRemoveCertificate = (index) => {
    dispatch(removeCertificate(index));
  };

  const getFileIcon = (file) => {
    const name = file instanceof File ? file.name : (file || '');
    const ext = name.split('.').pop().toLowerCase().split('?')[0];
    if (ext === 'pdf') return 'picture_as_pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    return 'description';
  };

  const isNationalIdSelected = !!(documentation.nationalIdFile || documentation.nationalIdPreview);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid #e1e3e4', paddingBottom: '1rem' }}>
        <span className="material-symbols-outlined" style={{ color: '#a83900', fontSize: '1.5rem' }}>description</span>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#191c1d' }}>رفع الأوراق الرسمية</h2>
      </div>

      <p style={{ fontSize: '1rem', color: '#594139' }}>
        لضمان الجودة والأمان، نرجو إرفاق المستندات التالية. سيتم مراجعتها بسرية تامة.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* ── National ID ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontWeight: '500', fontSize: '1rem', color: '#191c1d', display: 'flex', gap: '0.25rem' }}>
            الهوية الوطنية / الإقامة <span style={{ color: '#a83900' }}>*</span>
          </label>

          {!isNationalIdSelected && (
            <div
              onClick={() => {
                setSubmitted(true);
                nationalIdInputRef.current?.click();
              }}
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
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e7e8e9'; e.currentTarget.style.borderColor = '#a83900'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f5'; e.currentTarget.style.borderColor = errors.nationalId ? '#ba1a1a' : '#e1e3e4'; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#594139', marginBottom: '0.5rem' }}>image</span>
              <p style={{ fontSize: '1rem', color: '#594139', textAlign: 'center' }}>
                اسحب وأفلت الملف هنا أو{' '}
                <span style={{ color: '#a83900', fontWeight: 'bold', textDecoration: 'underline' }}>تصفح</span>
              </p>
            </div>
          )}

          <input
            ref={nationalIdInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleNationalIdChange}
            style={{ display: 'none' }}
          />

          {errors.nationalId && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors.nationalId}</span>
          )}

          {isNationalIdSelected && (
            <div style={{ backgroundColor: '#e7e8e9', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e1e3e4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {documentation.nationalIdPreview?.startsWith('data:image') ? (
                  <img src={documentation.nationalIdPreview} alt="preview" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem' }} />
                ) : (
                  <span className="material-symbols-outlined" style={{ color: '#a83900', fontSize: '1.5rem' }}>
                    {getFileIcon(documentation.nationalIdFile)}
                  </span>
                )}
                <span style={{ fontSize: '0.9rem', color: '#594139', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>attach_file</span>
                  {documentation.nationalIdFile instanceof File
                    ? documentation.nationalIdFile.name
                    : 'تم الاختيار'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => dispatch(setNationalId({ file: null, preview: null }))}
                style={{ color: '#594139', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem', borderRadius: '50%' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#ba1a1a'; e.currentTarget.style.backgroundColor = '#e1e3e4'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#594139'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>close</span>
              </button>
            </div>
          )}
        </div>

        {/* ── Certificates ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <label style={{ fontWeight: '500', fontSize: '1rem', color: '#191c1d' }}>
            شهادات الخبرة أو الاعتماد المهني{' '}
            <span style={{ color: '#594139', fontWeight: 'normal' }}>(اختياري)</span>
          </label>
          <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
            يمكنك رفع أكثر من ملف — اضغط على "تصفح" وحدد عدة ملفات دفعة واحدة
          </p>

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
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e7e8e9'; e.currentTarget.style.borderColor = '#a83900'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f5'; e.currentTarget.style.borderColor = '#e1e3e4'; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#594139', marginBottom: '0.5rem' }}>school</span>
            <p style={{ fontSize: '1rem', color: '#594139', textAlign: 'center' }}>
              اسحب وأفلت الملف هنا أو{' '}
              <span style={{ color: '#a83900', fontWeight: 'bold', textDecoration: 'underline' }}>تصفح</span>
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

          {errors.certificates && (
            <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors.certificates}</span>
          )}

          {documentation.certificateFiles.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documentation.certificateFiles.map((file, index) => (
                <div key={index} style={{ backgroundColor: '#e7e8e9', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e1e3e4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {documentation.certificatePreviews?.[index]?.startsWith('data:image') ? (
                      <img src={documentation.certificatePreviews[index]} alt="preview" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem' }} />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: '#a83900', fontSize: '1.5rem' }}>{getFileIcon(file)}</span>
                    )}
                    <span style={{ fontSize: '0.9rem', color: '#594139', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>attach_file</span>
                      {file instanceof File ? file.name : `شهادة ${index + 1}`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCertificate(index)}
                    style={{ color: '#594139', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem', borderRadius: '50%' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#ba1a1a'; e.currentTarget.style.backgroundColor = '#e1e3e4'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#594139'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>close</span>
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
