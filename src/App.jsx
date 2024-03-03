import React, { useEffect, useState } from 'react'
import About from './pages/About/components/About'
import Home from './pages/Home/components/Home'
import Categories from './pages/Categories/components/Categories'
import Products from './pages/Products/components/Products'
import Contact from './pages/Contact/components/Contact'
import Cart from './pages/Cart/components/Cart'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Root from './routers/Root'
import Login from './pages/Login/components/Login'
import NotFound from './pages/NotFound/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/About',
        element: <About />
      },
      {
        path: '/Categories',
        element: <Categories />
      },
      {
        path: '/Cart',
        element: <Cart />
      },
      {
        path: '/Products',
        element: <Products />
      },
      {
        path: '/Contact',
        element: <Contact />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/singUp',
        element: <singUp />
      }
    ]
  }
]);

export default function App() {

  return (
    <>
      
      <RouterProvider router={router} />
   
      <Home/>
    </>
  )
}
