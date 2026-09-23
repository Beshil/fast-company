import { orderBy } from 'lodash'
import React, { useEffect } from 'react'
import CommentsList, { AddCommentForm } from '../common/comments'
import { useDispatch, useSelector } from 'react-redux'
import {
  getComments,
  createComment,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment
} from '../../store/comments'
import { useParams } from 'react-router-dom'
import { getCurrentUserId } from '../../store/users'

const Comments = () => {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [dispatch, userId])
  const currentUserId = useSelector(getCurrentUserId())
  const isLoading = useSelector(getCommentsLoadingStatus())

  const comments = useSelector(getComments())
  const error = useSelector((state) => state.comments.error)

  const handleSubmit = (data) => {
    return dispatch(createComment(data, userId, currentUserId))
  }
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id))
  }
  const sortedComments = orderBy(comments, ['created_at'], ['desc'])
  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm key={userId} onSubmit={handleSubmit} />
        </div>
      </div>
      {error && (
        <div role="alert">
          {error}
          <button onClick={() => dispatch(loadCommentsList(userId))}>
            Повторить загрузку
          </button>
        </div>
      )}
      {isLoading && <p role="status">Загрузка комментариев...</p>}
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              'Loading...'
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Comments
