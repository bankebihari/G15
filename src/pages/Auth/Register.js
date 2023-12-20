import React, { useState } from 'react'
import Layout from '../../components/layout/Layout.js'
import axios from "axios"
import toast from 'react-hot-toast'


const Register = () => {

    const[name,setname]=useState('');
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('');
    const[phone,setphone]=useState('');
    const[address,setaddress]=useState('');
    const[answer,setanswer]=useState('')

    const registerhandler=async(e)=>{
        e.preventDefault();
        try {
        const {data}=await axios.post("http://localhost:8080/api/v1/auth/register",{name,email,password,phone,address,answer})
           if(data.success){
            toast.success(data.message)

           }else{
            toast.error(data.message)
           }
          
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
  return (
    <Layout>
        <div className='register'>
            <h3>Register page</h3>
        <form onSubmit={registerhandler} >
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setname(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setemail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
    <input type="text" value={phone} onChange={(e)=>setphone(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">address</label>
    <input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">answer</label>
    <input type="text" placeholder='enter your fav sports' value={answer} onChange={(e)=>setanswer(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

        </div>
   

    </Layout>
   
  )
}

export default Register