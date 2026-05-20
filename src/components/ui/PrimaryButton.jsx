import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function PrimaryButton({
  children,
  onClick,
  to,
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
}) {
  const navigate = useNavigate()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = async (e) => {
    if (disabled || loading || isNavigating) {
      e.preventDefault()
      return
    }

    if (onClick) {
      onClick(e)
    }

    if (to) {
      setIsNavigating(true)
      setTimeout(() => {
        navigate(to)
        setIsNavigating(false)
      }, 100)
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || loading || isNavigating}
      style={{
        width: '100%',
        backgroundColor: '#9d4300',
        color: '#ffffff',
        fontFamily: 'Tajawal',
        fontWeight: 700,
        fontSize: '14px',
        lineHeight: '1.0',
        padding: '16px 24px',
        borderRadius: '12px',
        border: 'none',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        cursor: disabled || loading || isNavigating ? 'not-allowed' : 'pointer',
        opacity: disabled || loading || isNavigating ? 0.5 : 1,
        transition: 'all 0.2s ease-in-out',
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading && !isNavigating) {
          e.target.style.boxShadow = '0 8px 30px rgba(255, 87, 34, 0.12)'
          e.target.style.transform = 'translateY(-4px)'
        }
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        e.target.style.transform = 'translateY(0)'
      }}
    >
      {loading ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <span className="material-symbols-outlined" style={{ animation: 'spin 1s linear infinite' }}>progress_activity</span>
          جاري التحميل...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
