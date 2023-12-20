import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
    <div className="text-center admin_menu">
    <div className="list-group">
  <h3 className='section__subtitle'>ADMIN PANEL</h3>
  <div className='popular__card'> 

  <NavLink  to={"/dashboard/admin/create-category"}  className="list-group-item list-group-item-action section__subtitle">Create Category</NavLink>
  <NavLink  to={"/dashboard/admin/create-product"}  className="list-group-item list-group-item-action section__subtitle">Create Product</NavLink>
  <NavLink to={"/dashboard/admin/products"} className="list-group-item list-group-item-action section__subtitle">Products</NavLink>
  <NavLink to={"/dashboard/admin/orders"} className="list-group-item list-group-item-action section__subtitle">Orders</NavLink>
  <NavLink to={"/dashboard/admin/users"} className="list-group-item list-group-item-action section__subtitle">Users</NavLink>

  </div>
  
  
</div>

    </div>
 

    </>
   

  )
}

export default AdminMenu