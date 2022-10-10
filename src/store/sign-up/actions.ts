import { createAsyncThunk } from '@reduxjs/toolkit'

import { LoginData, TokensData } from 'api/MainApi'
import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { clearUserState, setUserData } from 'store/user/reducers'
import { clearLoginState, clearOTP, clearToken } from 'store/sign-up/reducers'
import Tokens from 'utils/local-storage/tokens'

export const signUpAsync = createAsyncThunk<TokensData, string, ThunkExtra>(
  'signUp/signUpAsync',
  async (phone, { rejectWithValue, extra: { mainApi }, dispatch }) => {
    try {
      const response = await mainApi.postSignUp(phone)

      const tokens = Tokens.getInstance()

      tokens.setToken(response.token)

      await dispatch(setUserData())
      await dispatch(clearOTP())

      return response
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const generateOtpAsync = createAsyncThunk<{ OTP: string }, string, ThunkExtra>(
  'signUp/generateOtpAsync',
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
  'signUp/logoutAsync',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(clearToken())
      dispatch(clearLoginState())
      dispatch(clearUserState())

      return new Promise(() => ({}))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
