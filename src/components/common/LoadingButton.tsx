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

const LoadingButtonStyled = styled.button<Props>`
  font-family: ${({ theme }) => theme.fonts.futuraPT};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding-left: 45px;
  padding-right: ${({ loading }) => (loading ? '17px' : '45px')};
  background: ${({ theme, loading, disabled }) =>
    loading || disabled ? theme.styledPalette.primaryDisabled : theme.styledPalette.primary};
  color: #fff;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: 50px;
  border-radius: 25px;
  text-transform: none;
  box-shadow: none;
  border: none;
  cursor: pointer;

  ${({ disabled, loading }) =>
    (disabled || loading) &&
    css`
      cursor: auto;
    `}

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 22px;
  }
`

const CircularLoader = styled(CircularProgress)`
  color: inherit;
  margin-left: 10px;
  position: relative;
  top: 2px;
`

export default LoadingButton
