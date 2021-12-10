import React from 'react'
import Qualities from './qualitie'
import Bookmark from './bookmark'

const RenderUsers = ({ users, handleDeleteUser }) => {
  return users.map((el) => (
    <tr key={el._id}>
      <th scope="row">{el.name}</th>
      <td>
        <Qualities qualities={el.qualities} />
      </td>
      <td>{el.profession.name}</td>
      <td>{el.completedMeetings}</td>
      <td>{el.rate}/5</td>
      <td>
        <Bookmark />
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDeleteUser(el._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
}

export default RenderUsers
