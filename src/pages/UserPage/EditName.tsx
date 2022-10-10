import { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { motion } from 'framer-motion'

import { APIStatus } from 'api/MainApi'

import useToggle from 'components/hooks/useToggle'
import { useInput } from 'components/hooks/useInput'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'

import { checkToken } from 'store/sign-up/reducers'
import { selectErrors, selectIsLoggedIn, selectStatus } from 'store/sign-up/selectors'

import { ERoutes } from 'pages/App'

const EditName: FC = () => {
  const dispatch = useDispatch()

  const status = useSelector(selectStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const errors = useSelector(selectErrors)

  const [login, setLogin] = useInput('')
  const [password, setPassword] = useInput('')

  const [loginValidation, setLoginValidation] = useState({ isValid: true, message: '' })
  const [passwordValidation, setPasswordValidation] = useState({ isValid: true, message: '' })

  const [isShowPassword, setShowPassword] = useToggle(false)

  useEffect(() => {
    dispatch(checkToken())
  }, [])

  useEffect(() => {
    if (status === APIStatus.REJECTED) {
      if (errors.length) {
        errors.forEach((error) => {
          if (error.msg === 'User not found') {
            setLoginValidation({
              isValid: false,
              message: 'User with this login not exist.',
            })
          }

          if (error.msg === 'Wrong password') {
            setPasswordValidation({ isValid: false, message: 'Password is not correct.' })
          }
        })

        return
      }

      setLoginValidation({ isValid: false, message: '' })
      setPasswordValidation({
        isValid: false,
        message: 'Something went wrong.',
      })
    }
  }, [status, errors])

  useDidMountEffect(() => {
    handleValidation('login')
  }, [login])

  useDidMountEffect(() => {
    handleValidation('password')
  }, [password])

  const handleOnClickLogin = () => {
    if (!handleValidation()) return

    clearValidation()
  }

  // to services
  const clearValidation = () => {
    setLoginValidation({ isValid: true, message: '' })
    setPasswordValidation({ isValid: true, message: '' })
  }

  // to services
  const handleValidation = (input?: 'login' | 'password') => {
    const loginMsg = 'Please enter a valid login.'
    const passMsg = 'Please enter a valid password.'

    if (input === 'login') {
      if (!login) setLoginValidation({ isValid: false, message: loginMsg })
      if (login) setLoginValidation({ isValid: true, message: '' })
      return
    }

    if (input === 'password') {
      if (!password) setPasswordValidation({ isValid: false, message: passMsg })
      if (password) setPasswordValidation({ isValid: true, message: '' })
      return
    }

    if (!login || !password) {
      if (!login) {
        setLoginValidation({ isValid: false, message: loginMsg })
      }

      if (!password) {
        setPasswordValidation({ isValid: false, message: passMsg })
      }
      return false
    }
    return true
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container justifyContent='center' sx={{ paddingTop: { xs: 6, md: 9 } }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          justifyContent='center'
          sx={{ flex: { xs: '0 1 400px', md: '0 0 600px' } }}
        >
          <Grid item xs={12} md={12}>
            <Typography variant='h2' align='center' gutterBottom>
              EditName
            </Typography>
          </Grid>

          <Grid item xs={12} md={12}>
            <Typography variant='h6' align='center'>
              Enter your name and password
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              placeholder='Login'
              required
              error={!loginValidation.isValid}
              fullWidth
              value={login}
              onChange={setLogin.onChange}
              InputProps={{
                sx: {
                  backgroundColor: '#F4F4F4',
                  borderRadius: '10px',
                  height: '40px',
                },
              }}
            />
          </Grid>

          <Grid item xs={10} md={8}>
            <LoadingButton
              loading={status === APIStatus.PENDING}
              loadingIndicator={
                <CircularProgress
                  size={18}
                  sx={{ color: 'inherit', position: 'absolute', top: '-9px', left: '2px' }}
                />
              }
              loadingPosition='end'
              variant='contained'
              fullWidth
              sx={{ borderRadius: '50px', height: '50px', marginBottom: '10px' }}
              onClick={handleOnClickLogin}
            >
              EditName
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default EditName
