import { FC } from 'react'
import styled, { css } from 'styled-components'
import { Typography, TypographyProps } from '@mui/material'

interface Props extends TypographyProps {
  fontSize?: number | string
  marginBottom?: number | string
}

const Title: FC<Props> = ({
  variant = 'h2',
  align = 'center',
  gutterBottom = true,
  fontSize = '36px',
  marginBottom,
  children,
  ...props
}) => {
  return (
    <TitleStyled
      fontSize={fontSize}
      variant={variant}
      align={align}
      gutterBottom={gutterBottom}
      marginBottom={marginBottom}
      {...props}
    >
      {children}
    </TitleStyled>
  )
}

const TitleStyled = styled(Typography)<Props>`
  font-family: Mukta;
  font-weight: bold;
  color: #262626;
  font-size: ${({ fontSize }) => {
    return typeof fontSize === 'string' ? fontSize : `${fontSize}px`
  }};

  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${typeof marginBottom === 'string' ? marginBottom : `${marginBottom}px`};
    `};
`
export default Title
