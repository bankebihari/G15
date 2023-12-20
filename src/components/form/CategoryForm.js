import React from 'react'


const CategoryForm = ({submithandler,value,setvalue}) => {
  return (
    <>
   <form onSubmit={submithandler}>
  <div className="mb-3">
    
    <input type="text" className="form-control" id="exampleInputEmail1"  value={value} onChange={(e)=>setvalue(e.target.value)} />
   
  </div>
  
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </>
  
  )
}

export default CategoryForm