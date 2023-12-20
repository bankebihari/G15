
import React ,{useState,useEffect}from 'react'
import Layout from '../components/layout/Layout'


import { useAuth } from '../contex/AuthContex.js';
import { useCart } from '../contex/CartContex.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import toast from "react-hot-toast"



const CartPage = () => {
    const[cart,setcart]=useCart()
    const[auth]=useAuth()
    const[clientToken,setclientToken]= useState('')
    const[instance,setInstance]= useState('')
    const Navigate=useNavigate();
    const totalprice=()=>{
        try {
            let total=0;
            cart.map((p)=>{
                total+=p.price
            })
            return total
        } catch (error) {
            console.log(error)
        }
    }
    const deletecartitem=async(id)=>{
        try {
            let mycart=[...cart];
            let index=mycart.findIndex(p=>p._id ===id)
            mycart.splice(index,1)
          
            setcart(mycart)
            localStorage.setItem("cart",JSON.stringify(mycart))

           
        } catch (error) {
            console.log(error)
            
        }

    }

    const gettoken=async()=>{
        try {
            const {data}=await axios.get("http://localhost:8080/api/v1/product/braintree/token")
            setclientToken(data?.clientToken)
            
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        gettoken();
    
    }, [auth?.token])
    const handlepayment=async()=>{
        try {
            const {nonce}= await instance.requestPaymentMethod();

        const {data}=await axios.post('http://localhost:8080/api/v1/product/braintree/payment',{nonce,cart})
        localStorage.removeItem("cart");
        setcart([]);
        Navigate("/dashboard/user/orders");
        toast.success("payment succefully")
    
            
        } catch (error) {
            console.log(error)
            
        }
        

       

    }
  return (
   <Layout>
    <div className='cart'>
    <h4 className='text-center'>CartPage</h4>
    <div className='container popular__card'>
        <div className='row'>
            <div className='col-md-12'>
                <h6>{`hello ${auth?.token   && auth?.user?.name}`}</h6>
             <h5>{cart?.length>1 ?`you have ${cart.length} items in your cart ${auth?.token?"" :"please login to checkout"}` :"your cart is empty"}</h5>
            </div>

        </div>
        <div className='row'>
            <div className='col-md-9'>
                {
                    cart?.map((c)=>(
                        <div className='row popular__card'>
                            <div className='col-md-4'> 
                            <img className="card-img-top"src={`http://localhost:8080/api/v1/product/photo-product/${c._id}`  }/>
                            </div>
                              <div className='col-md-8'> 
                              
                                <h6>{c.name}</h6>
                                 <p> {c.description}</p>
                                 <p>{c.price}</p>
                                 <button className='btn btn-danger' onClick={()=>deletecartitem(c._id)}>remove</button>
                              
                              </div>
                        </div>
                    ))
                }
            </div>
             <div className='col-md-3 text-center popular__card'>
                <h2 className='section__subtitle'>Cart Summary</h2>
                <p>Total | checkout | payment</p>
                <hr/>
                <h4>Total:{totalprice()}</h4>
                {
                    auth?.user?.address?(<>
                  <div className='mb-3'>
                    <h4 className='section__subtitle'>CurrentAddress</h4>
                    <h5 >{auth?.user?.address}</h5>
                    <button className='button' onClick={()=>Navigate("/dashboard/user/profile")}>Update Address</button>

                  </div>
                    </>)
                    :(<>
                    <div className='mb-3'>

                        {
                            auth?.token?( <button className='btn btn-outline-warning' onClick={()=>Navigate("/dashboard/user/profile")}>Update Address</button>
                            ):(<button className='btn btn-outline-warning'  onClick={()=>Navigate("/login",{state:"/cart",})}>please login to checkout</button>)
                        }
                    </div>
                    </>)
                }
                <div className='mt-2'>
                    {!clientToken || !cart?.length?(" "):(<>
                        <DropIn
                  options={{
                    authorization:clientToken,
                    paypal:{
                        flow:"vault"
                    }

                  }
                 }
                 onInstance={ instance => setInstance(instance)}

                  />
                  <button className='button' onClick={handlepayment} disabled={!instance || !auth?.user?.address} >MakePAYMENT</button>

                    
                    
                    
                    </>)
                    }
                  
                </div>

              </div>


        </div>

    </div>
    

    </div>
    

   </Layout>
  )
}

export default CartPage