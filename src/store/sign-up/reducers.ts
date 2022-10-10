import { createSlice } from '@reduxjs/toolkit'

import { ErrorObject } from 'api/ErrorHandler'
import { APIStatus } from 'api/MainApi'

import { pendingCase, rejectedCase } from 'store'
import { generateOtpAsync, signUpAsync } from 'store/sign-up/actions'

import Tokens from 'utils/local-storage/tokens'

export interface LoginState {
  isLoggedIn: boolean
  generatedOTP: string | null
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: LoginState = {
  isLoggedIn: false,
  generatedOTP: null,
  status: APIStatus.IDLE,
  errors: [],
}

export const errorToast = (msg: string) =>
  [
    msg === 'Not authorized' ? 'Your login has expired, please login again' : msg,
    {
      position: 'top-center',
      hideProgressBar: true,
      closeOnClick: true,
      draggable: true,
      autoClose: 3000,
      progress: undefined,
    },
  ] as const

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearToken: () => {
      const tokens = Tokens.getInstance()
      tokens.clearTokens()
    },
    clearOTP: (state) => {
      state.generatedOTP = null
    },
    clearLoginState: () => initialState,
    checkToken: (state) => {
      const tokens = Tokens.getInstance()

      if (tokens.getToken()) {
        state.isLoggedIn = true
        state.status = APIStatus.FULFILLED
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateOtpAsync.pending, pendingCase())
    builder.addCase(generateOtpAsync.rejected, rejectedCase())
    builder.addCase(generateOtpAsync.fulfilled, (state, { payload }) => {
      state.generatedOTP = payload.OTP
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(signUpAsync.pending, pendingCase())
    builder.addCase(signUpAsync.rejected, rejectedCase())
    builder.addCase(signUpAsync.fulfilled, (state) => {
      const tokens = Tokens.getInstance()

      if (tokens.getToken()) {
        state.isLoggedIn = true
        state.status = APIStatus.FULFILLED
      }
    })
  },
})

export const { clearToken, clearLoginState, checkToken, clearOTP } = loginSlice.actions

export default loginSlice.reducer
