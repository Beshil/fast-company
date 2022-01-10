import React from 'react'
const Qualities = ({ qualities }) => {
  const renderQualities = (qualities) => {
    return qualities.map((qual) => (
      <span key={qual._id} className={'me-2 p-2 badge bg-' + qual.color}>
        {qual.name}
      </span>
    ))
  }
  return renderQualities(qualities)
}

export default Qualities
