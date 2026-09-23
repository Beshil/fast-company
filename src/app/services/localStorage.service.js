const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const read = (key) => sessionStorage.getItem(key) || localStorage.getItem(key)
export function removeAuthData() {
  for (const storage of [localStorage, sessionStorage]) {
    for (const key of [TOKEN_KEY, REFRESH_KEY, EXPIRES_KEY, USERID_KEY])
      storage.removeItem(key)
  }
}
export function setTokens(
  { refreshToken, idToken, localId, expiresIn = 3600 },
  remember = Boolean(localStorage.getItem(TOKEN_KEY))
) {
  const storage = remember ? localStorage : sessionStorage
  removeAuthData()
  storage.setItem(USERID_KEY, localId)
  storage.setItem(TOKEN_KEY, idToken)
  storage.setItem(REFRESH_KEY, refreshToken)
  storage.setItem(EXPIRES_KEY, Date.now() + Number(expiresIn) * 1000)
}
export const getAccessToken = () => read(TOKEN_KEY)
export const getRefreshToken = () => read(REFRESH_KEY)
export const getTokenExpiresDate = () => Number(read(EXPIRES_KEY))
export const getUserId = () => read(USERID_KEY)
export default {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData
}
