import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.js'
import UserMenu from '../../components/layout/UserMenu.js'
import axios from "axios"
import toast from 'react-hot-toast'
import { useAuth } from '../../contex/AuthContex.js'



const Profile = () => {
 


  const[name,setname]=useState('');
  const[email,setemail]=useState('');

  
  const[phone,setphone]=useState('');
  const[password,setpassword]=useState('')
  const[address,setaddress]=useState('');
  const[auth,setauth]=useAuth()

  useEffect(()=>{
    const {name,email,phone ,address}= auth.user
   
    setname(name);
    setemail(email);
   
    setphone(phone);
    setaddress(address);

  },[auth?.user])




  const updatehandler=async(e)=>{
      e.preventDefault();
      try {
      const {data}=await axios.put("http://localhost:8080/api/v1/auth/update-profile",{name,email,phone,address,password})
        if(data?.error){
          toast.error(data.message);
        }else{
          setauth({...auth, user: data.updateduser})
          let ls=localStorage.getItem("auth");
          ls=JSON.parse(ls);
          ls.user=data.updateduser
          localStorage.setItem("auth",JSON.stringify(ls));
          toast.success("profile is updated succesfully")
        }
        
      } catch (error) {
          console.log(error)
          toast.error(error.message)
          
      }
  }
  return (
    <Layout>
    <div className='container popular__card'>
      
      
     <div className='row'>
         <div className='col-md-3'><UserMenu/></div>
         <div className='col-md-9'>
         <div className='card w-75 p-3 popular__card'>
            Profile
            <div className='register'>
            <h3 className='section__subtitle'>User Profile</h3>
        <form onSubmit={updatehandler} >
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" value={name} onChange={(e)=>setname(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" className="form-control" disabled value={email} onChange={(e)=>setemail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" />
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">password</label>
    <input type="text" value={password} onChange={(e)=>setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
    <input type="text" value={phone} onChange={(e)=>setphone(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">address</label>
    <input type="text" value={address} onChange={(e)=>setaddress(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  
  <button type="submit" className="btn btn-primary">updateProfile</button>
</form>

        </div>
   
                     
                 </div>
         </div>
 
     </div>
 
    </div>
         
     </Layout>
   
  )
}

export default Profile