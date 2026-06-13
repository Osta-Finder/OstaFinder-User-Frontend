import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNationalId,
  addCertificate,
  removeCertificate,
} from '../../../../store/slices/onboardingSlice';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Upload a single file to the backend /api/upload endpoint.
 * Backend saves it to Supabase and returns the public URL.
 * bucket: 'official-docs' (matches image.model.js enum)
 */
async function uploadToSupabase(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('bucket', 'official-docs');

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
    credentials: 'include', // send cookies for auth
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'فشل رفع الملف');
  }

  const json = await res.json();
  // Backend returns { success, data: { _id, originalName, url, bucket } }
  return json.data.url;
}

export default function DocumentationStep({ onValidationChange }) {
  const dispatch = useDispatch();
  const documentation = useSelector((state) => state.onboarding.documentation);
  const [errors, setErrors] = useState({});
  const [uploadingNationalId, setUploadingNationalId] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nationalIdInputRef = useRef(null);
  const certificatesInputRef = useRef(null);

  const isValid = !!(documentation.nationalId || documentation.nationalIdPreview);

  useEffect(() => {
    onValidationChange(isValid);
    // Only show error if user already tried to interact (submitted attempt)
    if (submitted && !isValid) {
      setErrors({ nationalId: 'الهوية الوطنية مطلوبة' });
    } else if (isValid) {
      setErrors({});
    }
  }, [documentation.nationalId, documentation.nationalIdPreview, submitted]);

  const handleNationalIdChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      dispatch(setNationalId({ file: null, preview: event.target.result }));
    };
    reader.readAsDataURL(file);

    // Upload to Supabase via backend
    setUploadingNationalId(true);
    try {
      const url = await uploadToSupabase(file);
      // Store the Supabase URL — preview stays for display, file becomes the URL
      dispatch(setNationalId({ file: url, preview: documentation.nationalIdPreview || url }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, nationalId: err.message || 'فشل رفع الهوية' }));
      dispatch(setNationalId({ file: null, preview: null }));
    } finally {
      setUploadingNationalId(false);
    }
  };

  const handleCertificateChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingCert(true);
    try {
      for (const file of Array.from(files)) {
        // Local preview first
        const preview = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (ev) => resolve(ev.target.result);
          reader.readAsDataURL(file);
        });

        // Upload to Supabase
        const url = await uploadToSupabase(file);
        dispatch(addCertificate({ file: url, preview }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, certificates: err.message || 'فشل رفع الشهادة' }));
    } finally {
      setUploadingCert(false);
    }
  };

  const handleRemoveCertificate = (index) => {
    dispatch(removeCertificate(index));
  };

  const getFileIcon = (nameOrUrl = '') => {
    const ext = nameOrUrl.split('.').pop().toLowerCase().split('?')[0];
    if (ext === 'pdf') return 'picture_as_pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
    return 'description';
  };

  const isNationalIdUploaded = !!(documentation.nationalId || documentation.nationalIdPreview);

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

          {!isNationalIdUploaded && (
            <div
              onClick={() => {
                if (!uploadingNationalId) {
                  setSubmitted(true);
                  nationalIdInputRef.current?.click();
                }
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
                cursor: uploadingNationalId ? 'wait' : 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { if (!uploadingNationalId) { e.currentTarget.style.backgroundColor = '#e7e8e9'; e.currentTarget.style.borderColor = '#a83900'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f5'; e.currentTarget.style.borderColor = errors.nationalId ? '#ba1a1a' : '#e1e3e4'; }}
            >
              {uploadingNationalId ? (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#a83900', marginBottom: '0.5rem', animation: 'spin 1s linear infinite' }}>autorenew</span>
                  <p style={{ fontSize: '1rem', color: '#594139' }}>جاري الرفع...</p>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#594139', marginBottom: '0.5rem' }}>image</span>
                  <p style={{ fontSize: '1rem', color: '#594139', textAlign: 'center' }}>
                    اسحب وأفلت الملف هنا أو{' '}
                    <span style={{ color: '#a83900', fontWeight: 'bold', textDecoration: 'underline' }}>تصفح</span>
                  </p>
                </>
              )}
            </div>
          )}

          <input ref={nationalIdInputRef} type="file" accept="image/*,.pdf" onChange={handleNationalIdChange} style={{ display: 'none' }} />

          {errors.nationalId && <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors.nationalId}</span>}

          {isNationalIdUploaded && (
            <div style={{ backgroundColor: '#e7e8e9', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e1e3e4' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Show thumbnail if image, else icon */}
                {documentation.nationalIdPreview?.startsWith('data:image') ? (
                  <img src={documentation.nationalIdPreview} alt="preview" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem' }} />
                ) : (
                  <span className="material-symbols-outlined" style={{ color: '#a83900', fontSize: '1.5rem' }}>
                    {getFileIcon(documentation.nationalId || '')}
                  </span>
                )}
                <span style={{ fontSize: '0.9rem', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>cloud_done</span>
                  تم الرفع بنجاح
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
            onClick={() => !uploadingCert && certificatesInputRef.current?.click()}
            style={{
              border: '2px dashed #e1e3e4',
              borderRadius: '0.5rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f3f4f5',
              cursor: uploadingCert ? 'wait' : 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => { if (!uploadingCert) { e.currentTarget.style.backgroundColor = '#e7e8e9'; e.currentTarget.style.borderColor = '#a83900'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f5'; e.currentTarget.style.borderColor = '#e1e3e4'; }}
          >
            {uploadingCert ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#a83900', marginBottom: '0.5rem', animation: 'spin 1s linear infinite' }}>autorenew</span>
                <p style={{ fontSize: '1rem', color: '#594139' }}>جاري الرفع...</p>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: '2rem', color: '#594139', marginBottom: '0.5rem' }}>school</span>
                <p style={{ fontSize: '1rem', color: '#594139', textAlign: 'center' }}>
                  اسحب وأفلت الملف هنا أو{' '}
                  <span style={{ color: '#a83900', fontWeight: 'bold', textDecoration: 'underline' }}>تصفح</span>
                </p>
              </>
            )}
          </div>

          <input ref={certificatesInputRef} type="file" accept="image/*,.pdf" multiple onChange={handleCertificateChange} style={{ display: 'none' }} />

          {errors.certificates && <span style={{ color: '#ba1a1a', fontSize: '0.875rem' }}>{errors.certificates}</span>}

          {documentation.certificates.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documentation.certificates.map((certUrl, index) => (
                <div key={index} style={{ backgroundColor: '#e7e8e9', borderRadius: '0.5rem', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e1e3e4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {documentation.certificatePreviews?.[index]?.startsWith('data:image') ? (
                      <img src={documentation.certificatePreviews[index]} alt="preview" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem' }} />
                    ) : (
                      <span className="material-symbols-outlined" style={{ color: '#a83900', fontSize: '1.5rem' }}>{getFileIcon(certUrl)}</span>
                    )}
                    <span style={{ fontSize: '0.9rem', color: '#2e7d32', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>cloud_done</span>
                      شهادة {index + 1} — تم الرفع
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
