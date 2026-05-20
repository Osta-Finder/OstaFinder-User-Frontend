export default function AmbientBackground() {
  return (
    <>
      <div style={{ position: 'absolute', top: '-160px', right: '-160px', width: '384px', height: '384px', backgroundColor: 'rgba(255, 219, 202, 0.3)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: -10 }}></div>
      <div style={{ position: 'absolute', bottom: '-160px', left: '-160px', width: '384px', height: '384px', backgroundColor: 'rgba(228, 225, 230, 0.5)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: -10 }}></div>
    </>
  )
}
