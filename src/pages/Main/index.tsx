import { FC, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Grid } from '@mui/material'
import { motion } from 'framer-motion'

import useToggle from 'components/hooks/useToggle'
import Title from 'components/common/Title'
import { selectUserAvatar } from 'store/user/selectors'
import { useSelector } from 'react-redux'
import { ERoutes } from 'pages/App'

const Main: FC = () => {
  const location = useLocation()

  const avatar = useSelector(selectUserAvatar)

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 1)
  }, [location.pathname])

  if (!avatar) return <Navigate to={ERoutes.ADD_SELFIE} replace />

  return (
    <>
      <Grid container direction='column'>
        {isShowOutlet ? (
          <Outlet />
        ) : (
          <motion.div
            style={{ maxWidth: '100%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Grid container alignItems='start'>
              <Grid item xs>
                <Title>Main</Title>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </Grid>
    </>
  )
}

export default Main
