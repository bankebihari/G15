import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'

import axios from 'axios'
import { useAuth } from '../../contex/AuthContex'
import {Select} from "antd"
const Option=Select

const AdminOrders = () => {
    const[orders,setorders]=useState([])
    const[status,setstatus]=useState(['not processed','processing','shipped','delivered','cancel'])
    const[updatedstatus,setupdatedstatus]=useState('')
  const[auth,setauth]=useAuth()
  const getorders=async()=>{
    try {
      const{data}=await axios.get("http://localhost:8080/api/v1/auth/all-orders")
     setorders(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(auth?.token) getorders()

  },[auth?.token])
  const handlestatus=async(orderid,value)=>{
    try {
        const {data}=await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderid}`,{status:value})
        getorders();
    } catch (error) {
        console.log(error)
        
    }
  }
    
  return (
    <>
    <Layout>
    <div className='row popular__card'>
        <div className='col-md-3'><AdminMenu/></div>
        <div className='col-md-9 popular__card'>
            <h1>All Orders</h1>
            {
          orders?.map((o,i)=>{
            return (
              <div className='border shadow'>
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
                      <td>
                        <Select bordered={false} onChange={(value)=>handlestatus(o._id,value)} defaultValue={o?.status}>
                            {
                                status.map((s,i)=>(
                                    <Option key={i} value={s}>{s}</Option>
                                ))
                            }

                        </Select>
                      </td>
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

    </Layout>
    
    </>
  )
}

export default AdminOrders