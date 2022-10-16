import { HTMLAttributes, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Dialog, Input } from '@mui/material'
import Uppy from '@uppy/core'
import { Dashboard, useUppy } from '@uppy/react'
import { CropImage } from './CropImage'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Button from './common/Button'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends HTMLAttributes<HTMLDivElement> {}

function readFile(file: File | Blob) {
  return new Promise<string | ArrayBuffer | null>((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}

export const AddSelfie = ({ ...props }: Props) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null)
  const [isDialogOpen, setDialogOpen] = useState(false)

  const addAvatar = useUppy(() => {
    return new Uppy({
      id: 'addAvatar',
    })
  })

  useEffect(() => {
    if (image) {
      addAvatar.addFile({
        name: image.name,
        type: image.type,
        data: image,
        meta: {
          relativePath: image.webkitRelativePath,
        },
      })

      const getImageUrl = async (image: File) => {
        const imageDataUrl = await readFile(image)

        if (imageDataUrl) setImageSrc(imageDataUrl)
      }
      getImageUrl(image)
    }
  }, [image])

  const handleOnChangeFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files.length) {
      setOriginalImage(target.files[0])
      setDialogOpen(true)
    }
  }

  return (
    <div>
      <SelfieWrapperStyled {...props}>
        <Dialog fullScreen open={isDialogOpen} onClose={() => setDialogOpen(false)}>
          {originalImage && (
            <CropImage
              originalImage={originalImage}
              setOriginalImage={setOriginalImage}
              setImage={setImage}
              setDialogOpen={setDialogOpen}
            />
          )}
        </Dialog>

        <SelfieImgStyled
          src={imageSrc ? imageSrc.toString() : '/images/default-selfie.png'}
          alt='selfie'
        />

        <ButtonIconStyled forwardedAs='label' htmlFor='input-add-avatar'>
          <input
            id='input-add-avatar'
            name='add-avatar'
            style={{ display: 'none' }}
            type='file'
            onChange={handleOnChangeFile}
          />
        </ButtonIconStyled>
      </SelfieWrapperStyled>
    </div>
  )
}

const SelfieWrapperStyled = styled.div`
  width: 181px;
  height: 181px;
  flex: 0 0 181px;
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
`

const CountryCodeStyled = styled.div``

const ButtonIconStyled = styled(Button)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;

  &::before,
  &::after {
    content: '';
    display: block;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 18px;
    height: 2px;
  }

  &::after {
    width: 2px;
    height: 18px;
  }
`

const SelfieImgStyled = styled.img`
  width: 181px;
  height: 181px;
  border-radius: 50%;
`

const InputStyled = styled(Input)`
  margin-left: 20px;
`
