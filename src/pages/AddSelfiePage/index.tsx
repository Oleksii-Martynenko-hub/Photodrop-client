import { FC } from 'react'
import { Navigate } from 'react-router'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { selectUserAvatar } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import AddSelfie from 'components/AddSelfie'

const AddSelfiePage: FC = () => {
  const avatar = useSelector(selectUserAvatar)

  if (avatar) return <Navigate to={ERoutes.DASHBOARD} replace />

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
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 500px;
    padding: 177px 40px 40px;
  }
`

const TitleStyled = styled(Title)`
  line-height: 17px;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 22px;
  }
`

const SubtitleStyled = styled(Text)`
  margin: 14px 0 30px 0;
  line-height: 23px;
  letter-spacing: 0;
  text-align: center;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 29px 0 28px;
    line-height: 16px;
  }
`
