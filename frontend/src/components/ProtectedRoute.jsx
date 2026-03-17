import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('neuroclinic_auth') === 'true'
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}
