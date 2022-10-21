import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { APIStatus } from 'api/MainApi'

import { generateOtpAsync, signUpAsync } from 'store/sign-up/actions'
import { selectGeneratedOTP, selectIsLoggedIn, selectSignUpStatus } from 'store/sign-up/selectors'
import { selectPhoneNumber } from 'store/user/selectors'

import { ERoutes } from 'pages/App'

import Text from 'components/common/Text'
import Title from 'components/common/Title'
import Button from 'components/common/Button'
import LoadingButton from 'components/common/LoadingButton'
import { InputVerificationCode } from 'components/common/InputVerificationCode'

const ConfirmSignUp: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectSignUpStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const generatedOTP = useSelector(selectGeneratedOTP)
  const phoneNumber = useSelector(selectPhoneNumber)

  const [otpCode, setOtpCode] = useState('')

  const [hasCodeResent, setHasCodeResent] = useState(false)

  useEffect(() => {
    if (!generatedOTP || generatedOTP.length !== 6 || !phoneNumber) {
      navigate(ERoutes.SIGN_UP)
    }
  }, [generatedOTP])

  const handleOnClickLogin = (data?: string) => {
    if ((otpCode === generatedOTP || data === generatedOTP) && phoneNumber?.value) {
      dispatch(signUpAsync({ phone: phoneNumber.value, countryCode: phoneNumber.newCountryCode }))
      return
    }
    toast.error('Incorrect verification code, please check again.')
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
            <PhoneNumberStyled forwardedAs='span' weight={Text.weight.medium}>
              {phoneNumber?.formattedValue.replace('(', ' (').replace(')', ') ')}
            </PhoneNumberStyled>
          </SubtitleStyled>

          <InputCodeWrapper>
            <InputVerificationCode
              autoFocus
              length={6}
              placeholder=''
              value={otpCode}
              onChange={handleOnChangeOTP}
              onCompleted={handleOnClickLogin}
            />
          </InputCodeWrapper>

          <ResendButtonWrapper>
            <Button
              btnTheme={Button.themes.text}
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
        </MotionContainerStyled>
      )}
    </>
  )
}

export default ConfirmSignUp

const PhoneNumberStyled = styled(Text)`
  display: inline-block;
  font-weight: bold;
  margin-left: 5px;
`

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 106px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const InputCodeWrapper = styled.div``

const TitleStyled = styled(Title)`
  line-height: 17px;
`

const SubtitleStyled = styled(Text)`
  margin: 14px 0 19px 0;
  line-height: 13px;
  letter-spacing: 0;
`

const ResendButtonWrapper = styled.div`
  margin: 20px 0 19px 0;

  & > button {
    line-height: 13px;
    letter-spacing: 0px;
  }
`