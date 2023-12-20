import React from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

const Users = () => {
  return (
    <Layout>
    <div className='container'>
    <div className='row popular__card'>
        <div className='col-md-3'><AdminMenu/></div>
        <div className='col-md-9 popular__card'>
        <div className='card w-75 p-3'>
            <h3>Users</h3>
                    
                </div>
        </div>

    </div>

   </div>
        
    </Layout>
  )
}

export default Users