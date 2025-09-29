import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../providers/AuthProvider'

function ProtectedRoute({ children }) {
  
  const { user } = useAuthContext()


  return user ? children : <Navigate to='/' />
}

export default ProtectedRoute
