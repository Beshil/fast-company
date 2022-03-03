import { createAction, createSlice } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = []

      state.entities.push(action.payload)
    },
    commentRemove: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload)
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentCreated,
  commentRemove
} = actions

const createCommentRequested = createAction('comments/createCommentRequested')
const createCommentFailed = createAction('comments/createCommentFailed')
const removeCommentRequesred = createAction('comments/removeCommentRequesred')
const removeCommentFailed = createAction('comments/removeCommentFailed')

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await commentService.getComments(userId)
    dispatch(commentsReceived(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}
export const createComment =
  (data, userId, currentUserId) => async (dispatch) => {
    dispatch(createCommentRequested())
    const comment = {
      ...data,
      _id: nanoid(),
      created_at: Date.now(),
      pageId: userId,
      userId: currentUserId
    }
    try {
      const { content } = await commentService.createComment(comment)
      dispatch(commentCreated(content))
    } catch (error) {
      dispatch(createCommentFailed(error.message))
    }
  }

export const removeComment = (id) => async (dispatch) => {
  dispatch(removeCommentRequesred())
  try {
    const { content } = await commentService.removeComment(id)

    if (content === null) dispatch(commentRemove(id))
  } catch (error) {
    dispatch(removeCommentFailed(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
