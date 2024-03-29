import { Dispatch, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CircularProgress, Dialog } from '@mui/material'
import { toast } from 'react-toastify'

import { ThumbnailData } from 'api/ProtectedApi'

import { copyToClipboard } from 'utils/copy-to-clipboard'

import { getOriginalPhotosAsync } from 'store/albums/actions'
import { selectAlbumById } from 'store/albums/selectors'

import Image from 'components/common/Image'
import Button from 'components/common/Button'

interface Props {
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
}: Props) => {
  const dispatch = useDispatch()

  const album = useSelector(selectAlbumById(thumbnail?.albumId || ''))

  const [localOriginalPhoto, setLocalOriginalPhoto] = useState<string | null>(null)

  const [isPhotoLoading, setIsPhotoLoading] = useState(false)

  const isPaid = useMemo(() => thumbnail?.isPaid, [thumbnail])

  useEffect(() => {
    if (thumbnail) {
      const { originalKey, url, albumId, originalPhoto } = thumbnail

      if (url && isArtistPrint) {
        setLocalOriginalPhoto(url)
        return
      }

      if (!originalPhoto && originalKey && albumId) {
        const { width, height } = document.body.getBoundingClientRect()
        getOriginalPhoto(albumId, originalKey, { width, height })
        return
      }

      if (originalPhoto) {
        setLocalOriginalPhoto(originalPhoto)
      }
    }
  }, [thumbnail])

  const handleOnClickCross = () => {
    setIsDialogOpen(false)
    setLocalOriginalPhoto(null)
  }

  const getOriginalPhoto = async (
    albumId: string,
    originalKey: string,
    screenSize: { width: number; height: number },
  ) => {
    setIsPhotoLoading(true)

    console.log('🚀 ~ getOriginalPhoto ~ screenSize', screenSize)

    /**
     * 1. get place size for the photo:
     *    if (width < 1024) place height - 186
     *    else place = screenSize
     *
     * 2. get side that will filled by photo: horizontal or vertical
     *    ???
     *
     * 3. get relative size of this side for watermark 252/825 = 30.5%
     */

    const { payload } = (await dispatch(
      getOriginalPhotosAsync({ albumId, originalKey }),
    )) as unknown as {
      payload: string
    }

    setLocalOriginalPhoto(payload)
  }

  const handleClickDownload = async () => {
    try {
      if (isArtistPrint && localOriginalPhoto) {
        const res = await fetch(localOriginalPhoto).then((res) => res.blob())
        const imageURL = URL.createObjectURL(res)

        const link = document.createElement('a')
        link.href = imageURL
        link.setAttribute('download', localOriginalPhoto)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error: any) {
      console.log('🚀 ~ handleClickDownload ~ error', error)
      toast.error(error.message)
    }
  }

  const handleClickShare = () => {
    if (localOriginalPhoto && album) {
      const data = {
        title: 'Photodrop',
        text: album.location + '\n' + album.date,
        url: localOriginalPhoto,
      }

      if (navigator.canShare && navigator.canShare(data)) {
        navigator.share(data)
        return
      }

      copyToClipboard(localOriginalPhoto)
      toast.info('Copied to clipboard')
    }
  }

  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={handleOnClickCross}
      PaperProps={{ sx: { boxShadow: 'none', background: 'transparent' } }}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <ContentWrapper>
        <Wrapper>
          <CloseButton btnTheme={Button.themes.text} onClick={handleOnClickCross}>
            <CrossIcon src='/images/cross-icon.svg' alt='back arrow' />
          </CloseButton>

          <ImageWrapper>
            <Image
              src={localOriginalPhoto || ''}
              alt={localOriginalPhoto || ''}
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

          <ButtonsWrapper isLock={!isPaid}>
            {isArtistPrint || isPaid ? (
              <>
                <DownloadButtonLink href={isArtistPrint ? undefined : localOriginalPhoto || ''}>
                  <DownloadButton btnTheme={Button.themes.text} onClick={handleClickDownload}>
                    <DownloadIcon src='/images/download-icon.svg' alt='Download' />
                    Download
                  </DownloadButton>
                </DownloadButtonLink>

                <ShareButton btnTheme={Button.themes.text} onClick={handleClickShare}>
                  <ShareIcon src='/images/share-icon.svg' alt='Share' />
                  Share
                </ShareButton>

                <SeeInFrameButton disabled fullWidth btnTheme={Button.themes.outlined}>
                  See in a frame
                </SeeInFrameButton>
              </>
            ) : (
              <UnlockButton disabled fullWidth btnTheme={Button.themes.white}>
                Unlock photo
              </UnlockButton>
            )}
          </ButtonsWrapper>
        </Wrapper>

        <Gradient />
      </ContentWrapper>
    </Dialog>
  )
}

export default PhotoDialog

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.styledPalette.mainText};
  position: relative;

  @media ${({ theme }) => theme.media.desktop} {
    background: rgba(0, 0, 0, 0.95);
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0 30px;
  position: relative;

  @media ${({ theme }) => theme.media.desktop} {
    padding: 0;
    max-width: 1440px;
    margin: 0 auto;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: calc(100% - 140px);
  margin: 56px 0 34px;

  @media ${({ theme }) => theme.media.desktop} {
    height: 100%;
    margin: 0;
  }
`

const CloseButton = styled(Button)`
  width: 30px;
  height: 30px;
  line-height: 15px;
  position: absolute;
  z-index: 1;
  top: 16px;
  left: 7px;
  padding: 7px;

  @media ${({ theme }) => theme.media.desktop} {
    top: 23px;
    left: 33px;
  }
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

const ButtonsWrapper = styled.div<{ isLock: boolean }>`
  display: flex;
  flex-flow: nowrap;
  padding: 0 15px;
  z-index: 1;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 200px;
    position: absolute;
    bottom: 30px;
    right: ${({ isLock }) => (isLock ? '50%' : '40px')};
    transform: ${({ isLock }) => (isLock ? 'translateX(50%)' : 'translateX(0)')};
  }
`

const Gradient = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100px;
  left: 0;
  bottom: 0;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75) 44.34%, rgba(0, 0, 0, 0) 100%);

  @media ${({ theme }) => theme.media.desktop} {
    display: block;
  }
`

const UnlockButton = styled(Button)`
  text-align: center;
  line-height: 23px;
  padding: 12px 13px 13px;
  margin: 0;
`

const DownloadButtonLink = styled.a`
  display: contents;
`

const DownloadButton = styled(Button)`
  font-size: 14px;
  line-height: 11px;
  letter-spacing: 0.07px;
  margin: 0 29px 0 0;
  color: #fff;
  border-radius: 0;
`

const ShareButton = styled(DownloadButton)`
  margin: 0 30px 0 0;

  @media ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`

const SeeInFrameButton = styled(Button)`
  line-height: 23px;
  padding: 13px 14px 14px;
`

const DownloadIcon = styled.img`
  width: 24px;
  height: 21px;
  margin: 0 0 5px 0;
`

const ShareIcon = styled(DownloadIcon)``
