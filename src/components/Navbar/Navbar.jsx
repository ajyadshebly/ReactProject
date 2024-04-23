import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../context/User'
import { CartContextProvider } from '../../context/CartContext'
// import Products from '../../pages/Products/components/Products'

// import logo from '../../Images/AjyadShop1.svg'
// import {  useCartContext,CartContext } from '../../context/CartContext';

export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
  // const { cartQuantity} = useCartContext(CartContext);
  // const {totalProductsInCart} = useContext(CartContext);

  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('userToken')
    setUserToken(null);
    setUserName(null);
    navigate('/SignUp');
    
  }
  
  return (
     
    <>
      <div className='container bg-body-tertiary' >
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a className=" navbar-brand ">
            <img src={'/images/AjyadShop1.svg'}  width={50} height={50} className="d-inline-block align-text-top" />

             
            </a>
          </div>
          {
            userName ?
              <>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" >Welcome {userName}</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Products" >Products</NavLink>
                  </li>
                  {/* <li className="nav-item ">
                    <NavLink className="nav-link btn rounded-circle" to="/Cart">Cart</NavLink>
                  </li> */}
                  <li className="nav-item">
                <NavLink className="nav-link"  to="/About" >About us</NavLink>
               </li>
             
              <li className="nav-item">
                <NavLink className="nav-link"  to="/Contact" >Contact us</NavLink>
                </li>

                </ul>
                <div className="col-md-3 text-end">
                  <button className='btn border-light me-5 p-0 position-relative '><Link className="nav-link" to="/Cart"> <img src={'/images/cartB.png'}  style={{width: "3rem",height:"2.8rem"}}/></Link>
                  <div className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
                  {/* {cartQuantity} */} 4
                    </div>
                 </button>
                  <button type="button" className="btn btn-outline-primary"><Link className='nav-link' onClick={logOut}>Sign Out</Link></button>
                </div>
              </>
              :
              <>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/About" >About us</NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink className="nav-link" to="/Contact" >Contact us</NavLink>
                  </li>
                </ul>
                <div className="col-md-3 text-end">
                  <button type="button" className="btn btn-outline-primary me-2 "> <Link className="nav-link" to="/SignIn">Sign-In </Link></button>
                  <button type="button" className="btn btn-primary "> <Link className="nav-link" to="/SignUp">Sign-Up </Link></button>
                </div>
              </>
          }

        </header>
      </div>

    </>
  )
}
