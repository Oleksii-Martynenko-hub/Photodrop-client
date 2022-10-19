import { APIStatus } from 'api/MainApi'
import { UserData } from 'api/ProtectedApi'
import { createSelector, Selector } from 'reselect'

import { RootState } from 'store'
import { UserNotifications } from './reducers'

const selectUserReducer = (state: RootState) => state.userReducer

export const selectUser: Selector<RootState, UserData> = createSelector(
  selectUserReducer,
  ({ user }) => user,
)

export const selectUserId: Selector<RootState, number | null> = createSelector(
  selectUserReducer,
  ({ user }) => user.id || null,
)

export const selectUserName: Selector<RootState, string | null> = createSelector(
  selectUserReducer,
  ({ user }) => user.name,
)

export const selectUserEmail: Selector<RootState, string | null> = createSelector(
  selectUserReducer,
  ({ user }) => user.email,
)

export const selectUserAvatar: Selector<RootState, string | null> = createSelector(
  selectUserReducer,
  ({ avatar }) => avatar,
)

export const selectUserNotifications: Selector<RootState, UserNotifications> = createSelector(
  selectUser,
  ({ textMessagesNotification, emailNotification, unsubscribe }) => ({
    textMessagesNotification,
    emailNotification,
    unsubscribe,
  }),
)

export const selectUserStatus: Selector<RootState, APIStatus> = createSelector(
  selectUserReducer,
  ({ status }) => status,
)

export const selectUserIsOnboarding: Selector<RootState, boolean> = createSelector(
  selectUserReducer,
  ({ isOnboarding }) => isOnboarding,
)

export const selectPhoneNumber: Selector<
  RootState,
  {
    value: string
    formattedValue: string
  } | null
> = createSelector(selectUserReducer, ({ phoneNumber }) => phoneNumber)
