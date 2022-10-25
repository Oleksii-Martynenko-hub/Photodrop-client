import { FC, ImgHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { useToggle } from 'components/hooks/useToggle'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  width?: number | string
  height?: number | string
  shape?: 'sharp' | 'rounded' | 'circle'
  onLoad?: () => void
}

const Image: FC<Props> = ({ src, width, height, shape = 'sharp', onLoad, ...props }: Props) => {
  const [initAnimation] = useState({ opacity: 0, scale: 0.95 })

  const [isOriginalLoaded, setIsOriginalLoaded] = useToggle(false)

  const onLoadImage = () => {
    setIsOriginalLoaded(true)
    if (onLoad) onLoad()
  }

  const onError = () => {
    console.log('🚀 ~ onError ~ Rejected')
  }

  return (
    <ImageWrapper>
      <motion.div
        initial={initAnimation}
        animate={isOriginalLoaded ? 'loaded' : 'unload'}
        exit={initAnimation}
        variants={{
          unload: initAnimation,
          loaded: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.2 },
          },
        }}
      >
        <ImageStyled
          src={src}
          onLoad={onLoadImage}
          onError={onError}
          width={width}
          height={height}
          shape={shape}
          {...props}
        />
      </motion.div>
    </ImageWrapper>
  )
}

export default Image

const ImageStyled = styled.img<{
  width?: number | string
  height?: number | string
  shape?: 'sharp' | 'rounded' | 'circle'
}>`
  /* width: 110px; // albums
  height: 140px;

  width: 125px; // photos
  height: 125px; */

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  display: block;
  width: ${({ width }) => {
    return width !== undefined ? (typeof width === 'string' ? width : `${width}px`) : '100%'
  }};
  height: ${({ height }) => {
    return height !== undefined ? (typeof height === 'string' ? height : `${height}px`) : 'auto'
  }};
  border-radius: ${({ shape }) =>
    shape === 'rounded' ? '20px' : shape === 'circle' ? '50%' : '0'};
  object-fit: cover;
`

const ImageWrapper = styled.div<{
  width?: number | string
  height?: number | string
}>`
  width: ${({ width }) => {
    return width !== undefined ? (typeof width === 'string' ? width : `${width}px`) : '100%'
  }};
  height: ${({ height }) => {
    return height !== undefined ? (typeof height === 'string' ? height : `${height}px`) : 'auto'
  }};
`
