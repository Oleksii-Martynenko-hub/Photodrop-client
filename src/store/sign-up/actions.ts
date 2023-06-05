import { createAsyncThunk } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'
import { Country } from 'react-phone-number-input'

import { getExceptionPayload } from 'api/ErrorHandler'
import { UserData } from 'api/ProtectedApi'

import Tokens from 'utils/local-storage/tokens'

import { ThunkExtra } from 'store'
import {
  clearSignUpState,
  clearToken,
  setIsFullPageLoading,
  setIsLoggedIn,
} from 'store/sign-up/reducers'
import { clearUserState, setAvatar, initUserData } from 'store/user/reducers'
import { getSelfieAsync } from 'store/user/actions'
import { getAlbumsAsync } from 'store/albums/actions'
import { clearAlbumsState } from 'store/albums/reducers'

export const restoreAuthAsync = createAsyncThunk<void, void, ThunkExtra>(
  'sign-up/restoreAuthAsync',
  async (_, { rejectWithValue, extra: { protectedApi }, dispatch }) => {
    try {
      dispatch(setIsFullPageLoading(true))

      const tokens = Tokens.getInstance()
      const token = tokens.getToken()

      if (!token) return

      dispatch(setIsLoggedIn(true))
      dispatch(setAvatar('avatar'))

      const { id } = jwt<UserData>(token)

      const { userObject } = await protectedApi.getMe({ userId: id })

      await dispatch(initUserData(userObject))
      await dispatch(getAlbumsAsync(userObject.phone))

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
  { phone: string; countryCode: Country; otp: string },
  ThunkExtra
>(
  'sign-up/signUpAsync',
  async ({ phone, countryCode, otp }, { rejectWithValue, extra: { mainApi }, dispatch }) => {
    try {
      await mainApi.postCheckOTP(phone, otp)

      const { token } = await mainApi.postSignUp({ phone, countryCode })

      const tokens = Tokens.getInstance()

      tokens.setToken(token)

      await dispatch(restoreAuthAsync())
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const generateOtpAsync = createAsyncThunk<void, string, ThunkExtra>(
  'sign-up/generateOtpAsync',
  async (phone, { rejectWithValue, extra: { mainApi } }) => {
    try {
      await mainApi.postGeneratedOTP(phone)
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
      dispatch(clearAlbumsState())

      return new Promise(() => ({}))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
