import { FC, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Fab, Grid, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { motion } from 'framer-motion'

import useToggle from 'components/hooks/useToggle'

import { ERoutes } from 'pages/App'

const Settings: FC = () => {
  const location = useLocation()

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    console.log('🚀 ~ location.pathname', location.pathname)
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 3)
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
                  Settings
                </Typography>
              </Grid>

              <Link to={ERoutes.USER_SETTINGS_PHONE}>- USER_SETTINGS_PHONE -</Link>
              <Link to={ERoutes.USER_SETTINGS_EMAIL}>- USER_SETTINGS_EMAIL -</Link>
            </Grid>
          </motion.div>
        )}
      </Grid>
    </>
  )
}

export default Settings
