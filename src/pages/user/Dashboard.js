
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useAuth } from '../../contex/AuthContex'

const Dashboard = () => {
  const[auth,setauth]=useAuth()
  return (
    <Layout>
    <div className='container'>
     <div className='row popular__card'>
         <div className='col-md-3'><UserMenu/></div>
         <div className='col-md-9'>
         <div className='card w-75 p-3'>
         <div className='card w-75 p-3 popular__card'>
                    <h3 className='section__subtitle'>User Name : {auth?.user?.name}</h3>
                    <h3 className='section__subtitle'>User Email :{auth?.user?.email}</h3>
                    <h3 className='section__subtitle'>User Contact :{auth?.user?.phone}</h3>
                </div>

                     
                 </div>
         </div>
 
     </div>
 
    </div>
         
     </Layout>
  )
}

export default Dashboard