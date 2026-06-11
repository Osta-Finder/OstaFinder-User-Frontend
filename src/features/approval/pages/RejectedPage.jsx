import { useNavigate } from 'react-router-dom'
import PageContainer from '../../../layouts/PageContainer'
import StatusCard from '../components/StatusCard'
import PrimaryButton from '../../../components/ui/PrimaryButton'

export default function RejectedPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <PageContainer>
      <StatusCard
        title="تم رفض طلبك"
        description="للأسف، لم تتمكن فريقنا من الموافقة على طلبك. يرجى مراجعة البيانات المرسلة والتأكد من تطابقها مع المتطلبات."
        icon="cancel"
        iconSize="64px"
        showBadge={false}
      >
        <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <PrimaryButton onClick={handleGoHome}>
            العودة للرئيسية
          </PrimaryButton>
          <button
            onClick={() => navigate('/onboarding')}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              color: '#9d4300',
              fontFamily: 'Tajawal',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '1.0',
              padding: '16px 24px',
              borderRadius: '12px',
              border: '2px solid #9d4300',
              boxShadow: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f5f1f0'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            إعادة محاولة
          </button>
        </div>
      </StatusCard>
    </PageContainer>
  )
}
