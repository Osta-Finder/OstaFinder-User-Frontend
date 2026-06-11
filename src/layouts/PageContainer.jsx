import TopAppBar from '../components/shared/TopAppBar'
import AmbientBackground from '../components/shared/AmbientBackground'

export default function PageContainer({
  children,
  showBackButton = false,
  onBackClick,
}) {
  return (
    <div style={{ backgroundColor: '#fbf8fc', color: '#1b1b1e', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <TopAppBar showBackButton={showBackButton} onBackClick={onBackClick} />

      <main style={{ width: '100%', maxWidth: '600px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10, paddingTop: '80px' }}>
        {children}
      </main>

      <AmbientBackground />
    </div>
  )
}
