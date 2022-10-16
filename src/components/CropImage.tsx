import React, { useState, useCallback, useEffect } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import styled from 'styled-components'
import { convertFileToDataURL } from 'utils/convert-file-to-data-url'
import { getCroppedImage } from 'utils/get-cropped-image'
import Button from './common/Button'
import Text from './common/Text'

interface Props {
  originalImage: File
  setOriginalImage: React.Dispatch<React.SetStateAction<File | null>>
  setImage: React.Dispatch<React.SetStateAction<File | null>>
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CropImage = ({ originalImage, setOriginalImage, setImage, setDialogOpen }: Props) => {
  const [imageSrc, setImageSrc] = React.useState<string | ArrayBuffer | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

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
    if (imageSrc && croppedAreaPixels) {
      const croppedImg = await getCroppedImage(imageSrc.toString(), croppedAreaPixels, rotation)
      if (croppedImg) {
        setCroppedImage(croppedImg)
        const blob = await fetch(croppedImg).then((res) => res.blob())
        setImage(blob as File)
        setDialogOpen(false)
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
        <Cropper
          image={imageSrc ? imageSrc.toString() : undefined}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          // minZoom={1.2}
          transform={`translate(${crop.x + 3}px, ${
            crop.y
          }px) rotate(${rotation}deg) scale(${zoom})`}
          maxZoom={8}
          cropShape='round'
          showGrid={false}
          objectFit='auto-cover'
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </CropperWrapper>
      {/* 
      <input
        type='number'
        name=''
        id=''
        value={rotation}
        onChange={({ target }) => setRotation(+target.value)}
      /> */}

      <ButtonsWrapper>
        <RetakeButtonStyled
          fullWidth
          btnTheme={Button.themes.outlined}
          forwardedAs='label'
          htmlFor='input-add-avatar'
        >
          <input
            id='input-add-avatar'
            name='add-avatar'
            style={{ display: 'none' }}
            type='file'
            onChange={handleOnChangeFile}
          />
          Retake
        </RetakeButtonStyled>

        <SaveButtonStyled fullWidth btnTheme={Button.themes.white} onClick={handleOnClickSave}>
          Save
        </SaveButtonStyled>
      </ButtonsWrapper>
    </CropContainerStyled>
  )
}

function dataURItoBlob(dataURI: string | ArrayBuffer) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const stringData = dataURI.toString()
  const byteString = atob(stringData.split(',')[1])

  // separate out the mime component
  const mimeString = stringData.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}

const CropContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.styledPalette.mainText};
  padding: 23px 15px 15px;
  position: relative;
`

const CropperWrapper = styled.div`
  width: 100%;
  flex: 0 0 285px;
  position: relative;
  margin: 42px auto 95px;

  & .reactEasyCrop_CropArea {
    width: 285px !important;
    height: 285px !important;
    border: none;
    box-shadow: 0 0 0 9999em ${({ theme }) => theme.styledPalette.mainText};
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
  margin-bottom: 94px;
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
  margin-right: 10px;
`

const SaveButtonStyled = styled(Button)`
  line-height: 23px;
  padding: 13px 14px 14px;
`
