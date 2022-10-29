import { FC } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { selectAlbumById } from 'store/albums/selectors'

import { ERoutes } from 'pages/App'
import { useMediaQueryMin } from 'components/hooks/useMediaQuery'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import Image from 'components/common/Image'
import Button from 'components/common/Button'

const SuccessfullyPaid: FC = () => {
  const id = useParams<{ id: string }>().id || ''

  const md = useMediaQueryMin(1024)

  const album = useSelector(selectAlbumById(id))

  if (!album || !album?.thumbnails[0].isPaid) {
    console.log('🚀 ~ album?.thumbnails ALBUM IS NOT PAID ---', album?.thumbnails)
    // navigate(ERoutes.DASHBOARD)
    return <div>ALBUM IS NOT PAID</div>
  }

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled size={Title.size.small}>Thank you{!md && '!'}</TitleStyled>

      <Subtitle size={Text.size.lg}>
        The album <AlbumName>{album?.location}</AlbumName> is now unlocked.
      </Subtitle>

      <DescriptionStyled size={Text.size.lg}>
        You can now download, share, post, and print your hi-res, watermark-free, glorious memories.
      </DescriptionStyled>

      <AlbumThumbnail src={album.mainThumbnail} shape='rounded' />

      <LinkStyled to={`${ERoutes.DASHBOARD}/${ERoutes.ALBUMS_ID.split(':')[0]}${id}`}>
        <SeePhotosBtn fullWidth>See photos</SeePhotosBtn>
      </LinkStyled>

      <Subscription size={Text.size.lg}>
        You will receive an email with your order details.
      </Subscription>
    </MotionContainerStyled>
  )
}

export default SuccessfullyPaid

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 20px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 500px;
    padding: 40px;
  }
`

const TitleStyled = styled(Title)`
  line-height: 13px;
  margin: 0 0 20px 0;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 30px;
    line-height: 22px;
    margin: 0 0 20px 0;
  }
`

const Subtitle = styled(Text)`
  letter-spacing: 0;
  line-height: 23px;
  margin: -4px 0 -5px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 22px;
    line-height: 28px;
    margin: -5px 0 -6px;
  }
`

const AlbumName = styled(Text)`
  display: inline;
  letter-spacing: 0;
  line-height: 14px;
  font-weight: 700;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 22px;
    line-height: 16px;
  }
`

const DescriptionStyled = styled(Text)`
  margin: 15px 0 25px;
  letter-spacing: -0.07px;
  line-height: 23px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 14px 0 33px;
    font-size: 22px;
    line-height: 28px;
  }
`

const Subscription = styled(Text)`
  display: none;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0;

  @media ${({ theme }) => theme.media.desktop} {
    display: block;
  }
`

const AlbumThumbnail = styled(Image)`
  width: 100%;
  height: 200px;
  margin: 0 0 30px 0;

  @media ${({ theme }) => theme.media.desktop} {
    width: 420px;
    height: 250px;
    margin: 0 0 40px 0;
  }
`

const SeePhotosBtn = styled(Button)`
  max-width: 350px;
  min-width: 345px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 0 0 19px 0;
  }
`

const LinkStyled = styled(Link)`
  display: block;
  margin: 0 auto;
`
