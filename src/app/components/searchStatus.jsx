import React from 'react'
import PropTypes from 'prop-types'
const SearchStatus = ({ numberUsers }) => {
  const numUsers = numberUsers
  const renderStatus = () => {
    if (numUsers === 1) {
      return (
        <span className="badge bg-primary">
          1 человек тусанет с тобой сегодня
        </span>
      )
    }
    if (numUsers > 1 && numUsers <= 4) {
      return (
        <span className="badge bg-primary">
          {numUsers} человека тусанет с тобой сегодня
        </span>
      )
    }
    if (numUsers >= 5) {
      return (
        <span className="badge bg-primary">
          {numUsers} человек тусанет с тобой сегодня
        </span>
      )
    }
    if (numUsers === 0)
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>
  }

  return <h2>{renderStatus()}</h2>
}

SearchStatus.propTypes = {
  numberUsers: PropTypes.number.isRequired
}
export default SearchStatus
