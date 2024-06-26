import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import "./Categories.css"
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Error from '../../../components/Error';


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader , setLoader]= useState(true);
  const [error, setError] = useState('');

  const getCategories = async ()=> {
    try{
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=10`);
    setCategories(data.categories);
    setError('');

  }catch(error){
    setError('Error to load data :(');
  
  }finally{
    setLoader(false);
  }
  };
  useEffect(() => {
    getCategories();
  }, []);



  if(loader){
     return <Loader/>
  }
  if(error){
    return <Error/>
  }
  return (
    <>
    <div className="container">
      <div className="card-group">
        {categories.map((category) => (
          <div className="card" key={category._id}>
            <img src={category.image.secure_url} className="card-img-top" alt={category.name} />
            <div className="card-body">
              <h5 className="card-title">{category.name}</h5>
            </div>
            <div className="card-footer">
              <Link to={`/Categories/${category._id}`} className="btn btn-primary text-center">
                Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  
    
  )
}
