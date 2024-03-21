import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'

export default function Root() {
  return (
    <>
    <Navbar/>

   <Outlet></Outlet>
    </>
  )
}
