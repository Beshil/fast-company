import React from 'react'
import Qualities from './qualitie'
import Bookmark from './bookmark'

const RenderUsers = ({ users, handleToggleBookMark, handleDeleteUser }) => {
  return Object.keys(users).map((el) => (
    <tr key={users[el]._id}>
      <th scope="row">{users[el].name}</th>
      <td>
        <Qualities qualities={users[el].qualities} />
      </td>
      <td>{users[el].profession.name}</td>
      <td>{users[el].completedMeetings}</td>
      <td>{users[el].rate}/5</td>
      <td>
        <Bookmark
          status={users[el].bookmark}
          onClick={() => handleToggleBookMark(users[el]._id)}
        />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteUser(users[el]._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
}

export default RenderUsers
