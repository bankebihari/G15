import { useEffect, useState } from "react";
import { useAuth } from "../../contex/AuthContex";
import axios from "axios";
import { Outlet } from "react-router-dom";





export default function PrivateRoute (){

    const[ok,setok]=useState(false);
    const[auth]=useAuth();

    useEffect(()=>{

        const checkauth=async(req,res)=>{

            const {data}=await axios.get("http://localhost:8080/api/v1/auth/user-auth")
            if(data.ok){
                setok(true)
            }else{
                setok(false)
            }

        }
        if(auth?.token) checkauth();


    },[auth?.token])
    return ok?<Outlet/>:"SPINNER"
}