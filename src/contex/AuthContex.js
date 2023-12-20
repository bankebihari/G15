import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";



const AuthContex=createContext();


const AuthProvider=({children})=>{
    const [auth,setauth]=useState({
        user:null,
        token:''
    })

    useEffect(() => {
        const data = localStorage.getItem("auth");
        if (data) {
          const parseData = JSON.parse(data);
          setauth({
            ...auth,
            user: parseData.user,
            token: parseData.token,
          });
        }
        //eslint-disable-next-line
      }, []);
    axios.defaults.headers.common["Authorization"]=auth?.token;
    useEffect(()=>{
       const data=localStorage.getItem("auth");
       if(data){
        const parsedata=JSON.parse(data);
        setauth({
            ...auth,
            user:parsedata.user,
            token:parsedata.token
        })
       }


       

    },[])
    return <AuthContex.Provider value={[auth,setauth]}>{children}</AuthContex.Provider>

}

const useAuth=()=> useContext(AuthContex);
export {useAuth,AuthProvider}

