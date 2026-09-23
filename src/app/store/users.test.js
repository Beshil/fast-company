import { configureStore } from '@reduxjs/toolkit'
import reducer, { login, signUp, loadUsersList, toggleBookmark } from './users'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import storage from '../services/localStorage.service'
jest.mock('../services/user.service', () => ({
  get: jest.fn(),
  update: jest.fn(),
  create: jest.fn()
}))
jest.mock('../services/auth.service', () => ({
  login: jest.fn(),
  register: jest.fn()
}))
jest.mock('../utils/history', () => ({ push: jest.fn() }))
jest.mock('react-toastify', () => ({ toast: { error: jest.fn() } }))
const makeStore = () => configureStore({ reducer: { users: reducer } })
beforeEach(() => {
  jest.clearAllMocks()
  storage.removeAuthData()
})
test('offline login returns a visible error instead of throwing', async () => {
  const store = makeStore()
  authService.login.mockRejectedValue(new Error('Network Error'))
  await expect(store.dispatch(login({ payload: {} }))).resolves.toBe(false)
  expect(store.getState().users.authError).toMatch('Не удалось')
  expect(store.getState().users.isAuthenticating).toBe(false)
})
test('registration only authenticates after the profile is saved', async () => {
  const store = makeStore()
  authService.register.mockResolvedValue({
    localId: 'me',
    idToken: 'a',
    refreshToken: 'r'
  })
  userService.create.mockRejectedValue(new Error('write failed'))
  await expect(
    store.dispatch(signUp({ email: 'a@b.c', password: 'Secret123' }))
  ).resolves.toBe(false)
  expect(store.getState().users.isLoggedIn).toBe(false)
  expect(storage.getAccessToken()).toBeNull()
  expect(store.getState().users.authError).toMatch('профиль не сохранён')
})
test('failed user load can be retried', async () => {
  const store = makeStore()
  userService.get
    .mockRejectedValueOnce(new Error('offline'))
    .mockResolvedValueOnce({ content: null })
  await store.dispatch(loadUsersList())
  expect(store.getState().users.error).toBe('offline')
  await store.dispatch(loadUsersList())
  expect(store.getState().users).toMatchObject({
    entities: [],
    dataLoaded: true,
    error: null
  })
})
test('bookmarks belong to the current user and survive reload', async () => {
  const store = makeStore()
  store.dispatch({
    type: 'users/authRequestSuccess',
    payload: { userId: 'me' }
  })
  store.dispatch({
    type: 'users/usersReceived',
    payload: [{ _id: 'me' }, { _id: 'other' }]
  })
  userService.update.mockResolvedValue({ content: { bookmarks: ['other'] } })
  await store.dispatch(toggleBookmark('other'))
  expect(userService.update).toHaveBeenCalledWith({ bookmarks: ['other'] })
  expect(store.getState().users.entities[0].bookmarks).toEqual(['other'])
  expect(store.getState().users.entities[1].bookmark).toBeUndefined()
  userService.get.mockResolvedValue({
    content: [{ _id: 'me', bookmarks: ['other'] }, { _id: 'other' }]
  })
  await store.dispatch(loadUsersList())
  expect(store.getState().users.entities[0].bookmarks).toEqual(['other'])
})
