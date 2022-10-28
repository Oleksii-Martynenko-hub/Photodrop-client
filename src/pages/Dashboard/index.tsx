import { FC, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ThumbnailData } from 'api/ProtectedApi'

import { selectAlbums } from 'store/albums/selectors'
import { selectUserAvatar } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useToggle } from 'components/hooks/useToggle'
import Albums from 'components/Albums'
import Photos from 'components/Photos'
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
        <>
          <Albums albums={albums} />
          <Photos
            thumbnails={albums.reduce(
              (thumbnails: ThumbnailData[], album) => [...thumbnails, ...album.thumbnails],
              [],
            )}
            isDashboard
          />
        </>
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
