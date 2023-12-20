import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../contex/AuthContex';

const AdminDashboard = () => {
    const[auth,setAuth]=useAuth();
  return (
    <Layout>
   <div className='container popular__card'>
    <div className='row'>
        <div className='col-md-3'><AdminMenu/></div>
        <div className='col-md-9'>
        <div className='card w-75 p-3 popuar__card'>
                    <h3 className='section__subtitle'>Admin Name:{auth?.user?.name}</h3>
                    <h3 className='section__subtitle'>Admin Email:{auth?.user?.email}</h3>
                    <h3 className='section__subtitle'>Admin Contact:{auth?.user?.phone}</h3>
                </div>
        </div>

    </div>

   </div>
        
    </Layout>
  )
}

export default AdminDashboard