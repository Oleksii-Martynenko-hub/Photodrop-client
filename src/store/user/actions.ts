import { createAsyncThunk } from '@reduxjs/toolkit'

import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { setAvatar, UserNotifications } from 'store/user/reducers'

import { UserData } from 'api/ProtectedApi'

export const getSelfieAsync = createAsyncThunk<void, void, ThunkExtra>(
  'login/getSelfieAsync',
  async (_, { rejectWithValue, extra: { protectedApi }, dispatch, getState }) => {
    try {
      const {
        user: { selfieKey },
      } = getState().userReducer

      if (selfieKey) {
        const avatar = await protectedApi.postGetSelfie({ selfieKey })

        dispatch(setAvatar(avatar))
      }
    } catch (error) {
      dispatch(setAvatar(null))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editNameAsync = createAsyncThunk<UserData, string, ThunkExtra>(
  'user/editNameAsync',
  async (name, { rejectWithValue, extra: { protectedApi }, getState }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditName({ id, name })

      return response
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editEmailAsync = createAsyncThunk<UserData, string, ThunkExtra>(
  'user/editEmailAsync',
  async (email, { rejectWithValue, extra: { protectedApi }, getState }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditEmail({ id, email })

      return response
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const editNotificationAsync = createAsyncThunk<UserData, UserNotifications, ThunkExtra>(
  'user/editNotificationAsync',
  async (notifications, { rejectWithValue, extra: { protectedApi }, getState }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditNotification({ id, ...notifications })

      return response
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
