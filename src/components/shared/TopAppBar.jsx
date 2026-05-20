import { Link } from 'react-router-dom'

export default function TopAppBar({ showBackButton = false, onBackClick }) {
  return (
    <header style={{ position: 'absolute', top: 0, left: 0, width: '100%', display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '16px', paddingRight: '16px', height: '64px', maxWidth: '1280px', marginLeft: 'auto', marginRight: 'auto', zIndex: 50, backgroundColor: 'rgba(251, 248, 252, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(224, 192, 177, 0.3)', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
      <Link to="/" style={{ fontFamily: 'Cairo', fontSize: '24px', fontWeight: 'bold', color: '#9d4300', textDecoration: 'none' }}>
        OSTA أسطى
      </Link>
      <div style={{ display: 'flex', gap: '8px' }}>
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="material-symbols-outlined"
            style={{ color: '#1b1b1e', cursor: 'pointer', border: 'none', background: 'none', fontSize: '24px' }}
            aria-label="رجوع"
          >
            arrow_forward
          </button>
        )}
      </div>
    </header>
  )
}
