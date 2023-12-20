import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../contex/AuthContex'
import axios from 'axios';
import  toast  from 'react-hot-toast';
import { Checkbox } from 'antd';
import {Radio} from "antd"
import Prices from './Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contex/CartContex';



const HomePage = () => {
    const[auth,setauth]=useAuth();
    const[products,setproducts]=useState([])
    const[categories,setcategories]=useState([]);
    const[checked,setchecked]=useState([])
    const[radio,setradio]=useState([])
    const[total,settotal]=useState('');
    const[page,setpage]=useState(1);
    const[loading,setloading]=useState(false);
    const[cart,setcart]=useCart();
    const Navigate=useNavigate();

    const GetAllProduct=async()=>{
      try {
        setloading(true)
        const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
        if(data.success){
          setloading(false)
          setproducts(data.product)
          toast.success(data.message)
        }else{
          toast.error(data.message)
        }
        
      } catch (error) {
        setloading(false)
        console.log(error);
        
      }
  
  
    }
    const learnmore=async(req,res)=>{
      try {
        setloading(true)
        const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
        if(data.success){
          setloading(false)
         setproducts([...products,...data.product])
          
      } 
    }catch (error) {
          console.log(error);
          
      }
   }
   useEffect(()=>{
   
     learnmore()
   },[page])

    useEffect(()=>{
     if(!checked.length || !radio.length) GetAllProduct()
  
    },[checked.length,radio.length])

  const GetAllCategory=async()=>{
    try {
      const {data}=await axios.get("http://localhost:8080/api/v1/category/get-category");
      if(data.success){
        setcategories(data.category);
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      console.log(error)
      
      
    }
  }
  useEffect(()=>{
    GetAllCategory();
    CounttotalProduct();


  },[])
  const handlefilter=async(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id);
    }else{
      all=all.filter(c =>c!== id)
    }
    setchecked(all);



  }
  const CounttotalProduct=async(req,res)=>{
    try {
      const {data}=await axios.get("http://localhost:8080/api/v1/product/count-product");
      if(data.success){
        settotal(data.count);

      }
      
    } catch (error) {
      console.log(error)
      
    }

  }
  const FilterProduct=async()=>{
    try {
      
      const{data}=await axios.post("http://localhost:8080/api/v1/product/filter-product",{checked,radio});
      if(data.success){
        
       setproducts(data.product)
       toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      
    }

  }
  useEffect(()=>{
    if(checked.length || radio.length) FilterProduct()

    
  },[checked,radio])
  return (
   <Layout>
    <div className='product__container grid'>
     
        <div className='filter__data'>
         
       <h4 className='section__subtitle'>Filter by Category</h4>
       {
        categories.map((c)=>(
          <div className='d-flex flex-column' >
             <Checkbox className='filter__text' onChange={(e)=>handlefilter(e.target.checked,c._id)}>{c.name}</Checkbox>

            </div>
         

        ))
       }
       <h4 className="section__subtitle" >Filter By price</h4>
       <div className='d-flex flex-column'>
       
       <Radio.Group onChange={(e)=>setradio(e.target.value)}>
        {
          Prices.map((p)=>(
            <div key={p._id}>
              <Radio className='filter__text' value={p.array}>{p.name}</Radio>

            </div>
            
          ))
        }
       </Radio.Group>

       </div>
       <div>
        <button className='button' onClick={()=>window.location.reload()}><i class="ri-refresh-line"></i></button>
       </div>
       

        </div>
        <div>
        <span class="section__subtitle">The Best Food</span>
        <h2 class="section__title">Popular Dishes</h2>
          
          <div className='popular__container container grid'>
          
           {
              products.map((p)=>(
                <article className='popular__card'>
                  
                 <img  className='popular__img' src={`http://localhost:8080/api/v1/product/photo-product/${p._id}`} />
                <h3 className='popular__name'>{p.name}</h3>
                  
                  <span className='popular__description'>{p.description.substring(0,10)}</span>
                  <span className='popular__price'>${p.price}</span>
                  <button className='more__details'  onClick={()=>Navigate(`/product-detail/${p.slug}`)} ><i class="ri-more-fill"></i></button>
                  <button className='popular__button' onClick={()=>{setcart([...cart,p]);localStorage.setItem("cart",JSON.stringify([...cart,p]));toast.success("item added to cart succesfully")}} > <i class="ri-shopping-bag-line"></i></button>

                
                 

                </article>
                
               
              ))
            }

           
            

          </div>
          <div>
          {products && products.length< total &&
          (<button onClick={(e)=>{e.preventDefault();setpage(page+1)}} className='button'>{loading?"loading":"Learmore"}</button>)
          }
        </div>

        </div>
        

      

    </div>
   
   </Layout>
  )
}

export default HomePage