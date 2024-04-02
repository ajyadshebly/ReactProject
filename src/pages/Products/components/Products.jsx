import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Error from '../../../components/Error';
import { Rating } from 'react-simple-star-rating'

const PAGE_SIZE = 3;  

export default function Products() {

  
  const [products, setProducts] = useState([]);
  // const [rating, setRating] = useState(true);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total number of pages
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const currentProducts = products.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products?page=1&limit=10`);
      setProducts(data.products);
      setError('');
    } catch (error) {
      setError('Error loading data :(');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loader) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
    <div className="container style d-grid gap-3 text-center">
      <div className="card-group">
        {currentProducts.map((product) => (
          <div className="card" style={{ width: '18rem' }} key={product._id}>
            <img
              src={product.mainImage.secure_url}
              className="card-img-top"
              alt={product.name}
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <h6 className="card-text text-decoration-line-through text-warning">
                Price: {product.price}$
              </h6>
              <h6 className="card-text text-primary">
                Price after discount: {product.finalPrice}$
              </h6>
              <h6 className="card-text text-danger">
                Discount: {product.discount}%
              </h6>
              <Rating initialValue={product.avgRating} readonly />
            </div>
            <div className="card-footer">
              <Link
                className="btn btn-outline-primary"
                to={`/Products/${product._id}`}
              >
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    {/* Pagination */}
    <nav aria-label="Page navigation example ">
      <ul className="pagination justify-content-center my-5">
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            className={`page-item ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            key={index + 1}
          >
            <button
              className="page-link"
              onClick={() => handleClick(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  </>
  
);
}