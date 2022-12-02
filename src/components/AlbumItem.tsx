import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { useMediaQueryMin } from 'components/hooks/useMediaQuery'
import Image from 'components/common/Image'
import { AlbumData } from 'api/ProtectedApi'
// import { Album } from 'store/albums/reducers'

interface Props {
  album: AlbumData
}

const AlbumItem: FC<Props> = ({ album }) => {
  const { id, location: albumLocation, date, icon } = album

  const isMediumScreenSize = useMediaQueryMin(900)

  const [formattedDate] = useState(moment(date).format('DD.MM.YYYY HH:mm'))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <LinkStyled to={`${id}`}>
        <Grid container spacing={1} wrap='nowrap'>
          <Image width={80} height={60} src={icon || ''} />

          <Location noWrap variant='body1'>
            {albumLocation}
          </Location>

          <Date variant='caption'>{formattedDate}</Date>
        </Grid>
      </LinkStyled>
    </motion.div>
  )
}

export default AlbumItem

const LinkStyled = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
`

const Location = styled(Typography)`
  color: #141414;
  line-height: 1.2;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Date = styled(Typography)`
  color: #444444;
  line-height: 1;
  font-size: 11px;
  margin-bottom: -5px;
  display: block;
  text-align: right;
`
