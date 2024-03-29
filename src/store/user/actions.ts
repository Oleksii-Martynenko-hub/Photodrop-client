import { createAsyncThunk } from '@reduxjs/toolkit'
import { Country } from 'react-phone-number-input'

import { ErrorObject, getExceptionPayload } from 'api/ErrorHandler'

import Tokens from 'utils/local-storage/tokens'

import { ThunkExtra } from 'store'
import { setAvatar, setUserData, UserNotifications } from 'store/user/reducers'
import { logoutAsync } from 'store/sign-up/actions'

export const logoutIfTokenInvalid = createAsyncThunk<void, unknown, ThunkExtra>(
  'login/logoutIfTokenInvalid',
  async (errorData, { rejectWithValue, dispatch }) => {
    try {
      const ex = errorData as { response: { data: { errors: ErrorObject[] } } }

      if (ex && ex.response && ex.response.data && ex.response.data.errors) {
        if (ex.response.data.errors.length) {
          const { msg } = ex.response.data.errors[0]

          if (msg === 'Not authorized') dispatch(logoutAsync())
        }
      }
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const getSelfieAsync = createAsyncThunk<void, void, ThunkExtra>(
  'user/getSelfieAsync',
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
      dispatch(logoutIfTokenInvalid(error))
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

      const { user } = await protectedApi.putEditName({ id, name })

      dispatch(setUserData(user))
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
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

      const { user } = await protectedApi.putEditEmail({ id, email })

      dispatch(setUserData(user))
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
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
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
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

      const { user } = await protectedApi.putEditNotification({ id, ...notifications })

      dispatch(setUserData(user))
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
