export default function OnboardingHeader() {
  return (
    <header style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e1e3e4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
    }}>
      <div style={{
        color: '#a83900',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        OSTA أسطى
      </div>
      <button style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#594139',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#e7e8e9'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      >
        <span>تأجيل والتسجيل لاحقاً</span>
        <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }} dir="ltr">
          arrow_forward
        </span>
      </button>
    </header>
  );
}
