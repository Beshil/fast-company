import axios from 'axios'
import './http.service'
import authService from './auth.service'
import storage from './localStorage.service'
jest.mock('../config', () => ({
  apiEndpoint: 'https://example.invalid/',
  isFireBase: true
}))
jest.mock('./auth.service', () => ({ refresh: jest.fn() }))
jest.mock('react-toastify', () => ({ toast: { error: jest.fn() } }))
jest.mock('axios', () => {
  const client = { interceptors: {} }
  for (const kind of ['request', 'response']) {
    client.interceptors[kind] = {
      use: (handler, onError) => {
        client.interceptors[kind].handler = handler
        client.interceptors[kind].onError = onError
      }
    }
  }
  return { create: () => client, client }
})
beforeEach(() => storage.removeAuthData())
test('concurrent requests share a refresh and use the refreshed token expiry', async () => {
  storage.setTokens({
    idToken: 'old',
    refreshToken: 'r',
    localId: 'me',
    expiresIn: -10
  })
  let resolveRefresh
  authService.refresh.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveRefresh = resolve
      })
  )
  const request = axios.client.interceptors.request.handler
  const a = request({ url: 'user/' })
  const b = request({ url: 'quality/' })
  expect(authService.refresh).toHaveBeenCalledTimes(1)
  resolveRefresh({
    id_token: 'new',
    refresh_token: 'next',
    expires_in: 120,
    user_id: 'me'
  })
  const responses = await Promise.all([a, b])
  expect(responses[0]).toMatchObject({
    url: 'user.json',
    params: { auth: 'new' }
  })
  expect(responses[1].params.auth).toBe('new')
  expect(storage.getTokenExpiresDate() - Date.now()).toBeGreaterThan(110000)
})
test('invalid refresh clears authentication and emits session expiration', async () => {
  storage.setTokens({
    idToken: 'old',
    refreshToken: 'r',
    localId: 'me',
    expiresIn: -10
  })
  authService.refresh.mockRejectedValue({ response: { status: 400 } })
  const expired = jest.fn()
  window.addEventListener('auth:expired', expired)
  await expect(
    axios.client.interceptors.request.handler({ url: 'user/' })
  ).rejects.toEqual({ response: { status: 400 } })
  expect(storage.getAccessToken()).toBeNull()
  expect(expired).toHaveBeenCalledTimes(1)
  window.removeEventListener('auth:expired', expired)
})
test('collection reads normalize records but partial profile updates stay objects', () => {
  const response = axios.client.interceptors.response.handler
  expect(
    response({
      data: { a: { _id: 'a' } },
      config: { method: 'get', url: 'user.json' }
    }).data.content
  ).toEqual([{ _id: 'a' }])
  expect(
    response({
      data: { bookmarks: ['a'] },
      config: { method: 'patch', url: 'user/me.json' }
    }).data.content
  ).toEqual({ bookmarks: ['a'] })
})

test('a pending refresh does not recreate a session after logout', async () => {
  storage.setTokens({
    idToken: 'old',
    refreshToken: 'r',
    localId: 'me',
    expiresIn: -10
  })
  let resolveRefresh
  authService.refresh.mockImplementation(
    () =>
      new Promise((resolve) => {
        resolveRefresh = resolve
      })
  )
  const pending = axios.client.interceptors.request.handler({ url: 'user/' })
  storage.removeAuthData()
  resolveRefresh({
    id_token: 'new',
    refresh_token: 'next',
    expires_in: 120,
    user_id: 'me'
  })
  await expect(pending).rejects.toThrow('Сессия изменена')
  expect(storage.getAccessToken()).toBeNull()
})
