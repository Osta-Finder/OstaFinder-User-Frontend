import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  const colors = {
    primary: '#a83900',
    primaryContainer: '#ff6b2c',
    surface: '#f8f9fa',
    background: '#f8f9fa',
    onBackground: '#191c1d',
    onSurfaceVariant: '#594139',
    surfaceVariant: '#e1e3e4',
    surfaceContainerLowest: '#ffffff',
    onPrimary: '#ffffff',
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.background,
      color: colors.onBackground,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{ maxWidth: '42rem', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          color: colors.primary,
          marginBottom: '1rem',
        }}>
          OSTA أسطى
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: colors.onSurfaceVariant,
          marginBottom: '2rem',
        }}>
          منصة متخصصة لربط العملاء بالفنيين المحترفين
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <button
            onClick={() => navigate('/worker-onboarding')}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              backgroundColor: colors.primary,
              color: colors.onPrimary,
              border: 'none',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            ابدأ كفني
          </button>
          <button
            onClick={() => navigate('/login')}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '1.125rem',
              backgroundColor: 'transparent',
              color: colors.primary,
              border: `2px solid ${colors.primary}`,
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = colors.primary;
              e.target.style.color = colors.onPrimary;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = colors.primary;
            }}
          >
            دخول
          </button>
        </div>

        <div style={{
          backgroundColor: colors.surfaceContainerLowest,
          border: `1px solid ${colors.surfaceVariant}`,
          borderRadius: '0.75rem',
          padding: '2rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
          }}>
            الميزات
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'left',
          }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="material-symbols-outlined" style={{
                color: colors.primary,
                fontSize: '2rem',
                flexShrink: 0,
              }}>
                verified_user
              </span>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  فنيون معتمدون
                </h3>
                <p style={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
                  فنيون محترفون ومعتمدون
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="material-symbols-outlined" style={{
                color: colors.primary,
                fontSize: '2rem',
                flexShrink: 0,
              }}>
                security
              </span>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  آمن وموثوق
                </h3>
                <p style={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
                  بيانات محمية ومشفرة
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="material-symbols-outlined" style={{
                color: colors.primary,
                fontSize: '2rem',
                flexShrink: 0,
              }}>
                schedule
              </span>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  سريع وسهل
                </h3>
                <p style={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
                  احجز الخدمة بسهولة
                </p>
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.875rem', color: colors.onSurfaceVariant }}>
          أو اضغط على <span style={{ fontWeight: 'bold' }}>ابدأ كفني</span> للبدء في عملية التسجيل
        </p>
      </div>
    </div>
  );
}
