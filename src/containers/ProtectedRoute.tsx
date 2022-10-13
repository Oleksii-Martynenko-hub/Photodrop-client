import React from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'

import { ERoutes } from 'pages/App'
import { selectIsLoggedIn, selectStatus } from 'store/sign-up/selectors'
import { APIStatus } from 'api/MainApi'
import { FullPageLoader } from 'components/common/FullPageLoader'

interface Props {
  element: React.FC
}

const ProtectedRoute: React.FC<Props> = ({ element: Element }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const status = useSelector(selectStatus)

  if (status === APIStatus.PENDING) return <FullPageLoader />

  return <>{isLoggedIn ? <Element /> : <Navigate to={ERoutes.ROOT} replace />}</>
}

export default ProtectedRoute
