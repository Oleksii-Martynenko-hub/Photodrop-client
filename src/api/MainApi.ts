/* eslint-disable no-prototype-builtins */
import HttpClient from 'api/HttpClient'
import { Country } from 'react-phone-number-input'

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

export type SignUpBody = {
  phone: string
  countryCode: Country
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

  public postGeneratedOTP = (phone: string) => this.instance.post('/send-otp', { phone })

  public postCheckOTP = (phone: string, otp: string) =>
    this.instance.get('/check-otp', { params: { phone, otp } })

  public postSignUp = (body: SignUpBody) => this.instance.post<TokensData>('/create-app-user', body)
}

export default MainApi
