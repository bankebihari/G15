import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { Select } from 'antd'
import axios from 'axios'
import  toast  from 'react-hot-toast'
const {Option}=Select

const CreateProduct = () => {
  const[categories,setcategories]=useState([]);
  const[category,setcategory]=useState('')
  const[photo,setphoto]=useState('')
  const[name,setname]=useState('')
  const[description,setdescription]=useState('')
  const[price,setprice]=useState('');
  const[quantity,setquantity]=useState('');
  const[shipping,setshipping]=useState('');

  const submitcreate=async()=>{
    try {
      const productData=new FormData()
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);
  
      const {data}=await axios.post("http://localhost:8080/api/v1/product/create-product",productData)
      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {

      
      console.log(error)
    }

  }



  const GetAllCategory=async()=>{
    try {
      const {data}=await axios.get("http://localhost:8080/api/v1/category/get-category");
      if(data.success){
        setcategories(data.category);
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      console.log(error)
      
      
    }
  }
  useEffect(()=>{
    GetAllCategory();


  },[])
  return (
    <Layout>
    <div className='container'>
    <div className='row popular__card' >
        <div className='col-md-3'><AdminMenu/></div>
        <div className='col-md-9'>
        <div className='card w-75 p-3 popular__card'>
            <h3 className='section__subtitle'> CreateProduct</h3>
            <div className='m-1 w-75'>
              <Select size='large' bordered={false}  placeholder="select a category"   onChange={(value)=>setcategory(value)} showSearch>
                {
                  categories.map((c)=>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))

                }
              </Select>

              <div className='mb-3'>
                <label className='btn btn-outline-secondary col-md-12'>{photo?photo.name:"upload photo"}
                <input type='file' accept='image/*'  hidden onChange={(e)=>setphoto(e.target.files[0])}/>
                </label>

              </div>
              <div className='mb-3'>
                {photo && (<div>
                  <img src={URL.createObjectURL(photo)} alt={photo.name} height={"200px"}  className='img img-responsive' />
                   </div>)}

              </div>
              <div className='mb-3'>
               
                <input type='text' placeholder='enter product name' value={name} onChange={(e)=>setname(e.target.value)}/>

            </div>
            <div className='mb-3'>
               
                <input type='text' placeholder='enter product description' value={description} onChange={(e)=>setdescription(e.target.value)}/>

            </div>
            <div className='mb-3'>
               
                <input type='Number' placeholder='enter product price' value={price} onChange={(e)=>setprice(e.target.value)}/>

            </div>
            <div className='mb-3'>
               
                <input type='Number' placeholder='enter product quantity' value={quantity} onChange={(e)=>setquantity(e.target.value)}/>

            </div>
            <Select bordered={false} placeholder="select shipping" size='large' className='form-select' onChange={(value)=>setshipping(value)}>
            <Option value="0">NO</Option>
              <Option value="1">YES</Option>
            </Select>
            <div className='mb-3'>
          <button className='btn btn-primary' onClick={submitcreate}>Create A Product</button>

         </div>

            </div>
            
                    
                </div>
        </div>

    </div>

   </div>
        
    </Layout>
  )
}

export default CreateProduct