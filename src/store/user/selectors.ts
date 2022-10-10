import { createSelector, Selector } from 'reselect'

import { RootState } from 'store'

const selectUserReducer = (state: RootState) => state.userReducer

export const selectUserId: Selector<RootState, number | undefined> = createSelector(
  selectUserReducer,
  ({ id }) => id,
)

export const selectPhoneNumber: Selector<
  RootState,
  {
    value: string
    formattedValue: string
  } | null
> = createSelector(selectUserReducer, ({ phoneNumber }) => phoneNumber)
