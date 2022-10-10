import { FC, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Button, Fab, Grid, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { motion } from 'framer-motion'

import useToggle from 'components/hooks/useToggle'

import { ERoutes } from 'pages/App'
import { useDispatch } from 'react-redux'
import { logoutAsync } from 'store/sign-up/actions'

const UserPage: FC = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    console.log('🚀 ~ location.pathname', location.pathname)
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 2)
  }, [location.pathname])

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
                <Typography variant='h3' gutterBottom>
                  User page
                </Typography>
              </Grid>

              <Link to={ERoutes.USER_SELFIE}>- USER_SELFIE -</Link>
              <Link to={ERoutes.USER_EDIT_NAME}>- USER_EDIT_NAME -</Link>
              <Link to={ERoutes.USER_SETTINGS}>- USER_SETTINGS -</Link>
              <Link to={ERoutes.USER_NOTIFICATIONS}>- USER_NOTIFICATIONS -</Link>
              <Button onClick={() => dispatch(logoutAsync())}>- LOGOUT -</Button>
            </Grid>
          </motion.div>
        )}
      </Grid>
    </>
  )
}

export default UserPage
