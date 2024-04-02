import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../context/User'


export default function Navbar() {
  const { userName, setUserName, setUserToken } = useContext(UserContext);
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
            <img src="src\Images\AjyadShop1.svg"  width={50} height={50} className="d-inline-block align-text-top" />

             
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
                  <li className="nav-item ">
                    <NavLink className="nav-link" to="/Cart">Cart</NavLink>
                  </li>
                  <li className="nav-item">
                <NavLink className="nav-link"  to="/About" >About us</NavLink>
               </li>
             
              <li className="nav-item">
                <NavLink className="nav-link"  to="/Contact" >Contact us</NavLink>
                </li>

                </ul>
                <div className="col-md-3 text-end">
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
