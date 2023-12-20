import React, { useState } from 'react'

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contex/AuthContex'
import { toast } from 'react-hot-toast'

import { useCart } from '../../contex/CartContex'
import img1 from "../../pages/assets/img/logo.png" 

const Header = () => {
    const[auth,setauth]=useAuth()
    const[cart,setcart]=useCart()
    const Navigate=useNavigate()
    const[button,setbutton]=useState(false);
    const[menu,setmenu]=useState(false)
    const logouthandler=async(req,res)=>{
        setauth({
            ...auth,
            user:null,
            token:''
        })
        localStorage.removeItem("auth");
        toast.success("successfully logout")

    }
  return (
    <header className='header' id='header'>
      <nav className="nav container">
      <a href="#" className="nav__logo">
  <img src={img1} alt="logo img" />SushiResturent
</a>


   
    
    
 <div className={menu?"nav__menu show-menu nav__button":"nav__menu"} id='nav-menu'>
            
      <ul className="nav__list">
      <li className="nav__item">
      <NavLink to={"/"} className="nav__link" aria-current="page" >Home</NavLink>
        </li>
        <li className="nav__item">
          <NavLink to={"/product"} className="nav__link" aria-current="page" >Product</NavLink>
        </li>
        
      
        {
           ! auth?.user ?(<>
            <li className="nav__item">
          <NavLink className="nav__link" to={"/register"}>Register</NavLink>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to={"/login"}>LOGIN</Link>
        </li>
            </>):(<>
              <li className="nav__item dropdown">
  <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
   {auth?.user?.name}
  </Link>
  <ul className="dropdown-menu">
    <li className='nav__link'><NavLink to={`/dashboard/${auth?.user?.role===1?"admin":"user"}`} className="dropdown-item nav__link">Dashboard</NavLink></li>
    <li className='nav__link'><NavLink className="dropdown-item" to={"/login"} onClick={logouthandler} >Logout</NavLink></li>
   
  </ul>

</li>
 </>)
        }

        <li className='nav__link' onClick={()=>{Navigate("/cart")}}>cart({cart?.length})</li>
      
        
        
      </ul>
     
           <div className="nav__close" id="nav-close" onClick={()=>{setmenu(false);setbutton(false)}}>
        <i className="ri-close-fill" />
          </div>

    

     
    </div>

    <div className="nav__button" >
      
         <div className={button?"nav__button":"nav__toggle"} id="nav-toggle">
                <i onClick={()=>{setmenu(true);setbutton(true)}} class="ri-apps-2-line"></i>
                </div>
          </div>

  
</nav>

    </header>
 

  
  )
}

export default Header