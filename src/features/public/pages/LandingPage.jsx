import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      color: '#191c1d',
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
          color: '#a83900',
          marginBottom: '2rem',
        }}>
          OSTA أسطى
        </h1>
        
        <button
          onClick={() => navigate('/worker-onboarding')}
          style={{
            padding: '1.5rem 4rem',
            borderRadius: '9999px',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            backgroundColor: '#a83900',
            color: '#ffffff',
            border: 'none',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'opacity 0.3s',
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.9'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          ابدأ الآن
        </button>
      </div>
    </div>
  );
}
