import React from 'react'

export default function About() {
  return (
    <div className="container text-center">
    <img src="/Images/AjyadShop1.svg"  width={150} height={150} alt="About Us" className="about-image" />
    <div className="about-content">
      <h2>About Us</h2>
      <p>In the Ajyad store, we offer you online shopping for any item you want, whether clothes, electronics, etc.
         We have many categories that you will like and you will find everything you need in our store. 
         <strong>Our store is available 24/7.</strong></p>
      <h5 className='text-primary'> We are happy for you to visit our store and do your shopping :)</h5>
    </div>
  </div>
  )
}
