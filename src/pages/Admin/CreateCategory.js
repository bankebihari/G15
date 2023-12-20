import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import  toast  from 'react-hot-toast'
import CategoryForm from '../../components/form/CategoryForm'
import {Modal} from "antd"

const CreateCategory = () => {
  const[categories,setcategories]=useState([]);
  const[name,setname]=useState('')
  const[visible,setvisible]=useState(false)
  const[updatedname,setupdatedname]=useState('')
  const[selectedid,setselectedid]=useState(null)

  const updatedsubmit=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.put(`http://localhost:8080/api/v1/category/update-category/${selectedid._id}`,{name:updatedname})
      if(data.success){
        toast.success(data.message);
        setselectedid(null);
        setvisible(false);
        setupdatedname(null);
        GetAllCategory()
        
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error)
      
    }

    
  }
  const submithandler=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post("http://localhost:8080/api/v1/category/create-category",{name})
      if(data.success){
        toast.success(data.message)
        GetAllCategory()
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

  const deletehandler=async(cid)=>{
    try {
      const {data}=await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${cid}`)
     if(data.success){
      toast.success(data.message);
      GetAllCategory()
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      console.log(error)
      
    }
  }
  
  return (
    <Layout>
    <div className='container category'>
    <div className='row popular__card'>
        <div className='col-md-3'><AdminMenu/></div>
        <div className='col-md-9'>
        <div className='card w-75 p-3 popular__card'>
            <h3 className='section__subtitle'>CreateCategory</h3>
            <CategoryForm submithandler={submithandler} value={name} setvalue={setname}/>
            <table className='table' >
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {
                  categories.map((c)=>(
                    <>
                    <tr>
                      <td>{c.name}</td>
                      <td className='mr-2' ><button className='btn btn-primary'  value={c.name} onClick={()=>{setvisible(true);setselectedid(c);setupdatedname(c.name)}}>Edit</button>
                      <button className='btn btn-danger' onClick={()=>deletehandler(c._id)} >Delete</button>
                      </td>
                    </tr>
                    </>

                  ))
                }
              </tbody>

            </table>
            <Modal onCancel={()=>setvisible(false) } footer={false}  visible={visible}><CategoryForm  submithandler={updatedsubmit} value={updatedname} setvalue={setupdatedname} /></Modal>

                    
          </div>
        </div>

    </div>

   </div>
        
    </Layout>
  )
}

export default CreateCategory