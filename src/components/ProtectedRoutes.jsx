import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    if(!token){
      return <Navigate to='/SignIn' replace />
    }
  return children;
}
