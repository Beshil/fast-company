import React from 'react'
import PropTypes from 'prop-types'

const SearchUser = ({ onChange }) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Search..."
      onChange={onChange}
    />
  )
}
SearchUser.propTypes = {
  onChange: PropTypes.func
}
export default SearchUser
