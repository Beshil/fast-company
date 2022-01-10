<<<<<<< HEAD
import React, { useState, useEffect } from 'react'
import API from './api/index'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 4

  const [users, setUsers] = useState()
  const [professions, setProfession] = useState()
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data))
  }, [])
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfession(data))
  }, [])
  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) return { ...user, bookmark: !user.bookmark }
        return user
      })
    )
  }
  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((el) => el._id !== id))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return [...items].splice(startIndex, pageSize)
  }
  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userGroup = paginate(sortedUsers, currentPage, pageSize)
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
            <UsersTable
              users={userGroup}
              onSort={handleSort}
              selectedSort={sortBy}
              handleDeleteUser={handleDeleteUser}
              handleToggleBookMark={handleToggleBookMark}
            />
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
  return 'Loading...'
}

export default Users
=======
import React, { useState, useEffect } from 'react'
import API from './api/index'
import Pagination from './pagination'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedProf, setSelectedProf] = useState()
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const pageSize = 4

  const [users, setUsers] = useState()
  const [professions, setProfession] = useState()
  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data))
  }, [])
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfession(data))
  }, [])

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) return { ...user, bookmark: !user.bookmark }
        return user
      })
    )
  }
  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((el) => el._id !== id))
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [selectedProf])
  const handleProfessionSelect = (item) => {
    setSelectedProf(item)
  }

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  const handleSort = (item) => {
    setSortBy(item)
  }

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize
    return [...items].splice(startIndex, pageSize)
  }
  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users
    const count = filteredUsers.length
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])
    const userGroup = paginate(sortedUsers, currentPage, pageSize)
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
            <UsersTable
              users={userGroup}
              onSort={handleSort}
              selectedSort={sortBy}
              handleDeleteUser={handleDeleteUser}
              handleToggleBookMark={handleToggleBookMark}
            />
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
  return 'Loading...'
}

export default Users
>>>>>>> 6b867c0017c92aa3671c9a1b1e2f3911baff373f
