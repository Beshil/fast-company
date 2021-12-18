import React from 'react'
import PropTypes from 'prop-types'
import Bookmark from './bookmark'
import QualitiesList from './qualitiesList'
import Table from './table'
import TableBody from './tableBody'
import TableHeader from './tableHeader'

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  handleToggleBookMark,
  handleDeleteUser
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <QualitiesList users={user} />
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
    >
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>
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
