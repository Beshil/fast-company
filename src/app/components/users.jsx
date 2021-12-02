import React, { useState } from "react";
import api from './api'


const Users = ()=>{
  const[users, setUsers] = useState(api.users.fetchAll())
  const handleDeleteUser = (id) =>{
      setUsers(prevState=>prevState.filter(el=> el._id !==id))
  }

  const changHader = () =>{    
    if(users.length === 1) return <span className="badge bg-primary">1 человек тусанет с тобой сегодня</span>
    if(users.length > 1 && users.length <= 4) return <span className="badge bg-primary">{users.length} человека тусанет с тобой сегодня</span>
    if(users.length >= 5) return <span className="badge bg-primary">{users.length} человек тусанет с тобой сегодня</span>
    if(users.length === 0) return <span className="badge bg-danger">Никто с тобой не тусанет</span> 
  }
 
  const renderUsers = () => {
    return  users.length !== 0 ? 
    <table className="table">
    <thead>
      <tr>
        <th scope="col">Имя</th>
        <th scope="col">Качество</th>
        <th scope="col">Профессия</th>
        <th scope="col">Встретился, раз</th>
        <th scope="col">Оценка</th>
        <th></th>
      </tr>
    </thead>
    <tbody>         
        {
          users.map((el) => (
            <tr key={el._id}>
              <th scope="row">{el.name}</th>
              <td>{
                el.qualities.map((qual) =>
                  (<span className={"me-2 p-2 badge bg-" + qual.color} key={qual._id}>{qual.name}</span>)
                  )
                }</td>
              <td>{el.profession.name}</td>
              <td>{el.completedMeetings}</td>
              <td>{el.rate}/5</td>
              <td><button className="btn btn-danger" onClick={()=> handleDeleteUser(el._id)}>Delete</button></td>
            </tr>
          ))
        }   
    </tbody>
   </table> :
   changHader
   
  }
 
  return (
    <>
    <h2>
      {changHader()}
    </h2>
     {renderUsers()}
    </>
  ) 
}
export default Users