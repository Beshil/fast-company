import React from 'react'
import Qualities from './qualitie'
import PropTypes from 'prop-types'

const QualitiesList = ({ users }) => {
  return (
    <>
      <Qualities qualities={users.qualities} />
    </>
  )
}
QualitiesList.propTypes = {
  users: PropTypes.object.isRequired
}
export default QualitiesList
