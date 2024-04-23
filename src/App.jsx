import React, { } from 'react'
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from './components/ProtectedRoutes';
import UserContextProvider from './context/User';
import ProductsDetails from './pages/Products/ProductsDetails';
import SendCode from './pages/ForgotPassword/components/SendCode';
import ForgotPassword from './pages/ForgotPassword/components/ForgotPassword';
import Order from './pages/Order/component/Order';
import AddReview from './pages/Review/components/AddReview';
import { CartContextProvider } from './context/CartContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/About",
        element: <About />
      },
      {
        path: "/Cart",
        element:
          <ProtectedRoutes>
            <CartContextProvider>
              <Cart />
            </CartContextProvider>
          </ProtectedRoutes>
      },
      {
        path:"/Order",
        element:<Order/>

      },
      {
        path: "/Products",
        element:
          <ProtectedRoutes>
            <Products></Products>
          </ProtectedRoutes>

      },
      {
        path: "/Products/:id",
        element:
          <ProtectedRoutes>
            <ProductsDetails></ProductsDetails>
          
          </ProtectedRoutes>

      },
      {
        path: "/Categories/:id",
        element: <ProtectedRoutes>
          <CategoriesProducts />
        </ProtectedRoutes>
      },
      {
        path: "/Contact",
        element: <Contact />
      },
      {
        path: "/SignIn",
        element: <SignIn />
      },
      {
        path: "/SignUp",
        element: <SignUp />
      },
      {
        path: "/SendCode",
        element: <SendCode />
      },
      {
        path: "/ForgotPassword",
        element: <ForgotPassword />
      },
      {
        path: '/AddReview',
        element: <AddReview />
      },

    ]
  }
]);

export default function App() {

  return (
    <>
      <UserContextProvider>
     
        <RouterProvider router={router} />
     
        
      </UserContextProvider>

      <ToastContainer />

    </>
  )
}
