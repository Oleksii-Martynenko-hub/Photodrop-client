import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mui/material'

import { Album } from 'store/albums/reducers'

import { ERoutes } from 'pages/App'
import { useDrag } from 'components/hooks/useDrag'
import Text from 'components/common/Text'
import Image from 'components/common/Image'
import HorizontalScroll from 'components/HorizontalScroll'

interface Props {
  albums: Omit<Album, 'thumbnails'>[]
}

const Albums: FC<Props> = ({ albums }) => {
  const md = useMediaQuery('(min-width:1024px)')

  const { dragging, ...dragObject } = useDrag()

  const [localAlbums, setLocalAlbums] = useState(
    albums.map((a) => ({ ...a, isThumbnailLoaded: false })),
  )

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled size={Text.size.sm} weight={Text.weight.medium}>
        Albums
      </TitleStyled>

      <HorizontalScroll
        useDragObject={{ dragging, ...dragObject }}
        paddingX={md ? 40 : 15}
        spacing={5}
      >
        {localAlbums.map(({ id, location, mainThumbnail, isThumbnailLoaded }) => (
          <WrapperLink
            key={id}
            to={dragging ? '' : `${ERoutes.ALBUMS_ID.split(':')[0]}${id}`}
            isThumbnailLoaded={isThumbnailLoaded}
            draggable={false}
          >
            <Image
              src={mainThumbnail}
              alt={location}
              width={md ? 200 : 110}
              height={md ? 255 : 140}
              shape='rounded'
              onLoad={() =>
                setLocalAlbums((prev) =>
                  prev.map((a) => (a.id === id ? { ...a, isThumbnailLoaded: true } : a)),
                )
              }
            />

            <Gradient />

            <AlbumTitleStyled size={Text.size.xs} weight={Text.weight.medium}>
              {location}
            </AlbumTitleStyled>
          </WrapperLink>
        ))}
      </HorizontalScroll>
    </MotionContainerStyled>
  )
}

export default Albums

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 375px;
  padding: 15px 0 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    min-width: 100%;
    padding: 60px 0 100px;
  }
`

const Gradient = styled.div`
  position: absolute;
  width: 100%;
  height: 73px;
  left: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 44.34%, rgba(0, 0, 0, 0) 100%);

  @media ${({ theme }) => theme.media.desktop} {
    height: 133px;
  }
`

const AlbumTitleStyled = styled(Text)`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 20px;
  text-align: center;
  color: #ffffff;
  line-height: 9px;
  letter-spacing: 0;
  padding: 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 14px;
    padding: 0 10px;
    letter-spacing: 0;
  }
`

const WrapperLink = styled(Link)<{ isThumbnailLoaded: boolean }>`
  display: block;
  position: relative;
  margin: 0;
  line-height: 0;
  width: 110px;
  height: 140px;
  border-radius: 20px;
  overflow: hidden;

  ${Gradient} {
    opacity: ${({ isThumbnailLoaded }) => (isThumbnailLoaded ? '1' : '0')};
    transition: opacity 0.2s;
  }

  ${AlbumTitleStyled} {
    opacity: ${({ isThumbnailLoaded }) => (isThumbnailLoaded ? '1' : '0')};
    transition: opacity 0.2s;
  }

  @media ${({ theme }) => theme.media.desktop} {
    width: 200px;
    height: 255px;
  }
`

const TitleStyled = styled(Text)`
  line-height: 10px;
  margin: 0 0 10px 0;
  padding: 0 15px;
  letter-spacing: 0;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 16px;
    line-height: 13px;
    margin: 0 0 19px 0;
    padding: 0 40px;
    letter-spacing: 0;
  }
`
