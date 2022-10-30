import { Dispatch, HTMLAttributes, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { CircularProgress, Dialog, useMediaQuery } from '@mui/material'

import { ThumbnailData } from 'api/ProtectedApi'

import { getOriginalPhotosAsync } from 'store/albums/actions'

import Text from 'components/common/Text'
import Image from 'components/common/Image'
import Button from 'components/common/Button'

interface Props extends HTMLAttributes<HTMLDivElement> {
  thumbnail: Partial<ThumbnailData> | null
  isArtistPrint?: boolean
  isDialogOpen: boolean
  setIsDialogOpen: Dispatch<React.SetStateAction<boolean>>
}

const PhotoDialog = ({
  thumbnail,
  isArtistPrint = false,
  isDialogOpen,
  setIsDialogOpen,
  ...props
}: Props) => {
  const dispatch = useDispatch()

  const md = useMediaQuery('(min-width:1024px)')

  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null)

  const [isPhotoLoading, setIsPhotoLoading] = useState(false)

  useEffect(() => {
    if (thumbnail) {
      const { isPaid, originalKey, url, albumId } = thumbnail

      if (url && (isArtistPrint || (originalKey && !isPaid))) {
        setOriginalPhoto(url)
        return
      }

      if (originalKey && isPaid && albumId) {
        getOriginalPhoto(albumId, originalKey)
      }
    }
  }, [thumbnail])

  const handleOnClickCross = () => {
    setIsDialogOpen(false)
    setOriginalPhoto(null)
  }

  const getOriginalPhoto = async (albumId: string, originalKey: string) => {
    setIsPhotoLoading(true)

    const { payload } = (await dispatch(
      getOriginalPhotosAsync({ albumId, originalKey }),
    )) as unknown as {
      payload: string
    }

    setOriginalPhoto(payload)
  }

  return (
    <Dialog fullScreen open={isDialogOpen} onClose={handleOnClickCross}>
      <ContentWrapper>
        <CloseButton btnTheme={Button.themes.text} onClick={handleOnClickCross}>
          <CrossIcon src='/images/cross-icon.svg' alt='back arrow' />
        </CloseButton>

        <ImageWrapper>
          <Image
            src={originalPhoto || ''}
            alt={originalPhoto || ''}
            width='100%'
            height='100%'
            objectFit='contain'
            onLoad={() => setIsPhotoLoading(false)}
          />

          {isPhotoLoading && (
            <Spinner>
              <CircularProgress size={60} color='inherit' />
            </Spinner>
          )}
        </ImageWrapper>

        <ButtonsWrapper>
          {isArtistPrint || (thumbnail && thumbnail.isPaid) ? (
            <SeeInFrameButton disabled fullWidth btnTheme={Button.themes.outlined}>
              See in a frame
            </SeeInFrameButton>
          ) : (
            <UnlockButton disabled={!thumbnail?.isPaid} fullWidth btnTheme={Button.themes.white}>
              Unlock photo
            </UnlockButton>
          )}
        </ButtonsWrapper>
      </ContentWrapper>
    </Dialog>
  )
}

export default PhotoDialog

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.styledPalette.mainText};
  padding: 16px 0 30px;
  position: relative;

  @media ${({ theme }) => theme.media.desktop} {
    background: ${({ theme }) => theme.styledPalette.mainText + 'ee'};
    padding: 23px 0 40px;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  margin: 56px 0 34px;
`

const CloseButton = styled(Button)`
  width: 30px;
  height: 30px;
  line-height: 15px;
  position: absolute;
  top: 16px;
  left: 7px;
  padding: 7px;
`

const CrossIcon = styled.img`
  width: 15px;
  height: 15px;
`

const Spinner = styled.div`
  color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: nowrap;
  padding: 0 15px;
`

const UnlockButton = styled(Button)`
  text-align: center;
  line-height: 23px;
  padding: 12px 13px 13px;
  margin: 0 10px 0 0;
`

const SeeInFrameButton = styled(Button)`
  line-height: 23px;
  padding: 13px 14px 14px;
`
