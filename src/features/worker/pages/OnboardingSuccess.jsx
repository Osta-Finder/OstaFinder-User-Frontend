import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOnboarding } from '../../../store/slices/onboardingSlice';

export default function OnboardingSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(resetOnboarding());
    // Clear the onboarding flag
    localStorage.removeItem('onboardingCompleted');
    navigate('/pending-approval');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      color: '#191c1d',
      padding: '1rem',
    }}>
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            backgroundColor: '#a83900',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }}>
            <span className="material-symbols-outlined" style={{
              fontSize: '2.5rem',
              color: '#ffffff',
            }}>
              check_circle
            </span>
          </div>
        </div>

        <h1 style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#191c1d',
          marginBottom: '1rem',
        }}>
          تم بنجاح!
        </h1>

        <p style={{
          fontSize: '1rem',
          color: '#594139',
          marginBottom: '0.5rem',
        }}>
          شكراً لإكمالك ملفك الشخصي
        </p>

        <p style={{
          fontSize: '1rem',
          color: '#594139',
          marginBottom: '2rem',
        }}>
          سيتم مراجعة بيانات ملفك الشخصي من قبل فريقنا خلال 24-48 ساعة. ستتلقى إشعاراً عند الموافقة.
        </p>

        <div style={{
          backgroundColor: '#f3f4f5',
          border: '1px solid #e1e3e4',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}>
            <span className="material-symbols-outlined" style={{
              color: '#a83900',
              fontSize: '1.5rem',
              flexShrink: 0,
              marginTop: '0.25rem',
            }}>
              info
            </span>
            <div style={{ textAlign: 'left' }}>
              <p style={{
                fontWeight: 'bold',
                color: '#191c1d',
                marginBottom: '0.5rem',
              }}>
                ماذا بعد؟
              </p>
              <ul style={{
                fontSize: '0.875rem',
                color: '#594139',
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                <li style={{ marginBottom: '0.5rem' }}>• سيتم التحقق من وثائقك</li>
                <li style={{ marginBottom: '0.5rem' }}>• ستتمكن من إضافة خدماتك بعد الموافقة</li>
                <li>• ستبدأ في استقبال الطلبات من العملاء</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          style={{
            width: '100%',
            padding: '0.75rem 2rem',
            borderRadius: '9999px',
            fontWeight: '500',
            fontSize: '1rem',
            backgroundColor: '#a83900',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(168, 57, 0, 0.39)',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
          onMouseEnter={(e) => {
            e.target.style.opacity = '0.9';
            e.target.style.boxShadow = '0 20px 25px -5px rgba(168, 57, 0, 0.23)';
          }}
          onMouseLeave={(e) => {
            e.target.style.opacity = '1';
            e.target.style.boxShadow = '0 10px 15px -3px rgba(168, 57, 0, 0.39)';
          }}
        >
          الذهاب إلى لوحة التحكم
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
