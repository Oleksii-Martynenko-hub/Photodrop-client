import styled from 'styled-components'
import { Container, ContainerProps } from '@mui/material'

const MainContainer = ({ children }: ContainerProps) => {
  return <ContainerStyled>{children}</ContainerStyled>
}

export default MainContainer

const ContainerStyled = styled(Container)`
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  flex: auto;
  position: relative;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 1280px;
  }
`
