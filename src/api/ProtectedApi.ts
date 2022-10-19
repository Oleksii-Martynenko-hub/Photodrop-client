/* eslint-disable @typescript-eslint/no-empty-interface */
import HttpClientProtected from 'api/HttpClientProtected'

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

export type UserData = {
  id: number
  selfieKey: string | null
  name: string | null
  phone: string
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
  userId: number
}
export type UserEditNameBody = {
  id: number
  name: string
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

  public getMe = (params: { userId: number }) => {
    return this.instance.get<{ userObject: UserData }>('/get-me', { params })
  }

  public postGetPresignedPostSelfie = (body: PresignedSelfieBody) => {
    return this.instance.post<PresignedPhotosPostResponse>('/presigned-post', body)
  }

  public postGetSelfie = (body: GetSelfieBody) => {
    return this.instance.post<string>('/get-signed-selfie', body)
  }

  public putEditName = (userBody: UserEditNameBody) =>
    this.instance.put<UserData>('/edit-name', userBody)

  public getAlbums = (photographerId: number) => {
    return this.instance.get<AlbumData[]>('/get-albums-from-db', { params: { photographerId } })
  }

  public getAlbumIcons = (albumIds: number[]) => {
    return this.instance.post<{ [k: string]: string | null }>('/get-albums-thumbnail-icons', {
      albumIds,
    })
  }

  public getPhotos = (params: GetPhotosBody) => {
    return this.instance.get<GetPhotosResponse>('/get-photos-from-db', { params })
  }

  public postPresignedPostPhotos = (photosToUpload: PresignedPhotosPostBody) =>
    this.instance.post<PresignedPhotosPostResponse[]>('/s3-upload', photosToUpload)

  public postPresignedGetPhotos = (photoKeys: { photoKey: string }[]) =>
    this.instance.post<string[]>('/get-signed-photos', photoKeys)

  public getAllPeople = () => this.instance.get<{ people: People[] }>('/get-all-people')
}

export default ProtectedApi
