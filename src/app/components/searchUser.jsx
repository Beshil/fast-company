import React from 'react'
import PropTypes from 'prop-types'

const SearchUser = ({ onChange, value }) => {
  return (
    <input
      type="text"
      className="form-control search-input"
      placeholder="Search..."
      onChange={onChange}
      value={value}
    />
  )
}
SearchUser.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
}
export default SearchUser
