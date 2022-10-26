import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import Cropper, { Area, MediaSize, Point } from 'react-easy-crop'

import { getCroppedImage } from 'utils/get-cropped-image'
import { convertFileToDataURL } from 'utils/convert-file-to-data-url'

import Text from 'components/common/Text'
import Button from 'components/common/Button'

interface Props {
  originalImage: File | null
  setOriginalImage: React.Dispatch<React.SetStateAction<File | null>>
  imageSrc: string | ArrayBuffer | null
  setImageSrc: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSelfieUploading: boolean
}

const CropImage = ({
  originalImage,
  setOriginalImage,
  imageSrc,
  setImageSrc,
  setImage,
  setDialogOpen,
  isSelfieUploading,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  useEffect(() => {
    const getImageUrl = async (image: File) => {
      const imageDataUrl = await convertFileToDataURL(image)

      if (imageDataUrl) setImageSrc(imageDataUrl)
    }
    if (originalImage) {
      getImageUrl(originalImage)
    }
  }, [originalImage])

  const handleOnClickSave = async () => {
    if (!originalImage) {
      setDialogOpen(false)
      return
    }

    if (imageSrc && croppedAreaPixels) {
      const croppedImg = await getCroppedImage(imageSrc.toString(), croppedAreaPixels, rotation)
      if (croppedImg) {
        setImageSrc(croppedImg)
        setCrop({ x: 0, y: 0 })
        setRotation(0)
        setZoom(1)
        const blob = await fetch(croppedImg).then((res) => res.blob())
        setImage(blob as File)
      }
    }
  }

  const handleOnChangeFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files.length) {
      setOriginalImage(target.files[0])
    }
  }

  const handleOnClickCross = () => {
    setDialogOpen(false)
    setOriginalImage(null)
  }

  const handleOnCrop = (location: Point) => {
    if (originalImage) setCrop(location)
  }

  const handleOnMediaLoaded = (mediaSize: MediaSize) => {
    const min = Math.min(mediaSize.width, mediaSize.height)
    const aspect = 285 / min
    setZoom(aspect)
    setMinZoom(aspect)
  }

  return (
    <CropContainerStyled>
      <CloseButton btnTheme={Button.themes.text} onClick={handleOnClickCross}>
        <CrossIcon src='/images/cross-icon.svg' alt='back arrow' />
      </CloseButton>

      <TitleStyled size={Text.size.lg} weight={Text.weight.medium}>
        Take selfie
      </TitleStyled>

      <DescriptionStyled>Drag and zoom image to crop</DescriptionStyled>

      <CropperWrapper>
        {imageSrc && (
          <Cropper
            image={imageSrc.toString()}
            crop={crop}
            rotation={rotation}
            aspect={1}
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={8}
            cropShape='round'
            cropSize={{ width: 285, height: 285 }}
            showGrid={false}
            objectFit='auto-cover'
            onCropChange={handleOnCrop}
            onMediaLoaded={handleOnMediaLoaded}
            onRotationChange={!originalImage ? undefined : setRotation}
            onCropComplete={!originalImage ? undefined : onCropComplete}
            onZoomChange={!originalImage ? undefined : setZoom}
          />
        )}
      </CropperWrapper>

      <ButtonsWrapper>
        <RetakeButtonStyled
          fullWidth
          btnTheme={Button.themes.outlined}
          forwardedAs='label'
          htmlFor='input-retake-avatar'
        >
          <input
            id='input-retake-avatar'
            name='retake-avatar'
            style={{ display: 'none' }}
            type='file'
            onChange={handleOnChangeFile}
          />
          Retake
        </RetakeButtonStyled>

        <Button
          style={{ position: 'absolute', width: '10px', height: '10px', bottom: 5, right: 5 }}
          btnTheme={Button.themes.text}
          onClick={() => setRotation((prev) => prev + 1)}
        ></Button>
        <Button
          style={{ position: 'absolute', width: '10px', height: '10px', bottom: 5, left: 5 }}
          btnTheme={Button.themes.text}
          onClick={() => setRotation((prev) => prev - 1)}
        ></Button>

        <SaveButtonStyled fullWidth btnTheme={Button.themes.white} onClick={handleOnClickSave}>
          {isSelfieUploading ? 'Uploading...' : 'Save'}
        </SaveButtonStyled>
      </ButtonsWrapper>
    </CropContainerStyled>
  )
}

export default CropImage

const CropContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.styledPalette.mainText};
  padding: 23px 15px 15px;
  position: relative;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 379px;
    padding: 23px 15px 40px;
    border-radius: 20px;
  }
`

const CropperWrapper = styled.div`
  width: 100%;
  flex: 0 0 285px;
  position: relative;
  margin: 42px auto 95px;

  & .reactEasyCrop_CropArea {
    /* width: 285px !important;
    height: 285px !important; */
    border: none;
    box-shadow: 0 0 0 9999em ${({ theme }) => theme.styledPalette.mainText};
    cursor: move;
  }

  & .reactEasyCrop_Image {
    /* width: 285px;
    height: 285px;
    object-fit: cover;
    object-position: center; */
    cursor: auto;
  }
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

const TitleStyled = styled(Text)`
  line-height: 13px;
  letter-spacing: 0.5px;
  color: #fff;
  text-align: center;
  margin: 0 0 94px 0;
`

const DescriptionStyled = styled(Text)`
  line-height: 11px;
  letter-spacing: 0;
  color: #fff;
  text-align: center;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: nowrap;
`

const RetakeButtonStyled = styled(Button)`
  text-align: center;
  line-height: 23px;
  padding: 12px 13px 13px;
  margin: 0 10px 0 0;
`

const SaveButtonStyled = styled(Button)`
  line-height: 23px;
  padding: 13px 14px 14px;
`
