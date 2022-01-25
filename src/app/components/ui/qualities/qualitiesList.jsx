import React from 'react'
import Quality from './quality'
import PropTypes from 'prop-types'

const QualitiesList = ({ users }) => {
  return (
    <>
      <Quality qualities={users.qualities} />
    </>
  )
}
QualitiesList.propTypes = {
  users: PropTypes.object.isRequired
}
export default QualitiesList
