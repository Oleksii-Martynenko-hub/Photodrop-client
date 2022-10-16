import { FC } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import Title from 'components/common/Title'
import Text from 'components/common/Text'
// import { EditSelfie } from 'components/AddSelfie'

const AddSelfie: FC = () => {
  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled>Add a selfie</TitleStyled>

      <SubtitleStyled size={Text.size.lg}>
        A selfie allows your photos to be synced with your account.
      </SubtitleStyled>

      {/* <EditSelfie /> */}
    </MotionContainerStyled>
  )
}

export default AddSelfie

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
