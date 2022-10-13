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
import Subtitle from 'components/common/Subtitle'
import LoadingButton from 'components/common/LoadingButton'
import Button from 'components/common/Button'
import styled from 'styled-components'

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
      navigate(ERoutes.SIGN_UP)
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Grid container justifyContent='center' sx={{ paddingTop: { xs: 6, md: 9 } }}>
            <Grid container justifyContent='center' sx={{ flex: { xs: '0 0 345px' } }}>
              <Grid item xs={12}>
                <Title marginBottom={5}>What’s the code?</Title>
              </Grid>

              <Grid item xs={12}>
                <Subtitle marginBottom={16}>
                  Enter the code sent to
                  <PhoneNumberStyled>
                    {phoneNumber?.formattedValue.replace('(', ' (').replace(')', ') ')}
                  </PhoneNumberStyled>
                </Subtitle>
              </Grid>

              <Grid item xs={12} sx={{ mb: '7px' }}>
                <InputVerificationCode
                  autoFocus
                  length={6}
                  placeholder=''
                  value={otpCode}
                  onChange={handleOnChangeOTP}
                  onCompleted={handleOnClickLogin}
                  isValid={codeValidation.isValid}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: '10px' }}>
                <Button
                  disabled={hasCodeResent}
                  size='small'
                  variant='text'
                  fontSize={16}
                  height={38}
                  onClick={handleOnClickResendOTP}
                >
                  Resend code
                </Button>
              </Grid>

              <Grid item xs={12} sx={{ mb: '20px' }}>
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
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
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
