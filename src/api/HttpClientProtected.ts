/* eslint-disable @typescript-eslint/no-empty-interface */
import HttpClient from 'api/HttpClient'
import axios, { AxiosRequestConfig } from 'axios'
import Tokens from 'utils/local-storage/tokens'

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HttpClientProtected extends HttpClient {
  protected constructor(baseURL: string) {
    super(baseURL)

    this.initializeRequestInterceptor()
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest)
    this.instance.interceptors.response.use((data) => data, this.handleResponseError)
  }

  private handleRequest = (config: AxiosRequestConfig) => {
    const tokens = Tokens.getInstance()

    const token = tokens.getToken()

    const modifiedConfig = config

    if (!modifiedConfig.headers) {
      modifiedConfig.headers = { Authorization: `Bearer ${token}` }
    }
    modifiedConfig.headers.Authorization = `Bearer ${token}`

    return config
  }

  private handleResponseError = async (e: any): Promise<any> => {
    return Promise.reject(e)
  }
}

export default HttpClientProtected
