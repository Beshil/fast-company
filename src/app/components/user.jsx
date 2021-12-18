import React from 'react'
import Qualities from './qualitie'

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
      <td></td>
      <td></td>
    </tr>
  ))
}

export default RenderUsers
