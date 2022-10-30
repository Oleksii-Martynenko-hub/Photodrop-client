import { FC, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mui/material'

import { ThumbnailData } from 'api/ProtectedApi'

import { useDrag } from 'components/hooks/useDrag'
import Text from 'components/common/Text'
import Image from 'components/common/Image'
import HorizontalScroll from 'components/HorizontalScroll'
import PhotoDialog from 'components/PhotoDialog'

const BrowseArtPrints: FC = () => {
  const md = useMediaQuery('(min-width:1024px)')

  const { dragging, ...dragObject } = useDrag()

  const [isPhotoDialogOpen, setPhotoDialogOpen] = useState(false)
  const [openedPhoto, setOpenedPhoto] = useState<Partial<ThumbnailData> | null>(null)

  const [images] = useState([
    {
      src: '/images/artist-prints-1.jpg',
      alt: 'photo1',
    },
    {
      src: '/images/artist-prints-2.jpg',
      alt: 'photo2',
    },
    {
      src: '/images/artist-prints-3.jpg',
      alt: 'photo3',
    },
    {
      src: 'https://static.dezeen.com/uploads/2022/03/1915-canakkale-bridge-suspension-architecture-turkey_dezeen_1704_col_1.jpg',
      alt: 'photo4',
    },
    {
      src: 'https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Giovanni%20Gagliardi,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1557332734/tzo1xnilo1che43lfyak.jpg',
      alt: 'photo5',
    },
    {
      src: 'https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1MTc3MjE0MzExMDgxNTQ1/topic-golden-gate-bridge-gettyimages-177770941.jpg',
      alt: 'photo6',
    },
    {
      src: 'https://images.squarespace-cdn.com/content/v1/56e8fcc03c44d89db7df9b3e/1554701537572-8O5FIP3KP5MN1274S1K2/11+Picture-Perfect+Views+of+the+Golden+Gate+Bridge+in+San+Francisco',
      alt: 'photo7',
    },
  ])

  const handleOnClickPhoto = (thumbnail: typeof openedPhoto) => () => {
    if (dragging) return

    setOpenedPhoto(thumbnail)
    setPhotoDialogOpen(true)
  }

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled size={Text.size.xl} weight={Text.weight.medium}>
        Browse {md ? 'Artist' : 'Art'} Prints
      </TitleStyled>

      <HorizontalScroll
        useDragObject={{ dragging, ...dragObject }}
        paddingX={md ? 40 : 15}
        spacing={md ? 10 : 5}
      >
        {images.map(({ src, alt }, i) => (
          <ArtWrapper key={src + i} onClick={handleOnClickPhoto({ url: src })}>
            <Image
              src={src}
              alt={alt}
              width={md ? 200 : 168}
              height={md ? 255 : 216}
              shape='rounded'
            />
          </ArtWrapper>
        ))}
      </HorizontalScroll>

      <PhotoDialog
        thumbnail={openedPhoto}
        isArtistPrint
        isDialogOpen={isPhotoDialogOpen}
        setIsDialogOpen={setPhotoDialogOpen}
      />
    </MotionContainerStyled>
  )
}

export default BrowseArtPrints

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  min-width: 100%;
  padding: 41px 0 62px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    padding: 60px 0 100px;
  }
`

const ArtWrapper = styled.div`
  position: relative;
  margin: 0;
  line-height: 0;
  width: 168px;
  height: 216px;
  border-radius: 20px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 200px;
    height: 255px;
  }
`

const TitleStyled = styled(Text)`
  line-height: 14px;
  margin: 0 0 21px 0;
  padding: 0 15px;
  letter-spacing: 0.6px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 30px;
    line-height: 20px;
    margin: 0 0 20px 0;
    padding: 0 40px;
    letter-spacing: 0.9px;
  }
`
