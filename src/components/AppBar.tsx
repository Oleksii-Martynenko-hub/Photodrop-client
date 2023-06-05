import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar as Bar, CircularProgress, Toolbar } from '@mui/material'
import styled from 'styled-components'
import moment from 'moment'

import { APIStatus } from 'api/MainApi'

import { logoutAsync } from 'store/sign-up/actions'
import { selectUserAvatar, selectUserIsOnboarding, selectUserName } from 'store/user/selectors'
import { getGeneratePaymentAsync } from 'store/albums/actions'
import { selectAlbumById, selectAlbumsStatus } from 'store/albums/selectors'

import { ERoutes } from 'pages/App'
import { useToggle } from 'components/hooks/useToggle'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import Image from 'components/common/Image'
import Button from 'components/common/Button'
import HideOnScroll from 'components/common/HideOnScroll'
import Logo from 'components/Logo'

const AppBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const id = useMemo(
    () => location.pathname.split(ERoutes.ALBUMS_ID.split(':')[0])[1],
    [location.pathname],
  )

  const userName = useSelector(selectUserName)
  const status = useSelector(selectAlbumsStatus)
  const avatar = useSelector(selectUserAvatar)
  const album = useSelector(selectAlbumById(id))
  // const onboarding = useSelector(selectUserIsOnboarding)

  const [formattedDate, setFormattedDate] = useState<string | null>(null)
  const [albumLocation, setAlbumLocation] = useState<string | null>(null)
  const [photosCount, setPhotosCount] = useState<number | null>(null)

  const [isShowBackButton, setIsShowBackButton] = useToggle(false)
  const [isShowAlbumBar, setIsShowAlbumBar] = useToggle(false)

  useEffect(() => {
    setIsShowBackButton(
      location.pathname.split('/').filter((p) => !!p).length > 1 ||
        location.pathname === ERoutes.USER ||
        location.pathname === ERoutes.CONFIRM ||
        location.pathname === ERoutes.TERMS ||
        location.pathname === ERoutes.PRIVACY,
    )

    if (
      location.pathname.includes(ERoutes.ALBUMS_ID.split(':')[0]) &&
      !location.pathname.includes(ERoutes.SUCCESSFULLY_PAID.split(':')[0])
    ) {
      setIsShowAlbumBar(true)
      return
    }

    setIsShowAlbumBar(false)
  }, [location.pathname])

  useEffect(() => {
    if (isShowAlbumBar) {
      if (album) {
        setFormattedDate(moment(album.date).format('MMM DD, YYYY'))
        setAlbumLocation(album.location)
        setPhotosCount(album.thumbnails.length)
      }
    }
  }, [album, isShowAlbumBar])

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
      location.pathname.includes(ERoutes.ALBUMS_ID.split(':')[0]) ||
      location.pathname.includes(ERoutes.SUCCESSFULLY_PAID.split(':')[0])
    ) {
      navigate(ERoutes.DASHBOARD)
      return
    }
    navigate(-1)
  }

  const onClickUnlockBtnHandler = async () => {
    if (album) {
      const { thumbnails } = album
      const { albumId } = thumbnails[0]

      const { payload } = (await dispatch(getGeneratePaymentAsync({ albumId }))) as unknown as {
        payload: string
      }

      window.location.replace(payload)
    }
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

                {album?.thumbnails.some(({ isPaid }) => !isPaid) && (
                  <>
                    {status === APIStatus.PENDING && (
                      <Spinner>
                        <CircularProgress size={18} />
                      </Spinner>
                    )}

                    <UnlockButton
                      isLoading={status === APIStatus.PENDING}
                      btnTheme={Button.themes.text}
                      onClick={onClickUnlockBtnHandler}
                    >
                      Unlock your photos
                    </UnlockButton>
                  </>
                )}
              </AlbumBar>
            ) : (
              <Logo />
            )}

            {location.pathname === ERoutes.DASHBOARD && (
              <LinkStyled to={ERoutes.USER}>
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
  max-width: ${({ isShowAlbumBar }) => (isShowAlbumBar ? '1440px' : '1280px')};
  margin: 0 auto;
  height: 54px;
  min-height: 54px;

  @media ${({ theme }) => theme.media.desktop} {
    padding: ${({ isShowAlbumBar }) => (isShowAlbumBar ? '24px 40px 23px' : '19px 40px 18px')};
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
    padding: 0 0 0 40px;
    display: flex;
  }

  @media ${({ theme }) => theme.media.desktopLg} {
    padding: 0 80px;
  }
`
const Spinner = styled.div`
  line-height: 0;
  margin: -2px 0 -2px auto;
  display: none;

  @media ${({ theme }) => theme.media.desktop} {
    display: block;
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
    margin: -6px 38px -7px 0;
    line-height: 26px;
    max-width: 400px;
  }

  @media ${({ theme }) => theme.media.desktopLg} {
    max-width: 550px;
  }

  @media ${({ theme }) => theme.media.desktopXl} {
    max-width: 680px;
  }
`

const DateAndPhotosCount = styled(Text)`
  line-height: 10px;
  letter-spacing: 0.6px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 0;
    padding: 4px 0 0 0;
    font-size: 16px;
  }
`

const UnlockButton = styled(Button)<{ isLoading: boolean }>`
  display: none;
  font-size: 22px;
  font-weight: 500;
  line-height: 15px;
  margin: ${({ isLoading }) => (isLoading ? '0 0 0 15px' : '0 0 0 auto')};

  @media ${({ theme }) => theme.media.desktop} {
    display: block;
  }
`

const PhotosCount = styled.span`
  color: ${({ theme }) => theme.styledPalette.primary};
`
