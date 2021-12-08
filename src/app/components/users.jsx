import React from "react";
import RenderUsers from './user';


const Users = (props)=>{
   return (
    <>
     <RenderUsers renderTableBody={props.renderTableBody}/>
    </>
  ) 
}
export default Users