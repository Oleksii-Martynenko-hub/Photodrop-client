import styled from 'styled-components'
import { Dialog } from '@mui/material'

const FullPageLoader = () => {
  return (
    <Dialog
      open
      sx={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      PaperProps={{ sx: { background: 'transparent', boxShadow: 'none', overflowY: 'hidden' } }}
      hideBackdrop
    >
      <FullPageLoaderStyled>
        <LoaderIcon src='/images/gif-loader.gif' alt='loader-icon' />
        <LoaderText>Almost there...</LoaderText>
      </FullPageLoaderStyled>
    </Dialog>
  )
}

export default FullPageLoader

const FullPageLoaderStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const LoaderIcon = styled.img`
  display: block;
  width: 75px;
  height: 75px;
  margin-bottom: 20px;
`

const LoaderText = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.futuraPT};
  font-weight: 500;
  font-size: 18px;
  line-height: 14px;
`
