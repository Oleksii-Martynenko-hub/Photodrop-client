import { FC, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import styled from 'styled-components'

import { selectPhoneNumber, selectUserEmail } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import useToggle from 'components/hooks/useToggle'
import Text from 'components/common/Text'
import Title from 'components/common/Title'

const Settings: FC = () => {
  const location = useLocation()

  const phoneNumber = useSelector(selectPhoneNumber)
  const userEmail = useSelector(selectUserEmail)

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 3)
  }, [location.pathname])

  return (
    <>
      {isShowOutlet ? (
        <Outlet />
      ) : (
        <MotionContainerStyled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TitleStyled size={Title.size.small}>Account settings</TitleStyled>

          <LinkStyled to={ERoutes.USER_SETTINGS_PHONE}>
            <PhoneIconStyled src='/images/phone-icon.svg' alt='phone icon' />

            <LinkTextWrapper>
              <LinkTitle size={Text.size.sm} weight={Text.weight.medium}>
                Phone •{' '}
                <Verified forwardedAs='span' size={Text.size.sm} weight={Text.weight.medium}>
                  Verified
                </Verified>
              </LinkTitle>

              <LinkDescription size={Text.size.sm}>
                {phoneNumber?.formattedValue.replace('(', ' (').replace(')', ') ')}
              </LinkDescription>
            </LinkTextWrapper>

            <ArrowIconStyled src='/images/back-arrow.svg' alt='right arrow' />
          </LinkStyled>

          <LinkStyled to={ERoutes.USER_SETTINGS_EMAIL}>
            <EmailIconStyled src='/images/email-icon.svg' alt='email icon' />

            <LinkTextWrapper>
              <LinkTitle size={Text.size.sm} weight={Text.weight.medium}>
                Email
              </LinkTitle>

              <LinkDescription size={Text.size.sm}>
                {userEmail || 'the.real.jane.smith@gmail.com'}
              </LinkDescription>
            </LinkTextWrapper>

            <ArrowIconStyled src='/images/back-arrow.svg' alt='right arrow' />
          </LinkStyled>
        </MotionContainerStyled>
      )}
    </>
  )
}

export default Settings

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 20px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const TitleStyled = styled(Title)`
  line-height: 13px;
  margin-bottom: 20px;
`

const LinkTextWrapper = styled.div`
  flex: auto;
  margin-right: 15px;
`

const LinkTitle = styled(Text)`
  display: block;
  margin-bottom: 10px;
  line-height: 10px;
  letter-spacing: 0.4px;
`

const Verified = styled(LinkTitle)`
  margin-bottom: 0;
  display: inline-block;
  color: ${({ theme }) => theme.styledPalette.success};
`

const LinkDescription = styled(Text)`
  display: block;
  line-height: 11px;
  letter-spacing: 0px;
`

const ArrowIconStyled = styled.img`
  width: 8px;
  height: 16px;
  transform: rotate(180deg);
`

const PhoneIconStyled = styled.img`
  width: 25px;
  height: 30px;
  margin-right: 10px;
`

const EmailIconStyled = styled(PhoneIconStyled)`
  height: 20px;
`

const LinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 9px 14px 8px;
  margin-bottom: 5px;
  border: 1px solid ${({ theme }) => theme.styledPalette.secondaryBorder};
  text-decoration: none;
`
