import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const token = localStorage.getItem('userToken');
  // const cartQuantity = cartData.reduce(
  //   (quantity,products)=>products.quantity + quantity,
  //   0
  // );

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      // console.log(response.data);
      setCartData(response.data);
    } catch (error) {
    }
  };

 
  const increaseQuantity = async (productId) => {
    if (!Array.isArray(cartData.products)) {
      console.error( cartData.products);
      return;
    }
    const newCartData = cartData.products.map(product =>
      product.productId === productId ? {...product, details: {...product.details, quantity: product.details.quantity + 1}} : product
    );
    setCartData({ ...cartData, products: newCartData });
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      fetchCartData();
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuantity = async (productId) => {
    if (!Array.isArray(cartData.products)) {
      console.log(cartData.products);
      return;
    }
    const product = cartData.products.find(p => p.productId === productId);
    if (product) {
      if (product.quantity === 1) {
        const newProducts = cartData.products.filter(p => p.productId !== productId);
        setCartData({ ...cartData, products: newProducts });
        try {
          await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
            productId
          },{
            headers: {
              Authorization: `Tariq__${token}`
            }
          });
          fetchCartData();
        } catch (error) {
          console.log(error);
        }
      } else {
        const newProducts = cartData.products.map(p =>
          p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
        setCartData({ ...cartData, products: newProducts });
        try {
          await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`, {
            productId
          }, {
            headers: {
              Authorization: `Tariq__${token}`
            }
          });
          fetchCartData();
        } catch (error) {
          console.error('Error decreasing quantity:', error);
        }
      }
    }
  };
  
  
  const removeItem = async (productId) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`, {
        productId
      }, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
      fetchCartData();
    } catch (error) {
      
    }
  };


  const clearCart = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`, null, {
        headers: {
          Authorization: `Tariq__${token}`
        }
      });
     
      fetchCartData();
    } catch (error) {
     
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <CartContext.Provider value={{ cartData, increaseQuantity, decreaseQuantity, removeItem, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
