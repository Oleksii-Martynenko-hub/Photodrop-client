import { FC } from 'react'
import ReactInputVerificationCode, {
  ReactInputVerificationCodeProps,
} from 'react-input-verification-code'
import styled from 'styled-components'

export const InputVerificationCode: FC<ReactInputVerificationCodeProps> = (props) => {
  return (
    <VerificationCodeStyled>
      <ReactInputVerificationCode {...props} />
    </VerificationCodeStyled>
  )
}

const VerificationCodeStyled = styled.div`
  & .ReactInputVerificationCode__container {
    width: auto;
  }

  & .ReactInputVerificationCode__input {
    width: auto;
    height: 40px;
    visibility: hidden;
    top: 0;
    left: 0;
    width: 100%;
  }

  & .ReactInputVerificationCode__item {
    position: relative;
    color: #262626;
    font-weight: normal;
    border: 1px solid ${({ theme }) => theme.styledPalette.border};
    border-radius: 10px;
    padding: 14px 0 15px;
    background-color: #f4f4f4;
    box-shadow: none;
    cursor: text;
    font-family: ${({ theme }) => theme.fonts.futuraPT};
    font-size: 16px;
    line-height: 11px;
    width: 45px;
    height: 40px;

    &.is-active {
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.styledPalette.border};
    }

    &:not(:last-child) {
      margin-right: 15px;
    }
  }
`
