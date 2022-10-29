import { createAsyncThunk } from '@reduxjs/toolkit'

import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { logoutIfTokenInvalid } from 'store/user/actions'
import { setAlbumsData } from 'store/albums/reducers'

export const getAlbumsAsync = createAsyncThunk<void, string, ThunkExtra>(
  'albums/getAlbumsAsync',
  async (phone, { rejectWithValue, extra: { protectedApi }, getState, dispatch }) => {
    try {
      const {
        user: { id: userId },
      } = getState().userReducer

      const { albumsInfo } = await protectedApi.getAlbums(phone)

      const albumsPromises = albumsInfo.map(async ({ id, date, location }) => {
        const { [id]: mainThumbnail } = await protectedApi.getThumbnailsForAlbums([id])

        return {
          id,
          date,
          location,
          mainThumbnail,
        }
      })

      const albums = await Promise.all(albumsPromises)

      if (albums.length) {
        const id = albums[0].id

        const { thumbnails: thumb } = await protectedApi.getThumbnailsForPhotos({
          albumId: id,
          userId,
        })

        const albumWithThumbnail = albums.map((album) => {
          const thumbnails = thumb.filter((t) => t.albumId === album.id)

          return { ...album, thumbnails }
        })

        dispatch(setAlbumsData(albumWithThumbnail))
      }
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const getOriginalPhotos = createAsyncThunk<
  string,
  { albumId: string; originalKey: string },
  ThunkExtra
>(
  'albums/getOriginalPhotos',
  async (
    { albumId, originalKey },
    { rejectWithValue, extra: { protectedApi }, getState, dispatch },
  ) => {
    try {
      const {
        user: { id: userId },
      } = getState().userReducer

      const url = await protectedApi.getOriginalPhoto({ albumId, originalKey, userId })

      return url
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
