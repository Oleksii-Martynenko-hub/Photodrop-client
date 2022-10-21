import { createAsyncThunk } from '@reduxjs/toolkit'

import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { setAvatar, setUserData, UserNotifications } from 'store/user/reducers'
import { clearOTP } from 'store/sign-up/reducers'
import { Country } from 'react-phone-number-input'
import Tokens from 'utils/local-storage/tokens'

export const getSelfieAsync = createAsyncThunk<void, void, ThunkExtra>(
  'login/getSelfieAsync',
  async (_, { rejectWithValue, extra: { protectedApi }, dispatch, getState }) => {
    try {
      const {
        user: { selfieKey },
      } = getState().userReducer

      if (!selfieKey) {
        dispatch(setAvatar(null))
        return
      }
      const avatar = await protectedApi.postGetSelfie({ selfieKey })

      dispatch(setAvatar(avatar))
    } catch (error) {
      dispatch(setAvatar(null))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editNameAsync = createAsyncThunk<void, string, ThunkExtra>(
  'user/editNameAsync',
  async (name, { rejectWithValue, extra: { protectedApi }, getState, dispatch }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditName({ id, name })

      dispatch(setUserData(response))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editEmailAsync = createAsyncThunk<void, string, ThunkExtra>(
  'user/editEmailAsync',
  async (email, { rejectWithValue, extra: { protectedApi }, getState, dispatch }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditEmail({ id, email })

      dispatch(setUserData(response))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editPhoneAsync = createAsyncThunk<
  void,
  { phone: string; countryCode: Country },
  ThunkExtra
>(
  'user/editPhoneAsync',
  async (
    { phone, countryCode },
    { rejectWithValue, extra: { protectedApi }, getState, dispatch },
  ) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const { user, token } = await protectedApi.putEditPhone({ id, phone, countryCode })

      dispatch(setUserData(user))

      const tokens = Tokens.getInstance()

      tokens.setToken(token)

      dispatch(clearOTP())
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editNotificationAsync = createAsyncThunk<void, UserNotifications, ThunkExtra>(
  'user/editNotificationAsync',
  async (notifications, { rejectWithValue, extra: { protectedApi }, getState, dispatch }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditNotification({ id, ...notifications })

      dispatch(setUserData(response))
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
