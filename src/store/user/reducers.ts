import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Country, getCountryCallingCode } from 'react-phone-number-input'
import { patterFormatter } from 'react-number-format'
import masks from 'pages/../../country-phone-masks.json'

import { APIStatus } from 'api/MainApi'
import { ErrorObject } from 'api/ErrorHandler'

import { UserData } from 'api/ProtectedApi'
import { editEmailAsync, editNameAsync, editNotificationAsync, editPhoneAsync } from './actions'
import { pendingCase, rejectedCase } from 'store'

export type UserNotifications = {
  textMessagesNotification: boolean | null
  emailNotification: boolean | null
  unsubscribe: boolean | null
}

export type PhoneNumber = {
  value: string
  formattedValue: string
  newCountryCode: Country
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
    countryCode: 'US',
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
      state.isOnboarding = !payload.name || !payload.email

      const callingCode = getCountryCallingCode(payload.countryCode)
      const phoneWithoutCallingCode = payload.phone.replace(callingCode, '')

      const formattedValue = patterFormatter(phoneWithoutCallingCode, {
        format: `${masks[payload.countryCode]}`,
      })

      state.phoneNumber = {
        formattedValue,
        value: payload.phone,
        newCountryCode: payload.countryCode,
      }
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
    builder.addCase(editNameAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(editEmailAsync.pending, pendingCase())
    builder.addCase(editEmailAsync.rejected, rejectedCase())
    builder.addCase(editEmailAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(editPhoneAsync.pending, pendingCase())
    builder.addCase(editPhoneAsync.rejected, rejectedCase())
    builder.addCase(editPhoneAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(editNotificationAsync.pending, pendingCase())
    builder.addCase(editNotificationAsync.rejected, rejectedCase())
    builder.addCase(editNotificationAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })
  },
})

export const { setUserData, clearUserState, setPhoneNumber, setAvatar } = userSlice.actions

export default userSlice.reducer
