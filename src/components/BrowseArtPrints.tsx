import { FC } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import Text from './common/Text'
import { Image } from './common/Image'
import HorizontalScroll from './HorizontalScroll'

const BrowseArtPrints: FC = () => {
  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled size={Text.size.xl} weight={Text.weight.medium}>
        Browse Art Prints
      </TitleStyled>

      <HorizontalScroll>
        <ArtWrapper>
          <Image
            src='https://static.dezeen.com/uploads/2022/03/1915-canakkale-bridge-suspension-architecture-turkey_dezeen_1704_col_1.jpg'
            alt='photo'
            width={168}
            height={216}
            rounded
          />
        </ArtWrapper>

        <ArtWrapper>
          <Image
            src='https://res.cloudinary.com/fleetnation/image/private/c_fit,w_1120/g_south,l_text:style_gothic2:%C2%A9%20Giovanni%20Gagliardi,o_20,y_10/g_center,l_watermark4,o_25,y_50/v1557332734/tzo1xnilo1che43lfyak.jpg'
            alt='photo'
            width={168}
            height={216}
            rounded
          />
        </ArtWrapper>

        <ArtWrapper>
          <Image
            src='https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY1MTc3MjE0MzExMDgxNTQ1/topic-golden-gate-bridge-gettyimages-177770941.jpg'
            alt='photo'
            width={168}
            height={216}
            rounded
          />
        </ArtWrapper>

        <ArtWrapper>
          <Image
            src='https://images.squarespace-cdn.com/content/v1/56e8fcc03c44d89db7df9b3e/1554701537572-8O5FIP3KP5MN1274S1K2/11+Picture-Perfect+Views+of+the+Golden+Gate+Bridge+in+San+Francisco'
            alt='photo'
            width={168}
            height={216}
            rounded
          />
        </ArtWrapper>
      </HorizontalScroll>
    </MotionContainerStyled>
  )
}

export default BrowseArtPrints

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 41px 0 62px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const ArtWrapper = styled.div`
  position: relative;
  margin: 0;
  line-height: 0;
  width: 168px;
  height: 216px;
  border-radius: 20px;
`

const TitleStyled = styled(Text)`
  line-height: 14px;
  margin: 0 0 21px 0;
  padding: 0 15px;
  letter-spacing: 0.6px;
`
