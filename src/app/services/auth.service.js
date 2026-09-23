import axios from 'axios'
import localStorageService from './localStorage.service'

const httpAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
})

const authService = {
  register: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signUp`, {
      email,
      password,
      returnSecureToken: true
    })
    return data
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
      email,
      password,
      returnSecureToken: true
    })
    return data
  },
  refresh: async () => {
    const { data } = await httpAuth.post(
      'https://securetoken.googleapis.com/v1/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: localStorageService.getRefreshToken()
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    return data
  }
}

export default authService
