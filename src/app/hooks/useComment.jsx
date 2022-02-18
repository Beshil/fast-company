import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
import { useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import commentsService from '../services/comment.service'

const CommentsContext = React.createContext()

export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { currentUser } = useAuth()
  const { userId } = useParams()
  useEffect(() => {
    getComments()
  }, [userId])

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      created_at: Date.now(),
      pageId: userId,
      userId: currentUser._id
    }
    try {
      const { content } = await commentsService.createComment(comment)
      setComments((prevState) => [...prevState, content])
    } catch (error) {
      errorCatcher(error)
    }
  }
  async function getComments() {
    try {
      const { content } = await commentsService.getComments(userId)
      setComments(content)
    } catch (error) {
      errorCatcher(error)
    } finally {
      setLoading(false)
    }
  }
  async function removeComment(id) {
    try {
      const { content } = await commentsService.removeComment(id)
      if (content === null)
        setComments((prevState) => prevState.filter((c) => c._id !== id))
    } catch (error) {}
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }
  useEffect(() => {
    if (error !== null) {
      toast(error)
      setError(null)
    }
  }, [error])

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, isLoading, removeComment }}
    >
      {children}
    </CommentsContext.Provider>
  )
}
CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
