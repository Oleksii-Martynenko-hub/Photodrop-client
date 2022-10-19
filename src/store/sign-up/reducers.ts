import { createSlice } from '@reduxjs/toolkit'

import { ErrorObject } from 'api/ErrorHandler'
import { APIStatus } from 'api/MainApi'

import { pendingCase, rejectedCase } from 'store'
import { generateOtpAsync, restoreAuthAsync, signUpAsync } from 'store/sign-up/actions'

import Tokens from 'utils/local-storage/tokens'

export interface SignUpState {
  isLoggedIn: boolean
  generatedOTP: string | null
  isFullPageLoading: boolean
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: SignUpState = {
  isLoggedIn: false,
  generatedOTP: null,
  isFullPageLoading: false,
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

export const signUpSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {
    clearToken: () => {
      const tokens = Tokens.getInstance()
      tokens.clearTokens()
    },
    clearOTP: (state) => {
      state.generatedOTP = null
    },
    clearSignUpState: () => initialState,
    setSignUpStatus: (state, action: { payload: APIStatus }) => {
      state.status = action.payload
    },
    setIsLoggedIn: (state, action: { payload: boolean }) => {
      state.isLoggedIn = action.payload
    },
    setIsFullPageLoading: (state, action: { payload: boolean }) => {
      state.isFullPageLoading = action.payload
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
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(restoreAuthAsync.pending, pendingCase())
    builder.addCase(restoreAuthAsync.rejected, rejectedCase())
    builder.addCase(restoreAuthAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })
  },
})

export const {
  clearToken,
  clearSignUpState,
  clearOTP,
  setSignUpStatus,
  setIsLoggedIn,
  setIsFullPageLoading,
} = signUpSlice.actions

export default signUpSlice.reducer
