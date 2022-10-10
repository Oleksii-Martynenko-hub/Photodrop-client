import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar as Bar,
  Avatar,
  IconButton,
  SxProps,
  Theme,
  Toolbar,
  useMediaQuery,
} from '@mui/material'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

import { selectIsLoggedIn } from 'store/sign-up/selectors'

import useToggle from 'components/hooks/useToggle'

import { Logo } from 'components/Logo'
import HideOnScroll from 'components/HideOnScroll'
import { ERoutes } from 'pages/App'
import { clearOTP } from 'store/sign-up/reducers'
import styled from 'styled-components'

export const AppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const md = useMediaQuery('(min-width:900px)')

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const [isShowBackButton, setIsShowBackButton] = useToggle(false)

  useEffect(() => {
    setIsShowBackButton(
      location.pathname.split('/').filter((p) => !!p).length > 1 ||
        location.pathname === ERoutes.CONFIRM ||
        location.pathname === ERoutes.TERMS ||
        location.pathname === ERoutes.PRIVACY,
    )
  }, [location.pathname])

  const headerStyles: SxProps<Theme> = { minHeight: { xs: '56px', md: '66px' } }

  const handleOnClickBack = () => {
    if (location.pathname === ERoutes.CONFIRM) {
      dispatch(clearOTP())
    }
    navigate(-1)
  }

  return (
    <>
      <HideOnScroll>
        <Bar color='default' sx={headerStyles}>
          <Toolbar sx={{ ...headerStyles, maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
            {isShowBackButton && (
              <IconButton onClick={handleOnClickBack} sx={{ position: 'absolute', left: '10px' }}>
                <ArrowBackIosNewRoundedIcon sx={{ color: '#262626' }} />
              </IconButton>
            )}

            <Logo />

            {isLoggedIn && (
              <LinkStyled to={`${ERoutes.MAIN}/${ERoutes.USER}`}>
                <Avatar
                  sx={md ? { width: 50, height: 50 } : {}}
                  alt={'userName'}
                  src='/static/images/avatar/1.jpg'
                />
              </LinkStyled>
            )}
          </Toolbar>
        </Bar>
      </HideOnScroll>

      <Toolbar sx={headerStyles} />
    </>
  )
}

const LinkStyled = styled(Link)`
  display: block;
  text-decoration: none;
  position: absolute;
  right: 10px;
`
