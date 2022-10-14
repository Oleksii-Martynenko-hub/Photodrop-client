import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FormHelperText, Grid } from '@mui/material'
import { motion } from 'framer-motion'

import { APIStatus } from 'api/MainApi'

import { selectGeneratedOTP, selectIsLoggedIn, selectStatus } from 'store/sign-up/selectors'

import { ERoutes } from 'pages/App'
import { generateOtpAsync, signUpAsync } from 'store/sign-up/actions'
import { selectPhoneNumber } from 'store/user/selectors'
import { InputVerificationCode } from 'components/common/InputVerificationCode'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'
import Title from 'components/common/Title'
import LoadingButton from 'components/common/LoadingButton'
import Button from 'components/common/Button'
import styled from 'styled-components'
import Text from 'components/common/Text'

const ConfirmSignUp: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const generatedOTP = useSelector(selectGeneratedOTP)
  const phoneNumber = useSelector(selectPhoneNumber)

  const [otpCode, setOtpCode] = useState('')
  const [codeValidation, setCodeValidation] = useState({ isValid: true, message: '' })

  const [hasCodeResent, setHasCodeResent] = useState(false)

  useEffect(() => {
    if (!generatedOTP || generatedOTP.length !== 6 || !phoneNumber) {
      // navigate(ERoutes.SIGN_UP)
    }
  }, [generatedOTP])

  useDidMountEffect(() => {
    if (otpCode) {
      setCodeValidation({ isValid: true, message: '' })
    }
  }, [otpCode])

  const handleOnClickLogin = (data?: string) => {
    if ((otpCode === generatedOTP || data === generatedOTP) && phoneNumber?.value) {
      dispatch(signUpAsync(phoneNumber.value))
      return
    }

    setCodeValidation({
      isValid: false,
      message: 'Incorrect verification code, please check again.',
    })
  }

  const handleOnChangeOTP = (value: string) => {
    setOtpCode(value)
  }

  const handleOnClickResendOTP = () => {
    if (phoneNumber?.value) {
      dispatch(generateOtpAsync(phoneNumber.value))
      setHasCodeResent(true)
    }
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={ERoutes.MAIN} replace />
      ) : (
        <MotionContainerStyled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TitleStyled>What’s the code?</TitleStyled>

          <SubtitleStyled>
            Enter the code sent to
            <Text weight={Text.weight.medium}>
              <PhoneNumberStyled>
                {phoneNumber?.formattedValue.replace('(', ' (').replace(')', ') ')}
              </PhoneNumberStyled>
            </Text>
          </SubtitleStyled>

          <InputCodeWrapper>
            <InputVerificationCode
              autoFocus
              length={6}
              placeholder=''
              value={otpCode}
              onChange={handleOnChangeOTP}
              onCompleted={handleOnClickLogin}
              isValid={codeValidation.isValid}
            />
          </InputCodeWrapper>

          <ResendButtonWrapper>
            <Button
              theme={Button.themes.text}
              disabled={hasCodeResent}
              onClick={handleOnClickResendOTP}
            >
              Resend code
            </Button>
          </ResendButtonWrapper>

          <LoadingButton
            loading={status === APIStatus.PENDING}
            disabled={otpCode.length !== 6}
            fullWidth
            onClick={() => handleOnClickLogin()}
          >
            Next
          </LoadingButton>

          {!codeValidation.isValid && codeValidation.message && (
            <FormHelperText
              error={!codeValidation.isValid}
              sx={{ textAlign: 'center', marginTop: '12px' }}
            >
              {codeValidation.message}
            </FormHelperText>
          )}
        </MotionContainerStyled>
      )}
    </>
  )
}

export default ConfirmSignUp

const PhoneNumberStyled = styled.span`
  display: inline-block;
  font-weight: bold;
  margin-left: 5px;
`

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 345px;
  padding: 106px 0 0 0;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 420px;
  }
`

const InputCodeWrapper = styled.div`
  /* margin-bottom: 20px; */
`

const TitleStyled = styled(Title)`
  line-height: 17px;
  letter-spacing: 0.6px;
`

const SubtitleStyled = styled(Text)`
  margin: 14px 0 19px 0;
  line-height: 13px;
  letter-spacing: 0;
`

const ResendButtonWrapper = styled.div`
  margin: 20px 0 19px 0;
  line-height: 13px;
`