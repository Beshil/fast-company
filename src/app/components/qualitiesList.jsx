<<<<<<< HEAD
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
=======
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
>>>>>>> 6b867c0017c92aa3671c9a1b1e2f3911baff373f
