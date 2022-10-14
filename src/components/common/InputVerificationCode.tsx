import { FC } from 'react'
import ReactInputVerificationCode, {
  ReactInputVerificationCodeProps,
} from 'react-input-verification-code'
import styled, { css } from 'styled-components'

interface Props extends ReactInputVerificationCodeProps {
  isValid?: boolean
}

export const InputVerificationCode: FC<Props> = ({ isValid = true, ...props }) => {
  return (
    <VerificationCodeStyled isValid={isValid}>
      <ReactInputVerificationCode {...props} />
    </VerificationCodeStyled>
  )
}

const VerificationCodeStyled = styled.div<{ isValid: boolean }>`
  --ReactInputVerificationCode-itemWidth: 45px;
  --ReactInputVerificationCode-itemHeight: 40px;
  --ReactInputVerificationCode-itemSpacing: 15px;

  & .ReactInputVerificationCode__item {
    position: relative;
    color: #262626;
    font-weight: normal;
    border: 1px solid ${({ theme }) => theme.styledPalette.border};
    border-radius: 10px;
    background-color: #f4f4f4;
    box-shadow: none;
    cursor: text;
    font-family: ${({ theme }) => theme.fonts.futuraPT};
    font-size: 16px;
    line-height: 21px;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.87);
    }

    &.is-active {
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.styledPalette.border};
    }
  }

  ${({ isValid }) =>
    !isValid &&
    css`
      & .ReactInputVerificationCode__item {
        border: 1px solid rgba(231, 77, 60, 0.6);

        &.is-active {
          border: 1px solid rgba(231, 77, 60, 1);
        }
      }
    `}
`
