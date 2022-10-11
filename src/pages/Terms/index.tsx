import { FC } from 'react'
import { Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const Terms: FC = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container justifyContent='center' sx={{ paddingTop: { xs: 6, md: 9 } }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          justifyContent='center'
          sx={{ flex: { xs: '0 1 400px', md: '0 0 600px' } }}
        >
          <Grid item xs={12} md={12}>
            <Typography variant='h2' align='center' gutterBottom>
              Terms
            </Typography>
          </Grid>

        </Grid>
      </Grid>
    </motion.div>
  )
}

export default Terms
