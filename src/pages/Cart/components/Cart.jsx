import React from 'react';
import { useCartContext } from '../../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartData, increaseQuantity, decreaseQuantity, removeItem, clearCart} = useCartContext({});
  console.log('cartData:', cartData);
  console.log(typeof cartData);

  const calculateTotalPrice = (product) => {
    return product.details.finalPrice * product.quantity;
  };
  const calculateTotalPrices = () => {
    if (!cartData || !Array.isArray(cartData.products)) {
      return 0; 
    }
    const totalPrice = cartData.products.reduce((total, product) => {
      return total + (product.details.finalPrice * product.quantity);
    }, 0);

    return totalPrice;
  };
  return (
    <section className="container" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card shopping-cart" style={{ borderRadius: '15px' }}>
              <div className="card-body text-black">
                <div className="row">
                  <div className="col-lg-6 px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Your products</h3>

                    {cartData && cartData.products && cartData.products.map(product => (
                      <div key={product._id} className="d-flex align-items-center mb-5">
                        <div className="flex-shrink-0">
                          <img src={product.details.mainImage.secure_url} className="img-fluid" style={{ width: '150px' }} alt={product.details.name} />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <button onClick={() => removeItem(product.productId)} className="btn float-end text-danger"><i className="fas fa-trash fa-lg"></i></button>
                          <h5 className="text-primary">{product.details.name}</h5>
                          <div className="d-flex align-items-center">
                            <p className="fw-bold mb-0 me-5 pe-3">${calculateTotalPrice(product)}</p>
                            <div>
                              <button onClick={() => decreaseQuantity(product.productId)} className="btn border border-0 text-danger me-3 ms-3">
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                              <input
                                className="fw-bold text-black border border-0"
                                style={{ width: '50px' }}
                                min="1"
                                name="quantity"
                                value={product.quantity}
                                type="number"
                                readOnly
                              />
                              <button onClick={() => increaseQuantity(product.productId)} className="btn border border-0 text-primary">
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button className="btn btn-outline-danger" onClick={() => clearCart()}>
                      Clear Cart
                    </button>
                    <hr className="mb-4" style={{ height: '2px', backgroundColor: '#1266f1', opacity: 1 }} />

                    <div className='d-flex justify-content-between p-2 mb-2 bg-primary-subtle'>
                      <h5 className='fw-bold mb-0'>Total Price:</h5>
                      <h5 className='fw-bold mb-0'> ${calculateTotalPrices()}</h5>
                    </div>

                  </div>

                  <div className="col-lg-6 px-5 py-4">
                    <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">Payment</h3>

                    <form className="mb-5">
                      <div data-mdb-input-init className="form-outline mb-5">
                        <input type="text" className="form-control form-control-lg" siez={17} defaultValue="1234 5678 9012 3457" minLength={19} maxLength={19} />
                        <label className="form-label">Card Number</label>
                      </div>
                      <div className="form-outline mb-5">
                        <input type="text" className="form-control form-control-lg" siez={17} defaultValue="John Smith" />
                        <label className="form-label">Name on card</label>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-5">
                          <div className="form-outline">
                            <input type="text" id="typeExp" className="form-control form-control-lg" defaultValue="01/22" size={7} minLength={7} maxLength={7} />
                            <label className="form-label">Expiration</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-5">
                          <div className="form-outline">
                            <input type="password" className="form-control form-control-lg" defaultValue="●●●" size={1} minLength={3} maxLength={3} />
                            <label className="form-label">Cvv</label>
                          </div>
                        </div>
                      </div>
                      <button type="button" className="btn btn-primary btn-block btn-lg"><Link className='nav-link' to="/Order">Buy now</Link></button>
                      <h5 className="fw-bold mb-5" style={{ position: 'absolute', bottom: 0 }}>
                        <a href="/Products"><i className="fas fa-angle-left me-2" />Back to shopping</a>
                      </h5>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
