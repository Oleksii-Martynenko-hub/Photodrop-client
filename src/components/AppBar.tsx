import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar as Bar, IconButton, SxProps, Theme, Toolbar } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded'

import { logoutAsync } from 'store/sign-up/actions'
import { selectIsLoggedIn } from 'store/sign-up/selectors'

import useToggle from 'components/hooks/useToggle'

import { Logo } from 'components/Logo'
import HideOnScroll from 'components/HideOnScroll'
import { ERoutes } from 'pages/App'
import { clearOTP } from 'store/sign-up/reducers'

export const AppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleOnClickGoToUserPage = () => {
    navigate(ERoutes.MAIN + ERoutes.USER)
  }

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
          <Toolbar sx={headerStyles}>
            {isShowBackButton && (
              <IconButton onClick={handleOnClickBack} sx={{ position: 'absolute', left: '10px' }}>
                <ArrowBackIosNewRoundedIcon sx={{ color: '#262626' }} />
              </IconButton>
            )}

            <Logo />

            {isLoggedIn && (
              <Link to={`${ERoutes.MAIN}/${ERoutes.USER}`}>
                <IconButton
                  // onClick={handleOnClickGoToUserPage}
                  sx={{ position: 'absolute', right: '10px' }}
                >
                  user
                </IconButton>
              </Link>
            )}
          </Toolbar>
        </Bar>
      </HideOnScroll>

      <Toolbar sx={headerStyles} />
    </>
  )
}
