import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar as Bar, Toolbar } from '@mui/material'
import styled from 'styled-components'

import { logoutAsync } from 'store/sign-up/actions'
import { clearOTP, setIsFullPageLoading } from 'store/sign-up/reducers'
import { selectUserAvatar, selectUserIsOnboarding, selectUserName } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useToggle } from 'components/hooks/useToggle'
import Image from 'components/common/Image'
import Button from 'components/common/Button'
import HideOnScroll from 'components/common/HideOnScroll'
import Logo from 'components/Logo'
import Title from './common/Title'
import Text from './common/Text'
import { selectAlbums } from 'store/albums/selectors'
import moment from 'moment'

const AppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const userName = useSelector(selectUserName)
  const avatar = useSelector(selectUserAvatar)
  const albums = useSelector(selectAlbums)
  // const onboarding = useSelector(selectUserIsOnboarding)

  const [formattedDate, setFormattedDate] = useState<string | null>(null)
  const [albumLocation, setAlbumLocation] = useState<string | null>(null)
  const [photosCount, setPhotosCount] = useState<number | null>(null)

  const [isShowBackButton, setIsShowBackButton] = useToggle(false)
  const [isShowAlbumBar, setIsShowAlbumBar] = useToggle(false)

  useEffect(() => {
    setIsShowBackButton(
      location.pathname.split('/').filter((p) => !!p).length > 1 ||
        location.pathname === ERoutes.CONFIRM ||
        location.pathname === ERoutes.TERMS ||
        location.pathname === ERoutes.PRIVACY,
    )

    if (location.pathname.includes(`${ERoutes.DASHBOARD}/${ERoutes.ALBUMS_ID.split(':')[0]}`)) {
      setIsShowAlbumBar(true)
      dispatch(setIsFullPageLoading(true))
      return
    }

    setIsShowAlbumBar(false)
  }, [location.pathname])

  useEffect(() => {
    if (isShowAlbumBar) {
      const id = location.pathname.split(ERoutes.ALBUMS_ID.split(':')[0])[1]
      const album = albums.find((a) => a.id === id)
      if (album) {
        setFormattedDate(moment(album.date).format('MMM DD, YYYY'))
        setAlbumLocation(album.location)
        setPhotosCount(album.thumbnails.length)
      }
    }
  }, [albums, isShowAlbumBar])

  useEffect(() => {
    if (
      isShowAlbumBar &&
      formattedDate !== null &&
      albumLocation !== null &&
      photosCount !== null
    ) {
      dispatch(setIsFullPageLoading(false))
    }
  }, [isShowAlbumBar, formattedDate, albumLocation, photosCount])

  const handleOnClickBack = () => {
    // if (location.pathname === `${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_EDIT_NAME}`) {
    //   navigate(`${ERoutes.MAIN}/${ERoutes.USER}`)
    //   return
    // }
    // if (
    //   location.pathname ===
    //     `${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_SETTINGS}/${ERoutes.USER_SETTINGS_EMAIL}` &&
    //   onboarding
    // ) {
    //   navigate(`${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_SETTINGS}`)
    //   return
    // }
    // if (location.pathname === `${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_SETTINGS}`) {
    //   navigate(`${ERoutes.MAIN}/${ERoutes.USER}`)
    //   return
    // }
    // if (location.pathname === `${ERoutes.MAIN}/${ERoutes.USER}`) {
    //   navigate(ERoutes.MAIN)
    //   return
    // }
    if (
      location.pathname.includes(`${ERoutes.DASHBOARD}/${ERoutes.ALBUMS_ID.split(':')[0]}`) ||
      location.pathname.includes(`${ERoutes.DASHBOARD}/${ERoutes.SUCCESSFULLY_PAID.split(':')[0]}`)
    ) {
      navigate(ERoutes.DASHBOARD)
      return
    }
    navigate(-1)
  }

  return (
    <>
      <HideOnScroll>
        <AppBarStyled color='default'>
          <ToolbarStyled isShowAlbumBar={isShowAlbumBar}>
            {isShowBackButton && (
              <BackButtonStyled btnTheme={Button.themes.text} onClick={handleOnClickBack}>
                <ArrowIconStyled src='/images/back-arrow.svg' alt='back arrow' />
              </BackButtonStyled>
            )}

            {isShowAlbumBar ? (
              <AlbumBar>
                <AlbumLocation size={Title.size.small}>{albumLocation}</AlbumLocation>

                <DateAndPhotosCount size={Text.size.sm}>
                  {formattedDate} • <PhotosCount>{photosCount} photos</PhotosCount>{' '}
                </DateAndPhotosCount>
              </AlbumBar>
            ) : (
              <Logo />
            )}

            {location.pathname === ERoutes.DASHBOARD && (
              <LinkStyled to={`${ERoutes.DASHBOARD}/${ERoutes.USER}`}>
                <AvatarStyled
                  width={35}
                  height={35}
                  alt={userName || 'User name'}
                  src={avatar || 'Avatar'}
                  shape='circle'
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

export default AppBar

const LinkStyled = styled(Link)`
  display: block;
  text-decoration: none;
  position: absolute;
  top: 10px;
  right: 15px;

  @media ${({ theme }) => theme.media.desktop} {
    top: 12px;
    right: 40px;
  }
`

const AppBarStyled = styled(Bar)`
  box-shadow: none;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.styledPalette.appBarBorder};
  height: 55px;
  min-height: 55px;

  @media ${({ theme }) => theme.media.desktop} {
    height: 60px;
    min-height: 60px;
  }
`

const ToolbarStyled = styled(Toolbar)<{ isShowAlbumBar?: boolean }>`
  padding: ${({ isShowAlbumBar }) => (isShowAlbumBar ? '11px 15px 10px' : '20px 15px 18px')};
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  height: 54px;
  min-height: 54px;

  @media ${({ theme }) => theme.media.desktop} {
    padding: 19px 40px 18px;
    height: 59px;
    min-height: 59px;
  }
`

const BackButtonStyled = styled(Button)`
  line-height: 10px;
  position: absolute;
  top: 12px;
  left: 7px;
  padding: 8px;

  @media ${({ theme }) => theme.media.desktop} {
    left: 32px;
  }
`

const ArrowIconStyled = styled.img`
  width: 8px;
  height: 16px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 10px;
    height: 20px;
  }
`

const AvatarStyled = styled(Image)``

const AlbumBar = styled.div`
  width: 100%;
  padding: 0 23px;
  line-height: 0;

  @media ${({ theme }) => theme.media.desktop} {
    /* left: 32px; */
  }
`

const AlbumLocation = styled(Title)`
  text-align: left;
  line-height: 22px;
  margin: -4px 0 5px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 22px;
  }
`

const DateAndPhotosCount = styled(Text)`
  line-height: 10px;
  letter-spacing: 0.6px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 29px 0 18px 0;
    line-height: 16px;
  }
`

const PhotosCount = styled.span`
  color: ${({ theme }) => theme.styledPalette.primary};
`
