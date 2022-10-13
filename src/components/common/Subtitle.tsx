import { FC } from 'react'
import styled, { css } from 'styled-components'
import { Typography, TypographyProps } from '@mui/material'

interface Props extends TypographyProps {
  fontSize?: number | string
  marginBottom?: number | string
  isBold?: boolean
}

const Subtitle: FC<Props> = ({
  variant = 'subtitle1',
  align = 'left',
  gutterBottom = false,
  fontSize = '20px',
  marginBottom,
  isBold = false,
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
      isBold={isBold}
      {...props}
    >
      {children}
    </TitleStyled>
  )
}

const TitleStyled = styled(Typography)<Props>`
  font-family: NewsCycle;
  color: #262626;
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  font-size: ${({ fontSize }) => {
    return typeof fontSize === 'string' ? fontSize : `${fontSize}px`
  }};

  ${({ marginBottom }) =>
    marginBottom &&
    css`
      margin-bottom: ${typeof marginBottom === 'string' ? marginBottom : `${marginBottom}px`};
    `};
`
export default Subtitle
