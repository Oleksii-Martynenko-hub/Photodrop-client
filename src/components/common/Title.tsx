import { HTMLAttributes } from 'react'
import styled from 'styled-components'

enum sizes {
  big = '30px',
  normal = '22px',
  small = '18px',
}

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  size?: sizes
}

const Title = ({ size = sizes.normal, children, ...props }: Props) => {
  return (
    <TitleStyled size={size} {...props}>
      {children}
    </TitleStyled>
  )
}

Title.size = sizes

export default Title

const TitleStyled = styled.h2<Props>`
  font-family: ${({ theme }) => theme.fonts.termina};
  color: ${({ theme }) => theme.styledPalette.mainText};
  text-align: center;
  font-weight: 700;

  font-size: ${({ size }) => (size === sizes.small ? '18px' : '22px')};
  line-height: ${({ size }) => (size === sizes.small ? '22px' : '26px')};

  @media ${({ theme }) => theme.media.desktop} {
    font-size: ${({ size }) => (size === sizes.small ? '22px' : '30px')};
    line-height: ${({ size }) => (size === sizes.small ? '26px' : '36px')};
  }

  margin: 0;
`
