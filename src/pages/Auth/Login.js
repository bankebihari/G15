import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import  toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contex/AuthContex';

const Login = () => {
    const[email,setemail]=useState('');

    const[password,setpassword]=useState('');
    const Navigate= useNavigate();
    const[auth,setauth]=useAuth();

    const loginhandler=async(e)=>{
        e.preventDefault();
        try {
        const {data}=await axios.post("http://localhost:8080/api/v1/auth/login",{email,password})
           if(data.success){
            setauth({
                ...auth,
                user:data?.user,
                token:data?.token
            })
            localStorage.setItem("auth",JSON.stringify(data))
            Navigate("/")
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
            <h3>Login page</h3>
        <form onSubmit={loginhandler} >
      
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setemail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary">Login</button>
 <NavLink to={"/forgot-password"}> <button type="submit" className="btn btn-primary ms-2" to="\forgotpassword">Forgot Password</button> </NavLink>
</form>
</div>

       

   </Layout>
  )
}

export default Login