import { HTMLAttributes } from 'react'
import styled from 'styled-components'

enum sizes {
  xl = '22px',
  lg = '18px',
  md = '16px',
  sm = '14px',
  xs = '12px',
}

enum weights {
  normal = '400',
  medium = '500',
  bold = '700',
}

enum colors {
  black = 'black',
  dark = 'dark',
}

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  size?: sizes
  weight?: weights
  color?: colors
}

const Text = ({
  size = sizes.md,
  weight = weights.normal,
  color = colors.dark,
  children,
  ...props
}: Props) => {
  return (
    <TextStyled size={size} weight={weight} color={color} {...props}>
      {children}
    </TextStyled>
  )
}

Text.size = sizes
Text.weight = weights
Text.color = colors

export default Text

const TextStyled = styled.p<Props>`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.futuraPT};
  color: ${({ theme, color }) =>
    color === colors.dark ? theme.styledPalette.mainText : theme.styledPalette.secondaryText};
  text-align: left;
  font-weight: ${({ weight }) => weight};
  font-size: ${({ size }) => size};
  line-height: inherit;
  margin: 0;
`
