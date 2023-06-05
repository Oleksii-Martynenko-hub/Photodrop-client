import { FC } from 'react'
import ReactInputVerificationCode, {
  ReactInputVerificationCodeProps,
} from 'react-input-verification-code'
import styled from 'styled-components'

const InputVerificationCode: FC<ReactInputVerificationCodeProps> = (props) => {
  return (
    <VerificationCodeStyled>
      <ReactInputVerificationCode {...props} />
    </VerificationCodeStyled>
  )
}

export default InputVerificationCode

const VerificationCodeStyled = styled.div`
  --ReactInputVerificationCode-itemWidth: 45px;
  --ReactInputVerificationCode-itemHeight: 40px;
  --ReactInputVerificationCode-itemSpacing: 15px;
  & .ReactInputVerificationCode__container {
    width: auto;
  }

  & .ReactInputVerificationCode__item {
    position: relative;
    color: #262626;
    font-weight: normal;
    border: 1px solid ${({ theme }) => theme.styledPalette.border};
    border-radius: 10px;
    padding: 13px 0 14px;
    background-color: #f4f4f4;
    box-shadow: none;
    cursor: text;
    font-family: ${({ theme }) => theme.fonts.futuraPT};
    font-size: 16px;
    line-height: 11px;
    width: 45px;
    height: 40px;

    @media ${({ theme }) => theme.media.desktop} {
      padding: 11px 0 11px;
      font-size: 18px;
      line-height: 16px;
    }

    &.is-active {
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.styledPalette.border};
    }

    &:not(:last-child) {
      margin-right: 15px;

      @media ${({ theme }) => theme.media.desktop} {
        margin-right: 30px;
      }
    }
  }
`
