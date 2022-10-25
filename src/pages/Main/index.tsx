import { FC, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useToggle } from 'components/hooks/useToggle'
import { selectUserAvatar } from 'store/user/selectors'
import { useSelector } from 'react-redux'
import { ERoutes } from 'pages/App'
import EmptyDashboard from 'components/EmptyDashboard'
import BrowseArtPrints from 'components/BrowseArtPrints'

const Main: FC = () => {
  const location = useLocation()

  const avatar = useSelector(selectUserAvatar)
  const albums = null

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 1)
  }, [location.pathname])

  if (!avatar) return <Navigate to={ERoutes.ADD_SELFIE} replace />

  return (
    <>
      {isShowOutlet ? (
        <Outlet />
      ) : albums ? (
        <div>main</div>
      ) : (
        <>
          <EmptyDashboard />
          <BrowseArtPrints />
        </>
      )}
    </>
  )
}

export default Main
