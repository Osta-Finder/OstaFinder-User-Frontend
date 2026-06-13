import { Link } from "react-router-dom";

export default function OnboardingFooter() {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #8d7167',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      width: '100%',
      padding: '2rem 1rem',
      marginTop: 'auto',
    }}>
      <div style={{
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: '#a83900',
        marginBottom: '0.5rem',
      }}>
        OSTA أسطى
      </div>
      <div style={{
        display: 'flex',
        gap: '1rem',
        fontSize: '1rem',
        color: '#594139',
      }}>
        <Link to="/privacy" style={{
          color: '#594139',
          textDecoration: 'none',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => e.target.style.color = '#a83900'}
        onMouseLeave={(e) => e.target.style.color = '#594139'}
        >
          سياسة الخصوصية
        </Link>
        <span>•</span>
        <Link to="/terms" style={{
          color: '#594139',
          textDecoration: 'none',
          transition: 'color 0.3s',
        }}
        onMouseEnter={(e) => e.target.style.color = '#a83900'}
        onMouseLeave={(e) => e.target.style.color = '#594139'}
        >
          الشروط والأحكام
        </Link>
      </div>
      <div style={{
        fontSize: '1rem',
        color: '#594139',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '1rem',
        textAlign: 'center',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>
          lock
        </span>
        © 2024 OSTA. بياناتك محمية ومشفرة بالكامل
      </div>
    </footer>
  );
}
