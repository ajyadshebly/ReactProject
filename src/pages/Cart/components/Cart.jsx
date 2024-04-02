import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loader from '../../../components/Loader';
import Error from '../../../components/Error';

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('userToken');


  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setProducts(response.data.products);
      console.log(response);
      setError('');
    } catch (error) {
      setError('Error loading cart data :(');
    } finally {
      setLoader(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error removing product from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, {}, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      setProducts([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const increaseQty = async (productId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      fetchCartData(); // Refresh cart data after increasing quantity
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const decreaseQty = async (productId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      fetchCartData(); // Refresh cart data after decreasing quantity
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);

  if (loader) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section className="h-100" >
       {/* <h3 className="fw-normal mb-0 text-black my-5 text-center">Shopping Cart</h3> */}
      <div className="container h-100 py-5 " style={{ backgroundColor: '#eee' }}>
    
        <div className="row d-flex justify-content-center align-items-center h-100">
        
          <div className="col-10">
            {products.map(products => (
              <div className="card rounded-3 mb-4" key={products._id}>
                <div className="card-body p-4">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                       {products.mainImage?.secure_url && (
            <img src={products.mainImage.secure_url} className="img-fluid rounded-3" alt={products.name} />
          )}
            </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{products.name}</p>
                     
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button className="btn btn-link px-2" onClick={() => decreaseQty(products._id)}>
                        <i className="fas fa-minus"></i>
                      </button>
                      <input id={`quantity_${products._id}`} min="0" name="quantity" value={products.quantity} type="number" className="form-control form-control-sm" readOnly />
                      <button className="btn btn-link px-2" onClick={() => increaseQty(products._id)}>
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">{products.price}</h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button className="btn btn-link text-danger" onClick={() => removeFromCart(products._id)}>
                        <i className="fas fa-trash fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
          </div>
        </div>
      </div>
    </section>
  );
}


