import { Dispatch, HTMLAttributes, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { CircularProgress, Dialog, useMediaQuery } from '@mui/material'
import { toast } from 'react-toastify'

import { ThumbnailData } from 'api/ProtectedApi'

import { copyToClipboard } from 'utils/copy-to-clipboard'

import { getOriginalPhotosAsync } from 'store/albums/actions'
import { selectAlbumById } from 'store/albums/selectors'

import Text from 'components/common/Text'
import Image from 'components/common/Image'
import Button from 'components/common/Button'
import axios from 'axios'

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

  const album = useSelector(selectAlbumById(thumbnail?.albumId || ''))

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

  const handleClickDownload = async () => {
    try {
      if (thumbnail?.originalKey && originalPhoto) {
        const origin =
          'https://photodropbucket.s3.eu-west-1.amazonaws.com/bab77cc5-b18d-48f1-ad0c-5ac50bd5bf74.jpeg?AWSAccessKeyId=AKIARK5HIXATFKM745EN&Expires=1667151355&Signature=AiXw2V5sLE%2FzUYih%2ByvU0Gq0gCI%3D'

        toast(originalPhoto)
        copyToClipboard(originalPhoto)

        const res = await axios({
          url: originalPhoto,
          method: 'GET',
          responseType: 'blob',
        })
        const imageURL = URL.createObjectURL(new Blob([res.data]))

        const link = document.createElement('a')
        link.href = imageURL
        link.setAttribute('download', `Photodrop-${thumbnail?.originalKey}`)
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
    if (originalPhoto && album) {
      const data = {
        title: 'Photodrop',
        text: album.location + '\n' + album.date,
        url: originalPhoto,
      }

      if (navigator.canShare && navigator.canShare(data)) {
        toast.info('I can share')
        navigator.share(data)
        return
      }

      copyToClipboard(originalPhoto)
      toast.info('Copied to clipboard')
    }
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
            <>
              <DownloadButton btnTheme={Button.themes.text} onClick={handleClickDownload}>
                <DownloadIcon src='/images/download-icon.svg' alt='Download' />
                Download
              </DownloadButton>

              <ShareButton btnTheme={Button.themes.text} onClick={handleClickShare}>
                <ShareIcon src='/images/share-icon.svg' alt='Share' />
                Share
              </ShareButton>

              <SeeInFrameButton disabled fullWidth btnTheme={Button.themes.outlined}>
                See in a frame
              </SeeInFrameButton>
            </>
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

const DownloadButton = styled(Button)`
  font-size: 14px;
  line-height: 11px;
  letter-spacing: 0.07px;
  margin: 0 29px 0 0;
  color: #fff;
`

const ShareButton = styled(DownloadButton)`
  margin: 0 30px 0 0;
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
