import { FC, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { selectAlbumById } from 'store/albums/selectors'

import Photos from 'components/Photos'

const CurrentAlbum: FC = () => {
  const id = useParams<{ id: string }>().id || ''

  const album = useSelector(selectAlbumById(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Photos thumbnails={album?.thumbnails || []} />
    </MotionContainerStyled>
  )
}

export default CurrentAlbum

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  padding: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 100%;
    padding: 0;
  }
`
