import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import userService from '../services/user.service'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import getRandomInt from '../utils/getRandomInt'
import history from '../utils/history'
import { generateAuthError } from '../utils/generateAuthError'

const userId = localStorageService.getUserId()
const isLoggedIn = Boolean(localStorageService.getAccessToken() && userId)
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: [],
    isLoading: false,
    error: null,
    authError: null,
    auth: isLoggedIn ? { userId } : null,
    isLoggedIn,
    dataLoaded: false,
    isSaving: false,
    isAuthenticating: false
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
      state.error = null
    },
    usersReceived: (state, action) => {
      state.entities = action.payload || []
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    authRequested: (state) => {
      state.authError = null
      state.isAuthenticating = true
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
      state.isAuthenticating = false
      state.dataLoaded = false
      state.entities = []
    },
    authRequestFailed: (state, action) => {
      state.authError = action.payload
      state.isAuthenticating = false
    },
    userLoggedOut: (state) => {
      state.entities = []
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
      state.error = null
      state.authError = null
      state.isLoading = false
      state.isSaving = false
    },
    userUpdateRequested: (state) => {
      state.isSaving = true
      state.error = null
    },
    userUpdateSuccess: (state, action) => {
      const index = state.entities.findIndex(
        (u) => u._id === action.payload._id
      )
      if (index !== -1)
        state.entities[index] = { ...state.entities[index], ...action.payload }
      else state.entities.push(action.payload)
      state.isSaving = false
    },
    userUpdateFailed: (state, action) => {
      state.error = action.payload
      state.isSaving = false
    }
  }
})
const { actions, reducer } = usersSlice
const authErrorMessage = (error) => {
  const message = error.response?.data?.error?.message
  return message
    ? generateAuthError(message)
    : 'Не удалось связаться с сервером. Попробуйте ещё раз.'
}
export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    dispatch(actions.authRequested())
    try {
      const data = await authService.login(payload)
      localStorageService.setTokens(data, payload.stayOn)
      dispatch(actions.authRequestSuccess({ userId: data.localId }))
      history.push(redirect || '/users')
      return true
    } catch (error) {
      dispatch(actions.authRequestFailed(authErrorMessage(error)))
      return false
    }
  }
export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(actions.authRequested())
    try {
      const data = await authService.register({ email, password })
      localStorageService.setTokens(data, true)
      try {
        await userService.create({
          ...rest,
          _id: data.localId,
          email,
          rate: getRandomInt(1, 5),
          completedMeetings: getRandomInt(0, 200),
          image: `${process.env.PUBLIC_URL}/logo192.png`,
          bookmarks: []
        })
      } catch (error) {
        localStorageService.removeAuthData()
        dispatch(
          actions.authRequestFailed(
            'Аккаунт создан, но профиль не сохранён. Войдите и завершите создание профиля.'
          )
        )
        return false
      }
      dispatch(actions.authRequestSuccess({ userId: data.localId }))
      history.push('/users')
      return true
    } catch (error) {
      dispatch(actions.authRequestFailed(authErrorMessage(error)))
      return false
    }
  }
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(actions.userLoggedOut())
  history.push('/')
}
export const loadUsersList = () => async (dispatch, getState) => {
  const userId = getState().users.auth?.userId
  dispatch(actions.usersRequested())
  try {
    const { content } = await userService.get()
    if (getState().users.auth?.userId === userId)
      dispatch(actions.usersReceived(content))
  } catch (error) {
    if (getState().users.auth?.userId === userId)
      dispatch(actions.usersRequestFailed(error.message))
  }
}
export const updateUser = (payload) => async (dispatch, getState) => {
  if (getState().users.isSaving) return false
  dispatch(actions.userUpdateRequested())
  try {
    const { content } = await userService.update(payload)
    dispatch(actions.userUpdateSuccess(content))
    history.push(`/users/${content._id}`)
    return true
  } catch (error) {
    dispatch(
      actions.userUpdateFailed(
        'Не удалось сохранить профиль. Попробуйте ещё раз.'
      )
    )
    return false
  }
}
export const toggleBookmark = (id) => async (dispatch, getState) => {
  const state = getState()
  const currentUser = getCurrentUserData()(state)
  if (!currentUser || state.users.isSaving) return
  const bookmarks = currentUser.bookmarks || []
  const next = bookmarks.includes(id)
    ? bookmarks.filter((item) => item !== id)
    : [...bookmarks, id]
  dispatch(actions.userUpdateRequested())
  try {
    await userService.update({ bookmarks: next })
    dispatch(
      actions.userUpdateSuccess({ _id: currentUser._id, bookmarks: next })
    )
  } catch (error) {
    dispatch(actions.userUpdateFailed('Не удалось сохранить избранное.'))
    toast.error('Не удалось сохранить избранное.')
  }
}
export const getUsersList = () => (state) => state.users.entities
export const getCurrentUserData = () => (state) =>
  state.users.entities.find((u) => u._id === state.users.auth?.userId)
export const getUserById = (id) => (state) =>
  state.users.entities.find((u) => u._id === id)
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUserId = () => (state) => state.users.auth?.userId
export const getAuthErrors = () => (state) => state.users.authError
export default reducer
