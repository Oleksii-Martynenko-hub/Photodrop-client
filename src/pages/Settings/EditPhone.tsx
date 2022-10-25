import { FC, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { NumberFormatValues, OnValueChange, PatternFormat } from 'react-number-format'
import { getCountryCallingCode, isValidPhoneNumber, Country } from 'react-phone-number-input/input'
import masks from 'pages/../../country-phone-masks.json'
import 'react-phone-number-input/style.css'

import { APIStatus } from 'api/MainApi'

import { generateOtpAsync } from 'store/sign-up/actions'
import { setPhoneNumber as setPhoneNumberToStore } from 'store/user/reducers'
import { selectGeneratedOTP, selectSignUpStatus } from 'store/sign-up/selectors'
import { selectPhoneNumber, selectUserCountryCode, selectUserPhone } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useToggle } from 'components/hooks/useToggle'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import TextField from 'components/common/TextField'
import LoadingButton from 'components/common/LoadingButton'
import CountryCodeSelect from 'components/common/CountryCodeSelect'

const EditPhone: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const status = useSelector(selectSignUpStatus)
  const phone = useSelector(selectUserPhone)
  const countryCode = useSelector(selectUserCountryCode)
  const phoneNumber = useSelector(selectPhoneNumber)
  const generatedOTP = useSelector(selectGeneratedOTP)

  const phoneInputRef = useRef<HTMLInputElement>(null)

  const [newPhoneNumber, setNewPhoneNumber] = useState<NumberFormatValues | null>(null)
  const [newCountryCode, setNewCountryCode] = useState<Country>('US')
  const [isCountryDialogOpen, setCountryDialogOpen] = useState(false)
  const [isEditPhoneLoading, setIsEditPhoneLoading] = useState(false)
  const [isShowOutlet, setIsShowOutlet] = useToggle(false)

  useEffect(() => {
    setIsShowOutlet(location.pathname.split('/').filter((p) => !!p).length > 4)
  }, [location.pathname])

  useEffect(() => {
    if (phoneNumber) {
      setNewPhoneNumber({
        value: phoneNumber.value,
        formattedValue: phoneNumber.formattedValue,
        floatValue: +phoneNumber.value,
      })
    }
  }, [phoneNumber])

  useEffect(() => {
    if (countryCode) {
      setNewCountryCode(countryCode)
    }
  }, [countryCode])

  useEffect(() => {
    if (isEditPhoneLoading) {
      if (status === APIStatus.FULFILLED) {
        if (newPhoneNumber && generatedOTP && generatedOTP.length === 6) {
          dispatch(
            setPhoneNumberToStore({
              value: getCountryCallingCode(newCountryCode) + newPhoneNumber.value,
              formattedValue: newPhoneNumber.formattedValue,
              newCountryCode,
            }),
          )

          setNewPhoneNumber(null)
          navigate(ERoutes.USER_EDIT_PHONE_CONFIRM)
        }
      }

      if (status !== APIStatus.PENDING) setIsEditPhoneLoading(false)
    }
  }, [status, generatedOTP, isEditPhoneLoading])

  useDidMountEffect(() => {
    if (newCountryCode && !isCountryDialogOpen) {
      resetInputNumberValue()
      if (phoneInputRef?.current) phoneInputRef.current.focus()
    }
  }, [isCountryDialogOpen])

  const onChangePhoneNumberHandler: OnValueChange = (values) => {
    setNewPhoneNumber({
      ...values,
      value: values?.value.replace(/_/g, ''),
    })
  }

  const handleOnClickSave = () => {
    if (!newPhoneNumber || !newPhoneNumber?.value.length) {
      toast.error('Please enter phone number.')
      return
    }

    if (
      newCountryCode === countryCode &&
      getCountryCallingCode(newCountryCode) + newPhoneNumber.value === phone
    ) {
      toast.error('You don`t need to update, if phone hasn`t changed.')
      return
    }

    if (!isValidPhoneNumber(newPhoneNumber.value, newCountryCode)) {
      toast.error('Invalid phone number.')
      return
    }

    setIsEditPhoneLoading(true)
    dispatch(generateOtpAsync(getCountryCallingCode(newCountryCode) + newPhoneNumber.value))
  }

  const resetInputNumberValue = () => {
    setNewPhoneNumber({
      value: '',
      formattedValue: `${masks[countryCode]}`.replace(/#/g, '_'),
      floatValue: undefined,
    })
  }

  const handleOnFocusInputNumber = () => {
    if (!phoneNumber?.value) resetInputNumberValue()
  }

  const handleOnBlurInputNumber = () => {
    if (!phoneNumber?.value) setNewPhoneNumber(null)
  }

  return (
    <>
      {isShowOutlet ? (
        <Outlet />
      ) : (
        <MotionContainerStyled
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <TitleStyled size={Title.size.small}>Mobile number</TitleStyled>

          <SubtitleStyled>
            Update your number and we’ll send a verification code to this number.
          </SubtitleStyled>

          <InputNumberWrapperStyled>
            <CountryCodeSelect
              countryCode={newCountryCode}
              setCountryCode={setNewCountryCode}
              isCountryDialogOpen={isCountryDialogOpen}
              setCountryDialogOpen={setCountryDialogOpen}
            />

            <PatternFormat
              inputRef={phoneInputRef}
              customInput={TextField}
              margin='normal'
              size='small'
              fullWidth
              placeholder={`${masks[newCountryCode]}`.replace(/#/g, '5')}
              format={`${masks[newCountryCode]}`}
              mask='_'
              value={newPhoneNumber ? newPhoneNumber.formattedValue : ''}
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

          <LoadingButton loading={isEditPhoneLoading} fullWidth onClick={handleOnClickSave}>
            Next
          </LoadingButton>
        </MotionContainerStyled>
      )}
    </>
  )
}

export default EditPhone

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 120px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 500px;
    padding: 227px 40px 40px;
  }
`

const InputNumberWrapperStyled = styled.div`
  display: flex;
  margin: 0 0 20px 0;
`

const TitleStyled = styled(Title)`
  line-height: 14px;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 16px;
  }
`

const SubtitleStyled = styled(Text)`
  margin: 15px 0 20px 0;
  line-height: 21px;
  letter-spacing: 0;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 30px 0 20px 0;
    font-size: 18px;
    line-height: 23px;
  }
`
