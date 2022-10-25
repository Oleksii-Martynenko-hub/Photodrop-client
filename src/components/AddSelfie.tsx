import { HTMLAttributes, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { Dialog, useMediaQuery } from '@mui/material'
import Uppy from '@uppy/core'
import AwsS3 from '@uppy/aws-s3'
import { toast } from 'react-toastify'

import ProtectedApi from 'api/ProtectedApi'

import { setAvatar } from 'store/user/reducers'
import { selectUserAvatar, selectUserId } from 'store/user/selectors'

import { useUppy } from 'components/hooks/useUppy'
import Button from 'components/common/Button'
import CropImage from 'components/CropImage'

interface Props extends HTMLAttributes<HTMLDivElement> {
  isUserPage?: boolean
}

const AddSelfie = ({ isUserPage = false, ...props }: Props) => {
  const dispatch = useDispatch()
  const userId = useSelector(selectUserId)
  const avatar = useSelector(selectUserAvatar)

  const md = useMediaQuery('(min-width:1024px)')

  const [originalImage, setOriginalImage] = useState<File | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(isUserPage ? avatar : null)
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isSelfieUploading, setSelfieUploading] = useState(false)

  const addAvatar = useUppy(() => {
    return new Uppy({
      id: 'addAvatar',
      autoProceed: true,
    }).use(AwsS3, {
      limit: 1,
      getUploadParameters: async (file) => {
        const api = ProtectedApi.getInstance()

        const data = await api.postGetPresignedPostSelfie({
          name: file.name,
          userId: userId || '',
        })

        return Promise.resolve({
          method: 'POST',
          url: data.url,
          fields: { ...data.fields },
        })
      },
    })
  })

  addAvatar.on('complete', (result) => {
    console.log('successful files:', result.successful)
    if (imageSrc && !result.failed.length) {
      dispatch(setAvatar(imageSrc.toString()))
      setSelfieUploading(false)
      setDialogOpen(false)
      setOriginalImage(null)
    }
  })

  addAvatar.on('error', (error) => {
    setSelfieUploading(false)
    toast.error(error.stack)
  })

  useEffect(() => {
    if (image && originalImage) {
      const updatedImage = new File([image.slice(0, image.size, image.type)], originalImage.name, {
        lastModified: originalImage.lastModified,
        type: originalImage.type,
      })

      addAvatar.addFile({
        name: updatedImage.name,
        type: updatedImage.type,
        data: updatedImage,
        meta: {
          relativePath: originalImage.webkitRelativePath,
        },
      })

      setSelfieUploading(true)
    }
  }, [image])

  const handleOnClickAddBtn = () => {
    if (isUserPage) setDialogOpen(true)
  }

  const handleOnChangeFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files && target.files.length) {
      setOriginalImage(target.files[0])
      setDialogOpen(true)
    }
  }

  return (
    <SelfieWrapperStyled isUserPage={isUserPage} {...props}>
      <Dialog
        fullScreen={!md}
        open={isDialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{ sx: { background: 'transparent', boxShadow: 'none' } }}
      >
        {(originalImage || (isUserPage && avatar)) && (
          <CropImage
            originalImage={originalImage}
            setOriginalImage={setOriginalImage}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            setImage={setImage}
            setDialogOpen={setDialogOpen}
            isSelfieUploading={isSelfieUploading}
          />
        )}
      </Dialog>

      <SelfieImgStyled
        src={isUserPage && avatar ? avatar : '/images/default-selfie.png'}
        alt='selfie'
      />

      <ButtonIconStyled
        onClick={handleOnClickAddBtn}
        forwardedAs='label'
        htmlFor='input-add-avatar'
      >
        {isUserPage ? (
          <EditIconStyled src='/images/edit-icon.svg' alt='edit icon' />
        ) : (
          <input
            id='input-add-avatar'
            name='add-avatar'
            style={{ display: 'none' }}
            type='file'
            onChange={handleOnChangeFile}
          />
        )}
      </ButtonIconStyled>
    </SelfieWrapperStyled>
  )
}

export default AddSelfie

const ButtonIconStyled = styled(Button)`
  border-radius: 50%;
  position: absolute;
  padding: 0;
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
  border-radius: 50%;
`

const EditIconStyled = styled.img`
  width: 18px;
  height: 23px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 22px;
    height: 29px;
  }
`

const SelfieWrapperStyled = styled.div<{ isUserPage: boolean }>`
  width: ${({ isUserPage }) => (isUserPage ? '100px' : '181px')};
  height: ${({ isUserPage }) => (isUserPage ? '100px' : '181px')};
  flex: 0 0 ${({ isUserPage }) => (isUserPage ? '100px' : '181px')};
  border-radius: 50%;
  position: relative;
  margin: ${({ isUserPage }) => (isUserPage ? '0' : '0 auto')};

  @media ${({ theme }) => theme.media.desktop} {
    width: ${({ isUserPage }) => (isUserPage ? '150px' : '181px')};
    height: ${({ isUserPage }) => (isUserPage ? '150px' : '181px')};
    flex: 0 0 ${({ isUserPage }) => (isUserPage ? '150px' : '181px')};
  }

  ${SelfieImgStyled} {
    width: ${({ isUserPage }) => (isUserPage ? '100px' : '181px')};
    height: ${({ isUserPage }) => (isUserPage ? '100px' : '181px')};

    @media ${({ theme }) => theme.media.desktop} {
      width: ${({ isUserPage }) => (isUserPage ? '150px' : '181px')};
      height: ${({ isUserPage }) => (isUserPage ? '150px' : '181px')};
    }
  }

  ${ButtonIconStyled} {
    width: ${({ isUserPage }) => (isUserPage ? '37px' : '42px')};
    height: ${({ isUserPage }) => (isUserPage ? '37px' : '42px')};

    @media ${({ theme }) => theme.media.desktop} {
      width: ${({ isUserPage }) => (isUserPage ? '45px' : '42px')};
      height: ${({ isUserPage }) => (isUserPage ? '45px' : '42px')};
    }

    ${({ isUserPage }) =>
      isUserPage &&
      css`
        border: 2px solid #ffffff;
        transform: translateX(50%);
        padding: 5px 8px 5px 9px;

        @media ${({ theme }) => theme.media.desktop} {
          padding: 7px 10px 7px 11px;
        }

        &::before,
        &::after {
          display: none;
        }
      `}
  }
`
