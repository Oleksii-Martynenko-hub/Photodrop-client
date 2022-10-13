import { createAsyncThunk } from '@reduxjs/toolkit'

import { APIStatus, TokensData } from 'api/MainApi'
import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { clearUserState, setUserData } from 'store/user/reducers'
import {
  clearOTP,
  clearSignUpState,
  clearToken,
  setIsLoggedIn,
  setSignUpStatus,
} from 'store/sign-up/reducers'
import Tokens from 'utils/local-storage/tokens'
import { UserData } from 'api/ProtectedApi'

export const editNameAsync = createAsyncThunk<UserData, string, ThunkExtra>(
  'user/editNameAsync',
  async (name, { rejectWithValue, extra: { protectedApi }, dispatch, getState }) => {
    try {
      const {
        user: { id },
      } = getState().userReducer

      if (!id) throw new Error('User id is missing')

      const response = await protectedApi.putEditName({ id, name })

      // await dispatch(setUserData())

      return response
    } catch (error) {
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
