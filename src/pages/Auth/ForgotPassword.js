import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import  toast  from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const[email,setemail]=useState('')
    const[password,setpassword]=useState('')
    const[answer,setanswer]=useState('');
    const Navigate= useNavigate();

    const submithandler=async(req,res)=>{
        try {
            const {data}=await axios.post("http://localhost:8080/api/v1/auth/forgot-password",{email,answer,password})
            if(data.success){
                toast.success(data.message);
                Navigate("/")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
            
        }

    }

  return (
    <Layout>
     <div className='register'>
            <h3>Forgot Password</h3>
        <form onSubmit={submithandler} >
      
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setemail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">answer</label>
    <input type="password" value={answer} onChange={(e)=>setanswer(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary">Login</button>
 
</form>
</div>

       

   </Layout>
  )
}

export default ForgotPassword