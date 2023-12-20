import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className="text-center popular__card">
    <div className="list-group">
  <h3 className='section__subtitle'>User PANEL</h3>
  
  
  <NavLink to={"/dashboard/user/profile"}  className="list-group-item list-group-item-action section__subtitle">Profile</NavLink>
  <NavLink to={"/dashboard/user/orders"}  className="list-group-item list-group-item-action section__subtitle">All Orders</NavLink>
 
</div>

    </div>
 

    </>
   

  )
}

export default UserMenu