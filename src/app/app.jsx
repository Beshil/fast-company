import React, { useState, useEffect } from 'react'
import Users from './components/users'
import API from './components/api/index'

const App = () => {
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
        console.log(user.bookmark)
        if (user._id === id) return { ...user, bookmark: !user.bookmark }
        return user
      })
    )
  }
  const handleDeleteUser = (id) => {
    setUsers((prevState) => prevState.filter((el) => el._id !== id))
  }

  return (
    <>
      {users && professions && (
        <Users
          users={users}
          professions={professions}
          handleDeleteUser={handleDeleteUser}
          handleToggleBookMark={handleToggleBookMark}
        />
      )}
    </>
  )
}

export default App
