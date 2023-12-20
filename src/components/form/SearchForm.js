import React from 'react'
import { useSearch } from '../../contex/SearchContex'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const SearchForm = () => {
    const[search,setsearch]=useSearch();
    const Navigate=useNavigate()
 
    const Searchsubmit=async(e)=>{
        e.preventDefault();
        try {
            const {data}=await axios.get(`http://localhost:8080/api/v1/product/search/${search.keyword}`)
          if(data){
            setsearch({...search,results:data})
            Navigate("/search")
          }
           
        } catch (error) {
            console.log(error)
            
        }

    }

  return (
    <form className="d-flex"  role="search" onSubmit={Searchsubmit}>
  <input className="form-control me-2" type="search" value={search.keyword} onChange={(e)=>setsearch({...search,keyword:e.target.value})} placeholder="Search" aria-label="Search" />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>
  )
}

export default SearchForm