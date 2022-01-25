import React, { useEffect, useState } from 'react/cjs/react.development'
import { useParams, useHistory } from 'react-router-dom'
import API from '../../api'
import Quality from '../../ui/qualities/quality'

const UserPage = () => {
  const params = useParams()
  const history = useHistory()
  const { userId } = params
  const [user, setUser] = useState()
  useEffect(() => {
    API.users.getById(userId).then((data) => setUser(data))
  }, [])
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
              <Quality qualities={user.qualities} />
            </div>

            <div className="mb-4 mt-3">
              completedMeetings: {user.completedMeetings}
            </div>
            <h5>Rate: {user.rate}</h5>
            <button onClick={() => handleComeBack()}>Изменить</button>
          </div>
        }
      </div>
    )
  }
  return 'Loading...'
}

export default UserPage
