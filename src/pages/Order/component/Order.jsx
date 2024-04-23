import axios from 'axios';
import React from 'react'
import { useState } from 'react';

export default function Order({ products }) {
  const [coupon, setCoupon] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const token = localStorage.getItem('userToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
        
          headers: {
            Authorization: `Tariq__${token}`
        }
        }
        ,{
          coupon,
          address,
          phone
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const result = await response.json();
      console.log(result);  
      alert('Order placed successfully!');
    } catch (error) {
      console.log('Failed to place order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <form className="form-signin text-center" onSubmit={handleSubmit}>
      <h1 className="h3 mb-3 fw-normal">Order</h1>
      
      <div className="product-image">
        
        {products && products.mainImage && (
 <img src={products.mainImage.secure_url} alt={products.name} className="rounded-circle" style={{ width: '150px' }} />
)}
      </div>

      <div className="product-quantity">
        {/* <p> Quantity: {products?.quantity || 0}</p> */}
      </div>

      <div className="form-floating">
        <input 
          type="text"
          className="form-control"
          placeholder="coupon name"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <label>Coupon name</label>
      </div>

      <div className="form-floating">
        <input 
          type="text"
          className="form-control"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label>Address</label>
      </div>

      <div className="form-floating">
        <input 
          type="number"
          className="form-control"
          placeholder="phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <label>Phone</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary my-2" type="submit">Order</button>
    </form>
  );
}
