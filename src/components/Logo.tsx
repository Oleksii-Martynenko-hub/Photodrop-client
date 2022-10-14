import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ERoutes } from 'pages/App'

export const Logo = () => {
  return (
    <LinkStyled to={ERoutes.ROOT}>
      <LogoImage src={'/logo.svg'} alt='logo' />
    </LinkStyled>
  )
}

const LinkStyled = styled(Link)`
  margin: 0 auto;
  text-decoration: none;
`

const LogoImage = styled.img`
  display: block;
  width: 125px;
  height: 16px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 179px;
    height: 22px;
  }
`
