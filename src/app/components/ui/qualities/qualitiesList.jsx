import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualityId }) => {
  const { isLoading, getQualities } = useQualities()
  if (!isLoading) {
    return (
      <>
        {qualityId.map((id) => (
          <Quality key={id} {...getQualities(id)} />
        ))}
      </>
    )
  } else return 'Loading...'
}

QualitiesList.propTypes = {
  qualityId: PropTypes.array
}

export default QualitiesList
