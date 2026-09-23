import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

let refreshRequest = null

http.interceptors.request.use(
  async function (config) {
    if (!configFile.apiEndpoint) throw new Error('Не настроен адрес Firebase')
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
      const expiresDate = localStorageService.getTokenExpiresDate()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresDate < Date.now()) {
        if (!refreshRequest) {
          refreshRequest = authService
            .refresh()
            .then((data) => {
              if (localStorageService.getRefreshToken() !== refreshToken)
                throw new Error('Сессия изменена')
              localStorageService.setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                expiresIn: data.expires_in,
                localId: data.user_id
              })
            })
            .catch((error) => {
              if ([400, 401, 403].includes(error.response?.status)) {
                localStorageService.removeAuthData()
                window.dispatchEvent(new Event('auth:expired'))
              }
              throw error
            })
            .finally(() => {
              refreshRequest = null
            })
        }
        await refreshRequest
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) config.params = { ...config.params, auth: accessToken }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({
        ...data[key]
      }))
    : data
}
http.interceptors.response.use(
  (res) => {
    if (configFile.isFireBase) {
      const isCollection =
        res.config.method === 'get' && /^[^/]+\.json$/.test(res.config.url)
      res.data = { content: isCollection ? transformData(res.data) : res.data }
    }

    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) toast.error('Something was wrong. Try it later')

    return Promise.reject(error)
  }
)
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}
export default httpService
