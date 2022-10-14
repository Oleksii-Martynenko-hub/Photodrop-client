import { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

enum themes {
  primary,
  outlined,
  white,
  text,
}

interface Props extends HTMLAttributes<HTMLButtonElement> {
  theme?: themes
  disabled?: boolean
  fullWidth?: boolean
}

const Button = ({ theme = themes.primary, disabled, fullWidth, children, ...props }: Props) => {
  const buttons = {
    [themes.primary]: PrimaryButton,
    [themes.outlined]: OutlinedButton,
    [themes.white]: WhiteButton,
    [themes.text]: TextButton,
  }
  const ThemedButton = buttons[theme]

  return (
    <ThemedButton disabled={disabled} fullWidth={fullWidth} {...props}>
      {children}
    </ThemedButton>
  )
}

Button.themes = themes

const ButtonStyled = styled.button<Props>`
  font-family: ${({ theme }) => theme.fonts.futuraPT};
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
  padding: 6px 20px;
  color: #fff;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'max-content')};
  height: 50px;
  border-radius: 25px;
  text-transform: none;
  box-shadow: none;
  border: none;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: auto;
    `}

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 22px;
  }
`

const PrimaryButton = styled(ButtonStyled)`
  background: ${({ theme, disabled }) =>
    disabled ? theme.styledPalette.primaryDisabled : theme.styledPalette.primary};
`

const OutlinedButton = styled(ButtonStyled)`
  border: 1px solid #fff;
  background: transparent;
`

const WhiteButton = styled(ButtonStyled)`
  color: ${({ theme }) => theme.styledPalette.mainText};
  background: #fff;
`

const TextButton = styled(ButtonStyled)`
  font-size: 16px;
  font-weight: normal;
  height: unset;
  line-height: 21px;
  padding: 0;
  color: ${({ theme }) => theme.styledPalette.primary};
  background: transparent;

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.styledPalette.secondaryText};
    `}
`

export default Button
