import { FC } from 'react'
import styled from 'styled-components'
import { TextField as TextFieldMui, TextFieldProps } from '@mui/material'

interface Props {
  height?: number | string
  borderRadius?: number | string
}

const TextField: FC<Props & TextFieldProps> = ({
  height = '40px',
  borderRadius = '10px',
  ...props
}) => {
  return <TextFieldStyled height={height} borderRadius={borderRadius} {...props} />
}

const TextFieldStyled = styled(TextFieldMui)<Props>`
  font-family: NewsCycle;

  & .MuiOutlinedInput-root {
    height: ${({ height }) => {
      return typeof height === 'string' ? height : `${height}px`
    }};
    border-radius: ${({ borderRadius }) => {
      return typeof borderRadius === 'string' ? borderRadius : `${borderRadius}px`
    }};
    background-color: #f4f4f4;

    & .MuiOutlinedInput-input {
      color: #262626;
      box-sizing: border-box;
      padding: 0 16px;
      font-size: 15px;

      &:placeholder-shown {
        color: #6d6d6d;
      }
    }
  }
`

export default TextField
