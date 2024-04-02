import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Footer() {
  return (
    <footer className="container bg-body-tertiary pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md text-center">
          <h5>Welcome to our store any time</h5>
        </div>
        <div className="col-6 col-md text-center">
          <img src={'/images/AjyadShop1.svg'}  width={50} height={50} className="d-inline-block align-text-top" />

          <p>Ajyad Shop</p>
          <small className="d-block mb-3 text-muted">© 2024</small>
        </div>
        <div className="col-6 col-md text-center">
          <h5>Follow us on social media</h5>
          <div className="social-icons mt-3 text-center">
            <a href="https://www.facebook.com/ajyad.shebly.9" className="me-3 text-dark">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="me-3 text-dark">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com" className="me-3 text-dark">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com" className="me-3 text-dark">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

    </footer>



  )
}
