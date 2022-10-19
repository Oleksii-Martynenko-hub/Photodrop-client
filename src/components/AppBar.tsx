import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar as Bar, Avatar, Toolbar } from '@mui/material'
import styled from 'styled-components'

import { logoutAsync } from 'store/sign-up/actions'
import { clearOTP } from 'store/sign-up/reducers'
import { selectUserAvatar, selectUserName } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import useToggle from 'components/hooks/useToggle'
import Button from './common/Button'
import { Logo } from 'components/Logo'
import HideOnScroll from 'components/common/HideOnScroll'

export const AppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userName = useSelector(selectUserName)
  const avatar = useSelector(selectUserAvatar)

  const [isShowBackButton, setIsShowBackButton] = useToggle(false)

  useEffect(() => {
    setIsShowBackButton(
      location.pathname.split('/').filter((p) => !!p).length > 1 ||
        location.pathname === ERoutes.CONFIRM ||
        location.pathname === ERoutes.TERMS ||
        location.pathname === ERoutes.PRIVACY ||
        location.pathname === ERoutes.ADD_SELFIE,
    )
  }, [location.pathname])

  const handleOnClickBack = () => {
    if (location.pathname === ERoutes.ADD_SELFIE) {
      dispatch(logoutAsync())
      return
    }
    if (location.pathname === ERoutes.CONFIRM) {
      dispatch(clearOTP())
    }
    if (location.pathname === `${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_EDIT_NAME}`) {
      navigate(`${ERoutes.MAIN}/${ERoutes.USER}`)
      return
    }
    navigate(-1)
  }

  return (
    <>
      <HideOnScroll>
        <AppBarStyled color='default'>
          <ToolbarStyled>
            {isShowBackButton && (
              <BackButtonStyled btnTheme={Button.themes.text} onClick={handleOnClickBack}>
                <ArrowIconStyled src='/images/back-arrow.svg' alt='back arrow' />
              </BackButtonStyled>
            )}

            <Logo />

            {location.pathname === ERoutes.MAIN && (
              <LinkStyled to={`${ERoutes.MAIN}/${ERoutes.USER}`}>
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  alt={userName || 'User name'}
                  src={avatar || 'Avatar'}
                />
              </LinkStyled>
            )}
          </ToolbarStyled>
        </AppBarStyled>
      </HideOnScroll>

      <ToolbarStyled />
    </>
  )
}

const LinkStyled = styled(Link)`
  display: block;
  text-decoration: none;
  position: absolute;
  top: 10px;
  right: 15px;
`

const AppBarStyled = styled(Bar)`
  box-shadow: none;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.styledPalette.appbarBorder};
  height: 55px;
  min-height: 55px;

  @media ${({ theme }) => theme.media.desktop} {
    height: 60px;
    min-height: 60px;
  }
`

const ToolbarStyled = styled(Toolbar)`
  padding: 20px 15px 19px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 55px;
  min-height: 55px;

  @media ${({ theme }) => theme.media.desktop} {
    height: 60px;
    min-height: 60px;
  }
`

const BackButtonStyled = styled(Button)`
  line-height: 10px;
  position: absolute;
  top: 12px;
  left: 7px;
  padding: 8px;
`

const ArrowIconStyled = styled.img`
  width: 8px;
  height: 16px;
`
