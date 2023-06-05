import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ERoutes } from 'pages/App'
import { useMediaQueryMin } from 'components/hooks/useMediaQuery'

const Logo = () => {
  const logoSize = useMediaQueryMin(1024) ? 'lg' : 'sm'

  return (
    <LinkStyled to={ERoutes.ROOT}>
      <LogoImage src={`/images/logo-${logoSize}.svg`} alt='logo' />
    </LinkStyled>
  )
}

export default Logo

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
