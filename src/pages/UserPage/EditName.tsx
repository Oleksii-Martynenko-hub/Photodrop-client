import { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { FormHelperText, Grid } from '@mui/material'
import { motion } from 'framer-motion'

import { APIStatus } from 'api/MainApi'

import { ERoutes } from 'pages/App'
import { generateOtpAsync, signUpAsync } from 'store/sign-up/actions'
import { selectUserStatus, selectUserIsOnboarding, selectUserName } from 'store/user/selectors'
import { InputVerificationCode } from 'components/common/InputVerificationCode'
import { useDidMountEffect } from 'components/hooks/useDidMountEffect'
import Title from 'components/common/Title'
import LoadingButton from 'components/common/LoadingButton'
import Button from 'components/common/Button'
import styled from 'styled-components'
import { useInput } from 'components/hooks/useInput'
import TextField from 'components/common/TextField'
import { editNameAsync } from 'store/user/actions'

const EditName: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectUserStatus)
  const userName = useSelector(selectUserName)
  const isOnboarding = useSelector(selectUserIsOnboarding)

  const [newUserName, setNewUserName] = useInput(userName || '')
  const [nameValidation, setNameValidation] = useState({ isValid: true, message: '' })

  useDidMountEffect(() => {
    if (newUserName) {
      setNameValidation({ isValid: true, message: '' })
    }
  }, [newUserName])

  const handleOnClickLogin = (data?: string) => {
    if (newUserName === userName) {
      setNameValidation({
        isValid: false,
        message: 'You don`t need to update, if name hasn`t changed.',
      })
      return
    }

    if (!newUserName.length) {
      setNameValidation({
        isValid: false,
        message: 'Please enter your name.',
      })
      return
    }

    dispatch(editNameAsync(newUserName))
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Grid container justifyContent='center' sx={{ paddingTop: { xs: 6, md: 9 } }}>
        <Grid container justifyContent='center' sx={{ flex: { xs: '0 0 345px' } }}>
          <Grid item xs={12}>
            <Title size={Title.size.small}>
              {isOnboarding || !userName ? 'Let’s get to know you' : 'Your name'}
            </Title>
          </Grid>

          <Grid item xs={12} sx={{ mb: '21px' }}>
            <TextField
              placeholder={isOnboarding || !userName ? 'What’s your name?' : 'Enter your new name'}
              required
              error={!nameValidation.isValid}
              fullWidth
              value={newUserName}
              onChange={setNewUserName.onChange}
            />
          </Grid>

          <Grid item xs={12} sx={{ mb: '20px' }}>
            <LoadingButton
              loading={status === APIStatus.PENDING}
              disabled={!newUserName.length}
              fullWidth
              onClick={() => handleOnClickLogin()}
            >
              Save
            </LoadingButton>

            {!nameValidation.isValid && nameValidation.message && (
              <FormHelperText
                error={!nameValidation.isValid}
                sx={{ textAlign: 'center', marginTop: '12px' }}
              >
                {nameValidation.message}
              </FormHelperText>
            )}
          </Grid>
        </Grid>
      </Grid>
    </motion.div>
  )
}

export default EditName
