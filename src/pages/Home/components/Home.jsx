import React from 'react'
import Categories from '../../Categories/components/Categories'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

export default function Home() {
  return (
    <>
     <Carousel className='container my-3'>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src='src\Images\model1.jpg'
          style={{ height: '100%', objectFit: 'cover' }}
          alt="men fashion"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="src\Images\appleb.jpg"
          style={{ height: '100%', objectFit: 'cover' }}
          alt="electronices"
        />
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="src\Images\model6.jpg"
          style={{ height: '100%', objectFit: 'cover' }}
          alt="women fashion"
        />
      </Carousel.Item>
    </Carousel>

      <Categories />

    </>


  )
}
