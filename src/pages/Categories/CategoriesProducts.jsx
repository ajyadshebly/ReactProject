import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
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
      <div>
            {products.length > 0 ? (
                <div className="container style d-grid gap-3">
                    {products.map(product => (
                        <div className="card mb-3" style={{ maxWidth: '540px' }} key={product._id}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={product.mainImage.secure_url} className="img-fluid rounded-start" alt={product.name} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <button type="button" className="btn btn-outline-primary">
                                            <Link className="nav-link" to={`/Products/${product._id}`}>Details</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="alert alert-primary text-center container" role="alert">Empty Products :)</h2>
            )}
        </div>
    );
}