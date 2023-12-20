import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Products = () => {
  const[products,setproducts]=useState([])
  const GetAllProduct=async()=>{
    try {
      const {data}=await axios.get("http://localhost:8080/api/v1/product/get-product");
      if(data.success){
        setproducts(data.product)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      
    }


  }
  useEffect(()=>{
    GetAllProduct()

  },[])
  return (
    <Layout>
    <div className='container'>
    <div className='row'>
        <div className='col-md-3'><AdminMenu/></div>
        <div className='col-md-9'>
        <div className='card w-75 p-3'>
            <h3 className='text-center'>Products</h3>
            <div > 
              {
                products.map((p)=>(
                  <Link className='product-link' to={`${p.slug}`} >
                    <artice className="popular__card">
                    <img className='popular__img' src={`http://localhost:8080/api/v1/product/photo-product/${p._id}`}/>
                   
                      
                   <span className='popular__description'>{p.description.substring(0,10)}</span>
                   <span className='popular__price'>${p.price}</span>

                    </artice>
                 
                    

                    


                  

                  </Link>
                  
                )

                )
              }
              </div>

                    
                </div>
        </div>

    </div>

   </div>
        
    </Layout>
  )
}

export default Products