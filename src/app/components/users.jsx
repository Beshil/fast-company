import React, { useState, useEffect } from 'react'
import RenderUsers from './user'
import Pagination from './pagination'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import SearchStatus from './searchStatus'

const Users = ({ users, professions, handleDeleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedProf, setSelectedProf] = useState()
  const pageSize = 2

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return [...items].splice(startIndex, pageSize)
  }
  const filteredUsers = selectedProf
    ? users.filter((user) => user.profession._id === selectedProf._id)
    : users
  const count = filteredUsers.length

  const userGroup = paginate(filteredUsers, currentPage, pageSize)
  const clearSelected = () => {
    setSelectedProf()
  }

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button className="btn btn-primary mt-2" onClick={clearSelected}>
            Очистить
          </button>
        </div>
      )}

      <div className="d-flex flex-column m-2">
        <SearchStatus numberUsers={count} />
        {count > 0 && (
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
              <RenderUsers
                users={userGroup}
                handleDeleteUser={handleDeleteUser}
              />
            </tbody>
          </table>
        )}

        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}
Users.propTypes = {
  users: PropTypes.array.isRequired,
  professions: PropTypes.array.isRequired,
  handleDeleteUser: PropTypes.func.isRequired
}
export default Users
