import { APIStatus } from 'api/MainApi'
import { AlbumData } from 'api/ProtectedApi'
import { createSelector, Selector } from 'reselect'

import { RootState } from 'store'
// import { Album } from './reducers'

const selectAlbumsReducer = (state: RootState) => state.albumsReducer

export const selectAlbums: Selector<RootState, AlbumData[]> = createSelector(
  selectAlbumsReducer,
  ({ albums }) => albums,
)

export const selectAlbumById: (albumId: string) => Selector<RootState, AlbumData | undefined> = (
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
