import React, { useState } from 'react'
import 'bootstrap'

const Bookmark = () => {
  const [favorite, setFavorite] = useState(false)

  const handleFavoriteUser = () => {
    setFavorite((prevState) => !prevState)
  }
  return (
    <span onClick={handleFavoriteUser}>
      <i className={`bi bi-sun${favorite ? `-fill` : ``}`}></i>
    </span>
  )
}

export default Bookmark
