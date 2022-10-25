import { FC } from 'react'
import styled from 'styled-components'
import { TextField as TextFieldMui, TextFieldProps } from '@mui/material'

interface Props {
  height?: number | string
}

const TextField: FC<Props & TextFieldProps> = ({ height = '40px', ...props }) => {
  return <TextFieldStyled height={height} {...props} />
}

export default TextField

const TextFieldStyled = styled(TextFieldMui)<Props>`
  & .MuiOutlinedInput-root {
    height: ${({ height }) => {
      return typeof height === 'string' ? height : `${height}px`
    }};
    border-radius: 10px;
    background-color: ${({ theme }) => theme.styledPalette.background};

    & .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.styledPalette.border};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.styledPalette.border};
      border-width: 1px;
    }
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.styledPalette.border};
    }

    & .MuiOutlinedInput-input {
      color: ${({ theme }) => theme.styledPalette.mainText};
      height: 100%;
      padding: 14px 12px 13px;
      box-sizing: border-box;
      font-family: ${({ theme }) => theme.fonts.futuraPT};
      font-size: 16px;
      line-height: 21px;

      @media ${({ theme }) => theme.media.desktop} {
        padding: 14px 16px 13px;
      }

      &::placeholder {
        color: ${({ theme }) => theme.styledPalette.secondaryText};
        opacity: 1;
      }
    }
  }
`
