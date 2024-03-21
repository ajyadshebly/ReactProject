import React, {  } from 'react'
import About from './pages/About/components/About'
import Home from './pages/Home/components/Home'

import Products from './pages/Products/components/Products'
import Contact from './pages/Contact/components/Contact'
import Cart from './pages/Cart/components/Cart'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import Root from './routers/Root'
import SignIn from './pages/SignIn/components/SignIn'
import NotFound from './pages/NotFound/NotFound'
import SignUp from './pages/SignUp/components/SignUp';
import CategoriesProducts from './pages/Categories/CategoriesProducts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/About",
        element: <About />
      },
      {
        path: "/Cart",
        element: <Cart />
      },
      {
        path: "/Products",
        element: <Products />
      },
      {
        path: "/Categories/:id",
        element: <CategoriesProducts />
      },
      {
        path: "/Contact",
        element: <Contact />
      },
      {
        path: "/SignIn",
        element: <SignIn/>
      },
      {
        path: "/SignUp",
        element: <SignUp/>
      }
    ]
  }
]);

export default function App() {

  return (
    <>
      
      <RouterProvider router={router} />

    </>
  )
}
