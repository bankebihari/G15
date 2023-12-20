import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/Layout.js'
import UserMenu from '../../components/layout/UserMenu.js'
import { useAuth } from '../../contex/AuthContex.js'
import axios from 'axios'
import toast from "react-hot-toast"

const Orders = () => {
  const[orders,setorders]=useState([])
  const[auth,setauth]=useAuth()
  const getorders=async()=>{
    try {
      const{data}=await axios.get("http://localhost:8080/api/v1/auth/orders")
     setorders(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(auth?.token) getorders()

  },[auth?.token])
  return (
    <Layout>
    <div className='container popular__card'>
     <div className='row'>
         <div className='col-md-3'><UserMenu/></div>
         <div className='col-md-9'>
         <div className='card w-75 p-3'>
          <h1 className='section__subtitle'> All Orders</h1>
         {
          orders?.map((o,i)=>{
            return (
              <div className='border shadow popular__card'>
                <table className='table popular__card'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>status</th>
                      <th scope='col'>buyer</th>
                      <th scope='col'>payment</th>
                      <th scope='col'>quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i+1}</td>
                      <td>{o?.status}</td>
                      <td>{o?.buyer?.name}</td>
                      <td>{o?.payment.success?"success":"failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>

                </table>
                <div className='container'>
                {
                    o?.products?.map((c,i)=>(
                        <div className='row'>
                            <div className='col-md-4'> 
                            <img className="card-img-top"src={`http://localhost:8080/api/v1/product/photo-product/${c._id}`  }/>
                            </div>
                              <div className='col-md-8'> 
                              
                                <h6>{c.name}</h6>
                                 <p> {c.description}</p>
                                 <p>{c.price}</p>
                                
                              
                              </div>
                        </div>
                    ))
                }


                </div>
              </div>
            )
          })
         }
           
          
              

    
          


          
          

                     
            </div>
         </div>
 
     </div>
 
    </div>
         
     </Layout>
   
  )
}

export default Orders