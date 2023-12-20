
import { useEffect, useState } from "react";
import { useAuth } from "../../contex/AuthContex";
import { Outlet } from "react-router-dom";
import axios from "axios";


export default function AdminRoute(){
    const[auth,setauth]=useAuth()
    const[ok,setok]=useState(false)

    useEffect(()=>{

        const checkauth=async(req,res)=>{
            try {
                const{data}=await axios.get("http://localhost:8080/api/v1/auth/admin-auth")
                if(data.ok){
                    setok(true)
                }else{
                    setok(false)
                }
            } catch (error) {
                console.log(error);
                
                
            }
        }

        if(auth?.token) checkauth();

    },[auth?.token])





    return ok?<Outlet/>:"spinner"

    

}