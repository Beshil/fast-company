import React,{useState} from 'react'
import Users from './components/users';
import Qualities from './components/qualitie';
import SearchStatus from './components/searchStatus';
import API from './components/api/index';
import Bookmark from './components/bookmark';

const App = () => {
  const[users, setUsers] = useState(API.users.fetchAll())
  const handleDeleteUser = (id) =>{
    setUsers(prevState=>prevState.filter(el=> el._id !==id))
  }

  const renderQualities = (qualities) => {
    return qualities.map((qual) => (
      <span className={"me-2 p-2 badge bg-" + qual.color} key={qual._id}>
      {qual.name}
    </span>
    ));
  };
  
  const renderTableBody = () => { 
      return (users.map((el) => (
        <tr key={el._id}>
          <th scope="row">{el.name}</th>
          <td><Qualities renderQualities={renderQualities(el.qualities)}/></td>
          <td>{el.profession.name}</td>
          <td>{el.completedMeetings}</td>
          <td>{el.rate}/5</td>
          <td><Bookmark/></td>
          <td><button className="btn btn-danger" onClick={()=> handleDeleteUser(el._id)}>Delete</button></td>
        </tr>
      ))
  )} 

  return (
    <>
      <SearchStatus numberUsers={users}/>
      <Users renderTableBody={renderTableBody()} />
    </>
  )
}
export default App