import React from "react";
const RenderUsers = (props) => {
 
  if(props.renderTableBody.length === 0) return ``
  return( 
  <table className="table">
  <thead>
    <tr>
      <th scope="col">Имя</th>
      <th scope="col">Качество</th>
      <th scope="col">Профессия</th>
      <th scope="col">Встретился, раз</th>
      <th scope="col">Оценка</th>
      <th scope="col">Избранное</th>
      <th></th>
    </tr>
  </thead>
  <tbody>         
  {props.renderTableBody}
  </tbody>
 </table> 
  )
}

export default RenderUsers