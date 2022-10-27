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

        const { thumbnails } = await protectedApi.getThumbnailsForPhotos({
          albumId: id,
          userId,
        })
        return {
          id,
          date,
          location,
          mainThumbnail,
          thumbnails,
        }
      })

      const albums = await Promise.all(albumsPromises)

      dispatch(setAlbumsData(albums))
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
