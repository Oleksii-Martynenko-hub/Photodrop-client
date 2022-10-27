/* eslint-disable @typescript-eslint/no-empty-interface */
import HttpClientProtected from 'api/HttpClientProtected'
import { Country } from 'react-phone-number-input'
import { UserNotifications } from 'store/user/reducers'

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

export type UserData = {
  id: string
  selfieKey: string | null
  name: string | null
  phone: string
  countryCode: Country
  email: string | null
  textMessagesNotification: boolean | null
  emailNotification: boolean | null
  unsubscribe: boolean | null
}

export type GetSelfieBody = {
  selfieKey: string
}

export type PresignedSelfieBody = {
  name: string
  userId: string
}

export type UserEditNameBody = {
  id: string
  name: string
}

export type UserEditEmailBody = {
  id: string
  email: string
}

export type UserEditPhoneBody = {
  id: string
  phone: string
  countryCode: Country
}

export type UserEditPhoneResponse = {
  user: UserData
  token: string
}

export type GetThumbnailsParams = {
  userId: string
  albumId: string
}

export type GetOriginalPhotoParams = {
  userId: string
  albumId: string
  originalKey: string
}

export type ThumbnailData = {
  isPaid: boolean
  url: string
  originalKey: string
  albumId: string
}

export interface UserEditNotificationBody extends UserNotifications {
  id: string
}

export type AlbumData = {
  id: number
  name: string
  location: string
  date: string
  photographerId: number
  icon: string | null
}

export interface CreateAlbumData extends Omit<AlbumData, 'id' | 'icon'> {}

export type PhotosArray = [
  { photographerId: number },
  { albumId: number },
  { photoName: string },
  { 'Content-Type': string },
]
export interface PresignedPhotosPostBody {
  photosArray: PhotosArray[]
  people: string[]
}

export interface PresignedPhotosPostResponse {
  url: string
  fields: {
    key: string
    'Content-Type': string
    'x-amz-meta-userId': string
    originalSelfieKey: string
    bucket: string
    'X-Amz-Algorithm': string
    'X-Amz-Credential': string
    'X-Amz-Date': string
    Policy: string
    'X-Amz-Signature': string
  }
}

export interface GetPhotosResponse {
  count: number
  rows: PhotosData[]
}

export interface GetPhotosBody {
  photographerId: number
  albumId: number
  page?: number
  limit?: number
}

export interface People {
  id: number
  name: string | null
  phone: string
  email: string | null
  textMessagesNotification: boolean
  emailNotification: boolean
  unsubscribe: boolean
}

export interface PhotosData extends Omit<AlbumData, 'date' | 'location'> {
  photoUrl: string
  albumId: number
}

class ProtectedApi extends HttpClientProtected {
  private static classInstance?: ProtectedApi

  public constructor() {
    super(API_URL)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ProtectedApi()
    }

    return this.classInstance
  }

  public getMe = (params: { userId: string }) => {
    return this.instance.get<{ userObject: UserData }>('/get-me', { params })
  }

  public postGetPresignedPostSelfie = (body: PresignedSelfieBody) => {
    return this.instance.post<PresignedPhotosPostResponse>('/presigned-post', body)
  }

  public postGetSelfie = (body: GetSelfieBody) => {
    return this.instance.post<string>('/get-signed-selfie', body)
  }

  public putEditName = (userBody: UserEditNameBody) =>
    this.instance.put<{ user: UserData }>('/edit-name', userBody)

  public putEditEmail = (userBody: UserEditEmailBody) =>
    this.instance.put<{ user: UserData }>('/edit-email', userBody)

  public putEditPhone = (userBody: UserEditPhoneBody) =>
    this.instance.put<UserEditPhoneResponse>('/edit-phone', userBody)

  public putEditNotification = (userBody: UserEditNotificationBody) =>
    this.instance.put<{ user: UserData }>('/edit-notification-settings', userBody)

  public getAlbums = (phone: number) => {
    return this.instance.get<string[]>('/get-albums-with-person', { params: { phone } })
  }

  public getThumbnails = (params: GetThumbnailsParams) => {
    return this.instance.get<ThumbnailData[]>('/get-thumbnails-with-person', { params })
  }

  public getOriginalPhoto = (params: GetOriginalPhotoParams) => {
    return this.instance.get<string>('/get-original-photo', { params })
  }
}

export default ProtectedApi
