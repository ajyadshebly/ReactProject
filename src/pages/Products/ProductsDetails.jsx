import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import axios from 'axios';
import { Rating } from 'react-simple-star-rating';

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
                    {/* <img src={product.mainImage.secure_url} width={350} className="img-thumbnail" alt={product.name} /> */}
                    {product.subImages && product.subImages.length > 0 && (
                        <div className="sub-thumbnail d-flex justify-content-evenly">
                            {product.subImages.map((image, index) => (
                                <img key={index} src={image.secure_url} width={200} className="sub-thumbnail" alt={product.name} />
                            ))}
                        </div>
                    )}
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <h5 className='text-decoration-line-through text-warning'>Price : {product.price}$</h5>
                        <h5 className='text-primary'>Price after discount : {product.finalPrice}$</h5>
                        <h5 className=' text-danger'>Discount : {product.discount}%</h5>
                        <Rating initialValue={product.avgRating} />

                        <p>{product.description}</p>
                        <button className="btn btn-outline-warning btn-lg" onClick={() => addToCart(product._id)}>Add to cart</button>

                    </div>


                </div>
            ) : (
                <>{error}</>
            )}
        </>
    );
}
