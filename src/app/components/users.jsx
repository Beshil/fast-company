import React, { useState } from 'react'
import RenderUsers from './user'
import Pagination from './pagination'
import PropTypes from 'prop-types'

const Users = ({ users, handleDeleteUser }) => {
  const count = users.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return [...items].splice(startIndex, pageSize)
  }
  const userGroup = paginate(users, currentPage, pageSize)
  if (count === 0) return ``
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <RenderUsers users={userGroup} handleDeleteUser={handleDeleteUser} />
        </tbody>
      </table>
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}
export default Users
