import { createBrowserRouter } from 'react-router-dom'
import PendingApprovalPage from '../features/approval/pages/PendingApprovalPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PendingApprovalPage />,
  },
  {
    path: '/pending-approval',
    element: <PendingApprovalPage />,
  },
])

export default router
