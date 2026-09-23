import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'
const initialState = {
  entities: [],
  isLoading: false,
  error: null,
  pageId: null,
  requestId: null
}
const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested: (state, { payload }) => {
      state.pageId = payload.pageId
      state.requestId = payload.requestId
      state.entities = []
      state.error = null
      state.isLoading = true
    },
    commentsReceived: (state, { payload }) => {
      if (state.requestId !== payload.requestId) return
      state.entities = payload.content || []
      state.isLoading = false
    },
    commentsRequestFailed: (state, { payload }) => {
      if (state.requestId !== payload.requestId) return
      state.error = payload.message
      state.isLoading = false
    },
    commentCreated: (state, { payload }) => {
      if (state.pageId === payload.pageId) state.entities.push(payload)
    },
    commentRemoved: (state, { payload }) => {
      state.entities = state.entities.filter((c) => c._id !== payload)
    },
    mutationFailed: (state, { payload }) => {
      if (state.pageId === payload.pageId) state.error = payload.message
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase('users/userLoggedOut', () => initialState)
  }
})
const { actions } = slice
export const loadCommentsList = (pageId) => async (dispatch) => {
  const requestId = nanoid()
  dispatch(actions.commentsRequested({ pageId, requestId }))
  try {
    const { content } = await commentService.getComments(pageId)
    dispatch(actions.commentsReceived({ content, requestId }))
  } catch (error) {
    dispatch(
      actions.commentsRequestFailed({
        requestId,
        message: 'Не удалось загрузить комментарии.'
      })
    )
  }
}
export const createComment = (data, pageId, userId) => async (dispatch) => {
  if (!data.content?.trim()) return false
  dispatch(actions.clearError())
  try {
    const { content } = await commentService.createComment({
      content: data.content.trim(),
      _id: nanoid(),
      created_at: Date.now(),
      pageId,
      userId
    })
    dispatch(actions.commentCreated(content))
    return true
  } catch (error) {
    dispatch(
      actions.mutationFailed({
        pageId,
        message: 'Не удалось сохранить комментарий. Попробуйте ещё раз.'
      })
    )
    return false
  }
}
export const removeComment = (id) => async (dispatch, getState) => {
  const pageId = getState().comments.pageId
  dispatch(actions.clearError())
  try {
    await commentService.removeComment(id)
    dispatch(actions.commentRemoved(id))
    return true
  } catch (error) {
    dispatch(
      actions.mutationFailed({
        pageId,
        message: 'Не удалось удалить комментарий.'
      })
    )
    return false
  }
}
export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading
export default slice.reducer
