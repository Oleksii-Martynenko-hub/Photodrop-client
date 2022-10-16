import { createAsyncThunk } from '@reduxjs/toolkit'

import { APIStatus, TokensData } from 'api/MainApi'
import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { clearUserState, setUserData } from 'store/user/reducers'
import {
  clearOTP,
  clearSignUpState,
  clearToken,
  setIsLoggedIn,
  setSignUpStatus,
} from 'store/sign-up/reducers'
import Tokens from 'utils/local-storage/tokens'

export const restoreAuthAsync = createAsyncThunk<void, void, ThunkExtra>(
  'login/restoreAuthAsync',
  async (_, { rejectWithValue, extra: { protectedApi }, dispatch }) => {
    try {
      const tokens = Tokens.getInstance()
      const token = tokens.getToken()

      if (!token) return

      dispatch(setSignUpStatus(APIStatus.PENDING))

      await protectedApi.getMe()
      await dispatch(setUserData())
      dispatch(setIsLoggedIn(true))

      dispatch(setSignUpStatus(APIStatus.FULFILLED))
    } catch (error) {
      dispatch(setSignUpStatus(APIStatus.REJECTED))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

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
      dispatch(clearSignUpState())
      dispatch(clearUserState())

      return new Promise(() => ({}))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
