import { createSelector, Selector } from 'reselect'

import { APIStatus } from 'api/MainApi'

import { RootState } from 'store'
import { ErrorObject } from 'api/ErrorHandler'

const selectSignUpReducer = (state: RootState) => state.signUpReducer

export const selectIsLoggedIn: Selector<RootState, boolean> = createSelector(
  selectSignUpReducer,
  ({ isLoggedIn }) => isLoggedIn,
)

export const selectIsFullPageLoading: Selector<RootState, boolean> = createSelector(
  selectSignUpReducer,
  ({ isFullPageLoading }) => isFullPageLoading,
)

export const selectGeneratedOTP: Selector<RootState, string | null> = createSelector(
  selectSignUpReducer,
  ({ generatedOTP }) => generatedOTP,
)

export const selectStatus: Selector<RootState, APIStatus> = createSelector(
  selectSignUpReducer,
  ({ status }) => status,
)

export const selectErrors: Selector<RootState, ErrorObject[]> = createSelector(
  selectSignUpReducer,
  ({ errors }) => errors,
)
