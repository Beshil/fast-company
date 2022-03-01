import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useDispatch, useSelector } from 'react-redux'

import {
  getQualitiesByIds,
  getQualitiesLoadingStatus,
  loadQualitiesList
} from '../../../store/qualities'

const QualitiesList = ({ qualityId }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getQualitiesLoadingStatus())
  const getQualities = useSelector(getQualitiesByIds(qualityId))
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  if (!isLoading) {
    return (
      <>
        {getQualities.map((qual) => (
          <Quality key={qual._id} {...qual} />
        ))}
      </>
    )
  } else return 'Loading...'
}

QualitiesList.propTypes = {
  qualityId: PropTypes.array
}

export default QualitiesList
