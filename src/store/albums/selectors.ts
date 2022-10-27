import { APIStatus } from 'api/MainApi'
import { createSelector, Selector } from 'reselect'

import { RootState } from 'store'
import { Album } from './reducers'

const selectAlbumsReducer = (state: RootState) => state.albumsReducer

export const selectAlbums: Selector<RootState, Album[]> = createSelector(
  selectAlbumsReducer,
  ({ albums }) => albums,
)

export const selectAlbumById: (albumId: string) => Selector<RootState, Album | undefined> = (
  albumId,
) => {
  return createSelector(selectAlbumsReducer, ({ albums }) =>
    albums.find((album) => album.id === albumId),
  )
}

export const selectAlbumsStatus: Selector<RootState, APIStatus> = createSelector(
  selectAlbumsReducer,
  ({ status }) => status,
)
