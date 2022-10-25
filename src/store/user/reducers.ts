import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Country, getCountryCallingCode } from 'react-phone-number-input'
import { patterFormatter } from 'react-number-format'
import { toast } from 'react-toastify'
import masks from 'pages/../../country-phone-masks.json'

import { ErrorObject } from 'api/ErrorHandler'
import { APIStatus } from 'api/MainApi'
import { UserData } from 'api/ProtectedApi'

import { pendingCase, rejectedCase } from 'store'
import {
  editEmailAsync,
  editNameAsync,
  editNotificationAsync,
  editPhoneAsync,
} from 'store/user/actions'

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
    id: '',
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

export const errorToast = (payload: ErrorObject[] | undefined) => {
  if (payload) {
    payload.forEach(({ msg }) => {
      toast.error(msg === 'Not authorized' ? 'Your login has expired, please login again' : msg)
    })
  }
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
    builder.addCase(
      editNameAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(editNameAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(editEmailAsync.pending, pendingCase())
    builder.addCase(
      editEmailAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(editEmailAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(editPhoneAsync.pending, pendingCase())
    builder.addCase(
      editPhoneAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(editPhoneAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(editNotificationAsync.pending, pendingCase())
    builder.addCase(
      editNotificationAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(editNotificationAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })
  },
})

export const { setUserData, clearUserState, setPhoneNumber, setAvatar } = userSlice.actions

export default userSlice.reducer
