import { FC, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { Dialog, Grid, Typography, useMediaQuery } from '@mui/material'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { useObserver } from 'components/hooks/useObserver'
import Image from 'components/common/Image'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'
import Photos from 'components/Photos'
import { useSelector } from 'react-redux'
import { selectAlbums } from 'store/albums/selectors'

const CurrentAlbum: FC = () => {
  const id = useParams<{ id: string }>().id || ''
  console.log('🚀 ~ id', id)

  const albums = useSelector(selectAlbums)

  const sm = useMediaQuery('(min-width:600px)')
  const md = useMediaQuery('(min-width:900px)')
  const lg = useMediaQuery('(min-width:1200px)')

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState({ src: '', alt: '' })

  const observerRef = useRef<HTMLDivElement>(null)
  const visible = useObserver(observerRef, '100px')

  useDidMountEffect(() => {
    console.log('useDidMountEffect')
  }, [])

  const onClickPhoto = (src: string, alt: string) => () => {
    setCurrentPhoto({ src, alt })
    setIsDialogOpen(true)
  }
  const onClosePhoto = () => {
    setCurrentPhoto({ src: '', alt: '' })
    setIsDialogOpen(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* <Photos thumbnails={} /> */}

      <Dialog
        scroll='body'
        open={isDialogOpen}
        onClose={onClosePhoto}
        PaperProps={{ sx: { background: 'transparent', boxShadow: 'none' } }}
      >
        <Image {...currentPhoto} />
      </Dialog>
    </motion.div>
  )
}

export default CurrentAlbum

const Name = styled(Typography)`
  color: #090909;
  line-height: 1.1;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 15px;
  margin-right: 24px;
`
