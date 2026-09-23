import axios from 'axios'
import authService from './auth.service'
import localStorageService from './localStorage.service'
jest.mock('axios', () => {
  const post = jest.fn()
  return { create: () => ({ post }), post }
})
jest.mock('./localStorage.service', () => ({
  getRefreshToken: () => 'refresh-token'
}))
test('refresh uses the secure token endpoint and form encoding', async () => {
  const client = axios
  client.post.mockResolvedValue({ data: { id_token: 'new-token' } })
  await expect(authService.refresh()).resolves.toEqual({
    id_token: 'new-token'
  })
  const [url, body, options] = client.post.mock.calls[0]
  expect(url).toBe('https://securetoken.googleapis.com/v1/token')
  expect(body.get('grant_type')).toBe('refresh_token')
  expect(body.get('refresh_token')).toBe(localStorageService.getRefreshToken())
  expect(options.headers['Content-Type']).toBe(
    'application/x-www-form-urlencoded'
  )
})
