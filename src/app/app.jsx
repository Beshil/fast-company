import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import API from './components/api/index'

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll())
  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((el) => el._id !== id))
  }

  return (
    <>
      <SearchStatus numberUsers={users} />
      <Users users={users} handleDeleteUser={handleDeleteUser} />
    </>
  )
}

export default App
