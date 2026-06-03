import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isOnboardingPage = location.pathname.includes('onboarding');

  if (isOnboardingPage) {
    return null;
  }

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e1e3e4',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <div
        onClick={() => navigate('/')}
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#a83900',
          cursor: 'pointer',
        }}
      >
        OSTA أسطى
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#191c1d',
            fontSize: '1rem',
          }}
        >
          الرئيسية
        </button>
        <button
          onClick={() => navigate('/about-us')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#191c1d',
            fontSize: '1rem',
          }}
        >
          عن الخدمة
        </button>
        <button
          onClick={() => navigate('/contact-us')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#191c1d',
            fontSize: '1rem',
          }}
        >
          تواصل معنا
        </button>
      </div>
    </nav>
  );
}
