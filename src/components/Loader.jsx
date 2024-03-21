import React from 'react'

export default function Loader() {
  return (
    <>
  <div className="d-flex justify-content-center">
  
  {/* <div className="spinner-grow text-primary" style={{width: '3rem', height: '3rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
   
  </div> */}
  <button className="btn btn-primary" type="button" disabled>
    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
    Loading...
  </button> 
  
</div>

  
  


    </>
  )
}
