import { FC, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Box, FormHelperText } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { motion } from 'framer-motion'
import { NumberFormatValues, OnValueChange, PatternFormat } from 'react-number-format'
import { getCountryCallingCode, isValidPhoneNumber, Country } from 'react-phone-number-input/input'
import countryNames from 'react-phone-number-input/locale/en.json'
import masks from 'pages/../../country-phone-masks.json'
import 'react-phone-number-input/style.css'

import { APIStatus } from 'api/MainApi'

import { generateOtpAsync } from 'store/sign-up/actions'
import { setPhoneNumber as setPhoneNumberToStore } from 'store/user/reducers'
import { selectGeneratedOTP, selectIsLoggedIn, selectStatus } from 'store/sign-up/selectors'

import { ERoutes } from 'pages/App'
import { Link } from 'react-router-dom'
import Title from 'components/common/Title'
import LoadingButton from 'components/common/LoadingButton'
import styled from 'styled-components'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'
import Text from 'components/common/Text'
import TextField from 'components/common/TextField'
import { CountryCodeSelect } from 'components/common/CountryCodeSelect'

const SignUp: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const generatedOTP = useSelector(selectGeneratedOTP)

  const phoneInputRef = useRef<HTMLInputElement>(null)

  const [phoneNumber, setPhoneNumber] = useState<NumberFormatValues | null>(null)
  const [countryCode, setCountryCode] = useState<Country>('US')

  const [phoneValidation, setPhoneValidation] = useState({ isValid: true, message: '' })

  const [isCountryDialogOpen, setCountryDialogOpen] = useState(false)

  /* masks for :
      YT XK TA SJ PR PM MF JE IM GP GG GB EH CX CC BQ BL AX
  */

  useEffect(() => {
    if (phoneNumber && !phoneValidation.isValid) {
      if (isValidPhoneNumber(phoneNumber.value, countryCode))
        setPhoneValidation({ isValid: true, message: '' })
    }
  }, [phoneNumber])

  useDidMountEffect(() => {
    if (countryCode && !isCountryDialogOpen) {
      if (phoneInputRef?.current) phoneInputRef.current.focus()
    }
  }, [isCountryDialogOpen])

  useEffect(() => {
    if (phoneNumber && generatedOTP && generatedOTP.length === 6) {
      dispatch(
        setPhoneNumberToStore({
          value: getCountryCallingCode(countryCode) + phoneNumber.value,
          formattedValue: phoneNumber.formattedValue,
        }),
      )

      setPhoneNumber(null)
      navigate(ERoutes.CONFIRM)
    }
  }, [generatedOTP])

  const onChangePhoneNumberHandler: OnValueChange = (values) => {
    setPhoneNumber({
      ...values,
      value: values?.value.replace(/_/g, ''),
    })
  }

  const handleOnClickSignUp = () => {
    if (phoneNumber) {
      if (!isValidPhoneNumber(phoneNumber.value, countryCode)) {
        setPhoneValidation({ isValid: false, message: 'Invalid phone number.' })
        return
      }

      dispatch(generateOtpAsync(getCountryCallingCode(countryCode) + phoneNumber.value))
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
          <Title>Let’s get started</Title>

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
              error={!phoneValidation.isValid}
              allowEmptyFormatting={true}
              fullWidth
              format={`${masks[countryCode]}`}
              mask='_'
              value={phoneNumber ? phoneNumber.formattedValue : ''}
              onValueChange={onChangePhoneNumberHandler}
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

          <LoadingButton
            loading={status === APIStatus.PENDING}
            fullWidth
            onClick={handleOnClickSignUp}
          >
            Create account
          </LoadingButton>

          {!phoneValidation.isValid && phoneValidation.message && (
            <FormHelperText
              error={!phoneValidation.isValid}
              sx={{ textAlign: 'center', marginTop: '12px' }}
            >
              {phoneValidation.message}
            </FormHelperText>
          )}

          <DescriptionStyled size={Text.size.sm} color={Text.color.black}>
            By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its
            affiliates to the number provided. Text “STOP” to 89203 to opt out.
          </DescriptionStyled>
        </MotionContainerStyled>
      )}
    </>
  )
}

export default SignUp

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 345px;
  padding: 116px 0 0 0;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 420px;
  }
`

const InputNumberWrapperStyled = styled.div`
  display: flex;
  margin-bottom: 20px;
`

const SubtitleStyled = styled(Text)`
  margin: 6px 0 14px 0;
  letter-spacing: 0.6px;
`

const DescriptionStyled = styled(Text)`
  margin: 15px 0 30px 0;
  letter-spacing: -0.05px;
  padding-left: 1px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 16px;
    line-height: 21px;
  }
`

const TermsPrivacyWrapperStyled = styled(Text)`
  letter-spacing: 0px;
  letter-spacing: -0.32px;
  padding-left: 1px;
`

const TermsPrivacyLinkStyled = styled(Link)`
  display: inline-block;
  color: inherit;
  line-height: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.styledPalette.primaryDisabled};
  text-decoration: none;
`
