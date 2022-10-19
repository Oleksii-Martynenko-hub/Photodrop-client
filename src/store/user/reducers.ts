import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { APIStatus } from 'api/MainApi'
import { ErrorObject } from 'api/ErrorHandler'

import { UserData } from 'api/ProtectedApi'
import { editNameAsync } from './actions'
import { pendingCase, rejectedCase } from 'store'

type PhoneNumber = {
  value: string
  formattedValue: string
}
export interface UsersState {
  user: UserData
  avatar: string | null
  isOnboarding: boolean
  phoneNumber: PhoneNumber | null
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: UsersState = {
  user: {
    id: 0,
    name: null,
    selfieKey: null,
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
    setUserData: (state, { payload }: PayloadAction<UserData>) => {
      state.user = payload
    },
    setPhoneNumber: (state, { payload }: PayloadAction<PhoneNumber>) => {
      state.phoneNumber = payload
    },
    setAvatar: (state, { payload }: PayloadAction<string | null>) => {
      state.avatar = payload
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

export const { setUserData, clearUserState, setPhoneNumber, setAvatar } = userSlice.actions

export default userSlice.reducer
