import { FC, HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { CircularProgress } from '@mui/material'

interface Props extends HTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const LoadingButton: FC<Props> = ({ loading = false, disabled, fullWidth, children, ...props }) => {
  return (
    <LoadingButtonStyled
      loading={loading || false}
      disabled={disabled}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
      {loading && <CircularLoader size={18} />}
    </LoadingButtonStyled>
  )
}

export default LoadingButton

const LoadingButtonStyled = styled.button<Props>`
  font-family: ${({ theme }) => theme.fonts.futuraPT};
  font-size: 18px;
  line-height: 23px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: ${({ loading }) => (loading ? '14px 17px 13px 45px' : '14px 45px 13px')};
  background: ${({ theme, loading, disabled }) =>
    loading || disabled ? theme.styledPalette.primaryDisabled : theme.styledPalette.primary};
  color: #fff;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-radius: 25px;
  text-transform: none;
  box-shadow: none;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent !important;
  outline: none !important;

  ${({ disabled, loading }) =>
    (disabled || loading) &&
    css`
      cursor: auto;
    `}

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 22px;
    line-height: 15px;
    padding: ${({ loading }) => (loading ? '17px 17px 18px 45px' : '17px 45px 18px')};
  }
`

const CircularLoader = styled(CircularProgress)`
  color: inherit;
  margin: -3px 0 0px 10px;
  position: relative;
  top: 2px;
`
