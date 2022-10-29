import { FC, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { NumberFormatValues, OnValueChange, PatternFormat } from 'react-number-format'
import { getCountryCallingCode, isValidPhoneNumber, Country } from 'react-phone-number-input/input'
import masks from 'pages/../../country-phone-masks.json'
import 'react-phone-number-input/style.css'

import MainApi, { APIStatus } from 'api/MainApi'

import { generateOtpAsync } from 'store/sign-up/actions'
import { setPhoneNumber as setPhoneNumberToStore } from 'store/user/reducers'
import { selectGeneratedOTP, selectIsLoggedIn, selectSignUpStatus } from 'store/sign-up/selectors'

import { ERoutes } from 'pages/App'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import TextField from 'components/common/TextField'
import LoadingButton from 'components/common/LoadingButton'
import CountryCodeSelect from 'components/common/CountryCodeSelect'

const SignUp: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectSignUpStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const generatedOTP = useSelector(selectGeneratedOTP)

  const phoneInputRef = useRef<HTMLInputElement>(null)

  const [phoneNumber, setPhoneNumber] = useState<NumberFormatValues | null>(null)
  const [countryCode, setCountryCode] = useState<Country>('US')
  const [isCountryDialogOpen, setCountryDialogOpen] = useState(false)
  const [isSignUpLoading, setIsSignUpLoading] = useState(false)

  /* masks for :
      YT XK TA SJ PR PM MF JE IM GP GG GB EH CX CC BQ BL AX
  */

  useEffect(() => {
    if (isSignUpLoading) {
      if (status === APIStatus.FULFILLED) {
        if (phoneNumber && generatedOTP && generatedOTP.length === 6) {
          dispatch(
            setPhoneNumberToStore({
              value: getCountryCallingCode(countryCode) + phoneNumber.value,
              formattedValue: phoneNumber.formattedValue,
              newCountryCode: countryCode,
            }),
          )

          setPhoneNumber(null)
          navigate(ERoutes.CONFIRM)
        }
      }

      if (status !== APIStatus.PENDING) setIsSignUpLoading(false)
    }
  }, [status, generatedOTP, isSignUpLoading])

  useDidMountEffect(() => {
    if (countryCode && !isCountryDialogOpen) {
      resetInputNumberValue()
      if (phoneInputRef?.current) phoneInputRef.current.focus()
    }
  }, [isCountryDialogOpen])

  const onChangePhoneNumberHandler: OnValueChange = (values) => {
    setPhoneNumber({
      ...values,
      value: values?.value.replace(/_/g, ''),
    })
  }

  const handleOnClickSignUp = async () => {
    const api = MainApi.getInstance()

    const res = await api.getOrigin()
    console.log('🚀 ~ handleOnClickSignUp ~ res', res)

    // if (!phoneNumber || !phoneNumber.value) {
    //   toast.error('Please enter your phone number.')
    //   return
    // }

    // if (phoneNumber) {
    //   if (!isValidPhoneNumber(phoneNumber.value, countryCode)) {
    //     toast.error('Invalid phone number.')
    //     return
    //   }

    //   setIsSignUpLoading(true)
    //   dispatch(generateOtpAsync(getCountryCallingCode(countryCode) + phoneNumber.value))
    // }
  }

  const resetInputNumberValue = () => {
    setPhoneNumber({
      value: '',
      formattedValue: `${masks[countryCode]}`.replace(/#/g, '_'),
      floatValue: undefined,
    })
  }

  const handleOnFocusInputNumber = () => {
    if (!phoneNumber?.value) resetInputNumberValue()
  }

  const handleOnBlurInputNumber = () => {
    if (!phoneNumber?.value) setPhoneNumber(null)
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={ERoutes.DASHBOARD} replace />
      ) : (
        <MotionContainerStyled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TitleStyled>Let’s get started</TitleStyled>

          <SubtitleStyled size={Text.size.lg} weight={Text.weight.medium}>
            Enter your phone number
          </SubtitleStyled>

          <InputNumberWrapperStyled>
            <CountryCodeSelect
              countryCode={countryCode}
              setCountryCode={setCountryCode}
              isCountryDialogOpen={isCountryDialogOpen}
              setCountryDialogOpen={setCountryDialogOpen}
            />

            <PatternFormat
              inputRef={phoneInputRef}
              customInput={TextField}
              margin='normal'
              size='small'
              fullWidth
              placeholder={`${masks[countryCode]}`.replace(/#/g, '5')}
              format={`${masks[countryCode]}`}
              mask='_'
              value={phoneNumber ? phoneNumber.formattedValue : ''}
              onValueChange={onChangePhoneNumberHandler}
              onFocus={handleOnFocusInputNumber}
              onBlur={handleOnBlurInputNumber}
              sx={{ margin: 0 }}
              InputProps={{
                sx: {
                  backgroundColor: '#F4F4F4',
                  borderRadius: '10px',
                  height: '40px',
                },
              }}
            />
          </InputNumberWrapperStyled>

          <LoadingButton loading={isSignUpLoading} fullWidth onClick={handleOnClickSignUp}>
            Create account
          </LoadingButton>

          <DescriptionStyled size={Text.size.sm} color={Text.color.black}>
            By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its
            affiliates to the number provided. Text “STOP” to 89203 to opt out.
          </DescriptionStyled>

          <TermsPrivacyWrapperStyled size={Text.size.sm} color={Text.color.black}>
            By continuing, you indicate that you have read and agree to our{' '}
            <TermsPrivacyLinkStyled to={ERoutes.TERMS}>Terms of Use</TermsPrivacyLinkStyled>
            {' & '}
            <TermsPrivacyLinkStyled to={ERoutes.PRIVACY}>Privacy Policy</TermsPrivacyLinkStyled>
          </TermsPrivacyWrapperStyled>
        </MotionContainerStyled>
      )}
    </>
  )
}

export default SignUp

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 136px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    padding: 177px 40px 40px;
    max-width: 500px;
  }
`

const InputNumberWrapperStyled = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`

const TitleStyled = styled(Title)`
  line-height: 17px;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 22px;
  }
`

const SubtitleStyled = styled(Text)`
  margin: 14px 0 19px 0;
  line-height: 15px;
  letter-spacing: 0.6px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 29px 0 18px 0;
    line-height: 16px;
  }
`

const DescriptionStyled = styled(Text)`
  margin: 20px 0 38px 0;
  letter-spacing: -0.05px;
  line-height: 18px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 20px 0 0 0;
    font-size: 16px;
    line-height: 21px;
  }
`

const TermsPrivacyWrapperStyled = styled(Text)`
  letter-spacing: -0.32px;
  line-height: 18px;

  @media ${({ theme }) => theme.media.desktop} {
    display: none;
  }
`

const TermsPrivacyLinkStyled = styled(Link)`
  display: inline-block;
  color: inherit;
  line-height: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.styledPalette.primary};
  text-decoration: none;
`
