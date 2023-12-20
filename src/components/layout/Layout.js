import React from 'react'

import {Toaster} from 'react-hot-toast'


const Layout = ({children}) => {
  return (
   
    <div>
        
        <main  style={{ minHeight: "70vh" }} ><Toaster/>{children}</main>
     
    </div>
   
       
       
   
  )
}

export default Layout