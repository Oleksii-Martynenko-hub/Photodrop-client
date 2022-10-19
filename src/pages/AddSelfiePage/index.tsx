import { FC } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { selectUserAvatar } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import Title from 'components/common/Title'
import Text from 'components/common/Text'
import { AddSelfie } from 'components/AddSelfie'

const AddSelfiePage: FC = () => {
  const avatar = useSelector(selectUserAvatar)

  if (avatar) return <Navigate to={ERoutes.MAIN} replace />

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled>Add a selfie</TitleStyled>

      <SubtitleStyled size={Text.size.lg}>
        A selfie allows your photos to be synced with your account.
      </SubtitleStyled>

      <AddSelfie />
    </MotionContainerStyled>
  )
}

export default AddSelfiePage

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 72px 15px 15px;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
  }
`

const TitleStyled = styled(Title)`
  line-height: 17px;
`

const SubtitleStyled = styled(Text)`
  margin: 14px 0 30px 0;
  line-height: 23px;
  letter-spacing: 0;
  text-align: center;
`
