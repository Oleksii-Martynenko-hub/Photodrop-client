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
    font-weight: 500;
    border: 1px solid rgba(0, 0, 0, 0.27);
    border-radius: 10px;
    box-shadow: none;
    cursor: text;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.87);
    }

    &.is-active {
      box-shadow: none;
      border: 1px solid #3300cc;
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
