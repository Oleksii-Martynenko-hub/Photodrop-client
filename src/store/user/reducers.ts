import { createSlice } from '@reduxjs/toolkit'
import jwt from 'jwt-decode'

import { APIStatus } from 'api/MainApi'
import { ErrorObject } from 'api/ErrorHandler'

import Tokens from 'utils/local-storage/tokens'

export type TokenDecodeData = {
  id: number
  phoneNumber: string
  iat: number
  exp: number
}

export interface UsersState {
  id: number | undefined
  phoneNumber: {
    value: string
    formattedValue: string
  } | null
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: UsersState = {
  id: undefined,
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
        const { id, phoneNumber } = jwt<TokenDecodeData>(token)
        state.id = id
        state.phoneNumber = { value: phoneNumber, formattedValue: '' }
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
})

export const { setUserData, clearUserState, setPhoneNumber } = userSlice.actions

export default userSlice.reducer
