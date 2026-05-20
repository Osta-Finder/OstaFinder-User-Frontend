import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'

export default function StatusCard({
  title,
  description,
  icon = 'hourglass_empty',
  iconSize = '64px',
  showBadge = true,
  badgeIcon = 'check',
  children,
}) {
  const [isShowing, setIsShowing] = useState(false)

  useEffect(() => {
    setIsShowing(true)
  }, [])

  return (
    <Transition
      show={isShowing}
      as="div"
      enter="transition-all duration-500 ease-out"
      enterFrom="opacity-0 scale-95 translate-y-4"
      enterTo="opacity-100 scale-100 translate-y-0"
      leave="transition-all duration-300 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
      style={{
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(224, 192, 177, 0.5)',
        borderRadius: '24px',
        boxShadow: '0 8px 30px rgba(255, 87, 34, 0.08)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '256px', height: '256px', backgroundColor: 'rgba(249, 115, 22, 0.1)', borderRadius: '9999px', filter: 'blur(48px)', pointerEvents: 'none' }}></div>

      <div style={{ position: 'relative', width: '192px', height: '192px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, border: '4px dashed #eae7eb', borderRadius: '9999px', animation: 'spin 20s linear infinite' }}></div>

        <div style={{ width: '128px', height: '128px', backgroundColor: '#f6f2f7', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)' }}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: iconSize, color: '#9d4300', fontVariationSettings: "'FILL' 0" }}
          >
            {icon}
          </span>

          {showBadge && (
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', backgroundColor: '#f97316', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid #ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '20px', color: '#ffffff', fontWeight: 'bold' }}
              >
                {badgeIcon}
              </span>
            </div>
          )}
        </div>
      </div>

      <h1 style={{ fontFamily: 'Tajawal', fontSize: '36px', fontWeight: 700, lineHeight: '1.2', color: '#1b1b1e', marginBottom: '8px', position: 'relative', zIndex: 10 }}>{title}</h1>
      <p style={{ fontFamily: 'Cairo', fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#584237', maxWidth: '320px', marginBottom: '32px', position: 'relative', zIndex: 10 }}>{description}</p>

      <div style={{ width: '100%', maxWidth: '320px', position: 'relative', zIndex: 10 }}>{children}</div>
    </Transition>
  )
}
