import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  AppBar,
  Autocomplete,
  Box,
  Dialog,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CloseIcon from '@mui/icons-material/Close'
import { motion } from 'framer-motion'
import { NumberFormatValues, OnValueChange, PatternFormat } from 'react-number-format'
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  Country,
} from 'react-phone-number-input/input'
import countryNames from 'react-phone-number-input/locale/en.json'
import masks from 'pages/../../country-phone-masks.json'
import 'react-phone-number-input/style.css'

import { APIStatus } from 'api/MainApi'

import useToggle from 'components/hooks/useToggle'

import { generateOtpAsync } from 'store/sign-up/actions'
import { checkToken } from 'store/sign-up/reducers'
import { setPhoneNumber as setPhoneNumberToStore } from 'store/user/reducers'
import { selectGeneratedOTP, selectIsLoggedIn, selectStatus } from 'store/sign-up/selectors'

import { ERoutes } from 'pages/App'
import { Link } from 'react-router-dom'
import Title from 'components/Title'
import Subtitle from 'components/Subtitle'
import LoadingButton from 'components/LoadingButton'

const SignUp: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const generatedOTP = useSelector(selectGeneratedOTP)

  const [phoneNumber, setPhoneNumber] = useState<NumberFormatValues | null>(null)
  const [countryCode, setCountryCode] = useState<Country>('US')

  const [phoneValidation, setPhoneValidation] = useState({ isValid: true, message: '' })

  const [isCountryDialogOpen, setCountryDialogOpen] = useToggle(false)

  useEffect(() => {
    dispatch(checkToken())
  }, [])
  /* masks for :
      YT XK TA SJ PR PM MF JE IM GP GG GB EH CX CC BQ BL AX
  */

  useEffect(() => {
    if (phoneNumber && !phoneValidation.isValid) {
      if (isValidPhoneNumber(phoneNumber.value, countryCode))
        setPhoneValidation({ isValid: true, message: '' })
    }
  }, [phoneNumber])

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

  const handleOnClickCountryItem = (country: typeof countryCode) => () => {
    setCountryCode(country)
    setCountryDialogOpen(false)
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Grid container justifyContent='center' sx={{ paddingTop: { xs: 6, md: 9 } }}>
            <Grid container justifyContent='center' sx={{ flex: { xs: '0 1 345px' } }}>
              <Grid item xs={12} md={12}>
                <Title marginBottom={5}>Let’s get started</Title>
              </Grid>

              <Grid item xs={12} md={12}>
                <Subtitle isBold marginBottom={16}>
                  Enter your phone number
                </Subtitle>
              </Grid>

              <Grid item xs={12} container spacing={2} sx={{ mb: '20px' }}>
                <Dialog
                  fullScreen
                  open={isCountryDialogOpen}
                  onClose={() => setCountryDialogOpen(false)}
                >
                  <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                      <IconButton
                        edge='start'
                        color='inherit'
                        onClick={() => setCountryDialogOpen(false)}
                        aria-label='close'
                      >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>

                  <List>
                    {getCountries().map((country) => (
                      <>
                        <ListItem key={country} button onClick={handleOnClickCountryItem(country)}>
                          <ListItemAvatar>
                            <img
                              width={28}
                              height={22}
                              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                              alt={countryNames[country]}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={countryNames[country]}
                            secondary={'+ ' + getCountryCallingCode(country)}
                          />
                        </ListItem>

                        <Divider />
                      </>
                    ))}
                  </List>
                </Dialog>

                <Grid item alignItems='center'>
                  <Box
                    onClick={() => setCountryDialogOpen(true)}
                    sx={{
                      width: '70px',
                      height: '40px',
                      borderRadius: '10px',
                      border: '1px solid rgba(0, 0, 0, 0.27)',
                      background: '#F4F4F4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      '&:hover': {
                        border: '1px solid rgba(0, 0, 0, 0.87)',
                      },
                    }}
                  >
                    <img
                      width={28}
                      height={22}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`}
                      alt={countryNames[countryCode]}
                    />

                    <ArrowDropDownIcon />
                  </Box>
                </Grid>

                <Grid item xs>
                  <PatternFormat
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
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ mb: '20px' }}>
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
              </Grid>

              <Grid item xs={12} md={12} sx={{ mb: '34px' }}>
                <Typography variant='body2' sx={{ fontSize: '13px' }}>
                  By proceeding, you consent to get WhatsApp or SMS messages, from PhotoDrop and its
                  affiliates to the number provided. Text “STOP” to 89203 to opt out.
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography variant='body2' sx={{ fontSize: '13px' }}>
                  By continuing, you indicate that you have read and agree to our{' '}
                  <Link to={ERoutes.TERMS}>Terms of Use</Link>
                  {' & '}
                  <Link to={ERoutes.PRIVACY}>Privacy Policy</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </motion.div>
      )}
    </>
  )
}

export default SignUp
