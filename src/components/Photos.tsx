import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mui/material'

import { APIStatus } from 'api/MainApi'
import { ThumbnailData } from 'api/ProtectedApi'

import { getOriginalPhotos } from 'store/albums/actions'
import { selectAlbumsStatus } from 'store/albums/selectors'

import Text from 'components/common/Text'
import Image from 'components/common/Image'
import LoadingButton from 'components/common/LoadingButton'

interface Props {
  thumbnails: ThumbnailData[]
  isDashboard?: boolean
}

const Photos: FC<Props> = ({ thumbnails, isDashboard = false }) => {
  const dispatch = useDispatch()

  const status = useSelector(selectAlbumsStatus)

  const md = useMediaQuery('(min-width:1024px)')

  const [hasLockedPhotos, setHasLockedPhotos] = useState(false)

  useEffect(() => {
    setHasLockedPhotos(thumbnails.some(({ isPaid }) => !isPaid))
  }, [thumbnails])

  const onClickUnlockBtnHandler = async () => {
    if (thumbnails.length) {
      const { albumId, originalKey } = thumbnails[0]

      const { payload } = (await dispatch(
        getOriginalPhotos({ albumId, originalKey }),
      )) as unknown as {
        payload: string
      }

      window.location.replace(payload)
    }
  }

  return (
    <MotionContainerStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      isDashboard={isDashboard}
    >
      {isDashboard && (
        <TitleStyled size={Text.size.sm} weight={Text.weight.medium}>
          All photos
        </TitleStyled>
      )}

      <PhotoList>
        {thumbnails.map(({ originalKey, url, isPaid }) => (
          <ImageWrapper key={originalKey}>
            <Image src={url} alt={url} width={md ? 400 : 125} height={md ? 400 : 125} />
          </ImageWrapper>
        ))}
      </PhotoList>

      {hasLockedPhotos && (
        <UnlockButtonWrapper>
          <UnlockButton
            loading={status === APIStatus.PENDING}
            disabled={isDashboard}
            fullWidth
            onClick={onClickUnlockBtnHandler}
          >
            Unlock your photos
          </UnlockButton>
        </UnlockButtonWrapper>
      )}
    </MotionContainerStyled>
  )
}

export default Photos

const MotionContainerStyled = styled(motion.div)<{ isDashboard: boolean }>`
  width: 100%;
  max-width: 375px;
  padding: ${({ isDashboard }) => (isDashboard ? '15px 0 0' : '0')};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 100%;
    padding: 60px 0 100px;
  }
`

const PhotoList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row wrap;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 100%;
    padding: 60px 0 100px;
  }
`

const ImageWrapper = styled.li`
  display: block;
  margin: 0;
  line-height: 0;
  width: 125px;
  height: 125px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 400px;
    height: 400px;
  }
`

const TitleStyled = styled(Text)`
  line-height: 10px;
  margin: 0 0 10px 0;
  padding: 0 15px;
  letter-spacing: 0;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 16px;
    line-height: 13px;
    margin: 0 0 19px 0;
    padding: 0 40px;
    letter-spacing: 0;
  }
`

const UnlockButtonWrapper = styled.div`
  padding: 40px 15px 40px;

  @media ${({ theme }) => theme.media.desktop} {
    padding: 100px 40px 100px;
  }
`

const UnlockButton = styled(LoadingButton)``
