import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../../../layouts/PageContainer'
import StatusCard from '../components/StatusCard'
import PrimaryButton from '../../../components/ui/PrimaryButton'
import { selectApprovalState, selectStatusIcon } from '../store/approvalSlice'

export default function PendingApprovalPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const approvalState = useSelector(selectApprovalState)
  const statusIcon = useSelector(selectStatusIcon)

  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl')
    document.documentElement.setAttribute('lang', 'ar')
    document.title = 'في انتظار الموافقة - OSTA أسطى'

    return () => {
      document.documentElement.removeAttribute('dir')
      document.documentElement.removeAttribute('lang')
    }
  }, [])

  const handleNavigateHome = () => {
    navigate('/')
  }

  return (
    <PageContainer>
      <StatusCard
        title="طلبك قيد المراجعة"
        description={approvalState.message}
        icon={statusIcon}
        iconSize="64px"
        showBadge={true}
        badgeIcon="check"
      >
        <PrimaryButton
          onClick={handleNavigateHome}
          loading={approvalState.loading}
          disabled={approvalState.loading}
        >
          العودة للرئيسية
        </PrimaryButton>
      </StatusCard>
    </PageContainer>
  )
}
