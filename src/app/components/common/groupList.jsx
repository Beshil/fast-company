import PropTypes from 'prop-types'
import React from 'react'
const GroupList = ({ items, onItemSelect, selectedItem }) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          key={items[item]._id}
          className={
            'list-group-item' + (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          {items[item].name}
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
