import { FC, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Fab, Grid, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import { motion } from 'framer-motion'

import useToggle from 'components/hooks/useToggle'

import { ERoutes } from 'pages/App'

const Notifications: FC = () => {
  const location = useLocation()

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  return (
    <>
      <Grid container direction='column'>
        <motion.div
          style={{ maxWidth: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Grid container alignItems='start'>
            <Grid item xs>
              <Typography variant='h3' gutterBottom>
                Notifications{' '}
              </Typography>
            </Grid>
          </Grid>
        </motion.div>
      </Grid>
    </>
  )
}

export default Notifications
