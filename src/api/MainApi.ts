/* eslint-disable no-prototype-builtins */
import HttpClient from 'api/HttpClient'

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api'

export enum APIStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  FULFILLED = 'FULFILLED',
  REJECTED = 'REJECTED',
}

export interface TokensData {
  token: string
}

export interface LoginData {
  login: string
  password: string
}

class MainApi extends HttpClient {
  private static classInstance?: MainApi

  public constructor() {
    super(API_URL)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new MainApi()
    }

    return this.classInstance
  }

  public postGeneratedOTP = (phone: string) =>
    this.instance.post<{ OTP: string }>('/send-otp', { phone })

  public postSignUp = (phone: string) =>
    this.instance.post<TokensData>('/create-app-user', { phone })
}

export default MainApi
