import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsersList, logOut } from '../../../store/users'
import PropTypes from 'prop-types'
const UsersLoader = ({ children }) => {
  const { dataLoaded, isLoading, error } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!dataLoaded) dispatch(loadUsersList())
  }, [dispatch, dataLoaded])
  if (isLoading) return <p role="status">Загрузка...</p>
  if (!dataLoaded && error) {
    return (
      <div role="alert">
        Не удалось загрузить пользователей.
        <button onClick={() => dispatch(loadUsersList())}>Повторить</button>
        <button onClick={() => dispatch(logOut())}>Выйти</button>
      </div>
    )
  }
  if (!dataLoaded) return <p role="status">Загрузка...</p>
  return children
}
UsersLoader.propTypes = { children: PropTypes.node }
export default UsersLoader
