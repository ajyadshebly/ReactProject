import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';
import { Carousel } from 'react-bootstrap';




export default function ProductsDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
                setProduct(data.product);
                setError('');
            } catch (error) {
                setError('Error loading data :(');
            } finally {
                setLoader(false);
            }
        };

        getProduct();
    }, [id]);
    const addToCart = async (productId) => {

        const token = localStorage.getItem('userToken');
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
            productId
        }, {
            headers: {
                Authorization: `Tariq__${token}`
            }
        });
        console.log(data);
    };
    if (loader) {
        return <Loader />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <>
      {product ? (
        <div className="style container card mb-3 p-4 text-center pagination" key={product._id}>
          <div className="row">
            <div className="col-md-6">
              <Carousel className="mb-3">
                {product.subImages && product.subImages.length > 0 && product.subImages.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img src={image.secure_url} className="d-block w-100" alt={product.name} style={{width:"15rem", height:"30rem"}}/>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <h5 className='text-decoration-line-through text-warning'>Price : {product.price}$</h5>
                <h5 className='text-primary'>Price after discount : {product.finalPrice}$</h5>
                <h5 className=' text-danger'>Discount : {product.discount}%</h5>
                <Rating initialValue={product.avgRating} />
                <p>{product.description}</p>
                <button className="btn btn-outline-warning btn-lg me-3" onClick={() => addToCart(product._id)}>+ Add to cart</button>
                <button className='btn btn-outline-warning btn-lg' ><Link to='/AddReview' className='nav-link'>Add Review</Link></button>
              </div>
            </div>
          </div>
          
        </div>
      ) : (
        <>{error}</>
      )}
      <div className='container'>
      <h3 className="card-subtitle mb-2 text-primary ">Product Reviews</h3>
        <ul className="list-group list-group-flush">
          {product.reviews.map(review => (
            <li key={review._id} className="list-group-item ">
              <div className="d-flex align-items-center ">
                <img src={review.createdBy.image.secure_url} alt={review.createdBy.userName} className="me-2" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <div>
                  <h5 className="mb-0">{review.createdBy.userName}</h5>
                  <h5 className="mb-0">{review.comment}</h5>
                  <Rating initialValue={review.rating} readonly/>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
     
    </>
  );
}