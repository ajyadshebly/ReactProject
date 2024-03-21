import React from 'react'
import { Link ,NavLink } from 'react-router-dom'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Navbar() {

  return (
    <>
   
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <a className="d-inline-flex link-body-emphasis text-decoration-none">
              {/* <svg className="bi" width="{40}" height="{32}" role="img" aria-label="Bootstrap"><use xlinkhref="#bootstrap" /></svg> */}
              Ajyad Shop
            </a>
          </div>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
              <li className="nav-item">
                <NavLink className="nav-link"  to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to="/About" >About us</NavLink>
                </li>
              {/* <li className="nav-item">
                <NavLink className="nav-link"   to="/Categories">Categories</NavLink>
                </li> */}
                <li className="nav-item">
                <NavLink className="nav-link"   to="/Cart">Cart</NavLink>
                </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to="/Products" >Products</NavLink>
                </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to="/Contact" >Contact us</NavLink>
                </li>
            

          </ul>
          <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2 "> <NavLink className="nav-link"  to="/SignIn">Sign-In </NavLink></button>
            <button type="button" className="btn btn-primary "> <NavLink className="nav-link"  to="/SignUp">Sign-Up </NavLink></button>
          </div>
        </header>
      </div>
   
    </>
  )
}
