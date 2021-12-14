import PropTypes from 'prop-types'
import React from 'react'
const GroupList = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item._id}
          className={
            'list-group-item' + (item === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item.name}
        </li>
      ))}
    </ul>
  )
}
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
}
export default GroupList
