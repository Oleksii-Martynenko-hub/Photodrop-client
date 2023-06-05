import { createAsyncThunk } from '@reduxjs/toolkit'

import { getExceptionPayload } from 'api/ErrorHandler'

import { ThunkExtra } from 'store'
import { logoutIfTokenInvalid } from 'store/user/actions'
import { setAlbumOriginalPhoto, setAlbumsData } from 'store/albums/reducers'

export const getAlbumsAsync = createAsyncThunk<void, string, ThunkExtra>(
  'albums/getAlbumsAsync',
  async (phone, { rejectWithValue, extra: { protectedApi }, getState, dispatch }) => {
    try {
      // const {
      //   user: { id: userId },
      // } = getState().userReducer

      const { albumsInfo } = await protectedApi.getAlbums(phone)

      // const albumsPromises = albumsInfo.map(async ({ id, date, location }) => {
      //   const { [id]: mainThumbnail } = await protectedApi.getThumbnailsForAlbums({
      //     albumIds: [id],
      //     userId,
      //   })

      //   return {
      //     id,
      //     date,
      //     location,
      //     mainThumbnail,
      //   }
      // })

      // const albums = await Promise.all(albumsPromises)

      // if (albumsI.length) {
      // const id = albums[0].id

      // const { thumbnails: thumb } = await protectedApi.getThumbnailsForPhotos({
      //   albumId: id,
      //   userId,
      // })

      const formattedAlbums = albumsInfo.map(({ thumbnails, ...album }) => {
        // const thumbnails = thumb.filter((t) => t.albumId === album.id)
        const formattedThumbnails = thumbnails.map((t) => ({
          ...t,
          isPaid: t.url.includes('watermark'),
          albumId: album.id,
          originalPhoto: undefined,
        }))

        return { ...album, thumbnails: formattedThumbnails }
      })

      dispatch(setAlbumsData(formattedAlbums))
      // }
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const getOriginalPhotosAsync = createAsyncThunk<
  string,
  { albumId: string; originalKey: string },
  ThunkExtra
>(
  'albums/getOriginalPhotosAsync',
  async (
    { albumId, originalKey },
    { rejectWithValue, extra: { protectedApi }, getState, dispatch },
  ) => {
    try {
      const {
        user: { id: userId },
      } = getState().userReducer

      const url = await protectedApi.getOriginalPhoto({ albumId, originalKey, userId })

      dispatch(setAlbumOriginalPhoto({ originalKey, albumId, originalPhoto: url }))

      return url
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)

export const getGeneratePaymentAsync = createAsyncThunk<string, { albumId: string }, ThunkExtra>(
  'albums/getGeneratePaymentAsync',
  async ({ albumId }, { rejectWithValue, extra: { protectedApi }, getState, dispatch }) => {
    try {
      const {
        user: { id: userId },
      } = getState().userReducer

      const url = await protectedApi.getGeneratePayment({ albumId, userId })

      return url
    } catch (error) {
      dispatch(logoutIfTokenInvalid(error))
      return rejectWithValue(getExceptionPayload(error))
    }
  },
)
