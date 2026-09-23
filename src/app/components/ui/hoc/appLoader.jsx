import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'
import { isConfigured } from '../../../config'
import { logOut } from '../../../store/users'
const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const qualities = useSelector((state) => state.qualities)
  const professions = useSelector((state) => state.professions)
  const load = () => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }
  useEffect(() => {
    const expired = () => dispatch(logOut())
    window.addEventListener('auth:expired', expired)
    return () => window.removeEventListener('auth:expired', expired)
  }, [dispatch])
  useEffect(() => {
    if (isConfigured) {
      dispatch(loadQualitiesList())
      dispatch(loadProfessionsList())
    }
  }, [dispatch])
  if (!isConfigured) {
    return (
      <div className="container mt-5" role="alert">
        Для запуска настройте Firebase по инструкции в README и перезапустите
        приложение.
      </div>
    )
  }
  if (qualities.isLoading || professions.isLoading)
    return <p role="status">Загрузка...</p>
  if (qualities.error || professions.error) {
    return (
      <div className="container mt-5" role="alert">
        Не удалось загрузить справочники.
        <button className="btn btn-primary ms-2" onClick={load}>
          Повторить
        </button>
      </div>
    )
  }
  return children
}
AppLoader.propTypes = { children: PropTypes.node }
export default AppLoader
