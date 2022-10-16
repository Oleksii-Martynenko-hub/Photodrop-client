import { createSlice } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'

import { APIStatus } from 'api/MainApi'
import { ErrorObject } from 'api/ErrorHandler'

import Tokens from 'utils/local-storage/tokens'
import { UserData } from 'api/ProtectedApi'
import { editNameAsync } from './actions'
import { pendingCase, rejectedCase } from 'store'

export interface UsersState {
  user: UserData
  avatar: string | null
  isOnboarding: boolean
  phoneNumber: {
    value: string
    formattedValue: string
  } | null
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: UsersState = {
  user: {
    id: 0,
    name: null,
    activeSelfieKey: null,
    phone: '',
    email: null,
    emailNotification: null,
    textMessagesNotification: null,
    unsubscribe: null,
  },
  avatar: null,
  isOnboarding: false,
  phoneNumber: null,
  status: APIStatus.IDLE,
  errors: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state) => {
      state.status = APIStatus.PENDING
      const tokens = Tokens.getInstance()
      const token = tokens.getToken()
      if (token) {
        const {
          id,
          phone,
          activeSelfieKey,
          name,
          email,
          textMessagesNotification,
          emailNotification,
          unsubscribe,
        } = jwt<UserData>(token)
        state.user = {
          id,
          phone,
          activeSelfieKey,
          name,
          email,
          textMessagesNotification,
          emailNotification,
          unsubscribe,
        }
        if (!activeSelfieKey) state.isOnboarding = true
        state.status = APIStatus.FULFILLED
        return
      }
      state.status = APIStatus.REJECTED
    },
    setPhoneNumber: (
      state,
      action: {
        payload: {
          value: string
          formattedValue: string
        }
      },
    ) => {
      state.phoneNumber = action.payload
    },
    clearUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(editNameAsync.pending, pendingCase())
    builder.addCase(editNameAsync.rejected, rejectedCase())
    builder.addCase(editNameAsync.fulfilled, (state, { payload }) => {
      state.user.name = payload.name
      state.status = APIStatus.FULFILLED
    })
  },
})

export const { setUserData, clearUserState, setPhoneNumber } = userSlice.actions

export default userSlice.reducer
