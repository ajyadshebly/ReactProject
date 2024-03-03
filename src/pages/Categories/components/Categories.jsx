import React from 'react'
import { useState , useEffect } from 'react';
import "./Categories.css"
export default function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect( () => {
    fetch('https://ecommerce-node4.vercel.app/categories/active?page=1&limit=10')
      .then(response => response.json())
      .then(data => setCategories(data.categories));

  }, [])
  return (
    <>
    { categories.map(categories =>
        <div className='style' key={categories._id}>
        
          {/* <h2>{categories.name}</h2> */}
          <img src={categories.image.secure_url}/>

         
        </div>
      )}
    </>
    
  )
}
