import { FC, useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { selectUserName } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useToggle } from 'components/hooks/useToggle'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import AddSelfie from 'components/AddSelfie'

const UserPage: FC = () => {
  const location = useLocation()
  const name = useSelector(selectUserName)

  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  const [links] = useState([
    {
      route: ERoutes.USER_EDIT_NAME,
      title: 'Your name',
      description: 'Tell us your name to personalize communications.',
    },
    // {
    //   route: ERoutes.USER_SETTINGS,
    //   title: 'Account settings',
    //   description: 'Update your phone and email',
    // },
    // {
    //   route: ERoutes.USER_NOTIFICATIONS,
    //   title: 'Notification settings',
    //   description: 'How should we contact you?',
    // },
  ])

  useEffect(() => {
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 2)
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
          <TitleStyled size={Title.size.small}>Welcome{name && `, ${name}.`}</TitleStyled>

          <SubtitleStyled weight={Text.weight.medium}>Your selfie</SubtitleStyled>

          <EditSelfieWrapper>
            <AddSelfie isUserPage />
          </EditSelfieWrapper>

          {links.map(({ route, title, description }) => (
            <LinkStyled key={route} to={route}>
              <LinkTextWrapper>
                <LinkTitle size={Text.size.sm} weight={Text.weight.medium}>
                  {title}
                </LinkTitle>

                <LinkDescription size={Text.size.sm}>{description}</LinkDescription>
              </LinkTextWrapper>

              <ArrowIconStyled src='/images/back-arrow.svg' alt='right arrow' />
            </LinkStyled>
          ))}
        </MotionContainerStyled>
      )}
    </>
  )
}

export default UserPage

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 22px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 500px;
    padding: 40px;
  }
`

const EditSelfieWrapper = styled.div`
  margin: 0 0 20px 0;
`

const TitleStyled = styled(Title)`
  line-height: 22px;
  margin: -5px 0 -5px;
`

const SubtitleStyled = styled(Text)`
  margin: 20px 0 13px 0;
  line-height: 14px;
  letter-spacing: 0.4px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 33px 0 15px 0;

    font-size: 18px;
    line-height: 13px;
  }
`

const LinkTextWrapper = styled.div`
  flex: auto;
  margin: 0 15px 0 0;
`

const LinkTitle = styled(Text)`
  display: block;
  margin: 0 0 10px 0;
  line-height: 10px;
  letter-spacing: 0.4px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 16px;
  }
`

const LinkDescription = styled(Text)`
  display: block;
  line-height: 11px;
  letter-spacing: 0px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 16px;
    line-height: 13px;
  }
`

const ArrowIconStyled = styled.img`
  position: relative;
  top: 8px;
  width: 8px;
  height: 16px;
  transform: rotate(180deg);

  @media ${({ theme }) => theme.media.desktop} {
    top: 6px;
    width: 10px;
    height: 20px;
  }
`

const LinkStyled = styled(Link)`
  display: flex;
  background: #ffffff;
  border-radius: 10px;
  padding: 9px 14px 8px;
  margin: 0 0 5px 0;
  border: 1px solid ${({ theme }) => theme.styledPalette.secondaryBorder};
  text-decoration: none;

  @media ${({ theme }) => theme.media.desktop} {
    padding: 10px 14px 8px;
  }
`
