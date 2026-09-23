import storage from './localStorage.service'
const tokens = {
  idToken: 'access',
  refreshToken: 'refresh',
  localId: 'user',
  expiresIn: 120
}
beforeEach(() => storage.removeAuthData())
test('session login stays in session storage and refresh preserves that choice', () => {
  storage.setTokens(tokens, false)
  expect(localStorage.getItem('jwt-token')).toBeNull()
  expect(storage.getAccessToken()).toBe('access')
  storage.setTokens({ ...tokens, idToken: 'new' })
  expect(sessionStorage.getItem('jwt-token')).toBe('new')
  expect(localStorage.getItem('jwt-token')).toBeNull()
})
test('remembered login and expiry survive refresh', () => {
  const now = jest.spyOn(Date, 'now').mockReturnValue(1000)
  storage.setTokens(tokens, true)
  storage.setTokens({ ...tokens, expiresIn: 30 })
  expect(localStorage.getItem('jwt-token')).toBe('access')
  expect(storage.getTokenExpiresDate()).toBe(31000)
  storage.removeAuthData()
  expect(storage.getAccessToken()).toBeNull()
  now.mockRestore()
})
