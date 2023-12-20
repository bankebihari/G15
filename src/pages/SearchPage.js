import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../contex/SearchContex'

const SearchPage = () => {
    const[search]=useSearch();
  return (
   <Layout>
    <div className='container'>
        <div className='text-center'>
            <h3>Search Results</h3>
            <h6>{search?.results?.length<1? "No results found":`found${search?.results?.length}`}</h6>
            <div className="d-flex flex-wrap">
         
         {
               search?.results?.map((p)=>(
                 
                    <div className="card m-3" style={{width: '18rem'}} >
            <img src={`http://localhost:8080/api/v1/product/photo-product/${p._id}`} className="card-img-top" alt={p.name}/>
             <div className="card-body">
               <h5 className="card-title">{p.name}</h5>
               <p className="card-text">{p.description}</p>
               <p className="card-text">${p.price}</p>

               
               <button className="btn btn-primary ">More Details</button>
               <button className="btn btn-secondary ms-1">ADD TO CART</button>
  
                             </div>
                         </div>

                  
                  
                
                
               ))
           }

        </div>
        </div>

    </div>

   </Layout>
  )
}

export default SearchPage