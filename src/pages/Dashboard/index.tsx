import { FC, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectAlbums } from 'store/albums/selectors'
import { selectUserAvatar } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useToggle } from 'components/hooks/useToggle'
import Albums from 'components/Albums'
import EmptyDashboard from 'components/EmptyDashboard'
import BrowseArtPrints from 'components/BrowseArtPrints'

const Dashboard: FC = () => {
  const location = useLocation()

  const avatar = useSelector(selectUserAvatar)
  const albums = useSelector(selectAlbums)

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 1)
  }, [location.pathname])

  if (!avatar) return <Navigate to={ERoutes.ADD_SELFIE} replace />

  return (
    <>
      {isShowOutlet ? (
        <Outlet />
      ) : albums.length ? (
        <Albums albums={albums} />
      ) : (
        <>
          <EmptyDashboard />
          <BrowseArtPrints />
        </>
      )}
    </>
  )
}

export default Dashboard
