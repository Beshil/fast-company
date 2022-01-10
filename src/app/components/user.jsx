<<<<<<< HEAD
import React from 'react'

const User = () => {
  return <h3>User</h3>
  //   Object.keys(users).map((el) => (
  //   <div key={users[el]._id}>
  //     <h2 scope="row">{users[el].name}</h2>
  //     <div>
  //       <Qualities qualities={users[el].qualities} />
  //     </div>
  //     <div>{users[el].profession.name}</div>
  //     <div>{users[el].completedMeetings}</div>
  //     <div>{users[el].rate}/5</div>
  //     <button>Все пользователи</button>
  //   </div>
  // ))
}

export default User
=======
import React, { useEffect, useState } from 'react/cjs/react.development'
import { useParams, useHistory } from 'react-router-dom'
import API from './api'
import Qualities from './qualitie'

const User = () => {
  const params = useParams()
  const history = useHistory()
  const { userId } = params
  const [user, setUser] = useState()
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  })
  const handleComeBack = () => {
    history.push('/users')
  }
  if (user) {
    return (
      <div className="m-5">
        {
          <div key={user._id}>
            <h2 scope="row">{user.name}</h2>

            <h3>Профессия: {user.profession.name}</h3>
            <div className="mt-3">
              <Qualities qualities={user.qualities} />
            </div>

            <div className="mb-4 mt-3">
              completedMeetings: {user.completedMeetings}
            </div>
            <h5>Rate: {user.rate}</h5>
            <button onClick={() => handleComeBack()}>Все пользователи</button>
          </div>
        }
      </div>
    )
  }
  return 'Loading...'
}

export default User
>>>>>>> 6b867c0017c92aa3671c9a1b1e2f3911baff373f
