import { FC } from 'react'
import styled from 'styled-components'
import { TextField as TextFieldMui, TextFieldProps } from '@mui/material'

interface Props {
  height?: number | string
}

const TextField: FC<Props & TextFieldProps> = ({ height = '40px', ...props }) => {
  return <TextFieldStyled height={height} {...props} />
}

const TextFieldStyled = styled(TextFieldMui)<Props>`
  & .MuiOutlinedInput-root {
    height: ${({ height }) => {
      return typeof height === 'string' ? height : `${height}px`
    }};
    border-radius: 10px;
    background-color: #f4f4f4;

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
      color: #262626;
      box-sizing: border-box;
      padding: 0 16px;
      font-family: ${({ theme }) => theme.fonts.futuraPT};
      font-size: 16px;
      line-height: 21px;

      &:placeholder-shown {
        color: #6d6d6d;
      }
    }
  }
`

export default TextField
