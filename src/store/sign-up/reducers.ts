import { createSlice } from '@reduxjs/toolkit'

import { ErrorObject } from 'api/ErrorHandler'
import { APIStatus } from 'api/MainApi'

import Tokens from 'utils/local-storage/tokens'

import { pendingCase, rejectedCase } from 'store'
import { generateOtpAsync, restoreAuthAsync, signUpAsync } from 'store/sign-up/actions'
import { errorToast } from 'store/user/reducers'


export interface SignUpState {
  isLoggedIn: boolean
  isFullPageLoading: boolean
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: SignUpState = {
  isLoggedIn: false,
  isFullPageLoading: false,
  status: APIStatus.IDLE,
  errors: [],
}

export const signUpSlice = createSlice({
  name: 'sign-up',
  initialState,
  reducers: {
    clearToken: () => {
      const tokens = Tokens.getInstance()
      tokens.clearTokens()
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
    builder.addCase(
      generateOtpAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(generateOtpAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(signUpAsync.pending, pendingCase())
    builder.addCase(
      signUpAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(signUpAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(restoreAuthAsync.pending, pendingCase())
    builder.addCase(
      restoreAuthAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(restoreAuthAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })
  },
})

export const { clearToken, clearSignUpState, setSignUpStatus, setIsLoggedIn, setIsFullPageLoading } =
  signUpSlice.actions

export default signUpSlice.reducer
