import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'

import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { clearUserState, setAvatar, setUserData } from 'store/user/reducers'
import {
  clearOTP,
  clearSignUpState,
  clearToken,
  setIsFullPageLoading,
  setIsLoggedIn,
} from 'store/sign-up/reducers'
import Tokens from 'utils/local-storage/tokens'
import { UserData } from 'api/ProtectedApi'
import { getSelfieAsync } from 'store/user/actions'
import { Country } from 'react-phone-number-input'

export const restoreAuthAsync = createAsyncThunk<void, void, ThunkExtra>(
  'sign-up/restoreAuthAsync',
  async (_, { rejectWithValue, extra: { protectedApi }, dispatch, getState }) => {
    try {
      dispatch(setIsFullPageLoading(true))

      const tokens = Tokens.getInstance()
      const token = tokens.getToken()

      if (!token) return

      dispatch(setIsLoggedIn(true))
      dispatch(setAvatar('avatar'))

      const { id } = jwt<UserData>(token)

      const { userObject } = await protectedApi.getMe({ userId: id })

      await dispatch(setUserData(userObject))

      await dispatch(getSelfieAsync())
    } catch (error) {
      dispatch(logoutAsync())
      return rejectWithValue(getExceptionPayload(error))
    } finally {
      dispatch(setIsFullPageLoading(false))
    }
  },
)

export const signUpAsync = createAsyncThunk<
  void,
  { phone: string; countryCode: Country },
  ThunkExtra
>(
  'sign-up/signUpAsync',
  async ({ phone, countryCode }, { rejectWithValue, extra: { mainApi }, dispatch }) => {
    try {
      const { token } = await mainApi.postSignUp({ phone, countryCode })

      const tokens = Tokens.getInstance()

      tokens.setToken(token)

      await dispatch(restoreAuthAsync())

      await dispatch(clearOTP())
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const generateOtpAsync = createAsyncThunk<{ OTP: string }, string, ThunkExtra>(
  'sign-up/generateOtpAsync',
  async (phone, { rejectWithValue, extra: { mainApi } }) => {
    try {
      const response = await mainApi.postGeneratedOTP(phone)

      return response
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const logoutAsync = createAsyncThunk(
  'sign-up/logoutAsync',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(clearToken())
      dispatch(clearSignUpState())
      dispatch(clearUserState())

      return new Promise(() => ({}))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
