import { FC } from 'react'
import styled, { css } from 'styled-components'
import { CircularProgress } from '@mui/material'
import { LoadingButton as LoadingButtonMui, LoadingButtonProps } from '@mui/lab'

interface Props extends LoadingButtonProps {
  fontSize?: number | string
  isBold?: boolean
}

const LoadingButton: FC<Props> = ({ fontSize = '18px', isBold, children, loading, ...props }) => {
  return (
    <LoadingButtonStyled
      fontSize={fontSize}
      loading={loading}
      loadingIndicator={<div />}
      loadingPosition='end'
      variant='contained'
      isBold={isBold}
      {...props}
    >
      {loading && (
        <CircularProgress size={18} sx={{ color: 'inherit', marginRight: '10px', opacity: 0 }} />
      )}
      {children}
      {loading && <CircularProgress size={18} sx={{ color: 'inherit', marginLeft: '10px' }} />}
    </LoadingButtonStyled>
  )
}

const LoadingButtonStyled = styled(LoadingButtonMui)<Props>`
  font-family: NewsCycle;
  font-weight: ${({ isBold }) => (isBold ? 'bold' : 'normal')};
  font-size: ${({ fontSize }) => {
    return typeof fontSize === 'string' ? fontSize : `${fontSize}px`
  }};
  text-transform: none;
  border-radius: 50px;
  height: 50px;
  padding-left: ${({ loading }) => (loading ? '17px' : '45px')};
  padding-right: ${({ loading }) => (loading ? '17px' : '45px')};
`

export default LoadingButton
