export default function ApprovalIllustration({ icon = 'hourglass_empty', showBadge = true }) {
  return (
    <div className="relative w-48 h-48 mb-lg flex items-center justify-center">
      <div className="absolute inset-0 border-4 border-surface-container-high rounded-full border-dashed animate-spin-slow"></div>
      <div className="w-32 h-32 bg-surface-container-low rounded-full flex items-center justify-center relative shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
        <span
          className="material-symbols-outlined text-display-lg text-primary"
          style={{ fontSize: '64px', fontVariationSettings: "'FILL' 0" }}
        >
          {icon}
        </span>
        {showBadge && (
          <div className="absolute bottom-0 right-0 w-10 h-10 bg-primary-container rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-md">
            <span
              className="material-symbols-outlined text-on-primary font-bold"
              style={{ fontSize: '20px' }}
            >
              check
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
