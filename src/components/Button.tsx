import { FC } from 'react'
import styled from 'styled-components'
import { Button as ButtonMui, ButtonProps } from '@mui/material'

interface Props extends ButtonProps {
  fontSize?: number | string
  height?: number | string
  borderRadius?: number | string
  isBold?: boolean
}

const Button: FC<Props> = ({
  fontSize = '20px',
  height = '50px',
  borderRadius = '50px',
  isBold,
  children,
  ...props
}) => {
  return (
    <ButtonStyled
      fontSize={fontSize}
      height={height}
      borderRadius={borderRadius}
      variant='contained'
      isBold={isBold}
      {...props}
    >
      {children}
    </ButtonStyled>
  )
}

const ButtonStyled = styled(ButtonMui)<Props>`
  font-family: NewsCycle;
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  font-size: ${({ fontSize }) => {
    return typeof fontSize === 'string' ? fontSize : `${fontSize}px`
  }};
  height: ${({ height }) => {
    return typeof height === 'string' ? height : `${height}px`
  }};
  border-radius: ${({ borderRadius }) => {
    return typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`
  }};
  text-transform: none;
`

export default Button
