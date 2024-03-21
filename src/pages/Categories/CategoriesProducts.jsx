import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader';
import Error from '../../components/Error';

export default function CategoriesProducts() {

    const {id}=useParams('id');
    const [products,setProducts] = useState([ ]);
    const [loader, setLoader] = useState(true);
    const [error,setError] = useState('');

    const getProducts = async()=>{
      try{
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
        setProducts(data.products);
        setError('');

      }catch(error){
        setError('Error to load data :(');

      }finally{
        setLoader(false);
      }
    };
    useEffect( ()=>{
      getProducts();
    },[]);

    if(loader){
      return < Loader/>
    }
    if(error){
      return <Error/>
    }
  return (
   
     <>
      {
        (products.length > 0 )?products.map(product=>
          <div className='text-center container ' key={product._id}>
            <h3>{product.name}</h3>
            <img className='img-fluid img-thumbnail img-thumbnail' width={250} src={product.mainImage.secure_url}/>
            </div>
          ):<h2 className="alert alert-primary text-center container" role="alert">Empty Products! :)</h2>
      }
     </>
     
  )
}
