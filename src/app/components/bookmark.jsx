import React from 'react'
import PropTypes from 'prop-types'

import 'bootstrap'

const Bookmark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={`bi bi-sun` + (status ? '-fill' : '')}></i>
    </button>
  )
}
Bookmark.propTypes = {
  status: PropTypes.bool.isRequired
}
export default Bookmark
