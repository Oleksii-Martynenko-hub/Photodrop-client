import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ErrorObject } from 'api/ErrorHandler'
import { APIStatus } from 'api/MainApi'
import { ThumbnailData } from 'api/ProtectedApi'

import { pendingCase, rejectedCase } from 'store'
import { errorToast } from 'store/user/reducers'
import { getAlbumsAsync, getOriginalPhotosAsync } from 'store/albums/actions'

export type Album = {
  id: string
  location: string
  date: string
  mainThumbnail: string
  thumbnails: ThumbnailData[]
}

export interface AlbumsState {
  albums: Album[]
  status: APIStatus
  errors: ErrorObject[]
}

const initialState: AlbumsState = {
  albums: [],
  status: APIStatus.IDLE,
  errors: [],
}

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbumsData: (state, { payload }: PayloadAction<Album[]>) => {
      state.albums = payload
    },

    setAlbumOriginalPhoto: (
      state,
      { payload }: PayloadAction<{ originalPhoto: string; originalKey: string; albumId: string }>,
    ) => {
      const album = state.albums.find(({ id }) => id === payload.albumId)

      if (album && album.thumbnails.length) {
        album.thumbnails = album.thumbnails.map((t) =>
          t.originalKey === payload.originalKey
            ? { ...t, originalPhoto: payload.originalPhoto }
            : t,
        )
      }
    },

    clearAlbumsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAlbumsAsync.pending, pendingCase())
    builder.addCase(
      getAlbumsAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(getAlbumsAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })

    builder.addCase(getOriginalPhotosAsync.pending, pendingCase())
    builder.addCase(
      getOriginalPhotosAsync.rejected,
      rejectedCase((_, { payload }) => errorToast(payload)),
    )
    builder.addCase(getOriginalPhotosAsync.fulfilled, (state) => {
      state.status = APIStatus.FULFILLED
    })
  },
})

export const { setAlbumsData, clearAlbumsState, setAlbumOriginalPhoto } = albumsSlice.actions

export default albumsSlice.reducer
