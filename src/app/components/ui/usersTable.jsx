import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import { Link } from 'react-router-dom'

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  handleToggleBookMark,
  handleDeleteUser
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/` + user._id}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities users={user} />
    },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => handleToggleBookMark(user._id)}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteUser(user._id)}
        >
          Delete
        </button>
      )
    }
  }
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  )
}
UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  selectedSort: PropTypes.object.isRequired,
  handleToggleBookMark: PropTypes.func.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}
export default UsersTable
