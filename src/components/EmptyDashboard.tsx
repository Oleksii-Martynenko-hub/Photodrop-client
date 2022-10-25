import { FC } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Text from 'components/common/Text'

const EmptyDashboard: FC = () => {
  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <IconsWrapper>
        <LargeMsgIcon src='/images/large-msg-icon.svg' alt='large msg icon' />
        <SmallMsgIcon src='/images/small-msg-icon.svg' alt='small msg icon' />
        <RoundedBadgeIcon src='/images/rounded-badge-icon.svg' alt='rounded badge icon' />
      </IconsWrapper>

      <TitleStyled size={Text.size.xl} weight={Text.weight.medium}>
        Your photos will drop soon.
      </TitleStyled>

      <SubtitleStyled size={Text.size.lg}>
        You will get a text message when they are ready. It can take up to 48 hours.
      </SubtitleStyled>
    </MotionContainerStyled>
  )
}

export default EmptyDashboard

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 30px 15px 41px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border-bottom: 5px solid ${({ theme }) => theme.styledPalette.background};

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 100%;
    padding: 53px 40px 40px;
    border-bottom: none;
  }
`

const IconsWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  line-height: 0;
`

const LargeMsgIcon = styled.img`
  width: 70px;
  height: 65px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 94px;
    height: 87px;
  }
`

const SmallMsgIcon = styled.img`
  position: absolute;
  top: 16px;
  left: 23px;
  width: 27px;
  height: 26px;

  @media ${({ theme }) => theme.media.desktop} {
    top: 22px;
    left: 31px;
    width: 36px;
    height: 35px;
  }
`

const RoundedBadgeIcon = styled.img`
  position: absolute;
  top: -10px;
  right: -11px;
  width: 26px;
  height: 26px;

  @media ${({ theme }) => theme.media.desktop} {
    top: -13px;
    right: -15px;
    width: 34px;
    height: 34px;
  }
`

const TitleStyled = styled(Text)`
  line-height: 14px;
  margin: 21px 0 16px 0;
  text-align: center;
  letter-spacing: 0.6px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 30px;
    line-height: 22px;
    margin: 30px 0 19px 0;
  }
`

const SubtitleStyled = styled(Text)`
  margin: 0;
  text-align: center;
  line-height: 23px;
  letter-spacing: 0;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 22px;
    line-height: 16px;
  }
`
