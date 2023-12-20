import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'

import axios from 'axios'
import  toast  from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../contex/CartContex'

const ProductDetail = () => {
    const[product,setproduct]=useState({});
     const params=useParams();
    const Navigate=useNavigate();
    const[cart,setcart]=useCart()

  const SingleProduct=async()=>{
    try {
        const {data}=await axios.get(`http://localhost:8080/api/v1/product/single-product/${params.slug}`)
        if(data.success){
            setproduct(data.product)
           
        toast.success(data.message)

        }else{
            toast.error(data.message);
        }
        
    } catch (error) {
        console.log(error)
       
        
    }

  }
  useEffect(()=>{
 SingleProduct()
   
  },[params.slug])

  return (
    <Layout>
       <div className='row container popular__card'>
       <div className='col-md-6'>
         <img  className=" card-img-top"src={`http://localhost:8080/api/v1/product/photo-product/${product._id}` }/>
           </div>
            <div className='col-md-6'>
                <h5 className='section__subtitle'>ProductDetail</h5>
                <h2>{product.name}</h2>
                <h2>{product.description}</h2>
                <h2>${product.price}</h2>
                <h2>{product.category?.name}</h2>
                <button className='popular__button' onClick={()=>{setcart([...cart,product]);localStorage.setItem("cart",JSON.stringify([...cart,product]));toast.success("item added to cart succesfully")}} > <i class="ri-shopping-bag-line"></i></button>


            </div>
           

        

       </div>

    </Layout>
  )
}

export default ProductDetail